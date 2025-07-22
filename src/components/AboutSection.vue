<template>
  <section class="about-section">
    <div class="section-header">
      <h2 class="pixel-title glitch" data-text="ABOUT">ABOUT</h2>
      <div class="pixel-line"></div>
    </div>
    
    <div class="about-content-flex">
      <div class="about-text">
        <div class="text-block mission-block">
          <div class="block-header">
            <img src="/src/img/a/a1.png" alt="Mission" class="block-icon" />
            <h3 class="block-title">MISSION</h3>
          </div>
          <p class="block-text">Build systems that are SECURE, SCALABLE, and CLEARLY DOCUMENTED, while battling tech chaos one line of code at a time.</p>
        </div>
        
        <div class="text-block superpowers-block">
          <div class="block-header">
            <img src="/src/img/a/a2.png" alt="Superpowers" class="block-icon" />
            <h3 class="block-title">SUPERPOWERS</h3>
          </div>
          <p class="block-text">Wielding technical powers as sharp as a code-forged katana. The Formidable force of backend justice!</p>
        </div>
        
        <div class="text-block current-mission-block">
          <div class="block-header">
            <img src="/src/img/a/a3.png" alt="Current Mission" class="block-icon" />
            <h3 class="block-title">CURRENT MISSION</h3>
          </div>
          <p class="block-text">Fine-tune validation with surgical precision. Elevate API documentation to dev-friendly clarity. Solidify the heroic brand of Tuteque-man.</p>
        </div>
        
        <div class="text-block next-powerups-block">
          <div class="block-header">
            <img src="/src/img/a/a4.png" alt="Next Power-ups" class="block-icon" />
            <h3 class="block-title">NEXT POWER-UPS</h3>
          </div>
          <p class="block-text">Master statistical and advanced analytical skills. Forge a personal API design framework. Expand the Tuteque-man brand across the tech multiverse.</p>
        </div>
      </div>
      <div class="about-stats-block">
      <div class="about-stats">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <div class="stat-number">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
        </div>
        <img src="/src/img/n1.png" alt="n1" class="about-image-pixel" />
      </div>
    </div>
    
    <div class="hero-quote">
      <div class="quote-text">"Your attitude compiles your destiny."</div>
      <div class="quote-author">– The Formidable Tuteque-man</div>
    </div>
    
    <div class="pixel-grid-bg">
      <div class="grid-line" v-for="n in 20" :key="n"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stats = ref([
  { value: '...', label: 'YEARS' },
  { value: '...', label: 'PROJECTS' },
  { value: '100%', label: 'JUSTICE' },
  { value: '...', label: 'FORMIDABLE' }
]);

async function fetchGitHubStats() {
  try {
    // Obtener datos de usuario
    const userRes = await fetch('https://api.github.com/users/Tuteque-man');
    const user = await userRes.json();
    // Obtener repositorios
    const response = await fetch('https://api.github.com/users/Tuteque-man/repos?per_page=100');
    const repos = await response.json();
    if (user && user.created_at && Array.isArray(repos) && repos.length > 0) {
      // YEARS: diferencia entre el año actual y el año de creación de la cuenta
      const years = Math.max(1, new Date().getFullYear() - new Date(user.created_at).getFullYear());
      // PROJECTS: cantidad de repos
      const projects = repos.length;
      // FORMIDABLE: suma de estrellas
      const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
      // JUSTICE: porcentaje de repos con al menos 1 estrella
      const withStars = repos.filter(r => (r.stargazers_count || 0) > 0).length;
      let justice = Math.round((withStars / projects) * 100);
      justice = Math.round(justice / 20) * 20;
      if (justice > 100) justice = 100;
      if (justice < 20) justice = 20;
      // FORMIDABLE: calificación textual según cantidad de proyectos
      let formidableLabel = "Beginner";
      let formidableSubtitle = "";
      if (projects >= 50) {
        formidableLabel = "Formidable";
        formidableSubtitle = "formidable";
      } else if (projects >= 20) {
        formidableLabel = "Prolific";
        formidableSubtitle = "";
      } else if (projects >= 5) {
        formidableLabel = "Amazing";
        formidableSubtitle = "";
      } else {
        formidableLabel = "Beginner";
        formidableSubtitle = "still starting as a hero";
      }
      stats.value = [
        { value: years + '+', label: 'YEARS' },
        { value: projects + '+', label: 'PROJECTS' },
        { value: justice + '%', label: 'JUSTICE' },
        { value: formidableLabel, label: formidableSubtitle ? formidableSubtitle : formidableLabel }
      ];
    }
  } catch (e) {
    // Si falla, deja los valores por defecto
    console.error('Error fetching GitHub stats:', e);
  }
}

