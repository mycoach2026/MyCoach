// ==========================================
// My Coach - JavaScript
// Interactive Features & Animations
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Navigation
    // ==========================================
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Smooth Scroll & Close Mobile Menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // ==========================================
    // Hero Stats Counter Animation
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        const heroPosition = heroSection.getBoundingClientRect();
        
        if (heroPosition.top < window.innerHeight && heroPosition.bottom >= 0) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load
    
    // ==========================================
    // FAQ Accordion
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // ==========================================
    // Testimonials Slider
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialsDots');
    
    let currentTestimonial = 0;
    
    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected testimonial
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
    
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-play testimonials
    let testimonialAutoPlay = setInterval(nextTestimonial, 5000);
    
    // Pause auto-play on hover
    const testimonialsSection = document.querySelector('.testimonials-slider');
    testimonialsSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialAutoPlay);
    });
    
    testimonialsSection.addEventListener('mouseleave', () => {
        testimonialAutoPlay = setInterval(nextTestimonial, 5000);
    });
    
    // Show first testimonial
    showTestimonial(0);
    
    // ==========================================
    // Contact Form
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            goal: document.getElementById('goal').value,
            message: document.getElementById('message').value
        };
        
        // Validate
        if (!formData.name || !formData.phone || !formData.goal) {
            showFormMessage('من فضلك املأ جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('جاري الإرسال...', 'success');
        
        setTimeout(() => {
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            showFormMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً عبر الواتساب 🎉', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Open WhatsApp with pre-filled message
            const whatsappMessage = `مرحباً! أنا ${formData.name}. أرغب في ${getGoalText(formData.goal)}. ${formData.message || ''}`;
            const whatsappUrl = `https://wa.me/201234567890?text=${encodeURIComponent(whatsappMessage)}`;
            
            setTimeout(() => {
                if (confirm('هل تريد فتح الواتساب مباشرة للتواصل؟')) {
                    window.open(whatsappUrl, '_blank');
                }
            }, 1500);
        }, 1000);
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function getGoalText(goal) {
        const goals = {
            'weight-loss': 'خسارة الوزن',
            'muscle-gain': 'بناء العضلات',
            'fitness': 'تحسين اللياقة البدنية',
            'nutrition': 'تحسين التغذية',
            'other': 'استشارة عامة'
        };
        return goals[goal] || goal;
    }
    
    // ==========================================
    // Back to Top Button
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==========================================
    // Scroll Animations (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
        '.service-card, .program-card, .transformation-card, .faq-item, .about-image, .about-text'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ==========================================
    // Smooth Button Click Effects
    // ==========================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // Performance: Lazy Loading Images
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ==========================================
    // External Links Open in New Tab
    // ==========================================
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hostname.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // ==========================================
    // Prevent Form Resubmission on Refresh
    // ==========================================
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    
    // ==========================================
    // Console Welcome Message
    // ==========================================
    console.log('%cMy Coach 💪', 'color: #FFD700; font-size: 2rem; font-weight: bold;');
    console.log('%cمرحباً بك في موقع My Coach!', 'color: #FFD700; font-size: 1.2rem;');
    console.log('%cهل أنت مستعد لبدء رحلة التحول؟', 'color: #b0b0b0; font-size: 1rem;');
    
    // ==========================================
    // Page Load Animation
    // ==========================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ==========================================
    // Keyboard Navigation Accessibility
    // ==========================================
    document.addEventListener('keydown', function(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // Arrow keys for testimonial navigation
        if (e.key === 'ArrowLeft') {
            nextTestimonial();
        } else if (e.key === 'ArrowRight') {
            prevTestimonial();
        }
    });
    
    // ==========================================
    // Scroll Progress Indicator (Optional)
    // ==========================================
    const scrollProgress = document.createElement('div');
    scrollProgress.style.position = 'fixed';
    scrollProgress.style.top = '0';
    scrollProgress.style.left = '0';
    scrollProgress.style.width = '0%';
    scrollProgress.style.height = '4px';
    scrollProgress.style.background = 'linear-gradient(90deg, #FFD700 0%, #DAA520 100%)';
    scrollProgress.style.zIndex = '10000';
    scrollProgress.style.transition = 'width 0.1s ease';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
    
    // ==========================================
    // WhatsApp Floating Button (Optional)
    // ==========================================
    const whatsappFloating = document.createElement('a');
    whatsappFloating.href = 'https://wa.me/201234567890';
    whatsappFloating.target = '_blank';
    whatsappFloating.className = 'whatsapp-floating';
    whatsappFloating.setAttribute('aria-label', 'تواصل عبر واتساب');
    whatsappFloating.innerHTML = '<i class="fab fa-whatsapp"></i>';
    
    // Add WhatsApp floating button styles
    const whatsappStyle = document.createElement('style');
    whatsappStyle.textContent = `
        .whatsapp-floating {
            position: fixed;
            bottom: 5rem;
            left: 2rem;
            width: 60px;
            height: 60px;
            background: #25D366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
            z-index: 998;
            transition: all 0.3s ease;
            animation: whatsappPulse 2s infinite;
        }
        
        .whatsapp-floating:hover {
            transform: scale(1.1) translateY(-3px);
            box-shadow: 0 6px 24px rgba(37, 211, 102, 0.6);
        }
        
        @keyframes whatsappPulse {
            0%, 100% {
                box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
            }
            50% {
                box-shadow: 0 4px 30px rgba(37, 211, 102, 0.8);
            }
        }
        
        @media (max-width: 768px) {
            .whatsapp-floating {
                bottom: 4rem;
                left: 1rem;
                width: 55px;
                height: 55px;
                font-size: 1.75rem;
            }
        }
    `;
    document.head.appendChild(whatsappStyle);
    document.body.appendChild(whatsappFloating);
    
    // ==========================================
    // Print Styles (For CV/Portfolio)
    // ==========================================
    const printStyles = document.createElement('style');
    printStyles.media = 'print';
    printStyles.textContent = `
        @media print {
            .navbar,
            .back-to-top,
            .whatsapp-floating,
            .hero-buttons,
            .contact-form,
            .scroll-indicator {
                display: none !important;
            }
            
            body {
                background: white;
                color: black;
            }
            
            section {
                page-break-inside: avoid;
            }
        }
    `;
    document.head.appendChild(printStyles);
    
});

// ==========================================
// Service Worker for PWA (Optional)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}