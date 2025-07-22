<template>
  <div class="hero-bg">
    <svg class="stars-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <circle v-for="n in 40" :key="n" :cx="Math.random()*100" :cy="Math.random()*100" :r="Math.random()*0.7+0.2" fill="#fff" :opacity="Math.random()*0.7+0.3" />
    </svg>
    <div class="scanlines"></div>
    <div class="score-bar">
      <svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" fill="#00ffe7" stroke="#fff" stroke-width="2"/><text x="50%" y="60%" text-anchor="middle" fill="#222" font-size="16" font-family="monospace" dy=".3em">★</text></svg>
      <span class="score-label">SCORE</span>
      <span class="score-value">{{ totalScore }}</span>
    </div>
    <div class="pixel-deco deco-left">
      <svg width="32" height="32" viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" fill="#fff" stroke="#00ffe7" stroke-width="3"/><rect x="10" y="10" width="12" height="12" fill="#00ffe7"/></svg>
    </div>
    <div class="pixel-deco deco-right">
      <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="#fff" stroke="#00ffe7" stroke-width="3"/><circle cx="16" cy="16" r="6" fill="#00ffe7"/></svg>
    </div>
    <div class="particles">
      <div v-for="n in 35" :key="n" class="pixel-particle" :style="particleStyle(n)"></div>
    </div>
    
    <div class="energy-particles">
      <div v-for="n in 15" :key="n" class="energy-dot" :style="energyStyle(n)"></div>
    </div>
    
    <div class="hero-container">
      <transition name="fade-slide">
        <div v-if="show" class="img-frame hero-img-flex">
          <div class="pixel-frame">
            <img src="/img/Tuteque-man.png" alt="Tuteque-man" class="hero-img" />
            <div class="frame-glow"></div>
          </div>
        </div>
      </transition>
      <transition name="fade-slide-text">
        <div v-if="show" class="hero-text">
          <h1 class="pixel-title glitch flicker" :data-text="mainTitle">{{ mainTitle }}</h1>
          <p class="pixel-desc">Tuteque-loper in coming no commit</p>
          <img src="/src/img/p1.gif" alt="Pixelart" class="pixelart-below-desc" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const show = ref(false);
const mainTitle = 'TUTEQUE-MAN';
const totalScore = ref(0);

function particleStyle(n) {
  // Genera estilos aleatorios para las partículas pixeladas
  const left = Math.random() * 90 + '%';
  const top = Math.random() * 90 + '%';
  const size = Math.random() * 8 + 4;
  const color = ['#fff', '#ff0050', '#00f2ea', '#fe2c55', '#25f4ee'][Math.floor(Math.random()*5)];
  const anim = `particle-move-${n%3}`;
  return {
    left, top, width: size+'px', height: size+'px', background: color, animation: `${anim} ${2+Math.random()*2}s linear infinite` };
}

function energyStyle(n) {
  const left = Math.random() * 100 + '%';
  const top = Math.random() * 100 + '%';
  const size = Math.random() * 6 + 3;
  const delay = Math.random() * 3;
  return {
    left, top, width: size+'px', height: size+'px', animationDelay: delay + 's'
  };
}

// Función para calcular los puntos del repositorio
const calculateRepoPoints = (repo) => {
  let points = 10; // Base de 10 puntos por repositorio
  
  // Bonus por estrellas (1 punto por cada 5 estrellas)
  points += Math.floor(repo.stargazers_count / 5);
  
  // Bonus por forks (1 punto por cada 3 forks)
  points += Math.floor(repo.forks_count / 3);
  
  // Bonus por ser reciente (5 puntos si se actualizó en los últimos 7 días)
  if (repo.updated_at) {
    const daysSinceUpdate = (new Date() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 7) points += 5;
  }
  
  return Math.max(points, 10); // Mínimo 10 puntos
};

// Función para obtener el score total de GitHub
const fetchTotalScore = async () => {
  try {
    const response = await fetch('https://api.github.com/users/Tuteque-man/repos?sort=updated&per_page=6');
    const repos = await response.json();
    
    if (Array.isArray(repos)) {
      const total = repos.reduce((sum, repo) => sum + calculateRepoPoints(repo), 0);
      totalScore.value = total;
    } else {
      totalScore.value = 60; // Fallback: 6 repos × 10 puntos
    }
  } catch (error) {
    console.error('Error fetching GitHub score:', error);
    totalScore.value = 60; // Fallback
  }
};

