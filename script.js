// ==========================================================
// 1. BASE DE DATOS LOCAL DE SERVICIOS
// ==========================================================
const infoServicios = {
    "consulta-general": {
        titulo: "Consulta General",
        descripcion: "La consulta general es el primer paso y el más importante para el cuidado de tu salud. Nuestros médicos generales experimentados están capacitados para evaluar de forma integral tu estado físico, diagnosticar padecimientos comunes y orientarte hacia la prevención de enfermedades crónicas.",
        imagen: "Imagen/consultageneral.png",
        incluye: "Evaluación de signos vitales, examen físico completo, historial clínico digital, recetas médicas y lectura de exámenes de laboratorio.",
        staff: "Médicos generales certificados y con amplia experiencia en atención familiar.",
        msgWhatsapp: "Hola Clínica Vida, deseo agendar una Consulta General."
    },
    "pediatria": {
        titulo: "Pediatría Especializada",
        descripcion: "El cuidado de los más pequeños es nuestra prioridad. Nuestro servicio de pediatría ofrece un seguimiento integral del crecimiento y desarrollo de tus hijos, control de vacunas, y tratamiento especializado para enfermedades infantiles en un ambiente cómodo y seguro.",
        imagen: "Imagen/pediatra.jpg",
        incluye: "Control de crecimiento y desarrollo, evaluación nutricional, diagnóstico de enfermedades infantiles y orientación de vacunación.",
        staff: "Pediatras especialistas con alta calidez humana y paciencia para los niños.",
        msgWhatsapp: "Hola Clínica Vida, deseo agendar una cita de Pediatría."
    },
    "cardiologia": {
        titulo: "Cardiología",
        descripcion: "Protege el motor de tu vida. Ofrecemos prevención, diagnóstico oportuno y tratamiento de enfermedades del corazón, hipertensión arterial y alteraciones del sistema circulatorio utilizando tecnología médica avanzada para tu tranquilidad.",
        imagen: "Imagen/cardiologo.jpg",
        incluye: "Evaluación cardiovascular integral, interpretation de electrocardiogramas, control de hipertensión y riesgo cardíaco.",
        staff: "Cardiólogos certificados con amplia trayectoria en salud cardiovascular.",
        msgWhatsapp: "Hola Clínica Vida, deseo agendar una cita de Cardiología."
    },
    "laboratorio": {
        titulo: "Laboratorio Clínico",
        descripcion: "Resultados rápidos y confiables para un diagnóstico certero. Contamos con equipos automatizados de última generación para procesar tus análisis de sangre, orina y pruebas especiales con los más estrictos estándares de calidad.",
        imagen: "Imagen/laboratorio2.jpg",
        incluye: "Exámenes de sangre completos, perfiles lipídicos, pruebas hormonales, análisis generales y entrega de resultados digitales.",
        staff: "Bioanalistas profesionales y técnicos de laboratorio altamente calificados.",
        msgWhatsapp: "Hola Clínica Vida, necesito cotizar/agendar exámenes de Laboratorio Clínico."
    },
    "ultrasonidos": {
        titulo: "Ultrasonidos Diagnósticos",
        descripcion: "Estudios de imagen de alta resolución que permiten evaluar tus órganos internos de forma completamente segura, no invasiva y sin dolor. Ideal para chequeos abdominales, pélvicos, obstétricos y seguimiento médico continuo.",
        imagen: "Imagen/mujer-ultrasonido.jpg",
        incluye: "Ultrasonidos en tiempo real, imágenes impresas o digitales, y reporte médico detallado e interpretado al instante.",
        staff: "Médicos radiólogos y especialistas en diagnóstico por imágenes.",
        msgWhatsapp: "Hola Clínica Vida, deseo agendar un estudio de Ultrasonido."
    },
    "medicina-interna": {
        titulo: "Medicina Interna",
        descripcion: "Atención médica experta y científica para el adulto. El internista se especializa en el diagnóstico y manejo clínico de enfermedades complejas, crónicas o múltiples que afectan a los órganos internos (como diabetes o problemas metabólicos).",
        imagen: "Imagen/medicina-interna.jpg",
        incluye: "Manejo de enfermedades crónicas, chequeos ejecutivos para adultos, tratamientos médicos multiorgánicos y medicina preventiva.",
        staff: "Especialistas en Medicina Interna dedicados al cuidado médico del adulto.",
        msgWhatsapp: "Hola Clínica Vida, deseo agendar una cita de Medicina Interna."
    }
};

// ==========================================================
// 2. VARIABLES GLOBALES (CARRUSEL Y STICKY HEADER)
// ==========================================================
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const header = document.querySelector('.header');
let temporizadorOcultar;

// Funciones globales del Carrusel
function showSlide(index) {
    if (slides.length === 0) return;
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
}

