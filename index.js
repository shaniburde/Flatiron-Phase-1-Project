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

//render images

function renderImages(foodObj){
    console.log(foodObj)
    let getObj = document.querySelector('#detail-info')
    let title = document.createElement('h4')
        title.id = 'post-title'
    let caption = document.createElement('h6')
        caption.id = 'post-caption'
    let url = document.createElement('img')
        url.id = 'post-url'
    let likeButton = document.createElement('button')
        likeButton.id = 'post-likeButton'
    let comment = document.createElement('p')
        comment.id = 'post-comment'

    title.textContent = foodObj.title
    caption.textContent = foodObj.caption
    url.src = foodObj.url
    likeButton.textContent = "♡"
    //add event listener to turn the heart red
    comment.textContent = foodObj.comment

    getObj.append(title, caption, url, likeButton, comment)


}