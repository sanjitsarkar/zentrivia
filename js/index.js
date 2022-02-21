const questionOptionButton = document.querySelector('div.options');
console.log(questionOptionButton);
questionOptionButton.addEventListener('click', function(e) {
    console.log(e.target.tagName)
    if(e.target.tagName==='BUTTON') 
    window.location.href = "result.html";
})