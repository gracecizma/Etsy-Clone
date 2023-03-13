from flask import Blueprint
from app.models import Review

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

