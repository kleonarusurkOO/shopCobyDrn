




//get products

async function getProducts() {
    const res = await fetch("https://shop-co-backend-k5f0.onrender.com/api/products",
        {
            method: "GET",

        },
    );
  
    const data = await res.json()
    console.log(res);
    productsRender(data, cardsEl);
    
}
getProducts();

const cardsEl = document.querySelector(".new__list")

function productsRender(arr,parent){
    parent.innerHTML = arr
  .map((product) => {
    return `
       
     <a href="/pages/details.html?id=${product._id}">
     <li class="new__item-card">
                            <div class="img__wrapper-new">
                                <img src="${product.images[0]}" alt="shirt" class="new__img">
                            </div>
                            <div class="item-info">
                                <p class="new-item-title">
                               ${product.title}
                            </p>
                            <div class="otzivi">
                                <ul class="icon__list">
                                <li class="icon__item"><i class="fa-solid fa-star star"></i></li>
                                <li class="icon__item"><i class="fa-solid fa-star star"></i></li>
                                <li class="icon__item"><i class="fa-solid fa-star star"></i></li>
                                <li class="icon__item"><i class="fa-solid fa-star star"></i></li>
                                <li class="icon__item"><i class="fa-solid fa-star star"></i></li>
                            </ul>
                            <p class="stars__count">${product.comment}</p>
                            </div>

                            <p class="new-price">$${product.price}</p>
                            </div>
                        </li></a>

    `;
  })
  .join("");
}

      /*<div class="card">
        <div class="card-img">
          <img src="${product.images[0]}" alt="" />
        </div>

        <h3>${product.title}</h3>

        <div class="rating">
          <div>
            <img src="./assets/stars.png" alt="" />
          </div>
          <span class="rate-text">${product.comment}</span>
        </div>

        <div class="price">
          <span class="new-price">${product.price}</span>
        </div>
      </div>*/


      


