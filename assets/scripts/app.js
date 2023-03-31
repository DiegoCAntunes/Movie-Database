const addMovieModal = document.getElementById('add-modal')
const startAddMovieButton = document.querySelector('header button')
const backdrop = document.getElementById('backdrop')
const cancelAddMovieButton = document.getElementsByClassName('btn btn--passive')[0]
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling
const userInputs = addMovieModal.getElementsByTagName('input')
const entryTextSection = document.getElementById('entry-text')
const deleteMovieModal = document.getElementById('delete-modal')

const movies = []

function changeBackdrop(){
    backdrop.classList.toggle('visible')
}

function updateUI(){
    if(movies.length === 0){
        entryTextSection.style.display = 'block'
    } else {
        entryTextSection.style.display = 'none'
    }
}

function renderNewMovieElement(id, title, imageUrl, rating){
    const newMovieElement = document.createElement('li')
    newMovieElement.className = 'movie-element'
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars </p>
    <div>
    `;
    const listRoot = document.getElementById('movie-list')
    listRoot.append(newMovieElement)
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
}

function deleteMovieHandler(movieId) {
    deleteMovieModal.classList.add('visible')
    changeBackdrop()
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive')
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')
    
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

    cancelDeletionButton.removeEventListener('click', cancelMovieDeletion)
    cancelDeletionButton.addEventListener('click', cancelMovieDeletion)
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId))
}

function cancelMovieDeletion(){
    changeBackdrop()
    deleteMovieModal.classList.remove('visible')
}

function deleteMovie(movieId) {
    let movieIndex = 0
    for(const movie of movies){
        if (movie.id === movieId){
            break
        }
        movieIndex++
    }
    movies.splice(movieIndex, 1)
    const listRoot = document.getElementById('movie-list')
    listRoot.children[movieIndex].remove()
    cancelMovieDeletion()
    updateUI()
}

function closeMovieModal(){
    addMovieModal.classList.remove('visible')
}

function showMovieModal(){
    addMovieModal.classList.add('visible')
    changeBackdrop()
}

function cancelMovieHandler(){
    closeMovieModal()
    clearMovieInput()
    changeBackdrop()
}

function clearMovieInput(){
    for (const usrInput of userInputs){
        usrInput.value = ''
    }
}

function backdropClickHandler() {
    closeMovieModal()
    cancelMovieDeletion()
    clearMovieInput()
}

function addMovieHandler() {
    const titleValue = userInputs[0].value
    const imageValue = userInputs[1].value
    const ratingValue = userInputs[2].value

    if(titleValue.trim() === ''|| imageValue.trim() === '' || ratingValue.trim() === ''|| +ratingValue < 1 || + ratingValue > 5){
        alert('Please enter valid values (ratings between 1 and 5')
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageValue,
        rating: ratingValue
    }
    movies.push(newMovie)
    console.log(movies)
    closeMovieModal()
    changeBackdrop()
    clearMovieInput()
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating)
    updateUI()
}

startAddMovieButton.addEventListener('click', showMovieModal)
backdrop.addEventListener('click', backdropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelMovieHandler)
confirmAddMovieButton.addEventListener('click',addMovieHandler)