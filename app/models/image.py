from .db import db, environment, SCHEMA

class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean(), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    product = db.relationship('Product', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'product_id': self.product_id,
            'preview': self.preview
        }