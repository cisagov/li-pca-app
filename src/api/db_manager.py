"""DB Connection Manager."""
# Standard Python Libraries
from datetime import datetime

# Third-Party Libraries
from bson.binary import UUID, Binary
from bson.objectid import ObjectId
from flask import g
import pymongo

# cisagov Libraries
from api.config.db import get_db
from api.models.assessment_mongo import AssessmentSchema
from api.models.campaign_mongo import CampaignSchema
from api.models.config_mongo import ConfigSchema
from api.models.customer_mongo import CustomerSchema
from api.models.cycle_mongo import CycleSchema
from api.models.landing_page_mongo import LandingPageSchema
from api.models.nonhuman_mongo import NonHumanSchema
from api.models.recommendation_mongo import RecommendationsSchema
from api.models.sending_profile_mongo import SendingProfileSchema
from api.models.subscription_manager_mongo import SubscriptionSchema
from api.models.target_mongo import TargetSchema
from api.models.template_mongo import TemplateSchema


class Manager:
    """Manager."""

    def __init__(self, collection, schema, other_indexes=[]):
        """Initialize Manager."""
        self.collection = collection
        self.schema = schema
        self.other_indexes = other_indexes
        self.db = get_db()

    def get_query(self, data):
        """Get query parameters from schema."""
        schema = self.schema()
        return schema.load(dict(data), partial=True)

    def document_query(self, document_id):
        """Get query for a document by id."""
        if type(document_id) is str:
            return {"_id": ObjectId(document_id)}
        elif type(document_id) is ObjectId:
            return {"_id": document_id}

    def document_query_uuid(self, document_id):
        """Get query for a document by id."""
        if type(document_id) is str:
            return {"uuid": Binary(document_id)}
        elif type(document_id) is UUID:
            return {"uuid": document_id}

    def convert_fields(self, fields):
        """Convert list of fields into mongo syntax."""
        if not fields:
            return None
        result = {}
        for field in fields:
            result[field] = 1
        return result

    def format_params(self, params):
        """Format params."""
        if not params:
            return {}
        if params.get("uuid", {}).get("$in"):
            new_ids = []
            for item in params["uuid"]["$in"]:
                new_ids.append(UUID(item))
            params["uuid"]["$in"] = new_ids
        if params.get("_id", {}).get("$in"):
            new_ids = []
            for item in params["_id"]["$in"]:
                new_ids.append(ObjectId(item))
            params["_id"]["$in"] = new_ids
        return params

    def format_sort(self, sortby: dict):
        """Format sortby for pymongo."""
        sorts = []
        for k, v in sortby.items():
            if v == "DESC":
                sorts.append((k, pymongo.DESCENDING))
            if v == "ASC":
                sorts.append((k, pymongo.ASCENDING))
        return sorts

    def read_data(self, data, many=False):
        """Read data from database."""
        if data:
            schema = self.schema(many=many)
            return schema.load(schema.dump(data), partial=True)
        return data

    def load_data(self, data, many=False, partial=False):
        """Load data into database."""
        schema = self.schema(many=many)
        return schema.load(data, partial=partial)

    def create_indexes(self):
        """Create indexes for collection."""
        for index in self.other_indexes:
            self.db.collection.create_index(index, unique=False)

    def add_created(self, data):
        """Add created attribute to data on save."""
        if type(data) is dict:
            data["created"] = datetime.utcnow().isoformat()
            data["created_by"] = g.get("username", "bot")
        elif type(data) is list:
            for item in data:
                item["created"] = datetime.utcnow().isoformat()
                item["created_by"] = g.get("username", "bot")
        return data

    def add_updated(self, data):
        """Update updated data on update."""
        if type(data) is dict:
            data["updated"] = datetime.utcnow().isoformat()
            data["updated_by"] = g.get("username", "bot")
        elif type(data) is list:
            for item in data:
                item["updated"] = datetime.utcnow().isoformat()
                item["updated_by"] = g.get("username", "bot")
        return data

    def clean_data(self, data):
        """Clean data for saves to the database."""
        invalid_fields = [
            "_id",
            "uuid",
            "created",
            "updated",
        ]
        if type(data) is dict:
            for field in invalid_fields:
                if field in data:
                    data.pop(field)
        elif type(data) is list:
            for item in data:
                for field in invalid_fields:
                    if field in item:
                        item.pop(field)
        return data

    def get(self, document_id=None, filter_data=None, fields=None):
        """Get item from collection by id or filter."""
        if document_id:
            return self.read_data(
                self.db.collection.find_one(
                    self.document_query(document_id),
                    self.convert_fields(fields),
                )
            )
        else:
            return self.read_data(
                self.db.collection.find_one(
                    filter_data,
                    self.convert_fields(fields),
                )
            )

    def get_uuid(self, document_id=None, filter_data=None, fields=None):
        """Get item from collection by id or filter."""
        if document_id:
            return self.read_data(
                self.db.collection.find_one(
                    self.document_query_uuid(document_id),
                    self.convert_fields(fields),
                )
            )
        else:
            return self.read_data(
                self.db.collection.find_one(
                    filter_data,
                    self.convert_fields(fields),
                )
            )

    def get_mongo_id(self, document_id=None, filter_data=None, fields=None):
        """Get item from collection by id or filter."""
        return self.read_data(
            self.db.collection.find_one(
                self.document_query(_id=document_id),
                self.convert_fields(fields),
            )
        )

    def all(self, params=None, fields=None, sortby=None, limit=None):
        """Get all items in a collection."""
        query = self.db.collection.find(
            self.format_params(params), self.convert_fields(fields)
        )
        if sortby:
            query.sort(self.format_sort(sortby))
        if limit:
            query.limit(limit)
        return self.read_data(query, many=True)

    def delete(self, document_id=None, params=None):
        """Delete item by object id."""
        if document_id:
            return self.db.collection.delete_one(
                self.document_query(document_id)
            ).raw_result
        if params or params == {}:
            return self.db.delete_many(params).raw_result
        raise Exception(
            "Either a document id or params must be supplied when deleting."
        )

    def delete_uuid(self, document_id=None, params=None):
        """Delete item by object id."""
        if document_id:
            return self.db.collection.delete_one(
                self.document_query_uuid(document_id)
            ).raw_result
        if params or params == {}:
            return self.db.delete_many(params).raw_result
        raise Exception(
            "Either a document id or params must be supplied when deleting."
        )

    def update(self, document_id, data):
        """Update item by id."""
        data = self.clean_data(data)
        data = self.add_updated(data)
        self.db.collection.update_one(
            self.document_query(document_id),
            {"$set": self.load_data(data, partial=True)},
        ).raw_result
        return self.get(document_id)

    def update_uuid(self, document_id, data):
        """Update item by id."""
        data = self.clean_data(data)
        data = self.add_updated(data)
        self.db.collection.update_one(
            self.document_query_uuid(document_id),
            {"$set": self.load_data(data, partial=True)},
        ).raw_result

    def update_many(self, params, data):
        """Update many items with params."""
        data = self.clean_data(data)
        data = self.add_updated(data)
        self.db.collection.update_many(
            params,
            {"$set": self.load_data(data, partial=True)},
        )

    def save(self, data):
        """Save new item to collection."""
        self.create_indexes()
        data = self.clean_data(data)
        data = self.add_created(data)
        result = self.db.collection.insert_one(self.load_data(data))
        return {"_id": str(result.inserted_id)}

    def save_many(self, data):
        """Save list to collection."""
        self.create_indexes()
        data = self.clean_data(data)
        data = self.add_created(data)
        result = self.db.collection.insert_many(self.load_data(data, many=True))
        return result.inserted_ids

    def add_to_list(self, document_id, field, data):
        """Add item to list in document."""
        return self.db.collection.update_one(
            self.document_query(document_id), {"$push": {field: data}}
        ).raw_result

    def delete_from_list(self, document_id, field, data):
        """Delete item from list in document."""
        return self.db.collection.update_one(
            self.document_query(document_id), {"$pull": {field: data}}
        ).raw_result

    def update_in_list(self, document_id, field, data, params):
        """Update item in list from document."""
        query = self.document_query(document_id)
        query.update(params)
        return self.db.collection.update_one(query, {"$set": {field: data}}).raw_result

    def upsert(self, query, data):
        """Upsert documents into the database."""
        data = self.clean_data(data)
        data = self.add_created(data)
        data = self.add_updated(data)
        self.db.collection.update_one(
            query,
            {"$set": self.load_data(data)},
            upsert=True,
        )

    def random(self, count=1):
        """Select a random record from collection."""
        return list(self.db.collection.aggregate([{"$sample": {"size": count}}]))

    def exists(self, parameters=None):
        """Check if record exists."""
        fields = self.convert_fields(["_id"])
        result = list(self.db.collection.find(parameters, fields))
        return bool(result)

    def find_one_and_update(self, params, data, fields=None):
        """Find an object and update it."""
        data = self.clean_data(data)
        data = self.add_updated(data)
        return self.db.collection.find_one_and_update(
            params,
            {"$set": self.load_data(data, partial=True)},
            return_document=pymongo.ReturnDocument.AFTER,
            projection=self.convert_fields(fields),
        )


