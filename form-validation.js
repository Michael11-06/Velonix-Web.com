// Validación del formulario de contacto

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simular envío del formulario
                simulateFormSubmission();
            }
        });
        
        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
    
    function validateForm() {
        let isValid = true;
        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';
        
        // Limpiar errores previos
        clearError(field);
        
        // Validaciones específicas por campo
        switch(fieldName) {
            case 'name':
                if (value === '') {
                    errorMessage = 'El nombre es obligatorio';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                    isValid = false;
                }
                break;
                
            case 'email':
                if (value === '') {
                    errorMessage = 'El correo electrónico es obligatorio';
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    errorMessage = 'Por favor, introduce un correo electrónico válido';
                    isValid = false;
                }
                break;
                
            case 'subject':
                if (value === '') {
                    errorMessage = 'El asunto es obligatorio';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (value === '') {
                    errorMessage = 'El mensaje es obligatorio';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                    isValid = false;
                }
                break;
        }
        
        // Mostrar error si existe
        if (!isValid) {
            showError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
    }
    
    function clearError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function simulateFormSubmission() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Cambiar texto del botón y deshabilitarlo
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular tiempo de envío
        setTimeout(() => {
            // Mostrar mensaje de éxito
            showSuccessMessage();
            
            // Restaurar botón
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Limpiar formulario
            contactForm.reset();
        }, 2000);
    }
    
    function showSuccessMessage() {
        // Crear elemento de mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
        successMessage.style.cssText = `
            background-color: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            border: 1px solid #c3e6cb;
        `;
        
        // Insertar antes del formulario
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Eliminar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
});