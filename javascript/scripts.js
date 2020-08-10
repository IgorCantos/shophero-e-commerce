var cartIcon = document.querySelector("#cart-button");

cartIcon.addEventListener('click', function() {
    document.querySelector('#cart-sidebar').style.display = 'block'; 
})

var cartClose = document.querySelector(".cart-sidebar-close");

cartClose.addEventListener('click', function() {
    document.querySelector('#cart-sidebar').style.display = 'none'; 
})

