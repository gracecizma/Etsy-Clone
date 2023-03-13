from flask_wtf import FlaskForm
from wtforms import IntegerField, HiddenField
from wtforms.validators import DataRequired


class AddToCart(FlaskForm):
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    id = HiddenField('ID')
