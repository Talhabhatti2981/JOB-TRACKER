from flask import Blueprint, request, jsonify
from models import db, Job
api = Blueprint("api", __name__)
@api.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = Job.query.all()
    return jsonify([job.to_dict() for job in jobs])
@api.route("/jobs/<int:job_id>", methods=["GET"])
def get_job(job_id):
    job = Job.query.get_or_404(job_id)
    return jsonify(job.to_dict())
@api.route("/jobs", methods=["POST"])
def create_job():
    data = request.json
    job = Job(
        title=data.get("title"),
        company=data.get("company"),
        location=data.get("location"),
        posting_date=data.get("posting_date"),
        job_type=data.get("job_type"),
        tags=",".join(data.get("tags", []))
    )
    db.session.add(job)
    db.session.commit()
    return jsonify(job.to_dict()), 201
@api.route("/jobs/<int:job_id>", methods=["PUT"])
def update_job(job_id):
    job = Job.query.get_or_404(job_id)
    data = request.json
    job.title = data.get("title", job.title)
    job.company = data.get("company", job.company)
    job.location = data.get("location", job.location)
    job.posting_date = data.get("posting_date", job.posting_date)
    job.job_type = data.get("job_type", job.job_type)
    job.tags = ",".join(data.get("tags", job.tags.split(",")))
    db.session.commit()
    return jsonify(job.to_dict())

# Delete job
@api.route("/jobs/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    job = Job.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted"})

