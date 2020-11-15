(function () {

    document.addEventListener("DOMContentLoaded", init());
    
    function init() {
        "use strict"

        function showCartSideBar() {
            const showCartBtn = document.querySelector("#show-cart-button");
        
            showCartBtn.addEventListener('click', () => {
                document.querySelector('#cart-sidebar').style.display = 'block'; 
            });
        };
        showCartSideBar();

        function hideCartSideBar() {
            const hideCartBtn = document.querySelector(".hide-cart-button");

            hideCartBtn.addEventListener('click', () => {
                document.querySelector('#cart-sidebar').style.display = 'none'; 
            });
        };
        hideCartSideBar();
    
        function getProductInfo() {
            const addProductToCartBtn = document.querySelectorAll('.js-add-cart-btn');
    
            for (let i = 0; i < addProductToCartBtn.length; i++) {
                addProductToCartBtn[i].addEventListener('click', () => {

                    let productImage = addProductToCartBtn[i].parentNode.parentNode.querySelector('.js-item-image').getAttribute('src'),
                        productName = addProductToCartBtn[i].parentNode.querySelector(".js-item-name").innerText,
                        productRatingStars = addProductToCartBtn[i].parentNode.querySelector(".js-item-stars").getAttribute("src"),
                        productPrice = addProductToCartBtn[i].parentNode.querySelector(".js-item-price").innerText,
                        productInstallment = addProductToCartBtn[i].parentNode.querySelector(".js-item-installment").innerText,
                        productQuantity = addProductToCartBtn[i].parentNode.querySelector(".js-item-quantity").value;
                    
                    FormatProductInfo(productImage, productName, productRatingStars, productPrice, productInstallment, productQuantity);
                });
            };
        };
        getProductInfo();
    
        function FormatProductInfo(image, name, rating, price, installment, quantity) {

            let cartProduct = `
                <div class="cart-item">
                    <figure class="cart-item-img">
                        <img src="${image}" class="js-cart-item-image" alt="${name}">
                    </figure>
                    <div class="cart-item-info">
                        <a href="#" target="_blank" class="js-cart-item-name">
                            ${name}
                        </a>
                        <figure>
                            <img src="${rating}" class="js-cart-item-stars" alt="Esse produto possui avaliação de 5 estrelas">
                        </figure>
                        <h3 class="js-cart-item-price">${price}</h3>
                        <p>${installment}</p>
                        <input type="number" class="js-cart-item-quantity" name="item_quantity" min="1" max="99" value="${quantity}" disabled="">
                        <a href="#" id="js-cart-delete-item-btn" class="btn-primary">Excluir</a>
                    </div>
                </div>
            `
            addProductToCart(cartProduct)
            updateCartTotal();
            deleteCartProduct();
        };

        function addProductToCart(product) {
            const cartProductsList = document.querySelector(".cart-items-list");
        
            // Check if product already exists on cart. If not, than add.
            if (cartProductsList.innerHTML.indexOf(product) != -1) {
                return alert('Este item já existe no seu carrinho.')
            } else {
                cartProductsList.insertAdjacentHTML('afterbegin', product);
                return alert('Produto adicionado ao seu carrinho.')
            }
        };
    
        function deleteCartProduct() {
            const deleteProductBtn = document.querySelector("#js-cart-delete-item-btn");
    
            deleteProductBtn.addEventListener('click', () => {
                deleteProductBtn.parentNode.parentNode.remove();
                updateCartTotal();
            });
        };

        function updateCartTotal() {

            let allProductsOnCart = document.querySelector(".cart-items-list").children,
                allCartProductsPrice = 0,
                cartTotal = 0;

            for (let i = 0; i < allProductsOnCart.length; i++) {

                let cartProduct = allProductsOnCart[i],
                    cartProductPrice = 0,
                    cartProductQuantity = 0;

                cartProductPrice = parseFloat(cartProduct.querySelector(".js-cart-item-price").innerText.replace("R$", "").replace(",", "").replace(".", ""));
                cartProductQuantity = cartProduct.querySelector(".js-cart-item-quantity").value;
                allCartProductsPrice += (cartProductPrice * cartProductQuantity);

                cartTotal = formatReal(allCartProductsPrice)
            }

            document.querySelector('#cart-total').innerHTML = '<strong>Total</strong>: ' + 'R$ ' + cartTotal;
        };

        // Author: Rodrigo Rodrigues
        // URL: https://pt.stackoverflow.com/a/198981

        function formatReal(int) {
            let tmp = int + '';
            let neg = false;
            if (tmp.indexOf("-") == 0) {
                neg = true;
                tmp = tmp.replace("-","");
            }

            if(tmp.length == 1) tmp = "0" + tmp

            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            if( tmp.length > 6)
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

            if( tmp.length > 9)
                tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2,$3");

            if( tmp.length > 12)
                tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2.$3,$4");

            if(tmp.indexOf(".") == 0) tmp = tmp.replace(".","");
            if(tmp.indexOf(",") == 0) tmp = tmp.replace(",","0,");

            return (neg ? '-' + tmp : tmp);
        };

    };

})();