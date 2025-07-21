// 🔹 Portfolio videolar — hoverda o‘ynaydi
const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

const hoverSign = document.querySelector('.hover-sign');
const videoList = [video1, video2, video3];

videoList.forEach(function(video) {
  video.addEventListener("mouseover", function() {
    video.currentTime = 0;
    video.play();
    hoverSign.classList.add("active");
  });
  video.addEventListener("mouseout", function() {
    video.pause();
    hoverSign.classList.remove("active");
  });
});

// 🔹 Sidebar navigatsiya
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

menu.addEventListener("click", function() {
  sideBar.classList.remove("close-sidebar");
  sideBar.classList.add("open-sidebar");
});

closeIcon.addEventListener("click", function() {
  sideBar.classList.remove("open-sidebar");
  sideBar.classList.add("close-sidebar");
});

// 🔹 Toast bildirishnoma funksiyasi
function showToast(icon, message, color = "#fff") {
  const toast = document.querySelector('#toast');
  const toastIcon = document.querySelector('#toastIcon');
  const toastText = document.querySelector('#toastText');

  toastIcon.textContent = icon;
  toastText.textContent = message;
  toast.style.color = color;

  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 4000);
}

// 🔹 Kontakt formasi — Flask backendga POST so‘rov
const form = document.querySelector('#contactForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  const submitButton = form.querySelector('button');
  submitButton.disabled = true;
  submitButton.textContent = "Yuborilmoqda...";

  fetch('http://127.0.0.1:5000/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ name, phone, message })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showToast("✅", "Xabar muvaffaqiyatli yuborildi!", "#00ff99");
      form.reset();
    } else {
      showToast("❌", "Server xatosi: " + data.detail, "#ff7777");
      console.error("Server javobi:", data);
    }
  })
  .finally(() => {
    submitButton.disabled = false;
    submitButton.textContent = "Yuborish";
  });
});
