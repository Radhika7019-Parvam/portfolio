// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Contact form handling: simple validation and open mail client as fallback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const status = document.getElementById('formStatus');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            status.textContent = 'Please fill in all fields.';
            status.style.color = '#ffcc00';
            return;
        }

        // Basic email pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            status.textContent = 'Please enter a valid email address.';
            status.style.color = '#ffcc00';
            return;
        }

        // Compose mailto as a lightweight backend-free sending option
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        // Try to open user's email client
        window.location.href = `mailto:yourmail@example.com?subject=${subject}&body=${body}`;

        status.textContent = 'Opening your mail client...';
        status.style.color = '#a8ffb0';
        contactForm.reset();
    });
}
