const cartArr = JSON.parse(localStorage.getItem("cartArr")) || [];
const cartListEl = document.querySelector(".cart-products")



function cartRender(arr, parent){
    parent.innerHTML = arr
    .map(
        (product) =>`
        
        <li class="cart-card">

          <div class="cart-card-left">

            <div class="cart-img-wrapper">
              <img class="cart-img" src="${product.imgs[0]}" alt="">
            </div>

            <div class="cart-info">
              <h2 class="cart-product-title">${product.title}</h2>

              <div class="cart-texts">
                <p class="cart-text">Size: Large</p>
                <p class="cart-text">Color: White</p>
              </div>

              <p class="cart-price">$${product.price}</p>
            </div>

          </div>

          <div class="cart-card-right">

            <button class="cart-delete-btn">
              🗑
            </button>

            <div class="cart-quantity">

              <button class="cart-quantity-btn">−</button>

              <p class="cart-quantity-count">1</p>

              <button class="cart-quantity-btn">+</button>

            </div>

          </div>

        </li>
        `
    ).join("")

    
}

cartRender(cartArr, cartListEl);

document.addEventListener("click", (e) => {

    if(e.target.classList.contains("cart-delete-btn")){

        const index = e.target.dataset.index

        cartArr.splice(index, 1)

        localStorage.setItem("cartArr", JSON.stringify(cartArr))

        cartRender(cartArr, cartListEl)
    }

})