onMounted(async () => {
  setTimeout(() => { show.value = true; }, 400);
  await fetchTotalScore();
});

// Partículas pixeladas para el video
function videoParticleStyle(n) {
  // Genera estilos aleatorios para partículas alrededor del video
  const left = Math.random() * 100 + '%';
  const top = Math.random() * 100 + '%';
  const size = Math.random() * 7 + 3;
  const color = ['#fff', '#ff0050', '#00f2ea', '#fe2c55', '#25f4ee'][Math.floor(Math.random()*5)];
  const anim = `video-particle-move-${n%2}`;
  return {
    left, top, width: size+'px', height: size+'px', background: color, animation: `${anim} ${2+Math.random()*2}s linear infinite`, opacity: 0.7 };
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.hero-bg {
  position: relative;
  min-height: 100vh;
  background: #000;
  overflow: visible;
}
.stars-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  animation: stars-move 30s linear infinite;
}
@keyframes stars-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(-20px); }
}
.scanlines {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 1;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.04) 0px,
    rgba(255,255,255,0.04) 1px,
    transparent 1px,
    transparent 4px
  );
  mix-blend-mode: overlay;
  animation: scanlines-move 2.5s linear infinite;
}
@keyframes scanlines-move {
  0% { background-position-y: 0; }
  100% { background-position-y: 4px; }
}
.score-bar {
  position: fixed;
  top: 24px;
  left: 32px;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  z-index: 10;
  background: #111b;
  border: 2px solid #ff0050;
  border-radius: 10px;
  padding: 0.3rem 1.1rem 0.3rem 0.7rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 1.1rem;
  color: #fff;
  box-shadow: 0 2px 8px #ff0050aa;
  letter-spacing: 2px;
}
.score-label {
  color: #00f2ea;
  margin-left: 0.2rem;
}
.score-value {
  color: #fff;
  margin-left: 0.7rem;
  font-size: 1.1rem;
}
.pixel-deco {
  position: fixed;
  z-index: 10;
  opacity: 0.7;
}
.deco-left {
  top: 32px;
  left: 8vw;
}
.deco-right {
  bottom: 32px;
  right: 8vw;
}
.particles {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}
.pixel-particle {
  position: absolute;
  border-radius: 2px;
  opacity: 0.7;
  box-shadow: 0 0 8px #00ffe7aa;
}

