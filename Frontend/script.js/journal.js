const form = document.getElementById("journalForm");
const titleInput = document.getElementById("noteTitle");
const textInput = document.getElementById("noteText");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");

let notes = [];

const username = "suraj123";

async function loadNotes() {
    try {
        const response = await fetch(`http://localhost:3000/journal/${username}`);

        if (!response.ok) {
            throw new Error("Failed to fetch journals");
        }

        const data = await response.json();

        notes = data.map(note => ({
            id: note.id,
            title: note.title,
            text: note.note,
            timestamp: new Date(note.created_at).toLocaleString(),
            completed: false
        }));

        renderNotes();

    } catch (err) {
        console.error(err);
        notesContainer.innerHTML =
            "<p class='empty-state'>Unable to load journals.</p>";
    }
}

function renderNotes() {

    if (notes.length === 0) {

        notesContainer.innerHTML =
            "<p class='empty-state'>No notes yet. Start writing your first one.</p>";

        noteCount.textContent = "0 notes";

        return;
    }

    noteCount.textContent =
        `${notes.length} note${notes.length > 1 ? "s" : ""}`;

    notesContainer.innerHTML = notes.map((note, index) => `

        <article class="note-item ${note.completed ? "completed" : ""}">

            <div class="note-meta">
                ${note.timestamp}
            </div>

            <div class="note-editable">

                <h4
                    contenteditable="true"
                    data-field="title"
                    data-index="${index}">
                    ${note.title}
                </h4>

                <p
                    contenteditable="true"
                    data-field="text"
                    data-index="${index}">
                    ${note.text}
                </p>

            </div>

            <div class="note-actions">

                <label class="check-label">

                    <input
                        type="checkbox"
                        ${note.completed ? "checked" : ""}
                        data-index="${index}">

                    <span>Completed</span>

                </label>

                ${
                    note.completed
                    ?
                    `<button
                        class="delete-btn"
                        data-index="${index}">
                        Delete
                    </button>`
                    :
                    ""
                }

            </div>

        </article>

    `).join("");
        document.querySelectorAll(".check-label input").forEach(input => {

        input.addEventListener("change", function () {

            const index = Number(this.dataset.index);

            notes[index].completed = this.checked;

            renderNotes();

        });

    });

 document.querySelectorAll(".delete-btn").forEach(button => {

    button.addEventListener("click", async function () {

        const index = Number(this.dataset.index);

        const id = notes[index].id;

        try {

            const response = await fetch(`http://localhost:3000/journal/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            await loadNotes();

        } catch (err) {

            console.error(err);
            alert("Failed to delete journal.");

        }

    });

});

}

async function saveNote() {

    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    if (!title || !text) return;

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

        if (!response.ok) {

            alert(data.message);

            return;

        }

        form.reset();

        titleInput.focus();

        await loadNotes();

    } catch (err) {

        console.error(err);

        alert("Failed to save journal.");

    }

}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    saveNote();

});

titleInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        textInput.focus();

    }

});

textInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        saveNote();

    }

});

loadNotes();