function moveSlide(step) {
    currentSlideIndex += step;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// ==========================================================
// 3. BLOQUE MAESTRO DE INICIALIZACIÓN (DOM CARGADO)
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- CAPTURA DE ELEMENTOS ---
    const formulario = document.getElementById('registroForm');
    const modal = document.getElementById("promoModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const btnLike = document.getElementById("btnLike");
    const likeCountSpan = document.getElementById("likeCount");
    const btnShare = document.getElementById("btnShare");
    const btnComment = document.getElementById("btnComment");
    const commentInput = document.getElementById("commentInput");
    const commentsList = document.getElementById("commentsList");
    const btnCall = document.getElementById("btnCallFlotante");
    
    const botonesVerMas = document.querySelectorAll('.btn-ver-mas');
    const botonesMenu = document.querySelectorAll('.btn-menu-servicio'); 
    const btnVolver = document.getElementById('btn-volver-landing');
    const pantallaServicio = document.getElementById('pantalla-servicio');
    
    const txtTitulo = document.getElementById('detalle-titulo');
    const txtDescripcion = document.getElementById('detalle-descripcion');
    const imgServicio = document.getElementById('detalle-imagen');
    const itemIncluye = document.querySelector('.detalle-item:nth-child(2) p');
    const itemStaff = document.querySelector('.detalle-item:nth-child(3) p');
    const linkWhatsapp = document.getElementById('btn-cta-servicio');

    // Selector preciso de secciones principales de la landing para evitar colapsos
    const seccionesLanding = document.querySelectorAll('#inicio, #promociones, #servicios, #registro, #nosotros, main > section:not(#pantalla-servicio), footer');

    // --- INTERACCIÓN 1: FORMULARIO SUPABASE ---
    if (formulario) {
        formulario.addEventListener('submit', async (evento) => {
            evento.preventDefault();
            const datosPaciente = {
                nombres: document.getElementById('nombres').value,
                apellidos: document.getElementById('apellidos').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value,
                servicio: document.getElementById('servicio').value,
                fecha_registro: document.getElementById('fecha').value
            };

            try {
                const { data, error } = await window._supabase
                    .from('pacientes')
                    .insert([datosPaciente]);

                if (error) throw error;

                alert('¡Paciente registrado con éxito en la Clínica Vida!');
                formulario.reset(); 
            } catch (error) {
                console.error('Error de conexión:', error.message);
                alert('Hubo un problema al registrar: ' + error.message);
            }
        });
    }

    // --- INTERACCIÓN 2: MODAL DE PROMOCIONES ---
    let currentPromoId = "";
    let likesState = { primera_consulta: 0, chequeo_completo: 0, consulta_pediatrica: 0, planes_anuales: 0 };
    let userHasLiked = { primera_consulta: false, chequeo_completo: false, consulta_pediatrica: false, planes_anuales: false };

    document.querySelectorAll(".btn-details").forEach(button => {
        button.addEventListener("click", (e) => {
            const targetButton = e.currentTarget; 
            currentPromoId = targetButton.getAttribute("data-promo") || "promo_generica";
            const title = targetButton.getAttribute("data-title") || "Promoción Especial";
            const desc = targetButton.getAttribute("data-desc") || "Consulta los detalles.";

            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = desc;

            if (likesState[currentPromoId] === undefined) likesState[currentPromoId] = 0;
            if (userHasLiked[currentPromoId] === undefined) userHasLiked[currentPromoId] = false;

            if (likeCountSpan) likeCountSpan.textContent = likesState[currentPromoId];
            
            if (btnLike) {
                if (userHasLiked[currentPromoId]) {
                    btnLike.classList.add("liked");
                    btnLike.innerHTML = `<i class="fas fa-thumbs-up"></i> Te gusta (<span id="likeCount">${likesState[currentPromoId]}</span>)`;
                } else {
                    btnLike.classList.remove("liked");
                    btnLike.innerHTML = `<i class="far fa-thumbs-up"></i> Me gusta (<span id="likeCount">${likesState[currentPromoId]}</span>)`;
                }
            }

            if (commentsList) commentsList.innerHTML = "";
            if (commentInput) commentInput.value = "";
            if (modal) modal.style.display = "flex";

            console.log(`[GA4] Evento: ver_promocion | ID: ${currentPromoId}`);
        });
    });

    const closeModal = () => { if (modal) modal.style.display = "none"; };
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    if (btnLike) {
        btnLike.addEventListener("click", () => {
            if (!userHasLiked[currentPromoId]) {
                likesState[currentPromoId]++;
                userHasLiked[currentPromoId] = true;
                console.log(`[GA4] Evento: interaccion_promo | Acción: like | ID: ${currentPromoId}`);
            } else {
                likesState[currentPromoId]--;
                userHasLiked[currentPromoId] = false;
            }
            
            const countSpan = document.getElementById("likeCount");
            if (countSpan) countSpan.textContent = likesState[currentPromoId];
            btnLike.classList.toggle("liked");
            
            if (userHasLiked[currentPromoId]) {
                btnLike.innerHTML = `<i class="fas fa-thumbs-up"></i> Te gusta (<span id="likeCount">${likesState[currentPromoId]}</span>)`;
            } else {
                btnLike.innerHTML = `<i class="far fa-thumbs-up"></i> Me gusta (<span id="likeCount">${likesState[currentPromoId]}</span>)`;
            }
        });
    }

    if (btnShare) {
        btnShare.addEventListener("click", () => {
            alert("¡Enlace de promoción copiado al portapapeles!");
            console.log(`[GA4] Evento: interaccion_promo | Acción: compartir | ID: ${currentPromoId}`);
        });
    }

    if (btnComment) {
        btnComment.addEventListener("click", () => {
            const text = commentInput.value.trim();
            if (text === "" || !commentsList) return;

            const commentDiv = document.createElement("div");
            commentDiv.className = "user-comment";
            commentDiv.innerText = text;
            commentsList.appendChild(commentDiv);
            commentInput.value = "";
            commentsList.scrollTop = commentsList.scrollHeight;

            console.log(`[GA4] Evento: interaccion_promo | Acción: comentario | ID: ${currentPromoId}`);
        });
    }

    // --- INTERACCIÓN 3: METRICAS DE LLAMADA ---
    if (btnCall) {
        btnCall.addEventListener("click", () => {
            if (typeof gtag !== "undefined") {
                gtag("event", "click_llamada", { "conversion_type": "macro_contact", "ubicacion": "boton_flotante" });
            } else {
                console.log("[GA4] Evento: click_llamada | Destino: tel de la clínica");
            }
        });
    }

    // --- INTERACCIÓN 4: LÓGICA DE APERTURA DE SERVICIOS ADAPTADA PARA MÓVILES ---
    function abrirServicio(idServicio) {
        const datos = infoServicios[idServicio];
        
        if (datos) {
            if (txtTitulo) txtTitulo.innerText = datos.titulo;
            if (txtDescripcion) txtDescripcion.innerText = datos.descripcion;
            if (imgServicio) {
                imgServicio.src = datos.imagen;
                imgServicio.alt = datos.titulo;
            }
            if (itemIncluye) itemIncluye.innerHTML = datos.incluye;
            if (itemStaff) itemStaff.innerHTML = datos.staff;
            if (linkWhatsapp) {
                linkWhatsapp.href = `https://wa.me/50577573241?text=${encodeURIComponent(datos.msgWhatsapp)}`;
            }

            // 1. Forzamos el encendido estructurado de la pantalla de detalles ANTES de ocultar
            if (pantallaServicio) {
                pantallaServicio.style.display = 'block';
                pantallaServicio.classList.add('activa');
            }

            // 2. Ocultamos de forma segura las secciones de la landing principal
            seccionesLanding.forEach(sec => {
                if (sec) sec.style.display = 'none';
            });

            // 3. Reseteamos el scroll de inmediato al tope absoluto de la pantalla de detalles
            window.scrollTo(0, 0);
            if (pantallaServicio) {
                pantallaServicio.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        }
    }

    // Oyentes para las tarjetas (Ver más)
    botonesVerMas.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); 
            event.stopPropagation(); 
            const idServicio = btn.getAttribute('data-servicio');
            abrirServicio(idServicio);
        });
    });

    // Oyentes para el menú de navegación dropdown
    botonesMenu.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const idServicio = link.getAttribute('data-servicio');
            abrirServicio(idServicio);
        });
    });

    // Botón Volver a la Landing principal
    if (btnVolver) {
        btnVolver.addEventListener('click', (e) => {
            e.preventDefault();
            if (pantallaServicio) {
                pantallaServicio.style.display = 'none';
                pantallaServicio.classList.remove('activa');
            }
            
            // Re-encendemos las secciones ocultas
            seccionesLanding.forEach(sec => {
                if (sec) sec.style.display = '';
            });
            
            // Regresa la vista suavemente a la cuadrícula de servicios
            const seccionServicios = document.getElementById('servicios');
            if (seccionServicios) {
                seccionServicios.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- INICIALIZACIONES INTERNAS (SLIDER AUTOMÁTICO) ---
    if (slides.length > 0) {
        showSlide(currentSlideIndex);
        setInterval(() => { moveSlide(1); }, 5000);
    }
});

// ==========================================================
// 4. COMPORTAMIENTO INTELIGENTE DEL HEADER (STICKY-HIDE)
// ==========================================================
function mostrarHeader() {
    if (header) {
        header.classList.remove('oculto');
        reiniciarTemporizador();
    }
}

function reiniciarTemporizador() {
    clearTimeout(temporizadorOcultar);
    if (window.scrollY === 0) return;

    temporizadorOcultar = setTimeout(() => {
        if (header) header.classList.add('oculto');
    }, 2000); 
}

window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        mostrarHeader();
    } else {
        if (header && header.classList.contains('oculto')) {
            header.classList.remove('oculto');
        }
        reiniciarTemporizador();
    }
});

window.addEventListener('mousemove', (evento) => {
    if (evento.clientY <= 50) {
        mostrarHeader();
    }
});

// Lanzamiento inicial del temporizador del menú
reiniciarTemporizador();