const BASE_URL = "https://shop-co-backend-jsd9.onrender.com";

const firstNameEl = document.querySelector("#firstname");
const lastNameEl = document.querySelector("#lastname");
const form = document.querySelector("form");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const checkpasswordEl = document.querySelector("#checkpassword");
const roleEl = document.querySelector("#role");
const submitBtn = document.querySelector("#submit");

async function register(firstName, lastName, email, password, role) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        role,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (
      firstName.value.trim() === "" ||
      lastName.value.trim() === ""||
      email.value.trim()  === "" ||
      password.value.trim() === "" ||
      role.value.trim() === ""
    ) {
      iziToast.error({
        title: "Notoldi!",
        message: "Hamma inputlarni to‘ldiring",
        onOpening: function () {
          submitBtn.style.opacity = "1";
          submitBtn.textContent = "Create new account";
          submitBtn.disabled = false;
        },
      });

      return;
    }

    if (!email.endsWith("@gmail.com")) {
      iziToast.error({
        title: "Noto‘g‘ri!",
        message: "Email xato kiritilgan",
        onOpening: function () {
          submitBtn.style.opacity = "1";
          submitBtn.textContent = "Create new account";
          submitBtn.disabled = false;
        },
      });

      return;
    }

    if (password.length < 6) {
      iziToast.error({
        title: "Xatolik!",
        message: "Parol 6 tadan ko‘p bo‘lishi kerak",
        onOpening: function () {
          submitBtn.style.opacity = "1";
          submitBtn.textContent = "Create new account";
          submitBtn.disabled = false;
        },
      });

      return;
    }

    if (data?.id) {
      iziToast.success({
        title: "Tayyor!",
        message: "Ro‘yxatdan o‘tildi",
        onOpening: function () {
          submitBtn.style.opacity = "1";
          submitBtn.textContent = "Create new account";
          submitBtn.disabled = false;
        },
      });

      window.location.href = "/pages/login.html";
    } else {
      iziToast.warning({
        title: "Xatolik!",
        message: "Bu аккаунт bor",
        onOpening: function () {
          submitBtn.style.opacity = "1";
          submitBtn.textContent = "Create new account";
          submitBtn.disabled = false;
        },
      });
    }
  } catch (error) {
    console.log(error);

    iziToast.error({
      title: "Server error",
      message: "Qaytadan urinib ko‘ring",
      onOpening: function () {
        submitBtn.style.opacity = "1";
        submitBtn.textContent = "Create new account";
        submitBtn.disabled = false;
      },
    });
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();



  register(
    firstNameEl.value.trim(),
    lastNameEl.value.trim(),
    emailEl.value.trim(),
    passwordEl.value.trim(),
    roleEl.value.trim()
  );

  
});
console.log(firstNameEl);
console.log(lastNameEl);
console.log(emailEl);
console.log(passwordEl);
console.log(roleEl);