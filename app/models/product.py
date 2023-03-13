from .db import db, environment, SCHEMA


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False, unique=True)
    price = db.Column(db.Float(), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    images = db.relationship('Image', back_populates='product')
    shopping_carts = db.relationship("ShoppingCart", back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'quantity': self.quantity,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'images': [image.to_dict() for image in self.images],
            'seller_id': self.seller_id
        }
