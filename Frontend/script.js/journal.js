        const form = document.getElementById('journalForm');
        const titleInput = document.getElementById('noteTitle');
        const textInput = document.getElementById('noteText');
        const notesContainer = document.getElementById('notesContainer');
        const noteCount = document.getElementById('noteCount');

        const STORAGE_KEY = 'mindmate-journal-notes';
        let notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        function saveNotes() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        }

        function renderNotes() {
            if (notes.length === 0) {
                notesContainer.innerHTML = '<p class="empty-state">No notes yet. Start writing your first one.</p>';
                noteCount.textContent = '0 notes';
                return;
            }

            noteCount.textContent = `${notes.length} note${notes.length > 1 ? 's' : ''}`;
            notesContainer.innerHTML = notes.map((note, index) => `
                <article class="note-item ${note.completed ? 'completed' : ''}">
                    <div class="note-meta">${note.timestamp}</div>
                    <div class="note-editable">
                        <h4 contenteditable="true" data-field="title" data-index="${index}">${note.title}</h4>
                        <p contenteditable="true" data-field="text" data-index="${index}">${note.text}</p>
                    </div>
                    <div class="note-actions">
                        <label class="check-label">
                            <input type="checkbox" ${note.completed ? 'checked' : ''} data-index="${index}">
                            <span>Completed</span>
                        </label>
                        ${note.completed ? `<button type="button" class="delete-btn" data-index="${index}">Delete</button>` : ''}
                    </div>
                </article>
            `).join('');

            document.querySelectorAll('.check-label input').forEach(input => {
                input.addEventListener('change', function () {
                    const index = Number(this.getAttribute('data-index'));
                    notes[index].completed = this.checked;
                    saveNotes();
                    renderNotes();
                });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const index = Number(this.getAttribute('data-index'));
                    notes.splice(index, 1);
                    saveNotes();
                    renderNotes();
                });
            });

            document.querySelectorAll('.note-editable h4, .note-editable p').forEach(element => {
                element.addEventListener('blur', function () {
                    const index = Number(this.getAttribute('data-index'));
                    const field = this.getAttribute('data-field');
                    const value = this.textContent.trim();

                    if (!value) {
                        this.textContent = field === 'title' ? 'Untitled Note' : 'Write your note here...';
                    }

                    notes[index][field] = this.textContent.trim();
                    saveNotes();
                    renderNotes();
                });
            });
        }

   async function saveNote() {
    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    if (!title || !text) return;

    // Temporary username (we'll improve this later)
    const username = "suraj123";

    try {
        const response = await fetch("http://localhost:3000/journal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                title,
                note: text
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);

            const now = new Date();
            const timestamp = now.toLocaleString();

            // Keep the UI working
            notes.unshift({
                title,
                text,
                timestamp,
                completed: false
            });

            saveNotes();
            renderNotes();

            form.reset();
            titleInput.focus();

        } else {
            alert(data.message);
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            saveNote();
        });

        titleInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                textInput.focus();
            }
        });

        textInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                saveNote();
            }
        });

        renderNotes(); 