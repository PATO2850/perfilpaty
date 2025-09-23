// ===== CONFIGURACIÓN INICIAL =====
// Esperamos a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // ===== NAVEGACIÓN MÓVIL =====
  // Obtenemos referencias a los elementos del menú hamburguesa
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Función para alternar el menú móvil
  function toggleMobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  // Event listener para el botón hamburguesa
  if (hamburger) {
    hamburger.addEventListener("click", toggleMobileMenu);
  }

  // Cerrar menú móvil al hacer clic en un enlace
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // ===== SCROLL SUAVE Y NAVEGACIÓN ACTIVA =====
  // Función para actualizar el enlace activo en la navegación
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remover clase activa de todos los enlaces
        navLinks.forEach((link) => link.classList.remove("active"));
        // Agregar clase activa al enlace correspondiente
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  }

  // Event listener para el scroll
  window.addEventListener("scroll", updateActiveNavLink);

  // ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
  // Función para animar las barras de habilidades cuando sean visibles
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !bar.classList.contains("animated")) {
        const width = bar.getAttribute("data-width");
        bar.style.width = width;
        bar.classList.add("animated");
      }
    });
  }

  // Event listener para animar barras de habilidades
  window.addEventListener("scroll", animateSkillBars);

  // ===== FORMULARIO DE CONTACTO =====
  // Obtenemos referencia al formulario de contacto
  const contactForm = document.getElementById("contactForm");

  // Función para validar el formulario
  function validateForm(formData) {
    const errors = [];

    // Validar nombre
    if (!formData.nombre.trim()) {
      errors.push("El nombre es requerido");
    } else if (formData.nombre.trim().length < 2) {
      errors.push("El nombre debe tener al menos 2 caracteres");
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.push("El correo electrónico es requerido");
    } else if (!emailRegex.test(formData.email)) {
      errors.push("Ingresa un correo electrónico válido");
    }

    // Validar mensaje
    if (!formData.mensaje.trim()) {
      errors.push("El mensaje es requerido");
    } else if (formData.mensaje.trim().length < 10) {
      errors.push("El mensaje debe tener al menos 10 caracteres");
    }

    return errors;
  }

  // Función para mostrar mensajes de error
  function showErrors(errors) {
    // Remover mensajes de error anteriores
    const existingErrors = document.querySelectorAll(".error-message");
    existingErrors.forEach((error) => error.remove());

    // Mostrar nuevos errores
    errors.forEach((error) => {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.style.color = "#e91e63";
      errorDiv.style.fontSize = "0.9rem";
      errorDiv.style.marginTop = "0.5rem";
      errorDiv.textContent = error;

      // Insertar después del formulario
      contactForm.appendChild(errorDiv);
    });
  }

  // Función para mostrar mensaje de éxito
  function showSuccessMessage() {
    // Remover mensajes anteriores
    const existingMessages = document.querySelectorAll(
      ".error-message, .success-message"
    );
    existingMessages.forEach((message) => message.remove());

    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.style.color = "#4caf50";
    successDiv.style.fontSize = "1rem";
    successDiv.style.marginTop = "1rem";
    successDiv.style.padding = "1rem";
    successDiv.style.backgroundColor = "#e8f5e8";
    successDiv.style.borderRadius = "8px";
    successDiv.style.border = "1px solid #4caf50";
    successDiv.textContent =
      "¡Mensaje enviado correctamente! Te contactaremos pronto.";

    contactForm.appendChild(successDiv);
  }

  // Función para limpiar el formulario
  function clearForm() {
    contactForm.reset();
  }

  // Event listener para el envío del formulario
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      // Prevenir el comportamiento por defecto del formulario
      e.preventDefault();

      // Obtener los datos del formulario
      const formData = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        mensaje: document.getElementById("mensaje").value,
      };

      // Validar el formulario
      const errors = validateForm(formData);

      if (errors.length > 0) {
        // Mostrar errores
        showErrors(errors);
      } else {
        // Simular envío exitoso
        console.log("Formulario enviado correctamente");
        console.log("Datos del formulario:", formData);

        // Mostrar mensaje de éxito
        showSuccessMessage();

        // Limpiar el formulario después de 2 segundos
        setTimeout(() => {
          clearForm();
          const successMessage = document.querySelector(".success-message");
          if (successMessage) {
            successMessage.remove();
          }
        }, 3000);
      }
    });
  }

  // ===== EFECTOS DE SCROLL PARA NAVBAR =====
  // Función para cambiar el estilo de la navbar al hacer scroll
  function handleNavbarScroll() {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(233, 30, 99, 0.15)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 20px rgba(233, 30, 99, 0.1)";
    }
  }

  // Event listener para el scroll de la navbar
  window.addEventListener("scroll", handleNavbarScroll);

  // ===== ANIMACIÓN DE ENTRADA PARA ELEMENTOS =====
  // Función para animar elementos cuando entran en vista
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".experience-card, .project-card"
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !element.classList.contains("animate-in")) {
        element.classList.add("animate-in");
        element.style.animation = "fadeInUp 0.6s ease forwards";
      }
    });
  }

  // Event listener para animaciones de scroll
  window.addEventListener("scroll", animateOnScroll);

  // ===== EFECTOS HOVER PARA TARJETAS =====
  // Agregar efectos hover mejorados a las tarjetas
  const cards = document.querySelectorAll(".experience-card, .project-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // ===== INICIALIZACIÓN =====
  // Ejecutar funciones iniciales
  updateActiveNavLink();
  animateSkillBars();
  animateOnScroll();

  console.log("Portafolio de Patricia Jaimes cargado correctamente");
  console.log("Funcionalidades disponibles:");
  console.log("- Navegación móvil responsive");
  console.log("- Formulario de contacto con validación");
  console.log("- Animaciones de scroll");
  console.log("- Barras de habilidades animadas");
  console.log("- Efectos hover interactivos");
});

// ===== FUNCIONES ADICIONALES =====
// Función para copiar número de WhatsApp al portapapeles
function copyWhatsAppNumber() {
  const phoneNumber = "573174954137";
  navigator.clipboard
    .writeText(phoneNumber)
    .then(() => {
      alert("Número de WhatsApp copiado al portapapeles");
    })
    .catch(() => {
      alert("No se pudo copiar el número. Número: +57 317 495 4137");
    });
}

// Función para abrir WhatsApp directamente
function openWhatsApp() {
  const phoneNumber = "573174954137";
  const message =
    "Hola Patricia, me interesa conocer más sobre tus servicios contables.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
}

// ===== MANEJO DE ERRORES =====
// Función para manejar errores de JavaScript
window.addEventListener("error", function (e) {
  console.error("Error en el portafolio:", e.error);
});

// Función para manejar errores de recursos no cargados
window.addEventListener("unhandledrejection", function (e) {
  console.error("Promesa rechazada:", e.reason);
});
