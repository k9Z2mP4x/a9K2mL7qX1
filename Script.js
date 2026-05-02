/**
 * CORE_SYSTEM - Logic Module v1.0
 * Manejo de interactividad y validación de datos.
 */

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // --- 1. GESTIÓN DEL HEADER ---
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.height = '60px'; // Se compacta un poco
        } else {
            header.style.boxShadow = 'none';
            header.style.height = '70px';
        }
    });

    // --- 2. VALIDACIÓN DE FORMULARIO TÉCNICO ---
    const contactForm = document.getElementById('main-contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            
            // Obtención de valores
            const formData = {
                name: document.getElementById('user-name').value.trim(),
                email: document.getElementById('user-email').value.trim(),
                message: document.getElementById('user-message').value.trim()
            };

            // Validación básica de correo corporativo
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (!emailPattern.test(formData.email)) {
                alert("Error: Por favor ingrese un correo electrónico válido.");
                return;
            }

            // Simulación de estado de carga (Loading state)
            try {
                submitBtn.disabled = true;
                submitBtn.innerText = "PROCESANDO REQUERIMIENTO...";
                submitBtn.style.opacity = "0.7";

                // Simulamos una petición al servidor (API Fetch)
                await new Promise(resolve => setTimeout(resolve, 2000));

                console.log("Data enviada exitosamente:", formData);
                alert("Protocolo completado: Su requerimiento ha sido registrado.");
                contactForm.reset();

            } catch (error) {
                console.error("Error en el sistema:", error);
                alert("Fallo en la conexión. Intente nuevamente.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = "1";
            }
        });
    }

    // --- 3. NAVEGACIÓN INTELIGENTE ---
    const links = document.querySelectorAll('.nav-menu a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Solo actuar si es un link interno
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Compensación por el header sticky
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 4. LOG DE SISTEMA (Solo desarrollo) ---
    console.log("CORE_SYSTEM: Módulos cargados y operativos.");
});