class AssessmentManager(Manager):
    """AssessmentManager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="config",
            schema=AssessmentSchema,
        )


class CampaignManager(Manager):
    """ConfigManager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="config",
            schema=CampaignSchema,
        )


class ConfigManager(Manager):
    """ConfigManager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="config",
            schema=ConfigSchema,
        )


class CustomerManager(Manager):
    """Customer Manager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="customer",
            schema=CustomerSchema,
        )


class CycleManager(Manager):
    """CycleManager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="cycle",
            schema=CycleSchema,
        )


class LandingPageManager(Manager):
    """LandingPageManager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="landing_page",
            schema=LandingPageSchema,
        )

    def clear_and_set_default(self, document_id):
        """Set Default Landing Page."""
        sub_query = {}
        newvalues = {"$set": {"is_default_template": False}}
        self.db.update_many(sub_query, newvalues)
        sub_query = self.document_query(document_id)
        newvalues = {"$set": {"is_default_template": True}}
        self.db.update_one(sub_query, newvalues)


class NonHumanManager(Manager):
    """NonHumanManager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="nonhuman",
            schema=NonHumanSchema,
        )


class RecommendationManager(Manager):
    """RecommendationManager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="recommendation",
            schema=RecommendationsSchema,
        )


class SendingProfileManager(Manager):
    """SendingProfileManager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="sending_profile",
            schema=SendingProfileSchema,
        )


class SubscriptionManager(Manager):
    """SubscriptionManager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="subscription",
            schema=SubscriptionSchema,
        )


class TargetManager(Manager):
    """Target Manager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="target",
            schema=TargetSchema,
            other_indexes=["email"],
        )


class TemplateManager(Manager):
    """Template Manager."""

    def __init__(self):
        """Super."""
        return super().__init__(
            collection="template",
            schema=TemplateSchema,
        )