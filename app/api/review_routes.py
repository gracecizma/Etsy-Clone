from flask import Blueprint, jsonify, session, request
from app.models import Review, db, User
from flask_login import current_user
from datetime import datetime

from app.models import Review
from app.forms.new_review_form import NewReviewForm

review_routes = Blueprint("review", __name__)


@review_routes.route("/user/<int:id>")
def ReviewsPage(id):
    """ "get users reviews"""

    User_Reviews = Review.query.filter(Review.user_id == id).all()
    return [review.to_dict() for review in User_Reviews]


@review_routes.route("/")
def Reviews():
    all_reviews = Review.query.all()
    return [review.to_dict() for review in all_reviews]


@review_routes.route("/product/<int:id>")
def ProductReviews():
    product_reviews = Review.query.filter(Review.product_id == id).all()
    return [review.to_dict() for review in product_reviews]


@review_routes.route("/", methods=["POST"])
def leave_Review():

    form = NewReviewForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            review = Review(
                user_id=form.user_id.data,
                product_id=form.product_id.data,
                comment=form.comment.data,
                stars=form.stars.data,
                created_at=form.created_at.data,
                updated_at=form.updated_at.data,
            )
            db.session.add(review)
            db.session.commit()
            return review.to_dict()
        return {"errors": form.errors}, 401
    return {"errors": "Unauthorized"}, 403


review_routes.route("/<int:id>", methods=["PUT"])


def Update_Review(id):

    form = NewReviewForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            review_to_edit = Review.query.get(id)

            review_to_edit.id = form.data["id"]
            review_to_edit.user_id = user.id
            review_to_edit.product_id = form.data["product_id"]
            review_to_edit.comment = form.data["comment"]
            review_to_edit.stars = form.data["stars"]
            review_to_edit.updated_at = form.data["updated_at"]

            db.session.add(review_to_edit)
            db.session.commit()
            return review_to_edit.to_dict()
        return {"errors": form.errors}, 401
    return {"errors": "Unauthorized"}, 403
