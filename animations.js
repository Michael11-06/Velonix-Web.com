// Animaciones adicionales para Velonix

document.addEventListener('DOMContentLoaded', function() {
    // Efecto parallax para el hero
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Animación de máquina de escribir para el hero
    const heroTitle = document.querySelector('.hero h1');
    
    if (heroTitle) {
        // Guardar el texto original
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Mantener el cursor parpadeando
                heroTitle.style.borderRight = '0.15em solid var(--accent-color)';
                setInterval(() => {
                    heroTitle.style.borderRightColor = heroTitle.style.borderRightColor === 'transparent' ? 'var(--accent-color)' : 'transparent';
                }, 750);
            }
        };
        
        // Iniciar la animación después de un breve retraso
        setTimeout(typeWriter, 500);
    }
    
    // Animación de aparición escalonada para las tarjetas de tecnología
    const techCards = document.querySelectorAll('.tech-card');
    
    if (techCards.length > 0) {
        const techObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                    techObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        techCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            techObserver.observe(card);
        });
    }
    
    // Efecto de tilt en las tarjetas
    if (techCards.length > 0) {
        techCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const cardRect = this.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const angleY = (x - centerX) / 25;
                const angleX = (centerY - y) / 25;
                
                this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
    
    // Animación de partículas para el fondo del hero (opcional)
    function createParticles() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        `;
        
        heroSection.style.position = 'relative';
        heroSection.appendChild(particlesContainer);
        
        // Crear partículas
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: float 15s infinite linear;
            `;
            
            // Posición aleatoria
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            
            particlesContainer.appendChild(particle);
        }
        
        // Añadir keyframes para la animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(20px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Iniciar partículas
    createParticles();
});