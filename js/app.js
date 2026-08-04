document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar Effect on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('bi-list', 'bi-x-lg');
            } else {
                icon.classList.replace('bi-x-lg', 'bi-list');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('bi-x-lg', 'bi-list');
            }
        });
    });

    // 3. Countdown Timer (Event Date)
    const eventDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // 30 hari dari sekarang

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = eventDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days < 10 ? '0' + days : days;
            document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 4. Video Modal Trailer Trigger
// 4. Video Modal Trailer Trigger
    const btnWatch = document.getElementById('btn-watch-video');
    const videoModal = document.getElementById('video-modal');
    const modalClose = document.getElementById('modal-close');
    const videoFrame = document.getElementById('video-frame');

    // ID Video Youtube Anda (misal: rPZ5ITxx-4o)
    const videoId = "kbIwzJeia17LtinYflSw"; 
    
    // Link Embed Lengkap
    const youtubeTrailerUrl = `https://jumpshare.com/share/embed${videoId}?autoplay=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;

    if (btnWatch && videoModal && videoFrame) {
        
        // Event listener saat tombol diklik
        btnWatch.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah reload jika tombol berada di dalam tag <a>
            
            videoFrame.referrerPolicy = "strict-origin-when-cross-origin";
            videoFrame.src = youtubeTrailerUrl; // Pasang link video
            videoModal.classList.add('active');  // Tampilkan modal
        });

        // Fungsi Menutup Modal Video
        const closeModal = () => {
            videoModal.classList.remove('active'); // Sembunyikan modal
            videoFrame.src = "";                   // Hentikan suara/pemutaran video
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);
        
        // Tutup modal jika area luar video diklik
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeModal();
        });
    } else {
        console.error("Elemen modal video atau tombol tidak ditemukan di HTML!");
    }

});

document.addEventListener('DOMContentLoaded', () => {

    // Target Waktu: 22 Agustus 2026, Pukul 20:45:00 WIB
    // Catatan: Bulan di JavaScript dimulai dari angka 0 (0 = Januari, 7 = Agustus)
    const targetDate = new Date(2026, 7, 22, 20, 45, 0).getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
            if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
            if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
            if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
        } else {
            // Ketika waktu sudah mencapai 22 Agustus 2026 20:45 WIB
            const countdownBox = document.querySelector('.countdown-boxes');
            if (countdownBox) {
                countdownBox.innerHTML = "<h4 style='color:#d6a75c; font-size:1.4rem; font-weight:600;'>Acara Malam Puncak Sedang Berlangsung!</h4>";
            }
        }
    };

    // Jalankan timer setiap 1 detik
    setInterval(updateCountdown, 1000);
    updateCountdown();

});

// Mengatur posisi sorot lampu mengikuti pergerakan cursor
document.querySelectorAll('.card-item').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});