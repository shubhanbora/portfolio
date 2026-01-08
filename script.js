// Portfolio JavaScript - Clean Version

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skills progress bar animation
const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                }
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observeSkills.observe(skillsSection);
}

// Gallery filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        });
    });
});

// Initialize gallery - show all items
galleryItems.forEach(item => {
    item.classList.add('show');
});

// Scroll animations for sections
const observeElements = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add fade-in class to elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section-header, .skill-card, .project-card, .gallery-item, .contact-item, .about-text, .college-card');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observeElements.observe(el);
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-arrow');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && mobileMenuBtn && 
        !navMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        document.body.style.overflow = '';
    }
});

// 3D Effects (Desktop Only)
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

if (!isMobile) {
    // 3D Mouse Tracking Effects for Desktop
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.project-card, .skill-card, .contact-item');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        cards.forEach(card => {
            if (card.matches(':hover')) {
                const rect = card.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2;
                
                const deltaX = (mouseX - cardX) / rect.width;
                const deltaY = (mouseY - cardY) / rect.height;
                
                const rotateX = deltaY * -10;
                const rotateY = deltaX * 10;
                
                card.style.transform = `
                    translateY(-15px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale(1.02)
                `;
            }
        });
    });

    // 3D Tilt Effect for Hero Image
    const heroImage = document.querySelector('.image-container');
    if (heroImage) {
        heroImage.addEventListener('mousemove', (e) => {
            const rect = heroImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            const rotateX = deltaY * -20;
            const rotateY = deltaX * 20;
            
            heroImage.style.transform = `
                translateZ(30px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(1.05)
            `;
            
            // Add dynamic lighting effect
            heroImage.style.boxShadow = `
                ${-deltaX * 20}px ${-deltaY * 20}px 60px rgba(59, 130, 246, 0.4),
                ${deltaX * 10}px ${deltaY * 10}px 30px rgba(139, 92, 246, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 0 50px rgba(255, 255, 255, 0.1),
                inset 0 0 100px rgba(59, 130, 246, 0.2)
            `;
        });
        
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = '';
            heroImage.style.boxShadow = '';
        });
    }

    // 3D Parallax Scrolling Effect
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-text, .hero-image');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            const rotateX = scrolled * 0.02;
            
            element.style.transform = `
                translateY(${yPos}px) 
                translateZ(${20 + index * 20}px)
                rotateX(${rotateX}deg)
            `;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

// Touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Initialize progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Add loading class to body
    document.body.classList.add('loaded');
});

// Performance optimization for scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        // Scroll ended
    }, 100);
});

console.log('🚀 Portfolio JavaScript loaded successfully!');