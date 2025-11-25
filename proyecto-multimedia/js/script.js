// Variables globales
let isDrawing = false;
let currentColor = 'black';
let canvas, ctx;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Proyecto Multimedia cargado');
    
    // Inicializar canvas si existe
    const drawCanvas = document.getElementById('drawCanvas');
    if (drawCanvas) {
        initCanvas();
    }
    
    // Agregar efectos de hover a elementos interactivos
    addHoverEffects();
});

// Funciones para descargar imágenes
function downloadImage(url, filename) {
    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Mostrar mensaje de confirmación
        showNotification('Descarga iniciada: ' + filename);
    } catch (error) {
        console.error('Error al descargar imagen:', error);
        alert('No se pudo descargar la imagen. Haz clic derecho en la imagen y selecciona "Guardar imagen como..."');
    }
}

// Funciones para descargar audio
function downloadAudio(url, filename) {
    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Descarga iniciada: ' + filename);
    } catch (error) {
        console.error('Error al descargar audio:', error);
        alert('No se pudo descargar el audio automáticamente. Haz clic derecho en el reproductor y selecciona "Guardar audio como..."');
    }
}

// Funciones para descargar video
function downloadVideo(url, filename) {
    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Descarga iniciada: ' + filename);
    } catch (error) {
        console.error('Error al descargar video:', error);
        alert('No se pudo descargar el video automáticamente. Haz clic derecho en el video y selecciona "Guardar video como..."');
    }
}

// Inicializar canvas para dibujo
function initCanvas() {
    canvas = document.getElementById('drawCanvas');
    ctx = canvas.getContext('2d');
    
    // Configuración inicial del canvas
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    
    // Event listeners para el dibujo
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Para dispositivos táctiles
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

// Funciones para el canvas
function clearCanvas() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        showNotification('Canvas limpiado');
    }
}

function changeColor(color) {
    currentColor = color;
    if (ctx) {
        ctx.strokeStyle = color;
    }
    showNotification('Color cambiado a: ' + color);
}

function saveCanvas() {
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'mi-dibujo.png';
        link.href = canvas.toDataURL();
        link.click();
        showNotification('Imagen guardada como: mi-dibujo.png');
    }
}

// Reproductor de música con playlist
function playSong(songName, songUrl) {
    const player = document.getElementById('musicPlayer');
    const currentSongDisplay = document.getElementById('currentSong');
    
    if (player && currentSongDisplay) {
        player.src = songUrl;
        currentSongDisplay.textContent = songName;
        player.load();
        
        // Intentar reproducir automáticamente (puede no funcionar en algunos navegadores)
        player.play().catch(function(error) {
            console.log('No se pudo reproducir automáticamente:', error);
            showNotification('Canción cargada: ' + songName + ' - Haz clic en play para reproducir');
        });
        
        // Actualizar visualmente la playlist
        updatePlaylistSelection(songName);
    }
}

function updatePlaylistSelection(songName) {
    const playlistItems = document.querySelectorAll('#songList li');
    playlistItems.forEach(item => {
        if (item.textContent === songName) {
            item.style.backgroundColor = '#3498db';
            item.style.color = 'white';
        } else {
            item.style.backgroundColor = '';
            item.style.color = '';
        }
    });
}

// Sistema de notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        font-family: Arial, sans-serif;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Efectos hover adicionales
function addHoverEffects() {
    // Efecto para elementos de galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efecto para botones
    const buttons = document.querySelectorAll('.btn, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Función para mejorar la accesibilidad del teclado
document.addEventListener('keydown', function(e) {
    // Atajos de teclado para el canvas
    if (document.getElementById('drawCanvas')) {
        switch(e.key) {
            case 'c':
                if (e.ctrlKey) {
                    e.preventDefault();
                    clearCanvas();
                }
                break;
            case '1':
                changeColor('red');
                break;
            case '2':
                changeColor('blue');
                break;
            case '3':
                changeColor('green');
                break;
            case 's':
                if (e.ctrlKey) {
                    e.preventDefault();
                    saveCanvas();
                }
                break;
        }
    }
});

// Función para lazy loading de imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading si hay imágenes
if (document.querySelectorAll('img[data-src]').length > 0) {
    lazyLoadImages();
}

// Funciones utilitarias
function toggleFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Función para detectar el tipo de dispositivo
function isMobile() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar interfaz según el dispositivo
if (isMobile()) {
    document.body.classList.add('mobile-device');
    console.log('Dispositivo móvil detectado');
}

// Mensaje de bienvenida en consola
console.log(`
🎨 Proyecto Multimedia
====================
Funcionalidades disponibles:
- Galería de imágenes con descarga
- Reproductor de audio
- Player de video
- Contenido embebido
- Canvas interactivo
- Reproductores multimedia

Atajos de teclado (en canvas):
- Ctrl+C: Limpiar canvas
- 1, 2, 3: Cambiar colores
- Ctrl+S: Guardar imagen

¡Explora todas las funcionalidades!
`);

// Export para uso modular (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        downloadImage,
        downloadAudio,
        downloadVideo,
        playSong,
        clearCanvas,
        changeColor,
        saveCanvas
    };
}
