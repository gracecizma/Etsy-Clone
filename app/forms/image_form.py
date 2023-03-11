from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Image

class ImageForm(FlaskForm):
    image_url = StringField('image_url', validators=[DataRequired()])
    preview = BooleanField('preview', validators=[DataRequired()])