<template>
  <div>
    <div v-if="loading" class="loader-overlay">
      <div class="loader-content">
        <div class="loader-spinner"></div>
        <img src="/src/img/icon.png" alt="Loading Icon" class="loader-icon" />
      </div>
    </div>
    <div v-else class="app-bg">
      <MainHero />
      <ShowcaseSoundtrack />
      <FiverrGigsCarousel />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MainHero from './components/MainHero.vue';
import ShowcaseSoundtrack from './components/ShowcaseSoundtrack.vue';
import FiverrGigsCarousel from './components/FiverrGigsCarousel.vue';
import SkillsSection from './components/SkillsSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import AboutSection from './components/AboutSection.vue';
import ContactSection from './components/ContactSection.vue';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1800); // Simula carga, puedes ajustar el tiempo
  // Forzar que todas las imágenes no sean arrastrables
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
  });
});
</script>

<style>
body, html, #app, .app-bg {
  height: auto;
  background: #000;
  color: #fff;
  margin: 0;
  padding: 0;
  font-family: 'Press Start 2P', monospace, Arial, sans-serif;
}

.loader-overlay {
  position: fixed;
  inset: 0;
  background: #000d;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.4s;
}

.loader-content {
  position: relative;
  width: 480px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-spinner {
  width: 480px;
  height: 480px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  z-index: 1;
  background: conic-gradient(
    from 0deg,
    #00ffe7 0%,
    #ff0050 25%,
    #fff 50%,
    #00ffe7 75%,
    #ff0050 100%
  );
  mask-image: radial-gradient(circle, transparent 60%, black 62%, black 100%);
  -webkit-mask-image: radial-gradient(circle, transparent 60%, black 62%, black 100%);
  animation: spin 1.2s linear infinite;
  box-shadow: 0 0 60px 10px #00ffe7aa, 0 0 120px 30px #ff005055;
}

.loader-spinner::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 410px;
  height: 410px;
  border-radius: 50%;
  border: 4px solid rgba(0,255,231,0.18);
  box-shadow: 0 0 40px 10px #00ffe755, 0 0 80px 20px #ff005022;
  pointer-events: none;
}

.loader-spinner::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 350px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.12);
  box-shadow: 0 0 30px 5px #fff2, 0 0 60px 10px #00ffe722;
  pointer-events: none;
}

.loader-icon {
  width: 220px;
  height: 220px;
  z-index: 2;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: none;
  display: block;
  box-shadow: 0 0 40px 10px #00ffe755, 0 0 80px 20px #ff005022;
  background: none;
  border-radius: 0;
  object-fit: contain;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-bg {
    min-height: auto;
  }
  body, html, #app {
    font-size: 14px;
  }
  .loader-content {
    width: 220px;
    height: 220px;
  }
  .loader-spinner {
    width: 220px;
    height: 220px;
  }
  .loader-spinner::after {
    width: 180px;
    height: 180px;
  }
  .loader-spinner::before {
    width: 140px;
    height: 140px;
  }
  .loader-icon {
    width: 100px;
    height: 100px;
    border-radius: 0;
  }
}

@media (max-width: 480px) {
  .loader-content {
    width: 95vw;
    height: 95vw;
    max-width: 420px;
    max-height: 420px;
  }
  .loader-spinner {
    width: 95vw;
    height: 95vw;
    max-width: 420px;
    max-height: 420px;
    border-width: 14vw;
    min-border-width: 16px;
  }
  .loader-spinner::after {
    width: 80vw;
    height: 80vw;
    max-width: 350px;
    max-height: 350px;
  }
  .loader-spinner::before {
    width: 60vw;
    height: 60vw;
    max-width: 250px;
    max-height: 250px;
  }
  .loader-icon {
    width: 60vw;
    height: 60vw;
    max-width: 220px;
    max-height: 220px;
    border-radius: 0;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  body, html, #app {
    font-size: 16px;
  }
}
</style> 