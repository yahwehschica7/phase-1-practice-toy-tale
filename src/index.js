let addToy = false;

const toyCollection = document.querySelector("#toy-collection")
const newToyForm = document.querySelector(".add-toy-form")


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
    const toyCard = document.createElement('div')
    toyCard.className = "card"

    const toyName = document.createElement("h2")
    toyName.innerText = toy.name 

    const toyImage = document.createElement("img")
    toyImage.src = toy.image
    toyImage.className = "toy-avatar"

    const toyLikes = document.createElement("p")
    toyLikes.innerText = `${toy.likes}  Likes`

    const likeBtn = document.createElement("button")
    likeBtn.innerText = `Like`
    likeBtn.setAttribute("id", toy.id) 
        
    toyCard.append(toyName, toyImage, toyLikes, likeBtn)
 
    toyCollection.append(toyCard) 
    likeBtn.addEventListener("click", (e) => {
      updateLikes(e)
    })
}

// *** All of the above works. Below is the POST***

function postNewToy(e) {
  
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
       
    }

  newToyForm.addEventListener("submit", postNewToy)
  
  function updateLikes(e) {
      console.log(e) 
      let currentLikes = parseInt(e.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1
      e.target.previousElementSibling.innerText = newLikes + "Likes"
     
     
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
      }, 
        body: JSON.stringify({
          "likes" : newLikes
        })
    })
      .then(res => res.json())
      .then(data => {
        newLikes = e.target.previousElementSibling.innerText
        console.log(data)
      })
  }


  

  
       
 
  





  











  