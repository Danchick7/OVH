// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMobileOverlay = document.querySelector('.nav-mobile-overlay');
const mobileCloseBtn = document.querySelector('.mobile-close-btn');
const body = document.body;

// Open mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.add('active');
    navMobileOverlay.classList.add('active');
    body.style.overflow = 'hidden';
});

// Close mobile menu - X button
mobileCloseBtn.addEventListener('click', () => {
    closeMobileMenu();
});

// Close mobile menu - overlay click
navMobileOverlay.addEventListener('click', (e) => {
    if (e.target === navMobileOverlay) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.nav-mobile a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navMobileOverlay.classList.remove('active');
    body.style.overflow = '';
}

// Enhanced Scroll Animation Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Special handling for different sections
            if (entry.target.classList.contains('sponsors-section')) {
                animateSponsors(entry.target);
            }
            
            if (entry.target.classList.contains('floor-plan-section')) {
                animateFloorPlan(entry.target);
            }
            
            if (entry.target.classList.contains('anniversary-section')) {
                animateAnniversary(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all angled sections
const angledSections = document.querySelectorAll('.angled-section-right, .angled-section-left');
angledSections.forEach(section => {
    observer.observe(section);
});

// Sponsor animation with staggered delay
function animateSponsors(section) {
    const sponsors = section.querySelectorAll('.sponsor-logo');
    sponsors.forEach((sponsor, index) => {
        const delay = parseInt(sponsor.dataset.delay) || index * 100;
        setTimeout(() => {
            sponsor.classList.add('animate-in');
        }, delay);
    });
}

// Floor plan animation
function animateFloorPlan(section) {
    const title = section.querySelector('.section-title');
    const floorPlan = section.querySelector('.floor-plan');
    
    setTimeout(() => {
        title.classList.add('animate-in');
    }, 200);
    
    setTimeout(() => {
        floorPlan.classList.add('animate-in');
    }, 600);
}

// Anniversary section animation
function animateAnniversary(section) {
    // Animation is handled by CSS when animate-in class is added
}

// Enhanced Interactive Cards
const interactiveCards = document.querySelectorAll('.interactive-card');
interactiveCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        handleCardClick(category, card);
    });
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.08) rotateZ(2deg)';
        addRippleEffect(card);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

function handleCardClick(category, cardElement) {
    // Create burst animation effect
    cardElement.style.transform = 'translateY(-25px) scale(1.15) rotateZ(5deg)';
    cardElement.style.boxShadow = '0 30px 60px rgba(251, 179, 47, 0.4)';
    
    setTimeout(() => {
        cardElement.style.transform = '';
        cardElement.style.boxShadow = '';
        
        // Show category-specific content
        switch(category) {
            case 'photoshoot':
                showNotification('📸 Check out our amazing models', 'success');
                break;
            case 'cosplay':
                showNotification('This is who we are and what we want to be', 'info');
                break;
            case 'meet-greet':
                showNotification('⭐ Show us who you are!', 'warning');
                break;
        }
    }, 300);
}

// Add ripple effect to cards
function addRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(251, 179, 47, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Contact Modal Enhanced
const contactModal = document.getElementById('contactModal');
const contactBtns = document.querySelectorAll('[href="#contact"]');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.querySelector('.contact-form');

contactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

modalClose.addEventListener('click', closeModal);
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeModal();
    }
});

// ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        closeModal();
    }
});

function openModal() {
    contactModal.classList.add('active');
    body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
        const firstInput = contactForm.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 400);
}

function closeModal() {
    contactModal.classList.remove('active');
    body.style.overflow = '';
}

