// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 2000);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
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

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Counter Animation
const statItems = document.querySelectorAll('.stat-item');

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        if (suffix === '%') {
            element.textContent = Math.floor(current) + suffix;
        } else if (suffix === '/7') {
            element.textContent = Math.floor(current) + suffix;
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}

// Trigger counter when stats come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const count = stat.getAttribute('data-count');
            const valueElement = stat.querySelector('.stat-value');
            
            if (count === '10000') {
                animateCounter(valueElement, 10000);
            } else if (count === '999') {
                animateCounter(valueElement, 99.9, '%');
            } else if (count === '247') {
                animateCounter(valueElement, 24, '/7');
            }
            observer.unobserve(stat);
        }
    });
}, observerOptions);

statItems.forEach(stat => observer.observe(stat));

// Feature Card Click Handler
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.feature-title').textContent;
        showToast(`Exploring ${title} technology...`);
    });
});

// Showcase Image Thumbnails
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('showcaseImg');
const showcaseDesc = document.getElementById('showcaseDesc');

const showcaseData = {
    'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600': {
        desc: 'Latest generation combat cyborg with enhanced neural pathways and quantum processing capabilities.'
    },
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600': {
        desc: 'Advanced neural core processor with real-time brain-computer interface technology.'
    },
    'https://images.unsplash.com/photo-1581092335871-4c5c0e7ecb8e?w=600': {
        desc: 'Next-gen nano-armor suit with self-repairing capabilities and adaptive camouflage.'
    }
};

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const imgSrc = thumb.getAttribute('data-img');
        mainImage.src = imgSrc;
        showcaseDesc.textContent = showcaseData[imgSrc].desc;
        
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});

// Button Handlers
// Initiate Upgrade Button
const initiateBtn = document.getElementById('initiateBtn');
if (initiateBtn) {
    initiateBtn.addEventListener('click', () => {
        showToast('⚡ Neural link established! Upgrade sequence initiated...');
        // Add ripple effect
        createRipple(initiateBtn);
    });
}

// Explore Technology Button
const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        showToast('🔮 Exploring cutting-edge cybernetic technologies...');
        createRipple(exploreBtn);
    });
}

// Upgrade Button in Navbar
const upgradeBtn = document.getElementById('upgradeBtn');
if (upgradeBtn) {
    upgradeBtn.addEventListener('click', () => {
        showToast('✨ Welcome to the Cyborg Revolution! ✨');
        createRipple(upgradeBtn);
    });
}

// View Specifications Button
const specsBtn = document.getElementById('specsBtn');
if (specsBtn) {
    specsBtn.addEventListener('click', () => {
        showToast('📊 Loading technical specifications...');
        createRipple(specsBtn);
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const notification = document.getElementById('notification');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            notification.textContent = '✓ Neural link established! Check your inbox for confirmation.';
            notification.className = 'notification success';
            emailInput.value = '';
            showToast('Successfully subscribed!');
            
            setTimeout(() => {
                notification.style.display = 'none';
                notification.className = 'notification';
            }, 3000);
        } else {
            notification.textContent = '✗ Invalid neural email. Please enter a valid email address.';
            notification.className = 'notification error';
            
            setTimeout(() => {
                notification.style.display = 'none';
                notification.className = 'notification';
            }, 3000);
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Ripple Effect
function createRipple(button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple animation to styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinksContainer = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        if (navLinksContainer.style.display === 'flex') {
            navLinksContainer.style.display = 'none';
            menuBtn.classList.remove('active');
        } else {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '70px';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.right = '0';
            navLinksContainer.style.backgroundColor = 'rgba(5, 5, 8, 0.95)';
            navLinksContainer.style.backdropFilter = 'blur(10px)';
            navLinksContainer.style.padding = '20px';
            navLinksContainer.style.gap = '15px';
            menuBtn.classList.add('active');
        }
    });
}

// Scroll indicator click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const featuresSection = document.getElementById('features');
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.feature-card, .showcase-container > *, .newsletter-container');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Parallax effect on hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing effect for hero title (optional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Just for fun - no actual typing effect to keep performance
}

// Console greeting
console.log('%c🚀 Cyborg Nexus - Welcome to the Future!', 'color: #00f3ff; font-size: 16px; font-family: monospace;');
console.log('%cInitialize neural link to begin your upgrade journey.', 'color: #bf00ff; font-size: 12px;');