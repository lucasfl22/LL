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
    const milesimos = String(diff % 1000).padStart(3, '0');

    document.getElementById('anos').textContent = `${tempoDecorrido.anos} ${tempoDecorrido.anos === 1 ? 'ano' : 'anos'}`;
    document.getElementById('meses').textContent = `${tempoDecorrido.meses} ${tempoDecorrido.meses === 1 ? 'mês' : 'meses'}`;
    document.getElementById('dias').textContent = `${tempoDecorrido.dias} ${tempoDecorrido.dias === 1 ? 'dia' : 'dias'}`;
    document.getElementById('tempo').innerHTML = `${horas}:${minutos}:${segundos}.<span id="milesimos">${milesimos}</span>`;
}

// Atualizar o intervalo para ser mais frequente para mostrar os milésimos
setInterval(atualizarContador, 10); // Atualiza a cada 10ms

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

// Primeiro, vamos garantir que o container de emojis permita cliques
const emojiContainer = document.createElement('div');
emojiContainer.className = 'emoji-container';
emojiContainer.style.pointerEvents = 'auto'; // Permite cliques no container
document.body.appendChild(emojiContainer);

// Som para a explosão
const popSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
popSound.volume = 0.3;

let heartCount = 0;
const heartCounter = document.getElementById('heartCount');

function criarMiniCoracao(x, y, emoji) {
    // Incrementa e atualiza o contador
    heartCount++;
    heartCounter.textContent = heartCount;
    heartCounter.classList.add('counter-pop');
    
    // Remove a classe de animação após ela terminar
    setTimeout(() => {
        heartCounter.classList.remove('counter-pop');
    }, 300);

    // Cria um número para mostrar +1
    const plusOne = document.createElement('div');
    plusOne.className = 'plus-one';
    plusOne.textContent = '+1';
    plusOne.style.left = `${x}px`;
    plusOne.style.top = `${y}px`;
    document.body.appendChild(plusOne);

    // Remove o +1 após a animação
    setTimeout(() => plusOne.remove(), 1000);

    // Toca o som
    const newSound = popSound.cloneNode();
    newSound.play().catch(err => console.log('Erro ao tocar som:', err));

    const quantidade = 15;
    const cores = [
        '#ff6b6b', '#ffa07a', '#fff176', 
        '#aed581', '#80deea', '#82b1ff'
    ];
    
    for (let i = 0; i < quantidade; i++) {
        const mini = document.createElement('div');
        mini.className = 'mini-heart';
        
        if (i % 2 === 0) {
            mini.innerHTML = emoji;
        } else {
            mini.style.background = cores[Math.floor(Math.random() * cores.length)];
            mini.style.width = '10px';
            mini.style.height = '10px';
            mini.style.borderRadius = '50%';
        }
        
        const angulo = (i / quantidade) * 2 * Math.PI + Math.random() * 0.5;
        const distancia = 50 + Math.random() * 100;
        
        const tx = Math.cos(angulo) * distancia;
        const ty = Math.sin(angulo) * distancia;
        
        mini.style.setProperty('--tx', `${tx}px`);
        mini.style.setProperty('--ty', `${ty}px`);
        
        mini.style.left = `${x}px`;
        mini.style.top = `${y}px`;
        
        emojiContainer.appendChild(mini);
        
        setTimeout(() => mini.remove(), 1000);
    }
}

function criarCoracao() {
    const coracao = document.createElement('div');
    coracao.className = 'heart';
    
    const coracoes = [
        '❤️', '💖', '💝', '💗', '💓', '💕', '💘', '💞',
        '💟', '💌', '💑', '💘', '💝', '💖', '💗'
    ];
    
    coracao.innerHTML = coracoes[Math.floor(Math.random() * coracoes.length)];
    
    const scale = 0.6 + Math.random() * 1.0;
    coracao.style.transform = `scale(${scale})`;
    
    coracao.style.left = Math.random() * 100 + 'vw';
    
    // Adiciona o evento de clique diretamente no coração
    coracao.onclick = function(e) {
        e.stopPropagation(); // Impede que o clique se propague
        criarMiniCoracao(e.clientX, e.clientY, this.innerHTML);
        this.remove();
    };
    
    emojiContainer.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    }, 6000);
}