onMounted(() => {
  fetchGitHubStats();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.about-section {
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #000 0%, #0f0f0f 50%, #000 100%);
  overflow: hidden;
}

.about-image-wrapper { display: flex; justify-content: center; align-items: center; margin-bottom: 2.5rem; }
.about-image-pixel {
  width: 50vw;
  min-width: 25vw;
  max-width: none;
  height: auto;
  image-rendering: pixelated;
  padding: 0;
  margin: 1.5rem auto 0 auto;
  border: none !important;
  background: none !important;
  box-shadow: none !important;
  display: block;
  animation: float-glow 4s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 0, 80, 0.6));
}

@keyframes float-glow {
  0%, 100% { 
    transform: translateY(0px);
    filter: drop-shadow(0 0 20px rgba(255, 0, 80, 0.6));
  }
  50% { 
    transform: translateY(-10px);
    filter: drop-shadow(0 0 30px rgba(255, 0, 80, 0.8));
  }
}
@media (max-width: 900px) {
  .about-image-pixel {
    width: 100vw;
    max-width: 100vw;
    margin-top: 1rem;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.pixel-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 2.5rem;
  color: #ff0050;
  text-shadow: 2px 2px 0 #fff, 4px 4px 0 #ff0050;
  margin-bottom: 1rem;
  animation: title-glow 2s infinite alternate;
}

@keyframes title-glow {
  0% { text-shadow: 2px 2px 0 #fff, 4px 4px 0 #ff0050; }
  100% { text-shadow: 2px 2px 0 #fff, 4px 4px 0 #ff0050, 0 0 20px #ff0050; }
}

.glitch {
  position: relative;
  animation: glitch-anim 3s infinite linear alternate;
}

.glitch:before, .glitch:after {
  content: attr(data-text);
  position: absolute;
  left: 0; top: 0;
  width: 100%;
  overflow: hidden;
  color: #fff;
  z-index: 2;
  opacity: 0.7;
  pointer-events: none;
}

.glitch:before {
  animation: glitchTop 3s infinite linear alternate-reverse;
  clip-path: inset(0 0 60% 0);
}

.glitch:after {
  animation: glitchBot 3s infinite linear alternate;
  clip-path: inset(60% 0 0 0);
}

@keyframes glitch-anim {
  0% { text-shadow: 2px 2px 0 #00ffe7, 4px 4px 0 #fff; }
  50% { text-shadow: 2px 2px 0 #fff, 4px 4px 0 #00ffe7; }
  100% { text-shadow: 2px 2px 0 #00ffe7, 4px 4px 0 #fff; }
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

.pixel-line {
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #00ffe7, transparent);
  margin: 0 auto;
  border-radius: 2px;
  animation: line-pulse 2s infinite alternate;
}

@keyframes line-pulse {
  0% { opacity: 0.5; transform: scaleX(0.8); }
  100% { opacity: 1; transform: scaleX(1); }
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.text-block {
  background: rgba(255, 0, 80, 0.05);
  border: 2px solid #ff0050;
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: block-float 4s infinite alternate;
}

.text-block:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 25px rgba(255, 0, 80, 0.3);
  border-color: #00f2ea;
}

@keyframes block-float {
  0% { transform: translateX(0); }
  100% { transform: translateX(3px); }
}

.block-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.block-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.block-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  color: #00eaff;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 0 #000;
}

.block-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  color: #fff;
  line-height: 1.5;
  margin: 0;
}

.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-content: start;
}

.stat-item {
  background: rgba(255, 0, 80, 0.1);
  border: 2px solid #ff0050;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  animation: stat-pulse 3s infinite alternate;
}

.stat-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 0, 80, 0.4);
}

@keyframes stat-pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.02); }
}

.stat-number {
  font-family: 'Press Start 2P', monospace;
  font-size: 2rem;
  color: #ff0050;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 0 #000;
  animation: number-glow 2s infinite alternate;
}

