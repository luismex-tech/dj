document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE LOS PAQUETES PARA EL MODAL ---
    const packageDetails = {
        esencial: {
            title: "Paquete Esencial",
            price: "$4,500 MXN",
            description: "Perfecto para reuniones pequeñas o eventos donde la música es el complemento ideal. Calidad y profesionalismo garantizados.",
            features: [
                "DJ profesional durante 4 horas continuas.",
                "Equipo de audio de alta fidelidad para hasta 80 personas.",
                "Set de luces LED ambientales para crear atmósfera.",
                "Música versátil de todos los géneros."
            ]
        },
        fiesta: {
            title: "Paquete Fiesta",
            price: "$8,000 MXN",
            description: "Eleva tu celebración a otro nivel. Ideal para cumpleaños, XV años y eventos corporativos que buscan energía y diversión.",
            features: [
                "DJ profesional durante 5 horas.",
                "Equipo de audio profesional para hasta 150 personas.",
                "Cabina de DJ iluminada con LED.",
                "Show de luces robóticas y láser.",
                "Máquina de humo para ambientación."
            ]
        },
        premium: {
            title: "Paquete Premium",
            price: "$15,000 MXN",
            description: "La experiencia audiovisual completa. Combina música y video para un impacto inolvidable, perfecto para grandes celebraciones.",
            features: [
                "DJ y VJ (video jockey) durante 6 horas.",
                "Sistema de audio tipo concierto para más de 200 personas.",
                "Pantalla LED gigante para videos musicales y visuales.",
                "2 disparos de pirotecnia fría (chisperos).",
                "Souvenirs de animación (globos, antifaces, etc.)."
            ]
        }
    };

    // --- LÓGICA DEL MODAL ---
    const packageButtons = document.querySelectorAll('.package-card .btn');
    const modalOverlay = document.getElementById('package-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('modal-close-btn');

    packageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const packageKey = button.dataset.package;
            const details = packageDetails[packageKey];

            if (details) {
                modalBody.innerHTML = `
                    <h3>${details.title}</h3>
                    <p class="price">${details.price}</p>
                    <p>${details.description}</p>
                    <ul>
                        ${details.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                `;
                modalOverlay.classList.add('show-modal');
            }
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('show-modal');
    };

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // --- LÓGICA DEL FORMULARIO Y WHATSAPP ---
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const eventDate = document.getElementById('event-date').value;
        const selectedPackage = document.getElementById('package-select').value;
        const comments = document.getElementById('comments').value.trim();

        // Validación simple
        if (!name || !phone || !eventDate || !selectedPackage) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert('Por favor, introduce un número de teléfono válido de 10 dígitos.');
            return;
        }

        // **IMPORTANTE: Reemplaza este número con tu número de WhatsApp real**
        // Incluye el código de país (52 para México) y el 1 después.
        const yourWhatsAppNumber = '5214776772422';

        const message = `
¡Hola Candela Party DJ! 🔥
Quisiera cotizar un evento.

👤 *Nombre:* ${name}
📞 *Teléfono:* ${phone}
🗓️ *Fecha del Evento:* ${eventDate}
📦 *Paquete de Interés:* ${selectedPackage}
📝 *Comentarios:* ${comments || 'Ninguno'}
        `;

        const whatsappURL = `https://wa.me/${yourWhatsAppNumber}?text=${encodeURIComponent(message.trim())}`;

        window.open(whatsappURL, '_blank');
    });

    // --- LÓGICA MENÚ HAMBURGUESA ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.main-nav');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // --- CERRAR MENÚ AL HACER CLIC EN UN ENLACE ---
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
});
