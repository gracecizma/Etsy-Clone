from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Product

class ProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    price = StringField('price', validators=[DataRequired()])
    quantity = StringField('quantity', validators=[DataRequired()])
