from rest_framework.metadata import BaseMetadata


class GraphQLMetadata(BaseMetadata):
    """
    Don't include field and other information for `OPTIONS` requests.
    Just return the name and description.
    """
    def determine_metadata(self, request, view):
        import pdb; pdb.set_trace()
        return {
            'name': view.get_view_name(),
            'description': view.get_view_description()
        }
