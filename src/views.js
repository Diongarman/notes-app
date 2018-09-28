import moment from 'moment'
import {getNotes, sortNotes} from './notes'
import {getFilters, setFilters} from './filters'

const generateNoteDom =  (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')


    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unamed note'
        
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //set up the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //set up status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')

    noteEl.appendChild(statusEl)

    return noteEl
}


const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    
    notesEl.innerHTML = ''
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const p = generateNoteDom(note)
            notesEl.appendChild(p)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = "No notes to show."
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }


};

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`


const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const lastEditElement = document.querySelector('#last-edited')
    const bodyElement = document.querySelector('#note-body')

    const notes = getNotes()
    //because is a binding this change is reflected in notes array
    const note = notes.find((note) => note.id === noteId)

    //redirect if note dne
    if (!note) {
        location.assign('/index.html')
    }

    //Pre-populate form
    titleElement.value = note.title
    bodyElement.value = note.body
    lastEditElement.textContent = generateLastEdited(note.updatedAt)
}

export {
    generateNoteDom,
    generateLastEdited,
    renderNotes,
    initializeEditPage
}