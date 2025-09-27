// BDE Member Registration System
class BDERegistration {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const form = document.getElementById('memberForm');
        const clearBtn = document.getElementById('clearBtn');
        const registerAnotherBtn = document.getElementById('registerAnotherBtn');
        const copyDataBtn = document.getElementById('copyDataBtn');
        const whatsappBtn = document.getElementById('whatsappBtn');
        const closeDataBtn = document.getElementById('closeDataBtn');

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        clearBtn.addEventListener('click', () => this.clearForm());
        registerAnotherBtn.addEventListener('click', () => this.registerAnother());
        copyDataBtn.addEventListener('click', () => this.copyRegistrationData());
        whatsappBtn.addEventListener('click', () => this.shareViaWhatsApp());
        closeDataBtn.addEventListener('click', () => this.closeRegistrationData());

        // Real-time validation
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // WhatsApp validation
        if (field.name === 'whatsapp' && value) {
            const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid Moroccan phone number';
            }
        }

        // Name validation
        if (field.name === 'fullName' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#e74c3c';
        field.style.backgroundColor = '#fdf2f2';

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.style.borderColor = '#e1e5e9';
        field.style.backgroundColor = '#f8f9fa';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    validateForm() {
        const form = document.getElementById('memberForm');
        const fields = form.querySelectorAll('input[required], select[required]');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }

        const formData = new FormData(e.target);
        const memberData = {
            fullName: formData.get('fullName').trim(),
            email: formData.get('email').trim(),
            whatsapp: formData.get('whatsapp').trim(),
            filiere: formData.get('filiere'),
            niveau: formData.get('niveau'),
            role: formData.get('role').trim()
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberData)
            });

            const result = await response.json();

            if (result.success) {
                this.showSuccessMessage();
                this.showRegistrationData(memberData);
                this.clearForm();
            } else {
                this.showNotification(result.error || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showNotification('Network error. Please try again.', 'error');
        }
    }



    clearForm() {
        const form = document.getElementById('memberForm');
        form.reset();
        
        // Clear all field errors
        const fields = form.querySelectorAll('input, select');
        fields.forEach(field => this.clearFieldError(field));
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        
        // Hide success message after 10 seconds instead of 3
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 10000);
    }

    showRegistrationData(memberData) {
        const registrationData = document.getElementById('registrationData');
        const dataDisplay = document.getElementById('dataDisplay');
        
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const dataText = `BDE Member Registration
========================
Name: ${memberData.fullName}
Email: ${memberData.email}
WhatsApp: ${memberData.whatsapp}
Filière: ${memberData.filiere}
Niveau: ${memberData.niveau}
Role: ${memberData.role}
Registration Date: ${currentDate}
========================
Registration successful! You are now a BDE member.`;
        
        dataDisplay.textContent = dataText;
        registrationData.style.display = 'block';
        
        // Store the current member data for copying
        this.currentMemberData = dataText;
    }

    copyRegistrationData() {
        if (this.currentMemberData) {
            navigator.clipboard.writeText(this.currentMemberData).then(() => {
                this.showNotification('Registration data copied to clipboard!', 'success');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = this.currentMemberData;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showNotification('Registration data copied to clipboard!', 'success');
            });
        }
    }

    closeRegistrationData() {
        const registrationData = document.getElementById('registrationData');
        registrationData.style.display = 'none';
    }

    shareViaWhatsApp() {
        if (this.currentMemberData) {
            // Create WhatsApp message
            const whatsappMessage = `BDE Registration - New Member\n\n${this.currentMemberData}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp Web or app
            const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            
            this.showNotification('Opening WhatsApp to share your registration!', 'success');
        }
    }

    registerAnother() {
        // Hide success message and registration data, then clear form
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('registrationData').style.display = 'none';
        this.clearForm();
        
        // Scroll to top of form
        document.querySelector('.registration-form').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }


    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
let bdeRegistration;
document.addEventListener('DOMContentLoaded', () => {
    bdeRegistration = new BDERegistration();
});