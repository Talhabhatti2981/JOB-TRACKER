from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime
from app import create_app
from models import db, Job

app = create_app()

def scrape_jobs():
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    driver.get("https://www.actuarylist.com/jobs")

    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, "job-listing")))

    jobs_scraped = 0
    soup = BeautifulSoup(driver.page_source, "html.parser")
    job_elements = soup.find_all("div", class_="job-listing")[:50]

    with app.app_context():
        for elem in job_elements:
            try:
                title = elem.find("h3", class_="job-title").get_text(strip=True)
                company = elem.find("span", class_="company").get_text(strip=True)
                location = elem.find("span", class_="location").get_text(strip=True)
                posting_date = datetime.utcnow()
                job_type = elem.find("span", class_="job-type").get_text(strip=True) if elem.find("span", "job-type") else "Full-time"
                tags_elem = elem.find("div", class_="tags")
                tags = ", ".join([tag.get_text(strip=True) for tag in tags_elem.find_all("span")]) if tags_elem else ""

                if Job.query.filter_by(title=title, company=company).first():
                    continue

                job = Job(
                    title=title,
                    company=company,
                    location=location,
                    posting_date=posting_date,
                    job_type=job_type,
                    tags=tags,
                )
                db.session.add(job)
                jobs_scraped += 1
            except Exception as e:
                print(f"Error scraping job: {e}")
                continue

        db.session.commit()
        print(f"✅ Scraped and added {jobs_scraped} new jobs.")

    driver.quit()


if __name__ == "__main__":
    scrape_jobs()
