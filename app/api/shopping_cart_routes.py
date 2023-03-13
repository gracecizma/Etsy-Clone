from flask import Blueprint, jsonify, session, redirect, url_for
from app.models import Product, db, Image, ShoppingCart
from app.forms import AddToCart
from flask_login import current_user

shopping_routes = Blueprint('shopping_cart', __name__)


# Get a user's cart
@shopping_routes.route('/<int:id>')
def get_cart(id):
    shopping_cart = ShoppingCart.query.get(id)
    return shopping_cart.to_dict()


# POST Add a listing to a cart
@shopping_routes.route('/add-to-cart')
def add_to_cart():
    if 'shopping_cart' not in session:
        session['shopping-cart'] = []

    form = AddToCart()

    if form.is_submitted():
        session['shopping_cart'].append({
            'id': form.id.data, 'quantity': form.quantity.data
        })

    return redirect(url_for('get_cart'))


# PUT Update a cart listing purchase quantity
@shopping_routes.route('/')
def update_quantity():
    pass


# DELETE Remove a listing from a cart
@shopping_routes.route('/remove-from-cart/<int:id>')
def delete_from_cart(id):
    del session['shopping_cart'][id]
    return redirect(url_for('get_cart'))