@keyframes number-glow {
  0% { text-shadow: 2px 2px 0 #000; }
  100% { text-shadow: 2px 2px 0 #000, 0 0 10px #ff0050; }
}

.stat-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  color: #fff;
  text-shadow: 1px 1px 0 #000;
}

.stat-subtitle { font-size: 0.5em; color: #ff0050; margin-top: 0.2em; text-transform: lowercase; letter-spacing: 1px; }

.hero-quote {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(255, 0, 80, 0.05);
  border: 2px solid #ff0050;
  border-radius: 12px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
  animation: quote-glow 3s infinite alternate;
}

@keyframes quote-glow {
  0% { box-shadow: 0 0 20px rgba(255, 0, 80, 0.2); }
  100% { box-shadow: 0 0 40px rgba(255, 0, 80, 0.4); }
}

.quote-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 1.2rem;
  color: #ff0050;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 0 #000;
}

.quote-author {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  color: #fff;
  text-shadow: 1px 1px 0 #000;
}

.pixel-grid-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.1;
}

.grid-line {
  position: absolute;
  background: #00ffe7;
  animation: grid-move 20s linear infinite;
}

.grid-line:nth-child(odd) {
  width: 1px;
  height: 100%;
  left: calc(var(--i, 0) * 5%);
  animation-delay: calc(var(--i, 0) * -2s);
}

.grid-line:nth-child(even) {
  width: 100%;
  height: 1px;
  top: calc(var(--i, 0) * 5%);
  animation-delay: calc(var(--i, 0) * -1s);
}

@keyframes grid-move {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px); opacity: 0; }
}

.about-content-flex { display: flex; flex-direction: row; align-items: flex-start; gap: 3rem; justify-content: center; }
@media (max-width: 900px) {
  .about-content-flex { flex-direction: column; align-items: center; gap: 2.5rem; }
  .about-stats-block { align-items: center; }
}
.about-stats-block { display: flex; flex-direction: column; align-items: center; gap: 2.2rem; }
.about-image-pixel { width: 240px; height: auto; image-rendering: pixelated; border: 4px solid #ff0050; border-radius: 18px; background: #111; box-shadow: 0 4px 32px #ff005088, 0 0 0 8px #00ffe733; padding: 0.5rem; margin-top: 1.5rem; }
@media (max-width: 900px) { .about-image-pixel { width: 280px; margin-top: 1rem; } }

/* Estilos únicos para cada bloque de About */
.mission-block,
.superpowers-block,
.current-mission-block,
.next-powerups-block {
  background: #ff0050;
  border-color: #ff00cc;
  box-shadow: 0 0 24px #ff9100cc, 0 0 8px #ffb34799;
  animation: orange-glow 2s infinite alternate;
}
@keyframes orange-glow {
  0% { box-shadow: 0 0 10px #ff0050; }
  100% { box-shadow: 0 0 30px #ff0033; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-section {
    padding: 3rem 1rem;
  }

  .pixel-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-text {
    gap: 1.5rem;
  }

  .text-block {
    padding: 1.5rem;
  }

  .block-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .block-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .block-text {
    font-size: 0.8rem;
    line-height: 1.6;
    text-align: center;
  }

  .block-icon {
    width: 40px;
    height: 40px;
  }

  .about-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .stat-item {
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }

  .hero-quote {
    margin-top: 3rem;
    padding: 1.5rem;
  }

  .quote-text {
    font-size: 1rem;
  }

  .quote-author {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 2rem 0.5rem;
  }

  .pixel-title {
    font-size: 1.4rem;
  }

  .about-text {
    gap: 1rem;
  }

  .text-block {
    padding: 1rem;
  }

  .block-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .block-title {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .block-text {
    font-size: 0.7rem;
    text-align: center;
  }

  .block-icon {
    width: 35px;
    height: 35px;
  }

  .about-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-item {
    padding: 1rem;
  }

  .stat-number {
    font-size: 1.2rem;
  }

  .stat-label {
    font-size: 0.6rem;
  }

  .hero-quote {
    margin-top: 2rem;
    padding: 1rem;
  }

  .quote-text {
    font-size: 0.9rem;
  }

  .quote-author {
    font-size: 0.7rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .about-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .pixel-title {
    font-size: 2rem;
  }

  .about-stats {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style> 