from flask import Blueprint, jsonify, session, request
from app.models import Review, db, User
from flask_login import current_user
from datetime import datetime

from app.forms.new_review_form import NewReviewForm
from app.forms.update_review_form import UpdateReviewForm

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
def ProductReviews(id):
    
    product_reviews = db.paginate(Review.query.filter(id == Review.product_id))
    print("The reviews", product_reviews)
    return [review.to_dict() for review in product_reviews]


@review_routes.route("/new", methods=["POST"])
def leave_Review():
    print("The current_user object is :", current_user)
    print("The Request", request.data)
    form = NewReviewForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        user_id = user["id"]
        print("Authenticated!")
        form["csrf_token"].data = request.cookies["csrf_token"]
        print("-----------", form.data)
        if form.validate_on_submit():
            print("Form Validated")
            review = Review(
                user_id=user_id,
                product_id=form.data["product_id"],
                comment=form.data["comment"],
                stars=form.data["stars"],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            db.session.add(review)
            db.session.commit()
            return review.to_dict()
        return {"errors": form.errors}, 401
    return {"errors": "Unauthorized"}, 403


@review_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
def Route(id):
    print("HIT ROUTE")
    if request.method == "PUT":
        review_to_update = Review.query.get(id)
        form = UpdateReviewForm()
        if current_user.is_authenticated:
            user = current_user.to_dict()
            form["csrf_token"].data = request.cookies["csrf_token"]

            if form.validate_on_submit():
                review_to_update.comment = form.data["comment"]
                review_to_update.stars = form.data["stars"]
                review_to_update.updated_at = datetime.utcnow()
                db.session.add(review_to_update)
                db.session.commit()
                return review_to_update.to_dict()
            return {"errors": form.errors}, 401
        return {"errors": "Unauthorized"}, 403

    if request.method == "DELETE":
        print("Method DELETE")
        if current_user.is_authenticated:
            user = current_user.to_dict()
            #  = Review.query.get(id)
            review_to_delete = Review.query.get(id)
            review_data = review_to_delete.to_dict()
            print(review_data)
            # if user.id == review_data.author.id:
            db.session.delete(review_to_delete)
            db.session.commit()
            return {"message": "Review deleted"}
        return {"errors": "Unauthorized"}, 403

    if request.method == "GET":
        review = Review.query.get(id)
        return review.to_dict()
