const params = new URLSearchParams(window.location.search)
const id = params.get("id")
let commentlistEl = document.querySelector(".comments__list")
const baseUrl = 'https://shop-co-backend-k5f0.onrender.com'

const cardsEl = document.querySelector(".details__wrapper")

let DataArr = null

async function getProductById(productId) {
    const res = await fetch(
        `${baseUrl}/api/products/${productId}`,
        {
            method: "GET",
        }
    );

    const data = await res.json();

    console.log(res);

    DataArr = data;

    console.log(data)
    console.log(data.comments)

    renderComments(data.comments, commentlistEl)

    if (id === data._id) {
        productRender(data, cardsEl);
        console.log(data)
    }
}

getProductById(id);

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("size-btn")) {

        document.querySelectorAll(".size-btn").forEach((btn) => {
            btn.classList.remove("active-size")
        })

        e.target.classList.add("active-size")
    }
})

function Renderimgs(imgArr) {
    return imgArr.map((img) => {
        return `
       <li class="minimg__item">
                          
       <img src="${img}" alt="img" class="miniimg">
    </li>
      `
    }).join("")
}

function renderColors(colorsArr) {
    return colorsArr.map((color, index) => {
        return `
        <input
            hidden
            class="radio-input"
            name="color"
            type="radio"
            id="color${index}"
        >

        <label 
            class="color-label" 
            for="color${index}" 
            style="background-color: ${color}">
        </label>
        `
    }).join("")
}

function renderSizes(sizeArr) {
    return sizeArr.map((size, index) => {
        return `
        <button class="size-btn ${index === 0 ? "active-size" : ""}">
            ${size}
        </button>
        `
    }).join("")
}

function productRender(obj, parent) {
    parent.innerHTML = `
       <div class="imgs-wrapper">
                <div class="mini-imgs__wrapper">
                    <ul class="minimg__list">
                      ${Renderimgs(obj.images)}
                    </ul>
                </div>

                <div class="mainimg__wrapper">
                    <img class="maximg" src="${obj.images[0]}" alt="">
                </div>
            </div>
            <div class="info-wrapper">
                <div class="product-card">
  <div class="product-content">

    <h1 class="product-title">${obj.title}</h1>

    <div class="rating-box">
      <div class="stars">
        <i class="star-icon">★</i>
        <i class="star-icon">★</i>
        <i class="star-icon">★</i>
        <i class="star-icon">★</i>
        <i class="star-icon">★</i>
      </div>

      <p class="rating-text">4.5/5</p>
    </div>

    <div class="price-box">
      <p class="current-price">$${obj.price}</p>
      <p class="old-price">$300</p>
      <p class="discount-price">-40%</p>
    </div>

    <p class="product-description">
     ${obj.description}
    </p>

    <div class="line"></div>

    <div class="colors-wrapper">
    <p class="colors-title">Select Colors</p>

    <div class="colors">
       ${renderColors(obj.colors)}
    </div>
</div>

    <div class="line"></div>

    <div class="sizes-section">
      <p class="section-title">Choose Size</p>

      <div class="sizes-box">
       ${renderSizes(obj.size)}
      </div>
    </div>

    <div class="line"></div>

    <div class="bottom-box">

      <div class="counter-box">
        <button class="counter-btn">−</button>
        <p class="counter-number">1</p>
        <button class="counter-btn">+</button>
      </div>

    
      <button class="cart-btn add-cart-btn" onclick="window.location.href='/pages/cart.html'">
        Add to Cart
      </button>
    </div>

  </div>
</div>

    
    `;

    //add to cart
    let cartBTN = document.querySelector(".cart-btn")

    cartBTN.addEventListener("click", () => {

        let cartArr = JSON.parse(localStorage.getItem("cartArr")) || []

        const product = {
            imgs: obj.images,
            title: obj.title,
            size: obj.size,
            colors: obj.colors,
            price: obj.price,
        }

        cartArr.push(product)

        localStorage.setItem("cartArr", JSON.stringify(cartArr))

    })
}

const tabs = document.querySelectorAll(".tab");
const contentTabsEl = document.querySelectorAll(".content-tab");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const tabId = tab.dataset.id

        tabs.forEach((tab) => {
            tab.classList.remove("active");
        });

        tab.classList.add("active");

        contentTabsEl.forEach((contentTab) => {
            contentTab.classList.remove("active");
        });

        document.getElementById(tabId).classList.add("active");
    });
});


function renderComments(arr, parent) {

    if (!arr) {
        parent.innerHTML = "<p>No comments</p>"
        return
    }

    parent.innerHTML = arr.map(
        (comment) => `
        <li class="review-card">

            <div class="review-stars">
                ${comment.userRate}
            </div>

            <div class="review-user">
                <p class="review-name">
                    ${comment.user}
                </p>
            </div>

            <p class="review-text">
                ${comment.comment}
            </p>

        </li>
      `
    ).join("")


    //add comment

    const addCommentBtn = document.querySelector(".add-comment-btn");
    const addCommentModalEl = document.querySelector(".add-comment-modal");
    const commentCloseBtn = document.querySelector(".comment-close-btn");
    const userCommentEl = document.querySelector(".user-comment-input");
    const userRateEl = document.querySelector(".user-rate-input");



    addCommentBtn.addEventListener("click", () => {

        addCommentModalEl.classList.add("active");

    });



    commentCloseBtn.addEventListener("click", () => {

        addCommentModalEl.classList.remove("active");

    });


    const token = localStorage.getItem("token") || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDVjODM1ZGFlZDE3OGE1NTQyYzdlZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiYWRtaW4iLCJsYXN0TmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzc5NDQ1NDEwLCJleHAiOjE3Nzk1MzE4MTB9.5gqyjcIKQt5o-Aji8wObHkdOgN0l5lwl3ei3NHkHnbA'
    async function addComment(productId) {


        const res = await fetch(
            `${baseUrl}/api/products/${productId}/comments`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({

                    userRate: userRateEl.value,

                    comment: userCommentEl.value,

                }),
            }
        );

        const data = await res.json();

        console.log(data);

    }


    addCommentModalEl.addEventListener("submit", (e) => {

        e.preventDefault();

        addComment(id);

    });
}


