from flask import Blueprint, jsonify, request
from bson.objectid import ObjectId
from marshmallow import ValidationError
from . import mongo
from app.models import ProductSchema, ProductSchemaAdd

api = Blueprint('api', __name__)


@api.route('/products', methods=['GET'])
def get_products():
    products = mongo.db.products.find()
    product_schema = ProductSchema(many=True)
    products_data = product_schema.dump(products)
    return jsonify(products_data)


@api.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    product = mongo.db.products.find_one({'_id': ObjectId(product_id)})
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    product_schema = ProductSchema()
    product_data = product_schema.dump(product)
    return jsonify(product_data)


@api.route('/products', methods=['POST'])
def add_product():
    schema = ProductSchemaAdd()
    try:
        data = schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    mongo.db.products.insert_one(data)
    return jsonify({'status': 'success', 'message': 'Product added'}), 201


@api.route('/products/<product_id>', methods=['PUT'])
def edit_product(product_id):
    schema = ProductSchema()
    try:
        data = schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    mongo.db.products.update_one({'_id': ObjectId(product_id)}, {'$set': data})
    return jsonify({'status': 'success', 'message': 'Product updated'}), 200


@api.route('/products/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    mongo.db.products.delete_one({'_id': ObjectId(product_id)})
    return jsonify({'status': 'success', 'message': 'Product deleted'}), 200


@api.route('/products/<product_id>/toggle', methods=['PUT'])
def toggle_purchase(product_id):
    product = mongo.db.products.find_one({'_id': ObjectId(product_id)})
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    new_status = not product['purchased']
    mongo.db.products.update_one({'_id': ObjectId(product_id)}, {'$set': {'purchased': new_status}})

    updated_product = mongo.db.products.find_one({'_id': ObjectId(product_id)})
    product_schema = ProductSchema()
    return jsonify(product_schema.dump(updated_product)), 200
