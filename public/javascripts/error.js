//* btn to collapse the flash error-msg displayed

var crossBtn = document.querySelector('.cross-btn')
var error = document.querySelector('.error')
crossBtn.addEventListener('click',()=>{
    error.style.display = 'none'
    console.log('clicked');
})