
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.querySelector('.back-to-top');
const currentYearSpan = document.getElementById('currentYear');
const messageForm = document.getElementById('messageForm');
const statNumbers = document.querySelectorAll('.stat-number');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    updateActiveNavLink();
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const animateCounter = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
};

if (messageForm) {
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(messageForm);
        const status = document.getElementById("messageForm-status");
        
        try {
            const response = await fetch(messageForm.action, {
                method: messageForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                messageForm.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                     showFormMessage(data["errors"].map(error => error["message"]).join(", "), 'error');
                } else {
                    showFormMessage('Oops! There was a problem submitting your form', 'error');
                }
            }
        } catch (error) {
            showFormMessage('Oops! There was a problem submitting your form', 'error');
        }
    });
}


const showFormMessage = (message, type) => {
    
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    
    messageElement.style.cssText = `
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: ${type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
        color: ${type === 'success' ? '#10b981' : '#ef4444'};
        border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
    `;
    
  
    messageForm.parentNode.insertBefore(messageElement, messageForm.nextSibling);
    
    
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
};


const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}


document.addEventListener('DOMContentLoaded', () => {
   
    animateCounter();
    
    
    updateActiveNavLink();
    
        document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.project-image i');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.project-image i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    
    const heroTitle = document.querySelector('.main-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
       
        setTimeout(typeWriter, 500);
    }

    // Skill Bar Animation
    const skillCards = document.querySelectorAll('.tech-skill-card');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => {
        skillObserver.observe(card);
    });
});


const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary) !important;
    }
    .nav-links a.active::after {
        width: 100% !important;
    }
    .form-message {
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
document.head.appendChild(style);