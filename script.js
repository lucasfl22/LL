// Data inicial do namoro (7 de setembro de 2023 às 00:00)
const dataInicio = new Date(2023, 8, 7, 0, 0, 0);

class Carousel {
    constructor() {
        this.photos = [
            'fotos/foto1.jpg',
            'fotos/foto2.jpg',
            'fotos/foto3.jpg',
            'fotos/foto4.jpg',
            'fotos/foto5.jpg'
        ];
        this.currentIndex = 0;
        this.container = document.querySelector('.carousel');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.intervalId = null;
        
        this.updateCarousel();
        this.startAutoSlide();
    }

    addPhoto(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const photoUrl = e.target.result;
            this.photos.push(photoUrl);
            this.updateCarousel();
            this.startAutoSlide();
        };
        reader.readAsDataURL(file);
    }

    updateCarousel() {

        this.container.innerHTML = '';
        this.dotsContainer.innerHTML = '';

        this.photos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = `carousel-item ${index === this.currentIndex ? 'active' : ''}`;
            
            const img = document.createElement('img');
            img.src = photo;
            img.alt = 'Foto do Casal';
            img.onerror = () => {
                console.log(`Não foi possível carregar a imagem: ${photo}`);
            };
            
            item.appendChild(img);
            this.container.appendChild(item);

            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === this.currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.photos.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    startAutoSlide() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        if (this.photos.length > 1) {
            this.intervalId = setInterval(() => this.nextSlide(), 3000);
        }
    }
}

const carousel = new Carousel();

document.getElementById('upload-foto').addEventListener('change', function(e) {
    const files = e.target.files;
    for (let file of files) {
        carousel.addPhoto(file);
    }
});

function calcularDiferenca(inicio, fim) {
    let anos = fim.getFullYear() - inicio.getFullYear();
    let meses = fim.getMonth() - inicio.getMonth();
    let dias = fim.getDate() - inicio.getDate();

    if (meses < 0 || (meses === 0 && dias < 0)) {
        anos--;
        meses += 12;
    }

    if (dias < 0) {
        const ultimoDiaMesAnterior = new Date(fim.getFullYear(), fim.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
        meses--;
    }

    return { anos, meses, dias };
}

function atualizarContador() {
    const agora = new Date();
    const diff = agora - dataInicio;
    const tempoDecorrido = calcularDiferenca(dataInicio, agora);

    const horas = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutos = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const segundos = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

    document.getElementById('anos').textContent = `${tempoDecorrido.anos} ${tempoDecorrido.anos === 1 ? 'ano' : 'anos'}`;
    document.getElementById('meses').textContent = `${tempoDecorrido.meses} ${tempoDecorrido.meses === 1 ? 'mês' : 'meses'}`;
    document.getElementById('dias').textContent = `${tempoDecorrido.dias} ${tempoDecorrido.dias === 1 ? 'dia' : 'dias'}`;
    document.getElementById('tempo').textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarContador, 1000);

function criarCoracao() {
    const coracao = document.createElement('div');
    coracao.className = 'heart';
    
    const coracoes = ['❤️', '💖', '💝', '💗', '💓', '💕', '💘', '💞'];
    
    coracao.innerHTML = coracoes[Math.floor(Math.random() * coracoes.length)];
    
    coracao.style.left = Math.random() * 100 + 'vw';
    
    coracao.style.animationDuration = (Math.random() * 4 + 8) + 's';
    
    const scale = 1.2 + Math.random() * 1.3;
    coracao.style.transform = `scale(${scale})`;
    
    document.body.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    }, 12000);
}


setInterval(criarCoracao, 300);
