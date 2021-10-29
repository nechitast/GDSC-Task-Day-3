// This code is sourced from https://github.com/misaalanshori/GDSC-Website-List-Movie
async function getJSON() {
    const response = await fetch("dramas.json");
    const movieJSON = await response.json()
    return movieJSON
}

function renderList(json) {
    // this function takes the list template, duplicates it and then fills it with the data
    let itemCopy = document.getElementsByClassName("movieItem")[0].cloneNode(true);
    itemCopy.getElementsByClassName("loading")[0].classList.remove("loading")
    let tempHTML = "";
    json.forEach(movie => {
        itemCopy.getElementsByClassName("movieRank")[0].innerHTML = movie.rank
        itemCopy.getElementsByClassName("movieTitle")[0].innerHTML = movie.title
        itemCopy.getElementsByClassName("movieThumb")[0].src = movie.image
        tempHTML += "\n" + itemCopy.outerHTML
    });
    document.getElementById("movieList").innerHTML = tempHTML;
}

function processSearch(context) {
    // this is the function that gets called by the search bar
    let movieItems = document.getElementById("movieList").children
    let searchTerms = context.value.split(" ")
    if (context.value != "") {
        for (let index = 0; index < movieItems.length; index++) {
            const element = movieItems[index];
            let text = element.getElementsByClassName("movieTitle")[0].innerText
            if (searchTerms.every(term => text.toLowerCase().includes(term.toLowerCase()))) {
                element.style.display = "block"
            } else {
                element.style.display = "none"
            }
        }
    } else {
        for (let index = 0; index < movieItems.length; index++) {
            const element = movieItems[index]
            element.style.display = "block"
        }
    }
}

function renderModal(number, json) {
    let movieDat = json[number-1]
    document.getElementById("mvPoster").src=movieDat.image
    document.getElementById("mvTitle").innerHTML=movieDat.title
    document.getElementById("mvReleaseDate").innerHTML=movieDat.releasedate
    document.getElementById("mvGenre").innerHTML=movieDat.genre
    document.getElementById("mvRatingNum").innerHTML=movieDat.rating + "/10"
    document.getElementById("movieDesc").innerHTML=movieDat.desc
    document.getElementById("malpage").href=movieDat.link

    // This next part renders the star ratings, theres probably a better way. but whatever
    let starRating = document.getElementById("starRating")
    starRating.innerHTML = ""
    let starNum = movieDat.rating
    let currentStar = 0;
    while (currentStar < 10) {
        if (starNum - 1 > 0) {
            starRating.appendChild(fullstar.cloneNode())
            starNum -= 1
            currentStar += 1
        } else if (starNum == 1) {
            starRating.appendChild(fullstar.cloneNode())
            starNum -= 1
            currentStar += 1
        } else if (starNum > 0 && starNum < 1) {
            starRating.appendChild(halfstar.cloneNode())
            starNum = 0
            currentStar += 1
        } else {
            starRating.appendChild(emptystar.cloneNode())
            currentStar += 1
        }
    }
}

function openModal(context, modal) {
    // updates and opens the modal
    let itemNum = context.getElementsByClassName("movieRank")[0].innerHTML
    renderModal(itemNum, movieData)    
    modal.style.display = "block"
}


var movieData;
// Starting point for rendering the list
getJSON().then(retval => {
    movieData = retval
    renderList(retval)
})


// Stuff for the modal
var movieModal = document.getElementById("movieModal");
var span = document.getElementsByClassName("close")[0];
var fullstar = movieModal.getElementsByClassName("fullstar")[0].cloneNode(true)
var halfstar = movieModal.getElementsByClassName("halfstar")[0].cloneNode(true)
var emptystar = movieModal.getElementsByClassName("emptystar")[0].cloneNode(true)


// When the user clicks on (x), close the modal
span.onclick = function() {
    movieModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == movieModal) {
        movieModal.style.display = "none";
    }
}
