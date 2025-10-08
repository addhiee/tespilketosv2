window.addEventListener("load", function() {
  document.body.classList.add("loaded");
});



// Token, nama, dan kelas


function ig() {
  window.location.href = "https://www.instagram.com/osimman1batam/";
}


// ===== LOGIN PAGE =====


function login() {
  const token = document.getElementById("token").value.trim();

  if (token === "") {
    // tampilkan popup kosong seperti biasa
    return;
  }

  fetch("https://databasepilketos.vercel.app/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  })
    .then(res => res.json())
    .then(data => {
      if (data.result === "success") {
        localStorage.setItem("token", token);
        localStorage.setItem("nama", data.nama);
        localStorage.setItem("kelas", data.kelas);
        window.location.href = "kandidat.html";
      } else {
        alert("Token tidak valid!");
      }
    })
    .catch(err => {
      console.error("Gagal verifikasi token:", err);
      alert("Gagal menghubungi server.");
    });
}



// ===== KANDIDAT PAGE =====
function kandidat1() {
  document.getElementById("popup1").classList.add("active");
  setTimeout(() => document.getElementById("kand1").classList.add("active"), 50);
}

function closePopup1() {
  document.getElementById("kand1").classList.remove("active");
  setTimeout(() => document.getElementById("popup1").classList.remove("active"), 500);
}

function pilihKand1() {
  closePopup1();
  setTimeout(() => window.location.href = "fixpage1.html", 1000);
}

function kandidat2() {
  document.getElementById("popup2").classList.add("active");
  setTimeout(() => document.getElementById("kand2").classList.add("active"), 50);
}

function closePopup2() {
  document.getElementById("kand2").classList.remove("active");
  setTimeout(() => document.getElementById("popup2").classList.remove("active"), 500);
}

function pilihKand2() {
  closePopup2();
  setTimeout(() => window.location.href = "fixpage2.html", 1000);
}

function kandidat3() {
  document.getElementById("popup3").classList.add("active");
  setTimeout(() => document.getElementById("kand3").classList.add("active"), 50);
}

function closePopup3() {
  document.getElementById("kand3").classList.remove("active");
  setTimeout(() => document.getElementById("popup3").classList.remove("active"), 500);
}

function pilihKand3() {
  closePopup3();
  setTimeout(() => window.location.href = "fixpage3.html", 1000);
}

// ===== FIX PAGE =====
function getUserData() {
  return {
    token: localStorage.getItem("token"),
    nama: localStorage.getItem("nama"),
    kelas: localStorage.getItem("kelas")
  };
}

function kirimVote(kandidat, redirectPage) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Token tidak ditemukan. Silakan login ulang!");
    window.location.href = "index.html";
    return;
  }

  // 🔹 Kirim data ke GAS (token + kandidat saja)
  fetch("https://databasepilketos.vercel.app/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, kandidat }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.result === "success") {
        console.log(`Vote ${kandidat} berhasil dikirim untuk ${data.nama}`);
      } else {
        alert("Token tidak valid atau sudah digunakan!");
        window.location.href = "index.html";
      }
    })
    .catch(err => {
      console.error("Gagal kirim suara:", err);
      alert("Terjadi kesalahan saat mengirim suara.");
    });

  // 🔹 Hapus token agar tidak bisa balik
  localStorage.removeItem("token");

  // 🔹 Pindah ke halaman selesai
  window.location.href = redirectPage;
}


function pilkand1() { kirimVote("Kandidat 1", "donepage1.html"); }
function pilkand2() { kirimVote("Kandidat 2", "donepage2.html"); }
function pilkand3() { kirimVote("Kandidat 3", "donepage3.html"); }

function back() { window.location.href = "kandidat.html"; }
function awal() { window.location.href = "index.html"; }

// ===== DONE PAGE =====
window.onload = function () {
  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) return; // biar gak error di halaman lain

  let count = 5;
  const timer = setInterval(() => {
    count--;
    countdownElement.textContent = count;
    if (count <= 0) {
      clearInterval(timer);
      window.location.href = "index.html";
    }
  }, 1000);
};