// Atualiza o CSS necessário
const estiloCoracao = document.createElement('style');
estiloCoracao.textContent = `
    .heart {
        cursor: pointer !important;
        pointer-events: auto !important;
    }
    .emoji-container {
        pointer-events: auto !important;
    }
    .mini-heart {
        position: absolute;
        font-size: 20px;
        pointer-events: none;
        z-index: 1;
        animation: explode 1s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
    }
    @keyframes explode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(estiloCoracao);

// Criar corações periodicamente
const MAX_CORACOES = 25;
setInterval(() => {
    if (document.querySelectorAll('.heart').length < MAX_CORACOES) {
        criarCoracao();
    }
}, 400);

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

// Primeiro, vamos usar uma música que sabemos que funciona (uma música livre de direitos autorais)
const musicList = [
    {
        title: "Música Romântica",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Este é um exemplo de URL que funciona
    }
];

let currentSongIndex = 0;
const backgroundMusic = new Audio();
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

const musicBtn = document.getElementById('toggleMusic');
let isMusicPlaying = false;

// Função para atualizar o visual do botão
function updateMusicButton() {
    const icon = isMusicPlaying ? "⏸️" : "▶️";
    const text = isMusicPlaying ? "Pausar Música" : "Tocar Música";
    musicBtn.innerHTML = `<span class="music-icon">${icon}</span><span class="music-text">${text}</span>`;
    musicBtn.className = `music-btn ${isMusicPlaying ? 'playing' : ''}`;
}

// Função para controlar a música
async function toggleMusic() {
    try {
        if (!backgroundMusic.src) {
            backgroundMusic.src = musicList[currentSongIndex].url;
            await backgroundMusic.load();
        }

        if (isMusicPlaying) {
            backgroundMusic.pause();
            isMusicPlaying = false;
        } else {
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        isMusicPlaying = true;
                    })
                    .catch(error => {
                        console.log("Erro ao tocar música:", error);
                        isMusicPlaying = false;
                    });
            }
        }
        updateMusicButton();
    } catch (error) {
        console.log("Erro ao manipular música:", error);
        isMusicPlaying = false;
        updateMusicButton();
    }
}

// Adicionar evento de clique ao botão
musicBtn.addEventListener('click', toggleMusic);

// Atualizar o estado do botão quando a música terminar
backgroundMusic.addEventListener('ended', () => {
    isMusicPlaying = false;
    updateMusicButton();
});

// Atualizar o botão inicialmente
updateMusicButton();

// Tentar tocar automaticamente quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    toggleMusic().catch(console.error);
});

// Adicione este CSS para a mensagem de play
const style = document.createElement('style');
style.textContent = `
    .play-alert {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 15px 30px;
        border-radius: 25px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        animation: fadeIn 0.5s ease;
    }

    .play-alert:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateX(-50%) scale(1.05);
    }

    .alert-content {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #333;
        font-weight: bold;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(style);

// Adicione este CSS para o efeito +1
const stylePlusOne = document.createElement('style');
stylePlusOne.textContent = `
    .plus-one {
        position: fixed;
        color: white;
        font-weight: bold;
        font-size: 20px;
        pointer-events: none;
        animation: floatUp 1s ease-out forwards;
        z-index: 1000;
    }

    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
`;
document.head.appendChild(stylePlusOne);

// Adicione esta função para salvar o recorde no localStorage
function salvarRecorde() {
    const recordeAtual = localStorage.getItem('recordeCoracoes') || 0;
    if (heartCount > recordeAtual) {
        localStorage.setItem('recordeCoracoes', heartCount);
    }
}

// Adicione esta função para mostrar o recorde
function mostrarRecorde() {
    const recorde = localStorage.getItem('recordeCoracoes') || 0;
    const recordeElement = document.createElement('div');
    recordeElement.className = 'recorde';
    recordeElement.innerHTML = `🏆 Recorde: ${recorde}`;
    document.querySelector('.heart-counter').appendChild(recordeElement);
}

// Chame esta função quando a página carregar
document.addEventListener('DOMContentLoaded', mostrarRecorde);

// Salve o recorde periodicamente
setInterval(salvarRecorde, 5000);

const comboMensagens = {
    3: { texto: "Que amor! 💝", cor: "#ff9999" },
    5: { texto: "Você é incrível! 💖", cor: "#ff7777" },
    10: { texto: "Combo Apaixonado! 💘", cor: "#ff5555" },
    15: { texto: "Amor Infinito! 💗", cor: "#ff3333" },
    20: { texto: "Romance Level MAX! 💓", cor: "#ff1111" },
    25: { texto: "AMOR EXPLOSIVO! 💞", cor: "#ff0000" }
};

const mensagensRomanticas = [
    "Cada coração é um eu te amo!",
    "Meu amor por você não para de crescer!",
    "Você é o amor da minha vida!",
    "Juntos para sempre!",
    "Você me faz tão feliz!",
    "Meu coração é seu!",
    "Te amo mais a cada segundo!",
    "Você é meu presente da vida!",
    "Meu amor só aumenta!",
    "Você é meu mundo inteiro!"
];

// Sistema de combo
let comboAtual = 0;
let ultimoClique = 0;
const tempoMaximoCombo = 2000; // 2 segundos para manter o combo

function mostrarMensagemCombo(combo, x, y) {
    const mensagem = document.createElement('div');
    mensagem.className = 'combo-mensagem';
    
    // Encontra a mensagem apropriada para o combo atual
    let comboInfo = Object.entries(comboMensagens)
        .reverse()
        .find(([nivel]) => combo >= Number(nivel));
    
    if (comboInfo) {
        mensagem.textContent = `${comboInfo[1].texto} (x${combo})`;
        mensagem.style.color = comboInfo[1].cor;
    }
    
    // Adiciona mensagem romântica aleatória
    const mensagemRomantica = mensagensRomanticas[Math.floor(Math.random() * mensagensRomanticas.length)];
    
    // Posiciona a mensagem onde o coração foi estourado
    mensagem.style.left = `${x}px`;
    mensagem.style.top = `${y}px`;
    
    document.body.appendChild(mensagem);
    setTimeout(() => mensagem.remove(), 1500);
}