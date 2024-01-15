from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name = StringField('Nazwa Produktu', validators=[DataRequired()])
    purchased = BooleanField('Kupiono')
    quantity = StringField('Ilość', validators=[DataRequired()])
