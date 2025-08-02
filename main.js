// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
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

    // Enhanced mobile menu functionality
    document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                
                // Change hamburger icon
                if (navMenu.classList.contains('active')) {
                    hamburger.innerHTML = '<span>✕</span>';
                } else {
                    hamburger.innerHTML = '<span>☰</span>';
                }
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.innerHTML = '<span>☰</span>';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!document.querySelector('.navbar').contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.innerHTML = '<span>☰</span>';
                }
            });
        }
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    
    // Theme configurations
    const themes = {
        light: {
            name: 'light',
            icon: '🌞',
            next: 'dark',
            navbarBg: 'rgba(255, 248, 240, 0.5)' // Transparent background
        },
        dark: {
            name: 'dark',
            icon: '🌙',
            next: 'light',
            navbarBg: 'rgba(42, 42, 42, 0.5)' // Transparent dark background
        },
        // premium: {
        //     name: 'premium',
        //     icon: '👑',
        //     next: 'light',
        //     navbarBg: 'rgba(253, 245, 230, 0.5)' // Transparent premium background
        // }
    };
    
    // Get saved theme or default to light
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme on page load
    function applyTheme(theme) {
        if (theme === 'light') {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', theme);
        }
        themeIcon.textContent = themes[theme].icon;
        
        // Update navbar background with transparency
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.backgroundColor = themes[theme].navbarBg;
        }
    }
    
    // Apply saved theme immediately
    applyTheme(currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        // Rotate animation
        this.style.transform = 'rotate(360deg)';
        
        setTimeout(() => {
            // Get next theme
            const nextTheme = themes[currentTheme].next;
            currentTheme = nextTheme;
            
            // Apply new theme
            applyTheme(currentTheme);
            
            // Save to localStorage
            localStorage.setItem('theme', currentTheme);
            
            // Reset rotation
            this.style.transform = 'rotate(0deg)';
        }, 150);
    });

    // Add theme transition class for smooth changes
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        
        .theme-toggle {
            transition: all 0.3s ease, transform 0.5s ease !important;
        }
    `;
    document.head.appendChild(style);

    // Optional: Add keyboard shortcut (Ctrl/Cmd + T)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
    });

    // Show theme notification
    function showThemeNotification(themeName) {
        const notification = document.createElement('div');
        /*notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: var(--white-color);
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            box-shadow: var(--shadow-medium);
        `;*/
        notification.textContent = `${themes[themeName].icon} ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme`;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
    
    // Add notification to theme toggle
    // const originalClickHandler = themeToggle.onclick;
    // themeToggle.addEventListener('click', function() {
    //     setTimeout(() => {
    //         showThemeNotification(currentTheme);
    //     }, 200);
    // });
});