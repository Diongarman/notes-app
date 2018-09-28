import {initializeEditPage, generateLastEdited } from './views'
import {updateNote, removeNote} from './notes'

//elements
const titleElement = document.querySelector('#note-title')
const lastEditElement = document.querySelector('#last-edited')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')

//Find note
const noteId = location.hash.substring(1)

initializeEditPage(noteId)




//Editing Events

titleElement.addEventListener('input', (e) => {
    
    const note = updateNote(noteId, {
        title: e.target.value
    })
    lastEditElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
    
})

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    lastEditElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
    
})

removeElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {

        initializeEditPage(noteId)
    }


  });