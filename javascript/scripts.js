(function () {
    let itemImage, itemName, itemStars, itemPrice, itemQuantity, cartItemTemplate, insertCartItem;

    function showHideCart() {
        const showCartBtn = document.querySelector("#show-cart-button");
        const hideCartBtn = document.querySelector(".hide-cart-button");
        
        showCartBtn.addEventListener('click', function() {
            document.querySelector('#cart-sidebar').style.display = 'block'; 
        });
        
        hideCartBtn.addEventListener('click', function() {
            document.querySelector('#cart-sidebar').style.display = 'none'; 
        });
    }
    showHideCart()

    function getItemInfo() {

        const addToCartBtn = document.querySelectorAll('.js-add-cart-btn');

        for (let i = 0; i < addToCartBtn.length; i++) {
            addToCartBtn[i].addEventListener('click', function() {
                itemImage = addToCartBtn[i].parentNode.parentNode.querySelector(".js-item-image").getAttribute("src");
                itemName = addToCartBtn[i].parentNode.querySelector(".js-item-name").innerText;
                itemStars = addToCartBtn[i].parentNode.querySelector(".js-item-stars").getAttribute("src");
                itemPrice = addToCartBtn[i].parentNode.querySelector(".js-item-price").innerText;
                itemQuantity = addToCartBtn[i].parentNode.querySelector(".js-item-quantity").value;
                
                addItemToCart();
            });
        }
    };
    getItemInfo();

    function addItemToCart() {
        cartItemTemplate = 
        `
        <div class="cart-item">
            <figure class="cart-item-img">
                <img src="${itemImage}" alt="Imagem da máquina de lavar">
            </figure>
            <div class="cart-item-info">
                <a href="#" target="_blank">
                    ${itemName}
                </a>
                <figure>
                    <img src="${itemStars}" alt="Esse produto possui avaliação de 5 estrelas">
                </figure>
                <h3>${itemPrice}</h3>
                <input type="number" name="item_quantity" id="item_quantity" min="1" max="99" value="${itemQuantity}">
                <a href="#" id="js-delete-item-btn" class="btn-primary">Excluir</a>
            </div>                   
        </div>
        `
        insertCartItem = document.querySelector(".cart-items-list");
        insertCartItem.insertAdjacentHTML('afterbegin' , cartItemTemplate);

        deleteCartItem();
    }

    function deleteCartItem() {
        const deleteItemBtn = document.querySelector("#js-delete-item-btn");

        deleteItemBtn.addEventListener('click', function() {
            deleteItemBtn.parentNode.parentNode.remove();
        });
    }

})();