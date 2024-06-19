
## Demo

https://notes-manager-aemh.onrender.com/


# Notes Manager

### 1. Create Notes

Creating notes allows users to add new entries to their collection of notes. This functionality typically involves:

- **Form Submission**: Providing a form where users can input the title and content of the note.
- **Backend Interaction**: Sending a POST request to the backend API endpoint (`/api/notes`) with the note data.
- **Feedback to User**: Displaying a success message upon successful creation or handling errors gracefully if the note creation fails.

Example Description:
"Create Notes: Users can add new notes by filling out a form with a title and content. Upon submission, the application sends the note data to the server, which stores it in the database. Users receive feedback confirming successful note creation or notifying them of any errors encountered."

### 2. Edit Notes

Editing notes allows users to modify existing notes that they have previously created. This functionality typically involves:

- **Fetch Existing Data**: Retrieving the current content of the note to be edited from the server.
- **Update Form**: Pre-filling a form with the existing note data so users can make changes.
- **Backend Interaction**: Sending a PATCH or PUT request to the backend API endpoint (`/api/notes/:noteId`) with the updated note data.
- **Feedback to User**: Providing feedback to users confirming successful updates or handling errors if the update process fails.

Example Description:
"Edit Notes: Users can modify existing notes by accessing an edit form pre-filled with the current note content. Changes are sent to the server via a PATCH request to update the note in the database. Users receive confirmation of successful updates or error messages if updates are unsuccessful."

### 3. Delete Notes

Deleting notes allows users to remove unwanted entries from their collection. This functionality typically involves:

- **Confirmation Prompt**: Asking users to confirm their intention to delete the note before proceeding.
- **Backend Interaction**: Sending a DELETE request to the backend API endpoint (`/api/notes/:noteId`) to delete the specified note.
- **Feedback to User**: Displaying a confirmation message upon successful deletion or handling errors gracefully if deletion fails.

Example Description:
"Delete Notes: Users can remove unwanted notes by confirming deletion through a prompt. The application sends a DELETE request to the server, which removes the note from the database. Users receive confirmation of successful deletion or error messages if deletion encounters issues."

### Implementation Note

- **State Management**: Utilize React's state management (e.g., useState, useContext, Redux) to manage the note data within the application.
- **User Interface**: Design intuitive user interfaces (UI) with forms, buttons, and dialogs that facilitate note creation, editing, and deletion.
- **Error Handling**: Implement robust error handling mechanisms to provide feedback to users when operations fail due to network issues or server errors.

