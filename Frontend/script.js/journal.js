const form = document.getElementById("journalForm");
const titleInput = document.getElementById("noteTitle");
const textInput = document.getElementById("noteText");
const notesContainer = document.getElementById("notesContainer");
const noteCount = document.getElementById("noteCount");


const profileJournal = document.querySelector(".profile-journal");
const profileBtnJournal = document.querySelector(".profile-btn-journal");

profileBtnJournal.addEventListener("click", (e) => {

    e.stopPropagation();

    profileJournal.classList.toggle("active");

});

document.addEventListener("click", (e) => {

    if (!profileJournal.contains(e.target)) {

        profileJournal.classList.remove("active");

    }

});

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
            timestamp: new Date(note.created_at).toLocaleString()
        }));

        renderNotes();

    } catch (err) {
        console.error(err);
        notesContainer.innerHTML =
            "<p class='empty-state'>Unable to load journals.</p>";
    }
}

async function updateNote(id, title, text) {

    try {

        const response = await fetch(`http://localhost:3000/journal/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                note: text
            })

        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

    } catch (err) {

        console.error(err);
        alert("Failed to update journal.");

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

<article class="note-item">

    <div class="note-meta">
        📅 ${note.timestamp}
    </div>

    <div class="note-editable">

        <h4
            id="title-${note.id}"
            contenteditable="false">
            ${note.title}
        </h4>

        <p
            id="text-${note.id}"
            contenteditable="false">
            ${note.text}
        </p>

    </div>

    <div class="note-actions">

        <button
            class="edit-btn"
            data-id="${note.id}"
            data-index="${index}">
            ✏️ Edit
        </button>

        <button
            class="delete-btn"
            data-index="${index}">
            🗑️ Delete
        </button>

    </div>

</article>

`).join("");
  
// ===== EDIT JOURNAL =====
 
document.querySelectorAll(".edit-btn").forEach(button => {

    button.addEventListener("click", async function () {

        const id = Number(this.dataset.id);

        const note = notes.find(n => n.id === id);

        const title = document.getElementById(`title-${id}`);
        const text = document.getElementById(`text-${id}`);

        // EDIT MODE
        if (this.dataset.mode !== "edit") {

            title.contentEditable = "true";
            text.contentEditable = "true";

            title.focus();

            this.textContent = "💾 Save";
            this.dataset.mode = "edit";

            return;
        }

        // SAVE MODE

        title.contentEditable = "false";
        text.contentEditable = "false";

        note.title = title.textContent.trim();
        note.text = text.textContent.trim();

        await updateNote(
            note.id,
            note.title,
            note.text
        );

        this.textContent = "✏️ Edit";
        this.dataset.mode = "";

    });

});
    // ===== DELETE JOURNAL =====

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