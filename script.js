window.addEventListener("load", function() {
  document.body.classList.add("loaded");
});

function ig() {
  window.location.href = "https://www.instagram.com/osimman1batam/";
}

// ===== LOGIN PAGE =====

async function login() {
  const token = document.getElementById("token").value.trim();

  if (token === "") {
    document.getElementById("popupkosong").classList.add("active");
    setTimeout(() => document.getElementById("kosong").classList.add("active"), 50);
    setTimeout(() => document.getElementById("kosong").classList.remove("active"), 1500);
    setTimeout(() => document.getElementById("popupkosong").classList.remove("active"), 1600);
    return;
  }

  // === Tampilkan animasi loading ===
  const loading = document.getElementById("loading");
  loading.classList.add("active");

  try {
    const response = await fetch("https://databasepilketos.vercel.app/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, kandidat: "Login Check" })
    });

    const resultText = await response.text();
    let result;

    try {
      result = JSON.parse(resultText);
    } catch {
      console.warn("Respon bukan JSON:", resultText);
      result = { result: "error", message: "Respon server tidak valid" };
    }

    // === Tutup loading setelah respon diterima ===
    loading.classList.remove("active");

    if (result.result === "ok") {
      // Login sukses
      localStorage.setItem("token", token);
      document.getElementById("popuphsl").classList.add("active");
      setTimeout(() => document.getElementById("berhasil").classList.add("active"), 50);
      setTimeout(() => window.location.href = "kandidat.html", 1500);

    } else if (result.result === "invalid" || result.result === "used") {
      // Token salah atau sudah digunakan
      document.getElementById("popupgagal").classList.add("active");
      setTimeout(() => document.getElementById("gagal").classList.add("active"), 50);
      setTimeout(() => document.getElementById("gagal").classList.remove("active"), 1500);
      setTimeout(() => document.getElementById("popupgagal").classList.remove("active"), 1600);

    } else {
      // Jika server kirim pesan aneh
      alert("Respon tidak dikenali: " + resultText);
    }

  } catch (error) {
    console.error("Gagal terhubung ke server:", error);
    loading.classList.remove("active");
    alert("⚠️ Gagal menghubungi server. Pastikan koneksi aktif.");
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
  };
}

async function kirimVote(kandidat, redirectPage) {
  const { token } = getUserData();

  if (!token) {
    alert("Silakan login ulang!");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch("https://databasepilketos.vercel.app/api/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, kandidat })
    });

    const text = await response.text();
    console.log("Vote response:", text);

  } catch (err) {
    console.error("Gagal mengirim suara:", err);
  }

  localStorage.removeItem("token");
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
  if (!countdownElement) return;

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


