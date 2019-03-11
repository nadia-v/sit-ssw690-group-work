from django.test import TestCase
from .models import User

# from django.core.urlresolvers import reverse

class ModelTestCase(TestCase):
    """This class defines the test suite for the user model."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.user_name = "Write world class code"
        self.user = User(name=self.user_name)

    def test_model_can_create_a_user(self):
        """Test the user model can create a user."""
        old_count = User.objects.count()
        self.user.save()
        new_count = User.objects.count()
        self.assertNotEqual(old_count, new_count)

# # api/tests.py
#
# # Add these imports at the top
# from rest_framework.test import APIClient
# from rest_framework import status
# from django.core.urlresolvers import reverse
#
# # Define this after the ModelTestCase
# class ViewTestCase(TestCase):
#     """Test suite for the api views."""
#
#     def setUp(self):
#         """Define the test client and other test variables."""
#         self.client = APIClient()
#         self.bucketlist_data = {'name': 'Go to Ibiza'}
#         self.response = self.client.post(
#             reverse('create'),
#             self.bucketlist_data,
#             format="json")
#
#     def test_api_can_create_a_bucketlist(self):
#         """Test the api has bucket creation capability."""
#         self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)