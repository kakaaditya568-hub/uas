/* =========================
   UTILITAS ALERT MODERN
========================= */
function showAlert(message, type = "success") {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-4 shadow`;
    alertBox.style.zIndex = 9999;

    alertBox.innerHTML = `
        <strong>${type === "success" ? "Sukses" : "Perhatian"}!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.classList.remove("show");
        alertBox.remove();
    }, 3000);
}

/* =========================
   VALIDASI LOGIN
========================= */
function login() {
    const username = loginUser.value.trim();
    const password = loginPass.value.trim();

    // Efek loading tombol
    const btn = event.target;
    btn.disabled = true;
    btn.innerHTML = "Memproses...";

    setTimeout(() => {
        if (!username || !password) {
            showAlert("Username dan Password wajib diisi!", "danger");
            resetButton(btn);
            return;
        }

        if (username === "admin" && password === "12345") {
            showAlert("Login berhasil. Selamat datang!", "success");

            // Simpan status login (bonus nilai)
            localStorage.setItem("login", "true");

            setTimeout(() => {
                window.location.href = "beranda.html";
            }, 1200);
        } else {
            showAlert("Username atau Password salah!", "danger");
            resetButton(btn);
        }
    }, 800);
}

function resetButton(btn) {
    btn.disabled = false;
    btn.innerHTML = "Login";
}

/* =========================
   PROTEKSI HALAMAN (OPSIONAL)
========================= */
function checkLogin() {
    if (!localStorage.getItem("login")) {
        window.location.href = "login.html";
    }
}

/* =========================
   VALIDASI TRANSAKSI
========================= */
function validateAndAdd() {
    const name = custName.value.trim();
    const car = carType.value;
    const days = rentDays.value;
    const date = rentDate.value;

    if (!name || !car || !days || !date) {
        showAlert("Semua field wajib diisi!", "danger");
        return;
    }

    // Animasi baris baru
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${car}</td>
        <td>${days} Hari</td>
        <td>${date}</td>
    `;
    row.style.opacity = 0;

    transactionList.appendChild(row);

    setTimeout(() => {
        row.style.transition = "opacity 0.5s";
        row.style.opacity = 1;
    }, 100);

    rentForm.reset();
    showAlert("Data transaksi berhasil ditambahkan!", "success");
}

/* =========================
   LOGOUT
========================= */
function logout() {
    localStorage.removeItem("login");
    window.location.href = "login.html";
}
