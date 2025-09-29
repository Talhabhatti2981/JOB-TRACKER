from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Job(db.Model):
    __tablename__ = 'jobs' 

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    posting_date = db.Column(db.DateTime, default=datetime.utcnow)
    job_type = db.Column(db.String(50))
    tags = db.Column(db.String(200))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "posting_date": self.posting_date.strftime("%Y-%m-%d") if self.posting_date else None,
            "job_type": self.job_type,
            "tags": self.tags,
        }
