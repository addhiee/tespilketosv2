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
    document.getElementById("popupkosong").classList.add("active");
    setTimeout(() => document.getElementById("kosong").classList.add("active"), 50);
    setTimeout(() => document.getElementById("kosong").classList.remove("active"), 1500);
    setTimeout(() => document.getElementById("popupkosong").classList.remove("active"), 1600);
    return;
  }

  // 🔹 Cek token ke GAS
  fetch("https://script.google.com/macros/s/AKfycbwqV7l5iEq9snJzwpSpatjlQVcSyZcFHsgQsdPvW56w6dED4lTO354v1iHeIUljR1o/exec", { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, kandidat: "" }) // kirim kandidat kosong hanya untuk validasi token
  })
    .then(res => res.json())
    .then(data => {
      if (data.result === "success") {
        // Simpan token saja
        localStorage.setItem("token", token);

        document.getElementById("popuphsl").classList.add("active");
        setTimeout(() => document.getElementById("berhasil").classList.add("active"), 50);
        setTimeout(() => window.location.href = "kandidat.html", 1500);
      } else if (data.result === "invalid") {
        document.getElementById("popupgagal").classList.add("active");
        setTimeout(() => document.getElementById("gagal").classList.add("active"), 50);
        setTimeout(() => document.getElementById("gagal").classList.remove("active"), 1500);
        setTimeout(() => document.getElementById("popupgagal").classList.remove("active"), 1600);
      } else {
        alert("Terjadi kesalahan saat memverifikasi token.");
      }
    })
    .catch(err => {
      console.error("Gagal verifikasi token:", err);
      alert("Tidak dapat menghubungi server. Periksa koneksi internetmu.");
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
  fetch("https://script.google.com/macros/s/AKfycbwqV7l5iEq9snJzwpSpatjlQVcSyZcFHsgQsdPvW56w6dED4lTO354v1iHeIUljR1o/exec", {
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

