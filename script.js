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

const emojisPorCor = {
    vermelho: {
        coracoes: ['❤️', '💝', '💗', '💓', '💞'],
        extras: ['🌹', '🎀']
    },
    laranja: {
        coracoes: ['🧡', '💘', '💑'],
        extras: ['🌅']
    },
    amarelo: {
        coracoes: ['💛', '⭐', '✨', '🌟'],
        extras: ['🌻', '🌼', '🌞']
    },
    verde: {
        coracoes: ['💚', '💚', '💚', '💚']
    },
    azulClaro: {
        coracoes: ['💙', '💙', '💙', '💙', ]
    },
    azul: {
        coracoes: ['💙', '💙', '💙', '💙']
    },
    roxo: {
        coracoes: ['💜'],
        extras: ['🌸', '🦄']
    }
};

function obterCorAtual() {
    // Calcula qual será a próxima cor baseado no progresso
    // Muda os emojis quando estiver 80% do caminho para a próxima cor
    const progressoAjustado = progresso + 0.2;
    
    if (progressoAjustado >= 1) {
        const proximoIndex = (corAtualIndex + 1) % cores.length;
        const indices = {
            0: 'vermelho',
            1: 'laranja',
            2: 'amarelo',
            3: 'verde',
            4: 'azulClaro',
            5: 'azul',
            6: 'roxo'
        };
        return indices[proximoIndex];
    }

    const indices = {
        0: 'vermelho',
        1: 'laranja',
        2: 'amarelo',
        3: 'verde',
        4: 'azulClaro',
        5: 'azul',
        6: 'roxo'
    };
    return indices[corAtualIndex];
}

function criarCoracao() {
    const coracao = document.createElement('div');
    coracao.className = 'heart';
    
    const corAtual = obterCorAtual();
    const emojis = emojisPorCor[corAtual];
    
    const usarCoracao = Math.random() < 0.7;
    const listaEmojis = usarCoracao ? emojis.coracoes : emojis.extras;
    
    coracao.innerHTML = listaEmojis[Math.floor(Math.random() * listaEmojis.length)];
    
    coracao.style.left = Math.random() * 100 + 'vw';
    
    // Reduzindo o tempo de animação para que os emojis sumam mais rápido
    coracao.style.animationDuration = (Math.random() * 2 + 4) + 's';
    
    const scale = 0.8 + Math.random() * 0.7;
    coracao.style.transform = `scale(${scale})`;
    
    document.body.appendChild(coracao);

    // Reduzindo o tempo de remoção também
    setTimeout(() => {
        coracao.remove();
    }, 6000);
}

// Aumentando a frequência de criação dos emojis
const MAX_CORACOES = 12; // Reduzindo um pouco para manter a performance
setInterval(() => {
    if (document.querySelectorAll('.heart').length < MAX_CORACOES) {
        criarCoracao();
    }
}, 600); // Intervalo menor para criar mais frequentemente

function interpolarCor(cor1, cor2, fator) {
    const r1 = parseInt(cor1.substring(1,3), 16);
    const g1 = parseInt(cor1.substring(3,5), 16);
    const b1 = parseInt(cor1.substring(5,7), 16);
    
    const r2 = parseInt(cor2.substring(1,3), 16);
    const g2 = parseInt(cor2.substring(3,5), 16);
    const b2 = parseInt(cor2.substring(5,7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * fator);
    const g = Math.round(g1 + (g2 - g1) * fator);
    const b = Math.round(b1 + (b2 - b1) * fator);
    
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

const cores = [
    '#ff6b6b', // vermelho suave
    '#ffa07a', // laranja suave
    '#fff176', // amarelo suave
    '#aed581', // verde suave
    '#80deea', // azul claro suave
    '#82b1ff', // azul suave
    '#b39ddb', // roxo suave
    '#ff6b6b'  // volta ao vermelho
];

let corAtualIndex = 0;
let progresso = 0;
const velocidade = 0.001; // quanto menor, mais lenta a transição

function atualizarCores() {
    const corAtual = cores[corAtualIndex];
    const proximaCor = cores[(corAtualIndex + 1) % cores.length];
    
    const cor1 = interpolarCor(corAtual, proximaCor, progresso);
    const cor2 = interpolarCor(
        corAtual, 
        proximaCor, 
        Math.min(1, progresso + 0.2)
    );
    
    document.documentElement.style.setProperty('--cor1', cor1);
    document.documentElement.style.setProperty('--cor2', cor2);
    
    progresso += velocidade;
    
    if (progresso >= 1) {
        progresso = 0;
        corAtualIndex = (corAtualIndex + 1) % cores.length;
    }
    
    requestAnimationFrame(atualizarCores);
}

atualizarCores();
