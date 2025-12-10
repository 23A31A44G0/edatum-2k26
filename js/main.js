document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE MENU LOGIC
       ========================================= */
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            if (nav.classList.contains('open')) {
                navToggle.innerHTML = '&times;';
            } else {
                navToggle.innerHTML = '&#9776;';
            }
        });
    }

    /* =========================================
       2. SCROLL REVEAL (Intersection Observer)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));


    /* =========================================
       3. MOTION GRAPHICS: TYPING EFFECT
       ========================================= */
    const typerTarget = document.querySelector('.typer-target');
    if (typerTarget) {
        // Save original HTML (keeping <br> tags)
        const originalHTML = typerTarget.innerHTML;
        // Temporary Clear
        typerTarget.innerHTML = '<span class="typing-cursor"></span>';

        let i = 0;
        // Strip tags for typing logic but re-insert <br> as needed? 
        // Simpler approach: Type textContent, but we lose <br>.
        // Let's do a character walk that respects HTML tags basically.
        // Or simpler: Just type it out string by string.

        // Let's go with a simple text typer for now, stripping HTML initially is safer for animation
        // but we want the <br>. Let's parse the string.

        // Actually, let's just use the textContent and manually insert a newline if we detect it, 
        // or just type the string "The Future of Data Science."

        const textToType = originalHTML.replace(/<br\s*\/?>/gi, '\n'); // Replace <br> with newline char
        typerTarget.textContent = '';
        typerTarget.classList.add('typing-cursor');

        function typeWriter() {
            if (i < textToType.length) {
                const char = textToType.charAt(i);
                if (char === '\n') {
                    typerTarget.innerHTML += '<br>';
                } else {
                    typerTarget.innerHTML += char;
                }
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 50); // Human-like variance
            } else {
                // Remove cursor after done (optional)
                setTimeout(() => typerTarget.classList.remove('typing-cursor'), 1000);
            }
        }

        // Delay start slightly
        setTimeout(typeWriter, 500);
    }

    /* =========================================
       4. MOTION GRAPHICS: CURSOR FOLLOWER
       ========================================= */
    const blob = document.querySelector('.cursor-blob');
    if (blob) {
        document.addEventListener('mousemove', (e) => {
            // Using transform for performance
            // We center the blob: x - width/2
            blob.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        });
    }

    /* =========================================
       5. MOTION GRAPHICS: 3D CARD HOVER
       ========================================= */
    const cards = document.querySelectorAll('.info-card, .event-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // For CSS variable use (Glow effect)
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // For 3D Tilt (Optional, subtle)
            // Center of card is (rect.width/2, rect.height/2)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset
            card.style.transform = '';
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
    });

});