.energy-particles {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.energy-dot {
  position: absolute;
  background: radial-gradient(circle, #ff0050, transparent);
  border-radius: 50%;
  animation: energy-pulse 4s infinite;
  opacity: 0.6;
}

@keyframes energy-pulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.3; 
    box-shadow: 0 0 5px #ff0050;
  }
  50% { 
    transform: scale(1.5); 
    opacity: 0.8; 
    box-shadow: 0 0 15px #ff0050, 0 0 25px #00f2ea;
  }
}
@keyframes particle-move-0 {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-60px); opacity: 0.2; }
}
@keyframes particle-move-1 {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(60px); opacity: 0.2; }
}
@keyframes particle-move-2 {
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(60px); opacity: 0.2; }
}
.hero-container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 4vw;
  padding: 0 2vw;
  flex-direction: row;
}
.img-frame {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pixel-frame {
  position: relative;
  padding: 0;
  background: linear-gradient(135deg, #ff0050, #00f2ea, #fe2c55, #25f4ee);
  border-radius: 20px;
  box-shadow: 
    0 20px 60px rgba(255, 0, 80, 0.4),
    0 10px 30px rgba(0, 242, 234, 0.3),
    0 0 100px rgba(255, 0, 80, 0.2);
  animation: modern-float 6s ease-in-out infinite;
  transform: perspective(1000px) rotateY(-8deg);
  overflow: hidden;
}

@keyframes modern-float {
  0%, 100% { 
    transform: perspective(1000px) rotateY(-8deg) translateY(0);
    box-shadow: 
      0 20px 60px rgba(255, 0, 80, 0.4),
      0 10px 30px rgba(0, 242, 234, 0.3),
      0 0 100px rgba(255, 0, 80, 0.2);
  }
  50% { 
    transform: perspective(1000px) rotateY(-8deg) translateY(-15px);
    box-shadow: 
      0 30px 80px rgba(255, 0, 80, 0.5),
      0 15px 40px rgba(0, 242, 234, 0.4),
      0 0 120px rgba(255, 0, 80, 0.3);
  }
}

.hero-img {
  width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: 16px;
  border: 4px solid #fff;
  background: #111;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
  filter: contrast(1.1) brightness(1.05) saturate(1.1);
  transition: all 0.3s ease;
}

.hero-img:hover {
  transform: scale(1.02);
  filter: contrast(1.2) brightness(1.1) saturate(1.2);
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.6),
    inset 0 0 30px rgba(255, 255, 255, 0.15);
}

.frame-glow {
  position: absolute;
  inset: -2px;
  border-radius: 22px;
  background: linear-gradient(45deg, #ff0050, #00f2ea, #fe2c55, #25f4ee, #ff0050);
  background-size: 400% 400%;
  animation: gradient-shift 4s ease-in-out infinite;
  opacity: 0.8;
  z-index: 1;
  filter: blur(8px);
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
  .hero-text {
    display: flex;
    flex-direction: column;
    gap: 2.2rem;
    align-items: center;
    justify-content: center;
    min-width: 320px;
    max-width: 520px;
  }
.pixel-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 2.4rem;
  color: #fff;
  text-shadow: 
    2px 2px 0 #ff0050,
    4px 4px 0 #00f2ea,
    6px 6px 0 #fe2c55,
    8px 8px 0 #25f4ee,
    0 0 20px #ff0050;
  margin: 0 0 1.5rem 0;
  letter-spacing: 4px;
  position: relative;
  animation: title-epic 4s infinite alternate;
  text-transform: uppercase;
  background: linear-gradient(45deg, #ff0050, #00f2ea, #fe2c55, #25f4ee, #ff0050);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes title-epic {
  0% { 
    text-shadow: 
      2px 2px 0 #ff0050,
      4px 4px 0 #00f2ea,
      6px 6px 0 #fe2c55,
      8px 8px 0 #25f4ee,
      0 0 20px #ff0050;
    background-position: 0% 50%;
  }
  100% { 
    text-shadow: 
      2px 2px 0 #00f2ea,
      4px 4px 0 #fe2c55,
      6px 6px 0 #25f4ee,
      8px 8px 0 #ff0050,
      0 0 20px #00f2ea;
    background-position: 100% 50%;
  }
}
.glitch {
  position: relative;
  animation: glitch-anim 2.5s infinite linear alternate;
}
.glitch:before, .glitch:after {
  content: attr(data-text);
  position: absolute;
  left: 0; top: 0;
  width: 100%;
  overflow: hidden;
  color: #00ffe7;
  z-index: 2;
  opacity: 0.7;
  pointer-events: none;
}
.glitch:before {
  animation: glitchTop 2.5s infinite linear alternate-reverse;
  clip-path: inset(0 0 60% 0);
}
.glitch:after {
  animation: glitchBot 2.5s infinite linear alternate;
  clip-path: inset(60% 0 0 0);
}
.flicker {
  animation: flicker-anim 2.5s infinite alternate;
}
@keyframes flicker-anim {
  0%, 100% { opacity: 1; }
  10% { opacity: 0.9; }
  20% { opacity: 0.95; }
  30% { opacity: 0.85; }
  40% { opacity: 1; }
  50% { opacity: 0.95; }
  60% { opacity: 1; }
  70% { opacity: 0.9; }
  80% { opacity: 1; }
  90% { opacity: 0.95; }
}
@keyframes glitch-anim {
  0% { text-shadow: 2px 2px 0 #00ffe7, 4px 4px 0 #fff2; }
  20% { text-shadow: 2px 2px 0 #fff, 4px 4px 0 #00ffe7; }
  40% { text-shadow: 2px 2px 0 #00ffe7, 4px 4px 0 #fff2; }
  60% { text-shadow: 2px 2px 0 #fff, 4px 4px 0 #00ffe7; }
  100% { text-shadow: 2px 2px 0 #00ffe7, 4px 4px 0 #fff2; }
}
@keyframes glitchTop {
  0% { transform: translate(0,0); }
  20% { transform: translate(-2px,-2px); }
  40% { transform: translate(-4px,2px); }
  60% { transform: translate(2px,-1px); }
  100% { transform: translate(0,0); }
}
@keyframes glitchBot {
  0% { transform: translate(0,0); }
  20% { transform: translate(2px,2px); }
  40% { transform: translate(4px,-2px); }
  60% { transform: translate(-2px,1px); }
  100% { transform: translate(0,0); }
}
.epic-subtitle {
  font-family: 'Press Start 2P', monospace;
  font-size: 1.8rem;
  color: #00ffe7;
  text-shadow: 2px 2px 0 #ff00ff, 4px 4px 0 #ffff00, 6px 6px 0 #ff0080;
  margin-top: -1rem; /* Adjust as needed */
  margin-bottom: 1.5rem;
  letter-spacing: 3px;
  position: relative;
  animation: subtitle-glow 3s infinite alternate;
}

@keyframes subtitle-glow {
  0% { text-shadow: 2px 2px 0 #ff00ff, 4px 4px 0 #ffff00, 6px 6px 0 #ff0080; }
  100% { text-shadow: 2px 2px 0 #00ffe7, 4px 4px 0 #ff00ff, 6px 6px 0 #ffff00; }
}
.pixel-desc {
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  color: #fff;
  text-shadow: 1px 1px 0 #ff0050, 2px 2px 0 #000;
  margin: 0;
  line-height: 1.5;
  text-align: center;
  animation: text-glow 2s infinite alternate;
  position: relative;
}

@keyframes text-glow {
  0% { 
    text-shadow: 1px 1px 0 #ff0050, 2px 2px 0 #000;
    transform: scale(1);
  }
  100% { 
    text-shadow: 1px 1px 0 #ff0050, 2px 2px 0 #000, 0 0 10px #ff0050;
    transform: scale(1.02);
  }
}
.typing {
  min-height: 2.5rem;
  white-space: normal !important;
  word-break: break-word;
  max-width: 100%;
}
.cursor {
  color: #00ffe7;
  font-size: 1.2rem;
  animation: blink 1s steps(2, start) infinite;
}
.subtitle-spaced {
  margin-top: 2.2rem;
  margin-bottom: 2.2rem;
  display: block;
  white-space: normal !important;
  word-break: break-word;
  max-width: 100%;
}
.pixel-title br {
  display: block;
  margin: 0;
  line-height: 1.2;
}
.pixelart-below-desc { width: 180px; height: auto; image-rendering: pixelated; display: block; margin: 1.2rem auto 0 auto; }
@media (max-width: 900px) { .pixelart-below-desc { width: 120px; } }
/* Responsive Design */
@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
    gap: 2rem;
  }

  .hero-text {
    align-items: center;
    min-width: auto;
    max-width: 100%;
  }

  .pixel-title {
    font-size: 1.8rem;
    letter-spacing: 2px;
    margin: 1rem 0 2rem 0;
    text-align: center;
  }

  .pixel-desc {
    font-size: 0.9rem;
    max-width: 100%;
    text-align: center;
  }

  .hero-img {
    width: 280px;
    height: 280px;
  }

  .pixel-frame {
    width: 300px;
    height: 300px;
  }

  .score-bar {
    width: 280px;
    height: 40px;
    font-size: 0.7rem;
  }

  .score-label {
    font-size: 0.6rem;
  }

  .pixel-particle {
    width: 4px;
    height: 4px;
  }

  .energy-dot {
    width: 3px;
    height: 3px;
  }
}

@media (max-width: 480px) {
  .pixel-title {
    font-size: 1.4rem;
    letter-spacing: 1px;
  }

  .pixel-desc {
    font-size: 0.8rem;
  }

  .hero-img {
    width: 240px;
    height: 240px;
  }

  .pixel-frame {
    width: 260px;
    height: 260px;
  }

  .score-bar {
    width: 240px;
    height: 35px;
    font-size: 0.6rem;
  }

  .score-label {
    font-size: 0.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .hero-content {
    padding: 3rem 2rem;
    gap: 3rem;
  }

  .pixel-title {
    font-size: 2rem;
  }

  .hero-img {
    width: 300px;
    height: 300px;
  }

  .pixel-frame {
    width: 320px;
    height: 320px;
  }
}
img, svg, .pixelart-below-desc, .pixelart-side-img, .about-image-pixel, .contact-pixelart-img {
  -webkit-user-drag: none;
  user-drag: none;
  user-select: none;
  pointer-events: auto;
}
.video-pixel-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
}
.video-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.video-thumbnail-frame {
  width: 640px;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.7rem;
  position: relative;
}
.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.video-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 1.1rem;
  color: #ff0050;
  text-shadow: 2px 2px 0 #fff, 4px 4px 0 #ff0050;
  text-align: center;
  margin-top: 0.2rem;
}
.music-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
  background: #fff2;
  border-radius: 8px;
  box-shadow: 0 2px 8px #ff0050aa;
  width: 72px;
  height: 72px;
}
.play-btn-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}
.play-btn-glow {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, #ff0050bb 0%, #fff0 80%);
  position: absolute;
  animation: play-glow 1.2s infinite alternate;
}
@keyframes play-glow {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.15); }
}
.play-btn {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px #ff0050cc;
  border: 3px solid #ff0050;
  transition: transform 0.15s;
}
.play-btn:hover {
  transform: scale(1.08);
}
.video-subtitle {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.9rem;
  color: #00ffe7;
  text-shadow: 1px 1px 0 #222, 2px 2px 0 #fff;
  text-align: center;
  margin-top: 0.2rem;
  letter-spacing: 1px;
}
@media (max-width: 480px) {
  .video-thumbnail-frame {
    width: 420px;
    height: 236px;
  }
  .video-title {
    font-size: 0.8rem;
  }
  .video-subtitle {
    font-size: 0.7rem;
  }
  .music-icon {
    width: 48px;
    height: 48px;
    top: 4px;
    left: 4px;
  }
  .play-btn {
    width: 72px;
    height: 72px;
  }
  .play-btn-glow {
    width: 100px;
    height: 100px;
  }
}
.video-horizontal-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.video-thumbnail-side {
  display: flex;
  align-items: center;
}
.video-title-side {
  display: flex;
  align-items: center;
  min-width: 320px;
  max-width: 480px;
  padding: 2.5rem 1.5rem;
  background: linear-gradient(135deg, #111 60%, #ff0050 100%);
  border-radius: 18px;
  box-shadow: 0 4px 32px #ff005055;
  border: 3px solid #ff0050;
  justify-content: center;
}
.video-title-exact {
  font-family: 'Press Start 2P', monospace;
  font-size: 2.1rem;
  color: #fff;
  text-shadow: 2px 2px 0 #ff0050, 4px 4px 0 #fff;
  text-align: center;
  word-break: break-word;
}
@media (max-width: 900px) {
  .video-horizontal-block {
    flex-direction: column;
    gap: 1.5rem;
  }
  .video-title-side {
    min-width: 0;
    max-width: 100vw;
    padding: 1.2rem 0.5rem;
  }
  .video-title-exact {
    font-size: 1.2rem;
  }
  .video-thumbnail-frame {
    width: 320px !important;
    height: 180px !important;
  }
  .music-icon {
    width: 36px !important;
    height: 36px !important;
  }
  .play-btn {
    width: 54px !important;
    height: 54px !important;
  }
  .play-btn-glow {
    width: 70px !important;
    height: 70px !important;
  }
}
.video-modern-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
}
.video-modern-aspect {
  width: 100%;
  max-width: 100vw;
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
  border: 4px solid #ff4edb;
  border-radius: 18px;
  box-shadow: 0 0 32px #fff4, 0 0 8px #fff2;
  background: linear-gradient(135deg, #181a1b 60%, #232526 100%);
  border: 2.5px solid #fff6;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
}

.video-modern-aspect::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 28px;
  pointer-events: none;
  box-shadow: 0 0 60px 20px #fff2, 0 0 120px 40px #fff1;
  z-index: 1;
}

.video-modern-thumbnail {
  position: relative;
  z-index: 2;
}
.video-modern-link {
  display: flex;
  align-items: center;
  border-radius: 18px;
  box-shadow: 0 4px 32px #000a;
  overflow: hidden;
  transition: box-shadow 0.2s;
  width: 100%;
}
.video-modern-link:hover {
  box-shadow: 0 8px 40px #ff005088, 0 2px 8px #000a;
}
.video-modern-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: transform 0.2s;
  display: block;
}
.video-modern-link:hover .video-modern-thumbnail {
  transform: scale(1.03);
}
.video-modern-title-side {
  display: flex;
  align-items: center;
  min-width: 320px;
  max-width: 480px;
  padding: 2.5rem 2rem;
  background: linear-gradient(135deg, #181a1b 60%, #232526 100%);
  border-radius: 18px;
  box-shadow: 0 4px 32px #000a;
  justify-content: center;
  backdrop-filter: blur(2px);
}
.video-modern-title {
  font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
  font-size: 2.2rem;
  color: #fff;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  word-break: break-word;
  text-shadow: 0 2px 8px #000a;
}
@media (max-width: 900px) {
  .video-modern-vertical {
    align-items: center;
  }
  .video-modern-block {
    flex-direction: column;
    gap: 1.5rem;
    max-width: 100vw;
    margin-left: auto;
    margin-right: auto;
  }
  .video-modern-aspect {
    max-width: 100vw;
  }
  .video-modern-title-side {
    min-width: 0;
    max-width: 100vw;
    padding: 1.2rem 0.5rem;
  }
  .video-modern-title {
    font-size: 1.2rem;
  }
  .video-modern-thumbnail {
    width: 620px;
    height: 480px;
  }
}
@media (max-width: 600px) {
  .video-modern-aspect {
    max-width: 100vw;
    aspect-ratio: 16/9;
    height: auto;
    overflow: hidden;
    min-height: unset;
    padding: 0;
    display: block;
  }
  .video-modern-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: #000;
  }
}
/* Estilo para el icono de video */
.video-icon {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background: rgba(34,37,38,0.18);
  border-radius: 10px;
  box-shadow: 0 2px 8px #0005;
  padding: 2px;
}
/* Estilo para el icono de play centrado */
.video-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
/* Estilo para el caption arriba del video */
.video-modern-caption {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 1.1rem auto;
  text-align: center;
  font-family: 'Press Start 2P', monospace, Arial, sans-serif;
  font-size: 2.1rem;
  font-weight: 400;
  color: #fff;
  letter-spacing: 2px;
  text-shadow:
    0 0 8px #ff4edb,
    0 0 16px #00ffe7,
    2px 2px 0 #000,
    4px 4px 0 #ff4edb,
    0 2px 8px #000a;
  animation: flicker-pixel 1.7s infinite alternate;
}

@keyframes flicker-pixel {
  0% { opacity: 1; text-shadow: 0 0 8px #ff4edb, 0 0 16px #00ffe7, 2px 2px 0 #000, 4px 4px 0 #ff4edb, 0 2px 8px #000a; }
  10% { opacity: 0.85; text-shadow: 0 0 12px #ff4edb, 0 0 24px #00ffe7, 2px 2px 0 #000, 4px 4px 0 #ff4edb, 0 2px 8px #000a; }
  20% { opacity: 1; text-shadow: 0 0 8px #ff4edb, 0 0 16px #00ffe7, 2px 2px 0 #000, 4px 4px 0 #ff4edb, 0 2px 8px #000a; }
  30% { opacity: 0.92; text-shadow: 0 0 18px #ff4edb, 0 0 32px #00ffe7, 2px 2px 0 #000, 4px 4px 0 #ff4edb, 0 2px 8px #000a; }
  40% { opacity: 1; text-shadow: 0 0 8px #ff4edb, 0 0 16px #00ffe7, 2px 2px 0 #000, 4px 4px 0 #ff4edb, 0 2px 8px #000a; }
  100% { opacity: 1; text-shadow: 0 0 8px #ff4edb, 0 0 16px #00ffe7, 2px 2px 0 #000, 4px 4px 0 #ff4edb, 0 2px 8px #000a; }
}
/* Contenedor vertical para caption y video */
.video-modern-vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.pixel-glow {
  filter: drop-shadow(0 0 24px #fff5) drop-shadow(0 0 48px #fff3);
  transition: filter 0.3s;
}
.pixel-glow:hover {
  filter: drop-shadow(0 0 36px #fff7) drop-shadow(0 0 72px #fff4);
}
.pixel-glow-futuristic {
  /* Eliminado el resplandor de las imágenes laterales */
}
@keyframes neon-futuristic {
  0% {
    filter: drop-shadow(0 0 24px #00ffe7cc) drop-shadow(0 0 48px #ff4edbcc) drop-shadow(0 0 16px #fff8);
  }
  50% {
    filter: drop-shadow(0 0 36px #ff0050cc) drop-shadow(0 0 64px #00ffe7cc) drop-shadow(0 0 24px #fff8);
  }
  100% {
    filter: drop-shadow(0 0 24px #00ffe7cc) drop-shadow(0 0 48px #ff4edbcc) drop-shadow(0 0 16px #fff8);
  }
}
.video-pixelart-icon {
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 3;
  background: rgba(0,0,0,0.18);
  border-radius: 8px;
  box-shadow: 0 2px 12px #fff6, 0 0 8px #00ffe7cc;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-pixelart-icon-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.25);
  z-index: 4;
  background: rgba(0,0,0,0.22);
  border-radius: 12px;
  box-shadow: 0 0 32px #00ffe7cc, 0 0 16px #fff8, 0 0 8px #ff4edbcc;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s, background 0.3s;
}
.video-pixelart-icon-center:hover {
  box-shadow: 0 0 48px #ff0050cc, 0 0 32px #00ffe7cc, 0 0 16px #fff8;
  background: rgba(0,0,0,0.32);
}
.video-pixelart-icon.video-pixelart-icon-center {
  border: none !important;
  background: none !important;
  box-shadow: none !important;
  min-width: unset;
  min-height: unset;
  padding: 0;
}
/* Mejoras visuales para la sección de video */
.neon-border {
  border: 4px solid #ff4edb;
  box-shadow: 0 0 32px #ff4edbaa, 0 0 64px #00ffe7aa, 0 0 8px #fff2;
  animation: neon-border-glow 2.5s linear infinite alternate;
  transition: box-shadow 0.3s, border-color 0.3s;
}
@keyframes neon-border-glow {
  0% { box-shadow: 0 0 32px #ff4edbaa, 0 0 64px #00ffe7aa, 0 0 8px #fff2; border-color: #ff4edb; }
  50% { box-shadow: 0 0 48px #00ffe7cc, 0 0 80px #ff4edbcc, 0 0 16px #fff4; border-color: #00ffe7; }
  100% { box-shadow: 0 0 32px #ff4edbaa, 0 0 64px #00ffe7aa, 0 0 8px #fff2; border-color: #ff4edb; }
}
.video-modern-link-animated:hover .neon-border {
  box-shadow: 0 0 64px #ff0050cc, 0 0 128px #00ffe7cc, 0 0 24px #fff8;
  border-color: #fff;
  transform: scale(1.03);
}
.video-modern-link-animated:hover .video-play-icon {
  filter: drop-shadow(0 0 24px #ff0050cc) drop-shadow(0 0 48px #00ffe7cc);
  transform: scale(1.08) translate(-50%, -50%);
}
/* Partículas pixeladas alrededor del video */
.video-particles-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 10;
}
.video-particle {
  position: absolute;
  border-radius: 2px;
  box-shadow: 0 0 8px #00ffe7aa;
}
@keyframes video-particle-move-0 {
  0% { transform: translateY(0); opacity: 0.7; }
  100% { transform: translateY(-30px); opacity: 0.2; }
}
@keyframes video-particle-move-1 {
  0% { transform: translateY(0); opacity: 0.7; }
  100% { transform: translateY(30px); opacity: 0.2; }
}
/* Overlay de scanlines sobre el thumbnail */
.video-scanlines {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 5;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.07) 0px,
    rgba(255,255,255,0.07) 1px,
    transparent 1px,
    transparent 4px
  );
  mix-blend-mode: overlay;
  animation: scanlines-move 2.5s linear infinite;
}
/* Caption mejorado */
.neon-caption {
  background: rgba(24,26,27,0.82);
  border: 2.5px solid #ff4edb;
  border-radius: 18px;
  box-shadow: 0 0 24px #ff4edbaa, 0 0 48px #00ffe7aa;
  padding: 1.1rem 2.2rem;
  margin-bottom: 1.5rem;
  animation: neon-caption-flicker 2.2s infinite alternate;
  transition: box-shadow 0.3s, border-color 0.3s;
}
@keyframes neon-caption-flicker {
  0% { box-shadow: 0 0 24px #ff4edbaa, 0 0 48px #00ffe7aa; border-color: #ff4edb; }
  50% { box-shadow: 0 0 36px #00ffe7cc, 0 0 64px #ff4edbcc; border-color: #00ffe7; }
  100% { box-shadow: 0 0 24px #ff4edbaa, 0 0 48px #00ffe7aa; border-color: #ff4edb; }
}
</style> 