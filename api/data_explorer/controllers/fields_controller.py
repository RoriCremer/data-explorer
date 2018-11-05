from data_explorer.models.field import Field
from data_explorer.models.fields_response import FieldsResponse

from flask import current_app
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search


def fields_get():
    """fields_get

    Returns fields.

    rtype: FieldsResponse
    """

    es = Elasticsearch(current_app.config['ELASTICSEARCH_URL'])
    search = Search(using=es, index=current_app.config['FIELDS_INDEX_NAME'])
    # Default number of results is 10. We want to get 100.
    # TODO(malathir): Change this to case insensitive sorting.
    search = search.sort('name.keyword')
    search = search[0:100]
    response = search.execute()
    response_fields = response.to_dict()

    fields = []
    for field in response_fields['hits']['hits']:
        if "description" in field["_source"]:
            fields.append(
                Field(
                    display_text="Add %s facet with description %s" %
                    (field["_source"]["name"],
                     field["_source"]["description"]),
                    elasticsearch_name=field["_id"],
                    is_facet_value=True))
        else:
            fields.append(
                Field(
                    display_text="Add %s facet" % field["_source"]["name"],
                    elasticsearch_name=field["_id"],
                    is_facet_value=True))

    return FieldsResponse(fields=fields)
