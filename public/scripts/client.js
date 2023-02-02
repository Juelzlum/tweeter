/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const renderTweets =  function(tweets) {
for(let tweet in tweets) {
  const value = createTweetElement(tweets[tweet])
  $('.tweets-container').append(value)
}
}

const createTweetElement = function(obj) {
  const $tweet = `<article class= "bordertweet>
  <header class = "headertweet">
  <img class = "headeruserphoto" src = ${tweet.user.avatars}></img>
  <span class = "headerName">${tweet.user.name}</span>
  <span class = "headerusername"> ${tweet.user.handle}></span>
  </header>
  <p class = "tweetsentence"> ${tweet.content.text}</p>
  <span> </span>
  <footer class = "foottweet">
  <a> ${timeago.format(tweet.created_at)}</a>
  <div class = "icons">     
    <button id= "btn" > <i id="flag" class="fa-solid fa-flag"></i></button>
    <button id= "btn"> <i id ="retweet" class="fa-solid fa-retweet"></i><button>
    <button> id= "btn"<i id="heart" class="fa-solid fa-heart"></i></button>
  </div>
  </footer>
  </article>
  return $tweet`
}

const loadTweets = function() {
  $.ajax({
    url: "/tweets", 
    method: 'GET', 
    dataType: 'json', 
    success: (tweets)=> {
      renderTweets(tweets)
    }

  })
}
loadTweets()

$document.ready(function(){

const $submitTweet = $('#submitTweet')
$submitTweet.on('submit', function (event){
  event.preventDefault()
  console.log( $( this ).serialize());
  if($("#tweet-text").val().length > 140) {
    alert(`Error! The tweet exceeded 140 characters!`)
  }
  else if($("#tweet-text").val().length === 0){
    alert('The Tweet cannot be empty!')
  }
  
})
})
// const $tweet = createTweetElement(Data)
// console.log($tweet)
