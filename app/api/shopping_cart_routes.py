from flask import Blueprint, jsonify, session, request
from app.models import Product, db, Image, ShoppingCart
from flask_login import current_user

shopping_routes = Blueprint('shopping_cart', __name__)


# Get a user's cart
@shopping_routes.route('/<int:cart_id>')
def get_cart(id):
    shopping_cart = ShoppingCart.query.get(id)
    return shopping_cart.to_dict()


# POST Add a listing to a cart


# PUT Update a cart listing purchase quantity


# DELETE Remove a listing from a cart
