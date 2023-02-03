
$(document).ready(function() {
  $('#tweet-text').keydown(function(){
    const currentCount =  $(this).val().length
    const counterEle = $(this).parent().children('div').children('.counter')
    const remainingCount = 140 - currentCount
   
    counterEle.text(remainingCount)
    if(remainingCount < 0) {
      counterEle.css({"color": "red"})
    }
    else{
      counterEle.css({"color": "whitesmoke"})
    }
  })
});



