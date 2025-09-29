from datetime import datetime
from flask import Flask, jsonify, request
from models import db, Job
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        db.create_all()

    # -----------------------
    # Routes
    # -----------------------

    @app.route("/jobs", methods=["GET"])
    def get_jobs():
        jobs = Job.query.order_by(Job.posting_date.desc()).all()
        return jsonify([job.to_dict() for job in jobs])

    @app.route("/jobs/<int:job_id>", methods=["GET"])
    def get_job(job_id):
        job = Job.query.get_or_404(job_id)
        return jsonify(job.to_dict())

    @app.route("/jobs", methods=["POST"])
    def create_job():
        data = request.json
        job = Job(
            title=data["title"],
            company=data["company"],
            location=data["location"],
            posting_date=datetime.strptime(data["posting_date"], "%Y-%m-%d") if data.get("posting_date") else datetime.utcnow(),
            job_type=data.get("job_type"),
            tags=data.get("tags"),
        )
        db.session.add(job)
        db.session.commit()
        return jsonify(job.to_dict()), 201

    @app.route("/jobs/<int:job_id>", methods=["PUT", "PATCH"])
    def update_job(job_id):
        job = Job.query.get_or_404(job_id)
        data = request.json
        job.title = data.get("title", job.title)
        job.company = data.get("company", job.company)
        job.location = data.get("location", job.location)
        if data.get("posting_date"):
            job.posting_date = datetime.strptime(data["posting_date"], "%Y-%m-%d")
        job.job_type = data.get("job_type", job.job_type)
        job.tags = data.get("tags", job.tags)
        db.session.commit()
        return jsonify(job.to_dict())

    @app.route("/jobs/<int:job_id>", methods=["DELETE"])
    def delete_job(job_id):
        job = Job.query.get_or_404(job_id)
        db.session.delete(job)
        db.session.commit()
        return jsonify({"message": "Job deleted successfully"}), 200

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
