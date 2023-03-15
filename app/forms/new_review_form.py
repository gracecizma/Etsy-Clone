from flask_wtf import FlaskForm
from wtforms.fields import StringField, TextAreaField, IntegerField,SubmitField
from wtforms.validators import DataRequired
from app.models import Review

class NewReviewForm(FlaskForm):
    user_id = IntegerField("Store")
    product_id = IntegerField("Product")
    comment = TextAreaField('Review/Comment', validators=[DataRequired()])
    Stars = IntegerField('password', validators=[DataRequired()])
    