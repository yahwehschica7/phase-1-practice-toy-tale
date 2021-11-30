let addToy = false;

const toyCollection = document.querySelector("#toy-collection")
const newToyForm = document.querySelector(".add-toy-form")
const likeBtn = document.getElementsByClassName("like-btn")

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    getToys()
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    };
  });  
});


function getToys() {
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => {
      toys.map(toy => createToyCard(toy))
    })
}


function createToyCard(toy) {
    const toyCard = `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} </p>
    <button class="like-btn" id="${toy.id}">Like</button>
  </div>
    `
    toyCollection.innerHTML += toyCard
}

// *** All of the above works. Below is the POST***

function postNewToy(e) {
  // e.preventDefault()

  let newToyName = newToyForm.name.value
  let newToyUrl = newToyForm.image.value
  
  const newToy = {
    name: newToyName,
    image: newToyUrl,
    likes: 0,
  }
    fetch("http://localhost:3000/toys",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
      },
        body: JSON.stringify(newToy),
    })
      .then(res => res.json())
      .then(newToy => postNewToy(newToy));
      // newToyForm.reset 
    }

   
  
  newToyForm.addEventListener("submit", postNewToy)
  
    
  function updateLikes() {
    likeBtn.addEventListener("click", (e) => {
      if (e.target.className === "like-btn") {
      let currentLikes = parseInt(e.target.previousSibling.innerHTML)
      let newLikes = currentLikes + 1
      e.target.previousSibling.innerHTML = newLikes + "Likes"
      }
    })    
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
      },
      body: JSON.stringify({likes: newLikes}),
    })
  }
  

  
       
 
  





  











  