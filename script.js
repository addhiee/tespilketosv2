window.addEventListener("load", function() {
  document.body.classList.add("loaded");
});

// ===== LOGIN PAGE =====

// Token, nama, dan kelas
const daftarPemilih = {
  "bsaiuU7c": { nama: "Ahmad Affandi", kelas: "XI IPA 1" },
  "tokencb1": { nama: "Budi Santoso", kelas: "XI IPA 2" },
  "tokencb2": { nama: "Citra Lestari", kelas: "XI IPS 1" },
  "tokencb3": { nama: "Dewi Rahmawati", kelas: "XI IPS 2" }
};

function ig() {
  window.location.href = "https://www.instagram.com/osimman1batam/";
}

function login() {
  const token = document.getElementById("token").value.trim();

  if (token === "") {
    // Popup token kosong
    document.getElementById("popupkosong").classList.add("active");
    setTimeout(() => document.getElementById("kosong").classList.add("active"), 50);
    setTimeout(() => document.getElementById("kosong").classList.remove("active"), 1500);
    setTimeout(() => document.getElementById("popupkosong").classList.remove("active"), 1600);
    return;
  }

  // Jika token valid
  if (daftarPemilih[token]) {
    localStorage.setItem("token", token);
    localStorage.setItem("nama", daftarPemilih[token].nama);
    localStorage.setItem("kelas", daftarPemilih[token].kelas);

    document.getElementById("popuphsl").classList.add("active");
    setTimeout(() => document.getElementById("berhasil").classList.add("active"), 50);
    setTimeout(() => window.location.href = "kandidat.html", 1500);
  } else {
    // Jika token salah
    document.getElementById("popupgagal").classList.add("active");
    setTimeout(() => document.getElementById("gagal").classList.add("active"), 50);
    setTimeout(() => document.getElementById("gagal").classList.remove("active"), 1500);
    setTimeout(() => document.getElementById("popupgagal").classList.remove("active"), 1600);
  }
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
  const { token, nama, kelas } = getUserData();

  if (!token || !nama || !kelas) {
    alert("Data login tidak ditemukan. Silakan login ulang!");
    window.location.href = "index.html";
    return;
  }

  // Kirim data tanpa menunggu respon
  fetch("https://databasepilketos.vercel.app/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, nama, kelas, kandidat })
  }).catch(() => console.error("Gagal mengirim suara ke server"));

  // Hapus data login agar tidak bisa balik lagi
  localStorage.removeItem("token");
  localStorage.removeItem("nama");
  localStorage.removeItem("kelas");

  // Redirect langsung
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
