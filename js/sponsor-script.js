/* ============================================================
   SPONSOR-SCRIPT.JS — DRAMA ARENA 540 (MODERN ANIMATED EDITION)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SCROLL REVEAL ANIMATION (FADE-IN ELEMEN)
    // ==========================================
    const revealElements = document.querySelectorAll('.stat-card, .pkg-card, .preview-card, .section-title');
    
    revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 2. ANIMASI RIPPLE, PRESS & GOLD PARTICLE BURST
    // ==========================================
    const animatedButtons = document.querySelectorAll('.btn-animated, .btn-primary-gold, .btn-secondary-outline, .btn-download-nav, .btn-pkg, .btn-wa, .btn-icon-nav');

    animatedButtons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';

        button.addEventListener('click', function (e) {
            // A. Efek Riak Air (Ripple)
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            const existingRipple = button.querySelector('.btn-ripple');
            if (existingRipple) existingRipple.remove();

            button.appendChild(ripple);

            // B. Efek Tekan (Spring Scale)
            button.classList.add('btn-click-active');
            setTimeout(() => button.classList.remove('btn-click-active'), 200);

            // C. Gold Particle Burst (Khusus Tombol Utama)
            if (button.classList.contains('btn-primary-gold') || button.classList.contains('btn-pkg')) {
                createParticleBurst(e.clientX, e.clientY);
            }
        });
    });

    // Percikan Partikel Emas
    function createParticleBurst(x, y) {
        const particleCount = 16;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('gold-particle');
            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 60;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance;
            const size = 5 + Math.random() * 6;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            particle.animate([
                { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
                { transform: `translate(${destX}px, ${destY}px) scale(0) rotate(180deg)`, opacity: 0 }
            ], {
                duration: 700 + Math.random() * 300,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
                fill: 'forwards'
            });

            setTimeout(() => particle.remove(), 1000);
        }
    }

    // ==========================================
    // 3. ANIMASI LOADING STATE TOMBOL DOWNLOAD
    // ==========================================
    const downloadBtns = document.querySelectorAll('.btn-download-action');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const icon = btn.querySelector('i');

            showToast("Mengunduh Berkas Proposal PDF...");

            if (icon) {
                const originalClass = icon.className;
                icon.className = 'bi bi-arrow-repeat spin-icon';
                
                setTimeout(() => {
                    icon.className = 'bi bi-check-circle-fill';
                    setTimeout(() => {
                        icon.className = originalClass;
                    }, 2200);
                }, 1200);
            }
        });
    });

    // ==========================================
    // 4. ANIMATED COUNTER STATS
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1800;
            const increment = target / (duration / 16);

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current).toLocaleString('id-ID') + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toLocaleString('id-ID') + '+';
                }
            };
            updateCount();
        });
    };

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.sponsor-stats');
        if (statsSection && !hasCounted) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;
            if (sectionPos < screenPos) {
                startCounters();
                hasCounted = true;
            }
        }
    });

    // ==========================================
    // 5. SMOOTH SCROLL ANCHOR
    // ==========================================
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // 6. PRATINJAU FOTO PROPOSAL (LIGHTBOX MODAL)
    // ==========================================
    const previewCards = document.querySelectorAll('.preview-card');
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.getElementById('modal-close');

    if (imageModal && modalImg) {
        previewCards.forEach(card => {
            card.addEventListener('click', () => {
                const imgSrc = card.getAttribute('data-img');
                const captionText = card.getAttribute('data-caption') || '';

                if (imgSrc) {
                    modalImg.src = imgSrc;
                    if (modalCaption) modalCaption.textContent = captionText;
                    imageModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeModal = () => {
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) closeModal();
        });
    }

    // ==========================================
    // 7. FITUR SHARE & TOAST NOTIFICATION
    // ==========================================
    const btnShare = document.getElementById('btn-share');
    const toastNotif = document.getElementById('toast-notif');

    const showToast = (message) => {
        if (toastNotif) {
            const spanText = toastNotif.querySelector('span');
            if (spanText) spanText.textContent = message;
            toastNotif.classList.add('show');
            setTimeout(() => toastNotif.classList.remove('show'), 3500);
        }
    };

    if (btnShare) {
        btnShare.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Proposal Sponsorship - Drama Arena 540',
                    url: window.location.href
                }).catch(() => {});
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showToast("Link proposal berhasil disalin!");
                });
            }
        });
    }

});

