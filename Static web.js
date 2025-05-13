// Toggle class active
const navbarNav = document.querySelector('.navbar-nav');

// Ketika ikon menu di klik
document.querySelector('#menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Klik di luar sidebar untuk menghilangkan navbar
const menu = document.querySelector ('#menu');
document.addEventListener('click', function(e) {
    if(!menu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active')
    }
});

alert('SELAMAT DATANG DI RIMBERIO BIMBEL!');

// Validasi untuk form
function validasi() {
    // Validasi Nama
    var nama = document.getElementById("nama"),   
        validasiAngka = /^[0-9-]+$/,
        Alamat = document.getElementById("alamat"),
        validasiEmail = document.getElementById("email"),
        Password = document.getElementById("password"),
        validasiTelepon = /^[0-9]+$/,
        nomorTelepon = document.getElementById("number");

    if (document.forms["formPendaftaran"]["nama"].value == "") {
        alert("Silakan isi nama lengkap anda");
        return false;
    } 

    if (document.forms["formPendaftaran"]["alamat"].value == "") {
        alert("Silakan isi alamat rumah anda");
        return false;
    }

    if (document.forms["formPendaftaran"]["email"].value == "") {
        alert("Masukkan email aktif anda");
        return false;
        
    }

    if (document.forms["formPendaftaran"]["password"].value == "") {
        alert("Masukkan sandi terbaru anda");
        return false;
        
    }

    if (document.forms["formPendaftaran"]["number"].value == "") {
        alert("Silakan isi nomor telepon anda");
        return false;
        
    }

    if (document.forms["formPendaftaran"]["paket"].value == "") {
        alert("Pilih paket belajar anda");
        return false;
    }

    if (document.forms["formPendaftaran"]["button"].value == "") {
        alert("Terima Kasih telah mengunjungi web kami");
    }
}