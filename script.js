// Linked List Node
class Node {
    constructor(date, note) {
        this.date = date;
        this.note = note;
        this.next = null;
    }
}

// Linked List class
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add new note
    add(date, note) {
        const newNode = new Node(date, note);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    // Remove note by index
    removeAt(index) {
        if (index < 0 || index >= this.size) return;

        let current = this.head;
        let previous;
        if (index === 0) {
            this.head = current.next;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.size--;
    }

    // Get all notes as an array
    toArray() {
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current);
            current = current.next;
        }
        return arr;
    }
}

const notesLinkedList = new LinkedList();
const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
document.getElementById('date').value = today;

// Handle form submission
document.getElementById('noteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the date and note values from the form
    const date = document.getElementById('date').value;
    const note = document.getElementById('note').value;

    // Add the new note to the linked list
    notesLinkedList.add(date, note);

    // Clear the input fields
    document.getElementById('date').value = today;
    document.getElementById('note').value = '';

    // Update the displayed notes list
    updateNotesList();
});

document.getElementById('showDataButton').addEventListener('click', function() {
    var button = document.getElementById('showDataButton');
    const dataContainer = document.getElementById('dataContainer');

    // Toggle visibility of data container
    if (dataContainer.style.display === 'none') {
        dataContainer.style.display = 'block';
        updateNotesList(); // Update list when showing data
    } else {
        dataContainer.style.display = 'none';
    }

    // Change inner text
    button.innerText = dataContainer.style.display === 'none' ? 'Show All Data' : 'Hide Data';
});

// Function to update the notes list on the page
function updateNotesList() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // Clear the current list
    const noDataFound = document.getElementById('noDataFound');
    noDataFound.style.display = 'none';

    // Convert the linked list to an array and display the notes
    const notesArray = notesLinkedList.toArray();
    if (notesArray.length === 0) {
        noDataFound.style.display = 'block';
    } else {
        notesArray.forEach((note, index) => {
            const li = document.createElement('li');
            li.textContent = `${note.date}\n\t${note.note}`;

            // Create the remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Delete';
            
            // Add confirmation before deletion
            removeButton.addEventListener('click', function() {
                const confirmation = confirm("Are you sure you want to delete this note?");
                if (confirmation) {
                    notesLinkedList.removeAt(index);  // Remove the note at this index
                    updateNotesList();  // Re-render the list after removal
                }
            });

            // Append the remove button to the list item
            li.appendChild(removeButton);
            notesList.appendChild(li);
        });
    }
}