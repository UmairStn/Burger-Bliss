document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    
    if (themeToggle && themeIcon) {
        const themes = {
            light: { name: 'light', icon: '🌞', next: 'dark' },
            dark: { name: 'dark', icon: '🌙', next: 'premium' },
            premium: { name: 'premium', icon: '👑', next: 'light' }
        };
        
        let currentTheme = localStorage.getItem('theme') || 'light';
        
        function applyTheme(theme) {
            if (theme === 'light') {
                body.removeAttribute('data-theme');
            } else {
                body.setAttribute('data-theme', theme);
            }
            themeIcon.textContent = themes[theme].icon;
        }
        
        applyTheme(currentTheme);
        
        themeToggle.addEventListener('click', function() {
            const nextTheme = themes[currentTheme].next;
            currentTheme = nextTheme;
            applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }

    // ===== REPEATING SCROLL ANIMATIONS =====
    let animationObserver;
    
    function initScrollAnimations() {
        // Remove existing observer if it exists
        if (animationObserver) {
            animationObserver.disconnect();
        }

        const observerOptions = {
            threshold: 0.15, // Element needs to be 15% visible
            rootMargin: '0px 0px -10% 0px'
        };

        animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is coming into view - animate it
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 50);
                } else {
                    // Element is going out of view - reset animation
                    entry.target.classList.remove('animate');
                }
            });
        }, observerOptions);

        // Observe all scroll-animate elements
        document.querySelectorAll('.scroll-animate').forEach(el => {
            // Reset animation state initially
            el.classList.remove('animate');
            animationObserver.observe(el);
        });
    }

    // Initialize animations after a short delay
    setTimeout(initScrollAnimations, 100);

    // ===== ALTERNATIVE: SCROLL-BASED ANIMATION (More Responsive) =====
    let isScrolling = false;
    
    function checkScrollAnimations() {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            document.querySelectorAll('.scroll-animate').forEach(element => {
                const elementTop = element.getBoundingClientRect().top + scrollTop;
                const elementBottom = elementTop + element.offsetHeight;
                
                // Check if element is in viewport
                const isElementInView = (elementTop < scrollTop + windowHeight * 0.9) && 
                                       (elementBottom > scrollTop + windowHeight * 0.1);
                
                if (isElementInView) {
                    element.classList.add('animate');
                } else {
                    element.classList.remove('animate');
                }
            });
            
            isScrolling = false;
        });
    }

    // Use scroll event as backup/alternative
    window.addEventListener('scroll', checkScrollAnimations);
    
    // Check animations on page load
    setTimeout(checkScrollAnimations, 300);

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('.nav-link, .hero-cta').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const headerOffset = 100;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== IMAGE HOVER EFFECTS =====
    document.querySelectorAll('.feature-img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ===== TRIGGER HERO ANIMATION ON LOAD =====
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate');
        }
    }, 500);

    // ===== FORM SUBMISSION =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (name && email && message) {
                // Show success message
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // ===== RESET ANIMATIONS ON PAGE VISIBILITY CHANGE =====
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // Reset and check animations when page becomes visible
            setTimeout(() => {
                checkScrollAnimations();
            }, 100);
        }
    });

    // ===== MANUAL ANIMATION RESET BUTTON (FOR TESTING) =====
    // Uncomment this for testing purposes
    /*
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Animations';
    resetButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        padding: 10px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    resetButton.addEventListener('click', function() {
        document.querySelectorAll('.scroll-animate').forEach(el => {
            el.classList.remove('animate');
        });
        setTimeout(checkScrollAnimations, 100);
    });
    document.body.appendChild(resetButton);
    */
});

// ===== PREVENT ANIMATION GLITCHES ON PAGE RELOAD =====
window.addEventListener('beforeunload', function() {
    document.querySelectorAll('.scroll-animate').forEach(el => {
        el.classList.remove('animate');
    });
});