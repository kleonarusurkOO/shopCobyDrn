const form = document.querySelector(".form");
const price = document.querySelector(".price");
const title = document.querySelector(".title");
const size = document.querySelector(".size");
const colors = document.querySelector(".colors");
const images = document.querySelector(".file");
const type = document.querySelector(".type");
const category = document.querySelector(".category");
const description = document.querySelector(".description");

const editTitle = document.querySelector(".edit-title")
const editPrice = document.querySelector(".edit-price")
const editColors = document.querySelector(".edit-colors")
const editModal = document.querySelector(".edit-modal")
const editForm = document.querySelector(".edit-form")

let editItemId = null

const baseUrl = "https://shop-co-backend-k5f0.onrender.com";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDVjODM1ZGFlZDE3OGE1NTQyYzdlZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiYWRtaW4iLCJsYXN0TmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzgwNDc1NjUxLCJleHAiOjE3ODA1NjIwNTF9.9vp_fFxW-lVfCiU0uWEI9o7cfVJuTQ5xeIm6wUvUaag";

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addProduct();
});


async function addProduct() {
    try {
        const formData = new FormData();

        formData.append("title", title.value);
        formData.append("price", price.value);
        formData.append("size", size.value);
        formData.append("colors", colors.value);
        formData.append("type", type.value);
        formData.append("category", category.value);
        formData.append("description", description.value);
        formData.append("images", images.files[0]);

        const res = await fetch(`${baseUrl}/api/products/with-images`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            body: formData,
        });

        console.log(await res);

        if (!res.ok) {
            throw new Error("Qo'shilmadi, resda xatolik");
        }
    } catch (error) {
        console.log(error);
    }
}

const tableRow = document.querySelector(".table-row");

async function getProducts() {
  try {
    const res = await fetch(`${baseUrl}/api/products`);
    const data = await res.json();

    console.log(data);

    renderProducts(data);
  } catch (error) {
    console.log(error);
  }
}

getProducts();

function renderProducts(products) {
  tableRow.innerHTML = "";

  products.forEach((product, index) => {
    tableRow.innerHTML += `
  <div class="product-row">
    <p>${index + 1}</p>

    <div>
      <img src="${product.images[0]}" alt="${product.title}">
    </div>

    <p>${product.title}</p>

    <p>${product.price}$</p>

    <p class="discount">-${product.discount || 20}%</p>

    <div class="rate">
      <span>${product.rating || 5}</span>
      <i class="fa-solid fa-star"></i>
    </div>

    <div class="actions">
      <button class="edit-btn" onclick="editProduct('${product._id}')">
        <i class="fa-solid fa-pen"></i>
      </button>

      <button class="delete-btn" onclick="deleteProduct('${product._id}')">
  <i class="fa-solid fa-trash"></i>
</button
    </div>
  </div>
`;
  });

}


async function deleteProduct(id) {
  try {
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Mahsulot o'chirilmadi");
    }

    getProducts();
  } catch (error) {
    console.log(error);
  }
}
function editProduct(id) {
  editItemId = id;
  editModal.style.display = "flex";
}

editForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const res = await fetch(`${baseUrl}/api/products/${editItemId}`, {
    method: "PUT",
    headers: {
      "Content-type" : "application/json",
      Authorization: `Bearer ${TOKEN} `

    },
    body:JSON.stringify({
      "title":editTitle.value,
      "price":editPrice.value,
      "colors":editColors.value,
    })
  })
const data = await res.json()
console.log(data);
editForm.reset()
editModal.style.display = "none"
getProducts()


})