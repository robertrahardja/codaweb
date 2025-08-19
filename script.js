// Language Toggle Functionality
let currentLanguage = 'en';

function toggleLanguage() {
    if (currentLanguage === 'en') {
        currentLanguage = 'zh';
        document.body.classList.add('zh');
        document.documentElement.lang = 'zh';
    } else {
        currentLanguage = 'en';
        document.body.classList.remove('zh');
        document.documentElement.lang = 'en';
    }
    
    // Force display update for all language elements
    const allEnElements = document.querySelectorAll('.lang-en');
    const allZhElements = document.querySelectorAll('.lang-zh');
    
    if (currentLanguage === 'zh') {
        allEnElements.forEach(el => {
            el.style.display = 'none';
        });
        allZhElements.forEach(el => {
            el.style.display = el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'DIV' ? 'inline-block' : 'block';
        });
    } else {
        allEnElements.forEach(el => {
            el.style.display = el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'DIV' ? 'inline-block' : 'block';
        });
        allZhElements.forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Update all text elements
    updateLanguageDisplay();
    
    // Save preference to localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);
}

function updateLanguageDisplay() {
    // Update navigation links
    const navLinks = document.querySelectorAll('[data-en][data-zh]');
    navLinks.forEach(link => {
        if (currentLanguage === 'zh') {
            link.textContent = link.getAttribute('data-zh');
        } else {
            link.textContent = link.getAttribute('data-en');
        }
    });
    
    // Update form placeholders
    updateFormPlaceholders();
    
    // Update select options
    updateSelectOptions();
}

function updateFormPlaceholders() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (currentLanguage === 'zh') {
            switch(input.name) {
                case 'firstName':
                    input.placeholder = '输入您的名字';
                    break;
                case 'lastName':
                    input.placeholder = '输入您的姓氏';
                    break;
                case 'email':
                    input.placeholder = '输入您的电子邮件';
                    break;
                case 'message':
                    input.placeholder = '输入您的留言';
                    break;
            }
        } else {
            switch(input.name) {
                case 'firstName':
                    input.placeholder = 'Enter your first name';
                    break;
                case 'lastName':
                    input.placeholder = 'Enter your last name';
                    break;
                case 'email':
                    input.placeholder = 'Enter your email';
                    break;
                case 'message':
                    input.placeholder = 'Enter your message';
                    break;
            }
        }
    });
}

function updateSelectOptions() {
    const select = document.querySelector('select[name="reason"]');
    if (select) {
        const options = select.options;
        if (currentLanguage === 'zh') {
            options[0].text = '选择原因';
            options[1].text = '投资咨询';
            options[2].text = '合作伙伴关系';
            options[3].text = '一般咨询';
        } else {
            options[0].text = 'Select a reason';
            options[1].text = 'Investment Inquiry';
            options[2].text = 'Partnership';
            options[3].text = 'General Inquiry';
        }
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage === 'zh') {
        currentLanguage = 'en'; // Set to 'en' first so toggle works correctly
        toggleLanguage(); // This will switch to 'zh' and update everything properly
    } else {
        // Ensure English is properly displayed on initial load
        const allEnElements = document.querySelectorAll('.lang-en');
        const allZhElements = document.querySelectorAll('.lang-zh');
        
        allEnElements.forEach(el => {
            el.style.display = el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'DIV' ? 'inline-block' : 'block';
        });
        allZhElements.forEach(el => {
            el.style.display = 'none';
        });
        
        updateLanguageDisplay();
    }
    
    // Smooth scrolling for all navigation links (desktop and mobile)
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    // Close mobile menu if open
                    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
                    if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                    
                    // Smooth scroll to section
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Display success message
            const successMessage = currentLanguage === 'zh' 
                ? '感谢您的留言！我们会尽快与您联系。' 
                : 'Thank you for your message! We will contact you soon.';
            
            alert(successMessage);
            
            // Reset form
            this.reset();
        });
    }
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate elements on scroll with better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.classList.add('animated', 'fade-in-up');
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });
        
        // Observe cards with stagger
        const cards = document.querySelectorAll('.philosophy-card, .investment-card, .bespoke-card, .stat-item');
        cards.forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Observe other elements
        const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .leader-card, .partner-logo');
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    }
    
    // Add hover effects only for desktop
    if (window.matchMedia('(hover: hover)').matches) {
        const cards = document.querySelectorAll('.philosophy-card, .investment-card, .bespoke-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('hovering')) {
                    this.classList.add('hovering');
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovering');
            });
        });
    }
    
    // Parallax effect with performance optimization
    const hero = document.querySelector('.hero');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (scrolled < windowHeight && hero) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        ticking = false;
    }
    
    if (hero && !prefersReducedMotion && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;
    
    if (!mobileMenuOverlay || !hamburger) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    // Toggle active state
    const isActive = mobileMenuOverlay.classList.contains('active');
    
    if (isActive) {
        // Close menu
        mobileMenuOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
        body.style.position = '';
    } else {
        // Open menu
        mobileMenuOverlay.classList.add('active');
        hamburger.classList.add('active');
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
    }
    
    // Update language display in mobile menu
    const mobileLinks = document.querySelectorAll('.mobile-nav-link span');
    mobileLinks.forEach(span => {
        if (currentLanguage === 'zh') {
            if (span.classList.contains('lang-zh')) {
                span.style.display = 'inline-block';
            } else if (span.classList.contains('lang-en')) {
                span.style.display = 'none';
            }
        } else {
            if (span.classList.contains('lang-en')) {
                span.style.display = 'inline-block';
            } else if (span.classList.contains('lang-zh')) {
                span.style.display = 'none';
            }
        }
    });
}

// Make sure mobile menu is accessible globally
window.toggleMobileMenu = toggleMobileMenu;

// Utility function to format numbers with animation
function animateNumber(element, target, duration = 2000) {
    // Store original text to preserve suffix (like '+' or 'B')
    const originalText = element.textContent;
    const suffix = originalText.replace(/[0-9]/g, '');
    
    const start = 0;
    const startTime = performance.now();
    
    element.classList.add('counting');
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target + suffix;
            element.classList.remove('counting');
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Animate statistics when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    
                    if (!isNaN(number)) {
                        // Small delay for better visual effect
                        setTimeout(() => {
                            animateNumber(entry.target, number);
                            entry.target.setAttribute('data-animated', 'true');
                        }, 200);
                    }
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });

        statNumbers.forEach(stat => {
            statObserver.observe(stat);
        });
    }
});