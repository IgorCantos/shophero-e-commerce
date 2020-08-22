(function () {

    document.addEventListener("DOMContentLoaded", init());
    
    function init() {
        function showHideCart() {
            const showCartBtn = document.querySelector("#show-cart-button");
            const hideCartBtn = document.querySelector(".hide-cart-button");
            
            showCartBtn.addEventListener('click', function() {
                document.querySelector('#cart-sidebar').style.display = 'block'; 
            });
            
            hideCartBtn.addEventListener('click', function() {
                document.querySelector('#cart-sidebar').style.display = 'none'; 
            });
        };
    
        function getItemInfo() {
            const addToCartBtn = document.querySelectorAll('.js-add-cart-btn');
    
            for (let i = 0; i < addToCartBtn.length; i++) {
                addToCartBtn[i].addEventListener('click', function() {
                    itemImage = addToCartBtn[i].parentNode.parentNode.querySelector(".js-item-image").getAttribute("src");
                    itemName = addToCartBtn[i].parentNode.querySelector(".js-item-name").innerText;
                    itemStars = addToCartBtn[i].parentNode.querySelector(".js-item-stars").getAttribute("src");
                    itemPrice = addToCartBtn[i].parentNode.querySelector(".js-item-price").innerText;
                    itemQuantity = addToCartBtn[i].parentNode.querySelector(".js-item-quantity").value;
                    
                    addCartItem();
                });
            }
        };
    
        function addCartItem() {
            let cartItemTemplate, insertCartItem;

            cartItemTemplate = 
            `
            <div class="cart-item">
                <figure class="cart-item-img">
                    <img src="${itemImage}" class="js-item-image" alt="Imagem da máquina de lavar">
                </figure>
                <div class="cart-item-info">
                    <a href="#" target="_blank" class="js-item-name">
                        ${itemName}
                    </a>
                    <figure>
                        <img src="${itemStars}" class="js-item-stars" class="js-item-stars" alt="Esse produto possui avaliação de 5 estrelas">
                    </figure>
                    <h3 class="js-item-price">${itemPrice}</h3>
                    <p>Em até 12x de R$ 489,92</p>
                    <input type="number" class="js-item-quantity" name="item_quantity" min="1" max="99" value="${itemQuantity}">
                    <a href="#" id="js-delete-item-btn" class="btn-primary">Excluir</a>
                </div>
            </div>
            `
            insertCartItem = document.querySelector(".cart-items-list");

            // Check if item already exists in the cart
            if (insertCartItem.innerHTML.indexOf(itemName) != -1) {
                alert('Este item já existe no seu carrinho.')
                return;
            } else {
                insertCartItem.insertAdjacentHTML('afterbegin', cartItemTemplate);
            }
            
            updateCartTotal();
            deleteCartItem();
        };
    
        function deleteCartItem() {
            const deleteItemBtn = document.querySelector("#js-delete-item-btn");
    
            deleteItemBtn.addEventListener('click', function() {
                deleteItemBtn.parentNode.parentNode.remove();
                updateCartTotal();
            });
        };

        function updateCartTotal() {
            let allCartItems, cartTotal;
            
            cartTotal = 0;
            allCartItems = document.querySelector(".cart-items-list").children;

            for (let i = 0; i < allCartItems.length; i++) {
               let cartItem, cartItemPrice;

                cartItem = allCartItems[i];

                cartItemPrice = cartItem.querySelector(".js-item-price").innerText;
                cartItemPrice = getMoney(cartItemPrice);
                formatMoney = formatReal(cartItemPrice)
                toNumber = formatMoney;
                cartItemQuantity = cartItem.querySelector(".js-item-quantity").value;
                
                cartTotal = cartTotal + (toNumber * cartItemQuantity);
            }

            document.querySelector('#cart-total').innerHTML = '<strong>Total</strong>: ' + 'R$ ' + cartTotal;
        };

        function getMoney(str) {
            return parseInt(str.replace(/[\D]+/g,''));
        }

        function formatReal(int) {
            var tmp = int + '';
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");

            if (tmp.length > 6) {
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            return tmp;
        }

        showHideCart();
        getItemInfo();
    };

})();