const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameEl = form.querySelector(".name").value.trim();
  const phoneEl = form.querySelector(".phone").value.trim();

  // Telegram API uchun kerakli ma’lumotlar
  const token = "8707182229:AAG_oakHBSGBMBQo2i2lPOC6uzWXnMWd_ng";
  const chat_id = "6212359776";
  const telegramApi = `https://api.telegram.org/bot${token}/sendMessage`;

  const text = `
📩 Yangi ariza!\n
👤 Ismi: ${nameEl}\n
📞 Email: ${phoneEl}\n`;
  console.log(text);

  // API orqali yuborish
  fetch(telegramApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id,
      text,
    }),
  })
    .then(async (response) => {
      if (response.ok) {
        iziToast.success({
          title: "success",
          message: "Arizangiz yuborildi!",
        });

        form.reset(); // Formani tozalash
      } else {
        const errorData = await response.json().catch(() => null);

        console.error("Telegram xatoligi:", errorData);

        iziToast.error({
          title: "Error",
          message: "Xatolik yuz berdi. Telegram botingizni tekshiring!",
          text: errorData?.description || "400 Bad Request",
        });
      }
    })
    .catch((error) => {
      console.error("Xatolik:", error);

      iziToast.error({
        title: "Error",
        message: "ITarmoq xatosi yuz berdi",
        text: error.message || "So‘rov yuborilmadi",
      });
    });
});
