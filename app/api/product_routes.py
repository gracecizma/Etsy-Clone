from flask import Blueprint, jsonify, session, request
from app.models import Product
from app.forms import ProductForm 


product_routes = Blueprint('product', __name__)

# Get all products
@product_routes.route('/')
def get_products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

# Create a product
@product_routes.route('/', methods=['POST'])
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            name=form.data['name'],
            description=form.data['description'],
            category=form.data['category'],
            price=form.data['price'],
            quantity=form.data['quantity'],
            images=form.data['images'],
            seller_id=form.data['seller_id']
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Update a product
@product_routes.route('/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product.name = form.data['name']
        product.description = form.data['description']
        product.category = form.data['category']
        product.price = form.data['price']
        product.quantity = form.data['quantity']
        product.images = form.data['images']
        product.seller_id = form.data['seller_id']
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Get a single product
@product_routes.route('/<int:id>')
def get_product(id):
    product = Product.query.get(id)
    return product.to_dict()

# Delete a product
@product_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return {'message': 'Product deleted'}

