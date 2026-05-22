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
            // 4. Enviamos los datos a tu servidor backend en el puerto 3000
            const respuesta = await fetch('http://localhost:3000/api/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Le avisamos al backend que le enviamos un JSON
                },
                body: JSON.stringify(datosPaciente) // Convertimos el objeto a texto plano tipo JSON
            });

            // Esperamos la respuesta del servidor
            const resultado = await respuesta.json();

            // 5. Si el servidor responde que todo salió bien (Status 200)
            if (respuesta.ok) {
                alert('🎉 ¡Paciente registrado con éxito en la Clínica Vida!');
                formulario.reset(); // Limpia todos los campos del formulario automáticamente
            } else {
                // Si el backend tiró un error controlado
                alert('❌ Error del servidor: ' + resultado.error);
            }

        } catch (error) {
            // Si el servidor backend está apagado o no se pudo conectar
            console.error('Error de conexión:', error);
            alert('⚠️ No se pudo conectar con el servidor. Asegurate de que el backend esté corriendo.');
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

