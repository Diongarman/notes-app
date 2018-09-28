import {createNote} from './notes.js'
import {setFilters} from './filters.js'
import {renderNotes} from './views.js'




//initializer
renderNotes()

document.querySelector('#create-note').addEventListener('click', (e) => {

    const id = createNote()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    }) 
    renderNotes()
    
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
} )

window.addEventListener('storage', (e) => {

    if (e.key === 'notes') {
        renderNotes()  
    }
      
  });


//Comment
//Notice the use of the objects given by the WebAPI: document, window and location. Consider how you could write sopisticated
//programs based around these objects.

//"I could use that" approach to little bits of code of others. Rather than 
//trying to write it yourself as a challenge. i.e. don't reivent the wheel


//Keep template functionality, requires good abstraction.




