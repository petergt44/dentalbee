import json
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from notes.models import Note

class NotesAPITestCase(APITestCase):
    def setUp(self):
        # Create a user and obtain token
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.client.login(username="testuser", password="testpassword")
        self.note_data = {
            "title": "Test Note",
            "description": "This is a test note."
        }

    def test_create_note_authenticated_user(self):
        response = self.client.post("/api/notes/", data=json.dumps(self.note_data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], self.note_data["title"])

    def test_get_notes_authenticated_user(self):
        Note.objects.create(user=self.user, title="Test Note 1", description="Note 1 description.")
        Note.objects.create(user=self.user, title="Test Note 2", description="Note 2 description.")
        
        response = self.client.get("/api/notes/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_update_note_authenticated_user(self):
        note = Note.objects.create(user=self.user, title="Old Title", description="Old description.")
        update_data = {"title": "New Title", "description": "New description."}
        
        response = self.client.put(f"/api/notes/{note.id}/", data=json.dumps(update_data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], update_data["title"])

    def test_delete_note_authenticated_user(self):
        note = Note.objects.create(user=self.user, title="To Delete", description="Delete this note.")
        
        response = self.client.delete(f"/api/notes/{note.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_access_notes_unauthenticated(self):
        self.client.logout()
        response = self.client.get("/api/notes/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

