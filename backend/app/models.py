from marshmallow import Schema, fields


class ObjectIdField(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return ''
        return str(value)


class ProductSchema(Schema):
    _id = ObjectIdField(attribute='_id')
    name = fields.Str()
    purchased = fields.Boolean()
    quantity = fields.Str()

    
class ProductSchemaAdd(Schema):
    name = fields.Str(required=True)
    purchased = fields.Boolean(required=True)
    quantity = fields.Str(required=True)
