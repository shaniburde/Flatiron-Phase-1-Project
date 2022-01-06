init()


const empty_heart = "♡"
const full_heart ="❤️"
function init(){
    getAllFood()
}

//fetch foods
function getAllFood(){
    fetch('http://localhost:3000/foods')
    .then(res=>res.json())
    .then(foods=>foods.forEach(renderImages))
}

// POST request fetch function
function newPost(newFoodObj) {
    fetch('http://localhost:3000/foods', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFoodObj)
    })
    .then(res => res.json())
    .then(newFoodObj => console.log(newFoodObj));
}

//DELETE request
function deletePhoto(id){
    fetch(`http://localhost:3000/foods/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(food => {console.log(food)})
}
//PATCH request
function patchLike(foodObj) {
    fetch(`http://localhost:3000/foods/${foodObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(foodObj)
    })
    .then(res => res.json())
    .then(food => {console.log(food)})
}

// render images

function renderImages(foodObj){
    let getObj = document.querySelector('#detail-info')

    let imgCard = document.createElement('card')
    imgCard.className = 'card'

    let title = document.createElement('h4')
        title.id = 'post-title'
        title.textContent = foodObj.title

    let caption = document.createElement('h6')
        caption.id = 'post-caption'
        caption.textContent = foodObj.caption

    let url = document.createElement('img')
        url.id = 'post-url'
        url.src = foodObj.url
        url.className = 'image-url'


    let deleteDiv = document.createElement('div')
        deleteDiv.className = 'delet-btn-div'
    let deleteButton = document.createElement('button')
        deleteButton.id = 'deleteButton'
        deleteButton.innerText = "X"
        deleteDiv.append(deleteButton)
//delete function
        deleteButton.addEventListener('click', (e)=> handleDelete(foodObj, imgCard))

        function handleDelete(foodObj, imgCard){
            imgCard.remove()
            // console.log(imgCard)
            deletePhoto(foodObj.id)
        }
    

    let likeButton = document.createElement('button')
    let likeDiv = document.createElement("div")
        likeDiv.appendChild(likeButton)
        likeButton.id = 'post-likeButton'
        likeButton.textContent = foodObj.like

        likeButton.addEventListener('click', (e)=> handleLike(e))

    //Handle like function
    function handleLike(e){
        if(e.target.textContent === empty_heart){
            e.target.textContent = full_heart;
            foodObj.like = "❤️";
            patchLike(foodObj)
        } else {
            e.target.textContent = empty_heart;
            foodObj.like = "♡";
            patchLike(foodObj)
        }
        
    }

        
    let showComments = document.createElement('dl')
    showComments.id = "comments"
    console.log(foodObj.comments)
    for(var key in foodObj.comments){
        console.log(foodObj.comments[key])
        const dt = document.createElement('dt')
        dt.textContent = foodObj.comments[key]
        showComments.append(dt)
        
    }
    
    imgCard.append(deleteDiv, title, caption, url, likeDiv, showComments)
    getObj.append(imgCard)
    displayLikedPosts(imgCard)
    displayAllPosts(imgCard)

   
    // display all posts
    function displayAllPosts() {
        let allPostsLink = document.querySelector('#display-all-posts')
        allPostsLink.addEventListener('click', () => {
               imgCard.style.display = 'inline-grid'
            }
        )}

    // display only liked Posts
    function displayLikedPosts(imgCard) {
        let likedPostsLink = document.querySelector('#display-liked-posts')
        likedPostsLink.addEventListener("click", () => {
            if(likeButton.textContent === full_heart) {
                imgCard.style.visibility = "visible";
            } else if(likeButton.textContent === empty_heart){
                imgCard.style.display = "none";
            }
        }) 
}

  
}



//side nav bar

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "white";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
  }


//handle form submit
const form = document.getElementById("new-post")
form.addEventListener("submit",  (e) => {
    e.preventDefault();
    const titleInput = e.target["input-title"].value
    const captionInput = e.target["input-caption"].value
    const imageInput = e.target["input-url"].value
    const commentInput = e.target["input-comment"].value

    
    const newFoodObj = {
      title: titleInput,
      caption: captionInput,
      url: imageInput,
      like: "♡",
      comments: [commentInput]
    }
renderImages(newFoodObj);
newPost(newFoodObj);
e.target.reset();
})


//toggle form button
function toggleForm() {
    let newPostForm = document.getElementById("new-post-form");
    if (newPostForm.style.display === "none") {
        newPostForm.style.display = "block";
    } else {
        newPostForm.style.display = "none";
    }
  }

//change button textContent
const toggleButton = document.querySelector("#toggle-new-post-button")
toggleButton.addEventListener("click", () => {
    let newText = toggleButton.innerText === 'Click here to create a new post' ? 'Hide New Post Form':'Click here to create a new post';
    toggleButton.innerText = newText
});
  
