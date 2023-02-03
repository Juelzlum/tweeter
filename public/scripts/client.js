/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*-- looping throught the tweets --*/
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const value = createTweetElement(tweet);
    $('#tweets-container').prepend(value);
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/*--building tweets dynamically-- */
const createTweetElement = function(tweet) {
  const time = timeago.format(tweet.created_at)
  const safeHTML = escape(tweet.content.text);
  const $tweet = `<article class= "bordertweet">
  <header class = "headertweet">
  <img class = "headeruserphoto" src = ${tweet.user.avatars} />
  <span class = "headerName">${tweet.user.name}</span>
  <span class = "headerusername"> ${tweet.user.handle}></span>
  </header>
  <p class = "tweetsentence"> ${safeHTML}</p>
  <span> </span>
  <footer class = "foottweet">
  <div class = "icons">  
    <div>   
     <a> ${time}</a>
    </div>
    <div>
        <i id="flag" class="fa-solid fa-flag"></i>
        <i id ="retweet" class="fa-solid fa-retweet"></i>
       <i id="heart" class="fa-solid fa-heart"></i>
    </div>
  </div>
  </footer>
  </article>`;
  return $tweet;
};
/* --using Ajax to fetch the tweet from /tweet server --*/
const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: 'GET',
    success: (tweets) => {
      console.log(tweets)
      renderTweets(tweets);
    }

  });
};
loadTweets();
/*-- handling the submit component and with error messages --*/
$(document).ready(function() {
  const $submitTweet = $('#submitTweet');
  $submitTweet.on('submit', function(event) {
    event.preventDefault();
    if ($("#tweet-text").val().length > 140) {
      $('.errormsg').html(`Error! The tweet exceeded 140 characters! Kthxbye! `);
    }
    else if ($("#tweet-text").val().length === 0) {
      $('.errormsg').html('The Tweet cannot be empty! Kthxbye!');
    } else {
      $('.errormsg').remove()
      $.post('/tweets', $(this).serialize()).then(function() {
        $("#tweet-text").val(null);
        loadTweets();
      });
    }
  });
})

