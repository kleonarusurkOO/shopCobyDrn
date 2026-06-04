
const select2 = document.querySelector(".selection")

const search = document.querySelector(".header__input")
async function getProducts() {
    const res = await fetch("https://shop-co-backend-k5f0.onrender.com/api/products",
        {
            method: "GET",

        },
    );
  
    const data = await res.json()
    console.log(res);
    productsRender(data, cardsEl);
    
    console.log(data);

select2.addEventListener('change', function () {

  let sortedsel = data;

  if (select2.value === 'a-z') {
    sortedsel.sort((a, z) => z.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1);

  }

  else if (select2.value === 'z-a') {
    sortedsel.sort((a, z) => z.title.toLowerCase() > a.title.toLowerCase() ? 1 : -1);
  }

   else if (select.value === 'cheap') {
    sortedsel.sort((a, b) => (a.price || 0) - (b.price || 0));
  }


productsRender(sortedsel, cardsEl);


});

search.addEventListener('input', function () {

  const kichkina = search.value.toLowerCase();

  let serfiltered = data.filter(function (item) {
    return (item.title || "").toLowerCase().includes(kichkina);
  });

  productsRender(serfiltered, cardsEl);

});

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
                           
                            </div>

                            <p class="new-price">$${product.price}</p>
                            </div>
                        </li></a>

    `;
  })
  .join("");

  
}



 
