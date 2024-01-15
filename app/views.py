from flask import Blueprint, render_template, request, redirect, url_for
from bson.objectid import ObjectId

from app.forms import ProductForm
from . import mongo

main = Blueprint('main', __name__)

@main.route('/')
def index():
    products = mongo.db.products.find()
    return render_template('index.html', products=products)

@main.route('/add', methods=['GET', 'POST'])
def add_product():
    form = ProductForm()

    if form.validate_on_submit():
        new_product = {
            'name': form.name.data,
            'purchased': form.purchased.data,
            'quantity': form.quantity.data
        }
        mongo.db.products.insert_one(new_product)
        return redirect(url_for('main.index'))
    else:
        for fieldName, errorMessages in form.errors.items():
            for err in errorMessages:
                print(fieldName, 'has error:', err)
    return render_template('add_product.html', form=form)

@main.route('/edit/<product_id>', methods=['GET', 'POST'])
def edit_product(product_id):
    product = mongo.db.products.find_one({'_id': ObjectId(product_id)})
    form = ProductForm(data=product)

    if form.validate_on_submit():
        mongo.db.products.update_one(
            {'_id': ObjectId(product_id)},
            {'$set': {
                'name': form.name.data,
                'purchased': form.purchased.data,
                'quantity': form.quantity.data
            }}
        )
        return redirect(url_for('main.index'))
    return render_template('edit_product.html', form=form, product_id=product_id)

@main.route('/delete/<product_id>', methods=['GET', 'POST'])
def delete_product(product_id):
    if request.method == 'POST':
        mongo.db.products.delete_one({'_id': ObjectId(product_id)})
        return redirect(url_for('main.index'))
    return render_template('delete_product.html', product_id=product_id)

@main.route('/toggle_purchase/<product_id>')
def toggle_purchase(product_id):
    product = mongo.db.products.find_one({'_id': ObjectId(product_id)})
    new_status = not product['purchased']
    mongo.db.products.update_one({'_id': ObjectId(product_id)}, {'$set': {'purchased': new_status}})
    return redirect(url_for('main.index'))
