const container = document.getElementById('logo');
const toggle = document.getElementById('toggle');
const replay = document.getElementById('replay');
const timeline = document.getElementById('timeline');
const status = document.getElementById('status');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let animation;
let lightBackground = false;
const lettersVersion = document.body.dataset.animation === 'letters';
const stillFrame = lettersVersion ? 200 : 66;

document.getElementById('background').addEventListener('click', (event) => {
    lightBackground = !lightBackground;
    document.querySelector('.stage').style.background = lightBackground ? '#faf9f4' : '#122c23';
    event.currentTarget.textContent = lightBackground ? 'Fond sombre' : 'Fond clair';
});

async function initialize() {
    try {
        if (!window.lottie) throw new Error('Le lecteur Lottie nécessite une connexion Internet.');
        const response = await fetch(lettersVersion ? 'meals-festival-letters.json' : 'meals-festival-logo.json');
        if (!response.ok) throw new Error('Impossible de charger le JSON.');
        const animationData = await response.json();
        timeline.max = animationData.op - 1;
        container.replaceChildren();
        animation = lottie.loadAnimation({ container, renderer: 'svg', loop: true, autoplay: false, animationData });
        animation.addEventListener('DOMLoaded', () => {
            toggle.disabled = replay.disabled = timeline.disabled = false;
            if (reducedMotion.matches) animation.goToAndStop(stillFrame, true);
            else animation.play();
            syncButton();
            status.textContent = lettersVersion
                ? '13 lettres animées · rebonds, vague et dispersion · fond transparent'
                : '79 formes vectorielles · fond transparent · compatible lottie-web';
        });
        animation.addEventListener('enterFrame', () => { timeline.value = Math.round(animation.currentFrame); });
        animation.addEventListener('data_failed', () => { status.textContent = 'Impossible de lire l’animation.'; });
    } catch (error) {
        status.textContent = error.message + ' Ouvre cette page depuis un serveur HTTP local.';
    }
}

function syncButton() {
    toggle.textContent = animation.isPaused ? 'Lire' : 'Pause';
}

toggle.addEventListener('click', () => {
    if (animation.isPaused) animation.play();
    else animation.pause();
    syncButton();
});
replay.addEventListener('click', () => { animation.goToAndPlay(0, true); syncButton(); });
timeline.addEventListener('input', () => { animation.goToAndStop(Number(timeline.value), true); syncButton(); });
reducedMotion.addEventListener('change', () => {
    if (animation && reducedMotion.matches) { animation.goToAndStop(stillFrame, true); syncButton(); }
});
initialize();
