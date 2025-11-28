// Paleta de colores navideña reducida
const christmasColors = {
    red: '#8B0000',
    green: '#006400', 
    gold: '#FFD700',
    darkBlue: '#0a2e36'
};

// Función para crear efecto de nieve mejorado
function createSnowflakes() {
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    document.body.appendChild(snowContainer);
    
    // Crear más copos de nieve con mejor distribución
    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        
        // Propiedades aleatorias más variadas
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 20;
        const delay = Math.random() * 15;
        const size = 0.8 + Math.random() * 1.5;
        const opacity = 0.4 + Math.random() * 0.6;
        const spin = Math.random() * 360;
        
        snowflake.style.left = `${left}vw`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        snowflake.style.fontSize = `${size}em`;
        snowflake.style.opacity = opacity;
        snowflake.style.transform = `rotate(${spin}deg)`;
        
        snowContainer.appendChild(snowflake);
    }
}

// Función para crear banners navideños
function createChristmasBanners() {
    createMainBanner();
    createSecondaryBanner();
}

// Banner principal superior
function createMainBanner() {
    const banner = document.querySelector('.christmas-banner');
    if (!banner) return;
    
    banner.innerHTML = '';
    
    const slider = document.createElement('div');
    slider.classList.add('banner-slider');
    
    const decorations = ['🎄', '🎅', '🤶', '🦌', '🔔', '⭐', '🎁', '❄'];
    
    // Crear múltiples conjuntos para desplazamiento continuo
    for (let set = 0; set < 4; set++) {
        decorations.forEach(decoration => {
            const item = document.createElement('span');
            item.classList.add('banner-item');
            item.innerHTML = decoration;
            slider.appendChild(item);
        });
    }
    
    banner.appendChild(slider);
}

// Banner secundario inferior
function createSecondaryBanner() {
    // Crear banner secundario si no existe
    let secondaryBanner = document.querySelector('.christmas-banner-secondary');
    if (!secondaryBanner) {
        secondaryBanner = document.createElement('div');
        secondaryBanner.classList.add('christmas-banner-secondary');
        document.body.insertBefore(secondaryBanner, document.querySelector('footer'));
    }
    
    secondaryBanner.innerHTML = '';
    
    const slider = document.createElement('div');
    slider.classList.add('banner-slider-reverse');
    
    const messages = [
        '🎄 ¡Feliz Navidad! 🎄',
        '🎅 Disfruta SOLÚ estas fiestas 🎅',
        '⭐ Regala salud con SOLÚ ⭐',
        '🎁 Perfecto para cenas navideñas 🎁',
        '❄ Sabor navideño en cada sorbo ❄'
    ];
    
    // Crear mensajes para el banner
    for (let set = 0; set < 3; set++) {
        messages.forEach(message => {
            const item = document.createElement('span');
            item.classList.add('banner-text');
            item.innerHTML = message;
            slider.appendChild(item);
        });
    }
    
    secondaryBanner.appendChild(slider);
}

// Función para aplicar estilos navideños a elementos específicos
function applyChristmasStyles() {
    // Agregar clase especial al header
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('christmas-header');
    }
    
    // Aplicar estilos a elementos de valor
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.classList.add('christmas-value-item');
    });
}

// Función para alternar tema navideño
function toggleChristmasTheme() {
    const body = document.body;
    const isChristmas = body.classList.toggle('christmas-theme');
    
    // Guardar preferencia
    localStorage.setItem('christmasTheme', isChristmas);
    
    // Actualizar botón
    const button = document.querySelector('.theme-toggle');
    if (button) {
        button.textContent = isChristmas ? 'Tema Normal' : 'Tema Navideño';
        button.style.backgroundColor = isChristmas ? 
            christmasColors.red : 'var(--color-marca)';
    }
    
    // Aplicar o quitar efectos
    if (isChristmas) {
        createSnowflakes();
        createChristmasBanners();
        applyChristmasStyles();
    } else {
        removeChristmasEffects();
    }
}

// Función para eliminar efectos navideños
function removeChristmasEffects() {
    const snowContainer = document.getElementById('snow-container');
    if (snowContainer) {
        snowContainer.remove();
    }
    
    const floatingDecorations = document.querySelectorAll('.floating-decoration');
    floatingDecorations.forEach(decor => decor.remove());
    
    const header = document.querySelector('header');
    if (header) {
        header.classList.remove('christmas-header');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem('christmasTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('christmas-theme');
        createSnowflakes();
        createChristmasBanners();
        applyChristmasStyles();
    }
    
    // Configurar botón de tema
    const themeButton = document.createElement('button');
    themeButton.classList.add('theme-toggle');
    themeButton.textContent = document.body.classList.contains('christmas-theme') ? 
        'Tema Normal' : 'Tema Navideño';
    
    // Establecer color inicial del botón
    if (document.body.classList.contains('christmas-theme')) {
        themeButton.style.backgroundColor = christmasColors.red;
    }
    
    themeButton.addEventListener('click', toggleChristmasTheme);
    
    // Insertar botón en el header
    const headerNav = document.querySelector('header nav');
    if (headerNav) {
        headerNav.appendChild(themeButton);
    }
    
    // Agregar banner secundario al DOM si no existe
    if (!document.querySelector('.christmas-banner-secondary')) {
        const secondaryBanner = document.createElement('div');
        secondaryBanner.classList.add('christmas-banner-secondary');
        document.body.insertBefore(secondaryBanner, document.querySelector('footer'));
    }
});

