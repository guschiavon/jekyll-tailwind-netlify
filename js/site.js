// Navigation
// Burger Menu
const burger = document.getElementById('burger')
const navMenu = document.querySelector('.nav-bar-menu')
burger.addEventListener('click', function (){
  this.classList.toggle('open')
  navMenu.classList.toggle('menu-active')
})

// Chat bubble

// const chatBubble = document.getElementById('chat-bubble');
// const chatMenu = document.querySelector('.chat-menu');
// chatBubble.addEventListener('click', function () {
//   this.classList.toggle('active');
//   chatMenu.classList.toggle('open');
// });

