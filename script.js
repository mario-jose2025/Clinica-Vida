// Esperamos a que todo el HTML de la página esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Atrapamos el formulario usando su ID
    const formulario = document.getElementById('registroForm');

    // 2. Escuchamos el momento en que el usuario le dé al botón de enviar (submit)
    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault(); // Evita que la página se recargue y borre los datos

        // 3. Capturamos los datos que el usuario escribió en los inputs
        const datosPaciente = {
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            servicio: document.getElementById('servicio').value,
            fecha_registro: document.getElementById('fecha').value
        };

               try {
            // Enviamos los datos usando la conexión que inyectamos en el HTML
            const { data, error } = await window._supabase
                .from('pacientes')
                .insert([datosPaciente]);

            if (error) throw error;

            alert('¡Paciente registrado con éxito en la Clínica Vida!');
            formulario.reset(); 

        } catch (error) {
            console.error('Error de conexión:', error.message);
            alert(' Hubo un problema al registrar: ' + error.message);
        }

    });
});
document.addEventListener("DOMContentLoaded", () => {
    // === ELEMENTOS DEL DOM ===
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

    // Variables de estado inicializadas para las 4 promociones de tu HTML
    let currentPromoId = "";
    let likesState = { 
        primera_consulta: 0, 
        chequeo_completo: 0, 
        consulta_pediatrica: 0, 
        planes_anuales: 0 
    };
    let userHasLiked = { 
        primera_consulta: false, 
        chequeo_completo: false, 
        consulta_pediatrica: false, 
        planes_anuales: false 
    };

    // === 1. ABRIR EL MODAL DINÁMICAMENTE (A PRUEBA DE FALLOS) ===
    document.querySelectorAll(".btn-details").forEach(button => {
        button.addEventListener("click", (e) => {
            const targetButton = e.currentTarget; 
            
            // Capturar datos del HTML
            currentPromoId = targetButton.getAttribute("data-promo") || "promo_generica";
            const title = targetButton.getAttribute("data-title") || "Promoción Especial";
            const desc = targetButton.getAttribute("data-desc") || "Consulta los detalles.";

            // Inyectar textos al Modal
            modalTitle.textContent = title;
            modalDescription.textContent = desc;

            // Control antibugs por si acaso
            if (likesState[currentPromoId] === undefined) likesState[currentPromoId] = 0;
            if (userHasLiked[currentPromoId] === undefined) userHasLiked[currentPromoId] = false;

            // Renderizar estado de los likes
            likeCountSpan.textContent = likesState[currentPromoId];
            
            if (userHasLiked[currentPromoId]) {
                btnLike.classList.add("liked");
                btnLike.innerHTML = `<i class="fas fa-thumbs-up"></i> Te gusta (<span id="likeCount">${likesState[currentPromoId]}</span>)`;
            } else {
                btnLike.classList.remove("liked");
                btnLike.innerHTML = `<i class="far fa-thumbs-up"></i> Me gusta (<span id="likeCount">${likesState[currentPromoId]}</span>)`;
            }

            // Limpiar caja de comentarios de la vista anterior
            commentsList.innerHTML = "";
            commentInput.value = "";

            // Mostrar la ventana flotante
            modal.style.display = "flex";

            // [MÉTRICA GA4 SIMULADA]
            console.log(`[GA4] Evento: ver_promocion | ID: ${currentPromoId}`);
        });
    });

    // === 2. CERRAR EL MODAL ===
    const closeModal = () => { modal.style.display = "none"; };
    closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    // === 3. INTERACCIÓN: DAR LIKE ===
    btnLike.addEventListener("click", () => {
        if (!userHasLiked[currentPromoId]) {
            likesState[currentPromoId]++;
            userHasLiked[currentPromoId] = true;
            console.log(`[GA4] Evento: interaccion_promo | Acción: like | ID: ${currentPromoId}`);
        } else {
            likesState[currentPromoId]--;
            userHasLiked[currentPromoId] = false;
        }
        
        // Actualizar interfaz
        likeCountSpan.textContent = likesState[currentPromoId];
        btnLike.classList.toggle("liked");
        
        // Mantener el texto e icono correcto al presionar
        if (userHasLiked[currentPromoId]) {
            btnLike.innerHTML = `<i class="fas fa-thumbs-up"></i> Te gusta (<span id="likeCount">${likesState[currentPromoId]}</span>)`;
        } else {
            btnLike.innerHTML = `<i class="far fa-thumbs-up"></i> Me gusta (<span id="likeCount">${likesState[currentPromoId]}</span>)`;
        }
    });

    // === 4. INTERACCIÓN: COMPARTIR ===
    btnShare.addEventListener("click", () => {
        alert("¡Enlace de promoción copiado al portapapeles!");
        console.log(`[GA4] Evento: interaccion_promo | Acción: compartir | ID: ${currentPromoId}`);
    });

    // === 5. INTERACCIÓN: COMENTAR ===
    btnComment.addEventListener("click", () => {
        const text = commentInput.value.trim();
        if (text === "") return;

        const commentDiv = document.createElement("div");
        commentDiv.className = "user-comment";
        commentDiv.innerText = text;
        commentsList.appendChild(commentDiv);
        commentInput.value = "";
        commentsList.scrollTop = commentsList.scrollHeight;

        console.log(`[GA4] Evento: interaccion_promo | Acción: comentario | ID: ${currentPromoId}`);
    });
});
    // === TRACKING BOTÓN DE LLAMADA (GA4) ===
    const btnCall = document.getElementById("btnCallFlotante");
    if (btnCall) {
        btnCall.addEventListener("click", () => {
            if (typeof gtag !== "undefined") {
                gtag("event", "click_llamada", {
                    "conversion_type": "macro_contact",
                    "ubicacion": "boton_flotante"
                });
            } else {
                console.log("[GA4] Evento: click_llamada | Destino: tel de la clínica");
            }
        });
    }
    // === ESTO DEL CARRUCEL DE LAS IMG===

    let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function moveSlide(step) {
    currentSlideIndex += step;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// Slider automático
setInterval(() => {
    moveSlide(1);
}, 5000);
// ==========================================================
// COMPORTAMIENTO INTELIGENTE DEL HEADER (STICKY-HIDE)
// ==========================================================

const header = document.querySelector('.header');
let temporizadorOcultar;

// Función para mostrar el menú
function mostrarHeader() {
    if (header) {
        header.classList.remove('oculto');
        reiniciarTemporizador(); // Al mostrarlo, volvemos a contar los segundos
    }
}

// Función para iniciar el conteo de los 2 segundos para ocultar
function reiniciarTemporizador() {
    clearTimeout(temporizadorOcultar); // Limpiamos cualquier conteo previo
    
    // Si el usuario está arriba del todo de la página (scroll en 0), no lo ocultamos
    if (window.scrollY === 0) return;

    // Iniciamos la cuenta regresiva de 2000 milisegundos (2 segundos)
    temporizadorOcultar = setTimeout(() => {
        if (header) {
            header.classList.add('oculto');
        }
    }, 2000); 
}

// Evento 1: Cuando el usuario hace scroll (baja o sube)
window.addEventListener('scroll', () => {
    // Si vuelve arriba del todo, forzar que se muestre siempre
    if (window.scrollY === 0) {
        mostrarHeader();
    } else {
        // Si va bajando, se muestra momentáneamente y activa la cuenta regresiva
        if (header.classList.contains('oculto')) {
            header.classList.remove('oculto');
        }
        reiniciarTemporizador();
    }
});

// Evento 2: Detectar si el puntero del mouse se acerca al borde superior de la pantalla
window.addEventListener('mousemove', (evento) => {
    // Si el mouse está a menos de 50 píxeles del borde superior, el menú baja inmediatamente
    if (evento.clientY <= 50) {
        mostrarHeader();
    }
});

// Arrancar el conteo la primera vez que carga la página
reiniciarTemporizador();


// ==========================================================
// LÓGICA DINÁMICA DE SERVICIOS (SCRIPT.JS)
// ==========================================================

// Base de datos local con la info de cada servicio
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
        incluye: "Evaluación cardiovascular integral, interpretación de electrocardiogramas, control de hipertensión y riesgo cardíaco.",
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

document.addEventListener('DOMContentLoaded', () => {
    const botonesVerMas = document.querySelectorAll('.btn-ver-mas');
    const botonesMenu = document.querySelectorAll('.btn-menu-servicio'); 
    const btnVolver = document.getElementById('btn-volver-landing');
    const pantallaServicio = document.getElementById('pantalla-servicio');
    
    // Elementos de la pantalla de detalles que vamos a cambiar dinámicamente
    const txtTitulo = document.getElementById('detalle-titulo');
    const txtDescripcion = document.getElementById('detalle-descripcion');
    const imgServicio = document.getElementById('detalle-imagen');
    const itemIncluye = document.querySelector('.detalle-item:nth-child(2) p');
    const itemStaff = document.querySelector('.detalle-item:nth-child(3) p');
    const linkWhatsapp = document.getElementById('btn-cta-servicio');

    // Secciones de la landing principal a ocultar
    const seccionesLanding = document.querySelectorAll('main, section, .hero, .hero-section, #inicio, #promociones, #registro, #nosotros, footer');

    // Función que arma la pantalla con el servicio seleccionado
    function abrirServicio(idServicio) {
        const datos = infoServicios[idServicio];
        
        if (datos) {
            // Reemplazamos los textos e imágenes con la info del objeto
            txtTitulo.innerText = datos.titulo;
            txtDescripcion.innerText = datos.descripcion;
            imgServicio.src = datos.imagen;
            imgServicio.alt = datos.titulo;
            itemIncluye.innerHTML = datos.incluye;
            itemStaff.innerHTML = datos.staff;
        
            linkWhatsapp.href = `https://wa.me/50577573241?text=${encodeURIComponent(datos.msgWhatsapp)}`;

            // Ocultamos landing y mostramos detalles
            seccionesLanding.forEach(sec => sec.style.display = 'none');
            pantallaServicio.classList.add('activa');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
       // Escuchar clics en los botones "Ver más" de las tarjetas
    botonesVerMas.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); 
            event.stopPropagation(); 

            const idServicio = btn.getAttribute('data-servicio');
            abrirServicio(idServicio);

            // 💥 LA SOLUCIÓN: BAJAR AUTOMÁTICAMENTE HACIA EL DETALLE 💥
            // Reemplaza '.detalle-contenedor' por la clase o ID real de tu sección de detalles
            const seccionDetalle = document.querySelector('.detalle-contenedor'); 
            
            if (seccionDetalle) {
                seccionDetalle.scrollIntoView({ 
                    behavior: 'smooth', // Hace que baje con un deslizamiento suave y elegante
                    block: 'start'      // Alinea la pantalla justo al inicio de la información
                });
            }
        });
    });


    // Escuchar clics en el menú dropdown (opcional)
    botonesMenu.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que salte de golpe
            const idServicio = link.getAttribute('data-servicio');
            abrirServicio(idServicio);
        });
    });

    // Acción al dar clic en "Volver"
    if (btnVolver) {
        btnVolver.addEventListener('click', () => {
            pantallaServicio.classList.remove('activa');
            seccionesLanding.forEach(sec => sec.style.display = '');
            
            const seccionServicios = document.getElementById('servicios');
            if (seccionServicios) {
                seccionServicios.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
