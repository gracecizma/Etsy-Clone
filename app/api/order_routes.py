from flask import Blueprint, jsonify, session, redirect, url_for
from app.models import Order, ShoppingCart, User

from flask_login import current_user

order_routes = Blueprint('orders', __name__)


@order_routes.route('/')
def get_orders():
    user = current_user.to_dict()

    order_data = Order.query.filter(Order.user_id == user["id"])
    orders = {}

    for order in list(order_data):
        order_dict = order.to_dict()
        order_dict["product"] = order.products.to_dict()

        seller_info = User.query.get(order_dict["product"]["seller_id"])
        order_dict["seller"] = seller_info.to_dict()

        if order_dict["order_id"] in orders:
            orders[order_dict["order_id"]].append(order_dict)
        else:
            orders[order_dict["order_id"]] = [order_dict]

    return orders
