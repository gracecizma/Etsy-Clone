from flask import Blueprint
from app.models import Product




search_routes = Blueprint('search', __name__)

# Get all products /api/product/
@search_routes.route('/<search>')
def get_products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}