// Enhanced Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simulate loading
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification(`Thank you ${name}! Your message has been sent successfully. We'll get back to you soon! 🦸‍♂️✨`, 'success');
        
        // Reset form and close modal
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal();
    }, 1500);
});

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Color scheme based on type
    const colors = {
        success: { bg: '#7FBF3F', text: '#FFFFFF' },
        info: { bg: '#FBB32F', text: '#180C0F' },
        warning: { bg: '#FF6B35', text: '#FFFFFF' },
        error: { bg: '#FF4757', text: '#FFFFFF' }
    };
    
    const color = colors[type] || colors.info;
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${color.bg};
        color: ${color.text};
        padding: 0;
        border-radius: 12px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        z-index: 3000;
        transform: translateX(120%);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 400px;
        font-weight: 600;
        overflow: hidden;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 15px;
        padding: 20px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: ${color.text};
        line-height: 1;
        padding: 0;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    const progress = notification.querySelector('.notification-progress');
    progress.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(255,255,255,0.3);
        width: 100%;
        transform-origin: left;
        animation: notificationProgress 5s linear forwards;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemoveTimeout = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemoveTimeout);
        removeNotification(notification);
    });
    
    // Hover to pause auto-remove
    notification.addEventListener('mouseenter', () => {
        progress.style.animationPlayState = 'paused';
    });
    
    notification.addEventListener('mouseleave', () => {
        progress.style.animationPlayState = 'running';
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 400);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#contact') return; // Skip contact modal links
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Header Scroll Effect
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', throttle(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    // Change header background on scroll
    if (currentScrollY > 50) {
        header.style.background = 'rgba(24, 12, 15, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(24, 12, 15, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollY = currentScrollY;
}, 16));

// Enhanced Parallax Effect for Hero Section
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroImage && scrolled < window.innerHeight) {
        const parallaxSpeed1 = scrolled * 0.5;
        const parallaxSpeed2 = scrolled * 0.3;
        
        heroImage.style.transform = `scale(1.1) translateY(${parallaxSpeed1}px)`;
        heroContent.style.transform = `translateY(${parallaxSpeed2}px)`;
    }
}, 16));

// Throttle function for performance
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

// Enhanced Sponsor Logo Animation
const sponsorLogos = document.querySelectorAll('.sponsor-logo');
sponsorLogos.forEach((logo, index) => {
    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'sponsorWiggle 0.6s ease-in-out';
    });
    
    logo.addEventListener('animationend', () => {
        logo.style.animation = '';
    });
    
    // Random floating animation
    setInterval(() => {
        if (!logo.matches(':hover')) {
            logo.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 3}px)`;
        }
    }, 100);
});

// Add dynamic keyframes to CSS
const dynamicKeyframes = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes notificationProgress {
        from { transform: scaleX(1); }
        to { transform: scaleX(0); }
    }
    
    @keyframes sponsorWiggle {
        0%, 100% { transform: rotate(0deg) translateY(-10px); }
        25% { transform: rotate(-8deg) translateY(-10px); }
        75% { transform: rotate(8deg) translateY(-10px); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicKeyframes;
document.head.appendChild(styleSheet);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced entrance animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.animation = 'heroContentSlide 1.5s ease forwards';
        }, 500);
    }
    
    // Show enhanced welcome notification
    setTimeout(() => {
        showNotification('🎉 Welcome to our official page check out our current sale!✨', 'success');
    }, 2000);
    
    // Initialize card animations
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Enhanced Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateHeroMode();
    }
});

function activateHeroMode() {
    showNotification('🎮 HERO MODE ACTIVATED! You found the secret code! Reality is bending! 🦸‍♂️⚡🌟', 'warning');
    document.body.classList.add('hero-mode');
    
    // Create particle effects
    createParticleExplosion();
    
    // Reset after 8 seconds
    setTimeout(() => {
        document.body.classList.remove('hero-mode');
        showNotification('🔄 Reality restored! Thanks for playing! 😄', 'info');
    }, 8000);
}

function createParticleExplosion() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: #FBB32F;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 50) * Math.PI * 2;
        const velocity = 200 + Math.random() * 300;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${vx - 50}%, ${vy - 50}%) scale(0)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Add hero mode styles
const heroModeStyles = `
    .hero-mode {
        animation: heroModeRainbow 3s linear infinite !important;
        filter: saturate(1.5) brightness(1.1);
    }
    
    .hero-mode * {
        animation: heroModeShake 0.5s ease-in-out infinite alternate !important;
    }
    
    @keyframes heroModeRainbow {
        0% { filter: hue-rotate(0deg) saturate(1.5) brightness(1.1); }
        100% { filter: hue-rotate(360deg) saturate(1.5) brightness(1.1); }
    }
    
    @keyframes heroModeShake {
        0% { transform: translateX(0); }
        100% { transform: translateX(2px); }
    }
`;

const heroModeStyleSheet = document.createElement('style');
heroModeStyleSheet.textContent = heroModeStyles;
document.head.appendChild(heroModeStyleSheet);