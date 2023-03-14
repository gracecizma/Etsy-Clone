from flask import Blueprint, jsonify, session, request
from app.models import Product, db, Image, User
from app.forms import ProductForm, ImageForm
from flask_login import current_user
from datetime import datetime


product_routes = Blueprint('product', __name__)

# Get all products /api/product/
@product_routes.route('/')
def get_products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

# Create a product /api/product/
@product_routes.route('/', methods=['POST'])
def create_product():
    
    form = ProductForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        seller_id = user['id']
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            product = Product(
                name=form.data['name'],
                description=form.data['description'],
                price=form.data['price'],
                quantity=form.data['quantity'],
                seller_id=seller_id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            db.session.add(product)
            db.session.commit()
            return product.to_dict()
        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403

# Update a product /api/product/:id
@product_routes.route('/<int:id>', methods=['PUT'])
def update_product(id):
    form = ProductForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        seller_id = user['id']
        product = Product.query.get(id)      
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            product = Product(
                id = form.data['id'],
                name = form.data['name'],
                description = form.data['description'],
                price = form.data['price'],
                quantity = form.data['quantity'],
                seller_id = seller_id,
                updated_at = datetime.utcnow(),
            )
            db.session.add(product)
            db.session.commit()
            return product.to_dict()
        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403

# Get a single product /api/product/:id
@product_routes.route('/<int:id>')
def get_product(id):
    product = Product.query.get(id)
    seller = User.query.get(product.seller_id)
    product = product.to_dict()
    product['seller'] = seller.to_dict()
    return product

# Delete a product /api/product/:id
@product_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    if current_user.is_authenticated:
        user = current_user.to_dict()
        product = Product.query.get(id)
        db.session.delete(product)
        db.session.commit()
        return {'message': 'Product deleted'}
    return {'errors': 'Unauthorized'}, 403


# create a product image /api/product/:id/image
@product_routes.route('/<int:id>/image', methods=['POST'])
def create_product_image(id):
    form = ImageForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        product = Product.query.get(id)
        image = Image(
            url=form.data['url'],
            preview=form.data['preview'],
            product_id=product.id
        )
        db.session.add(image)
        db.session.commit()
        return image.to_dict()
    return {'errors': 'Unauthorized'}, 403