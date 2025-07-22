<template>
  <section class="skills-section">
    <div class="section-header">
      <h2 class="pixel-title glitch" data-text="SUPERPOWERS">SUPERPOWERS</h2>
      <div class="pixel-line"></div>
    </div>
    
    <div class="skills-grid">
      <div class="skill-card" v-for="skill in skills" :key="skill.name">
        <div v-if="skill.level === 0" class="skill-locked-overlay">
          <span class="lock-icon">🔒</span>
          <span class="lock-text">LOCKED</span>
        </div>
        <div class="skill-header" :class="{ 'blurred': skill.level === 0 }">
          <div class="skill-icon">
            <img :src="skill.logo" :alt="skill.name" class="skill-logo" />
            <div class="icon-glow"></div>
          </div>
          <h3 class="skill-name">{{ skill.name }}</h3>
        </div>
        <div class="skill-bar-container" :class="{ 'blurred': skill.level === 0 }">
          <div class="skill-bar-bg">
            <div class="skill-bar-fill" :style="{ width: skill.level + '%' }"></div>
            <div class="skill-bar-particles"></div>
          </div>
          <span class="skill-level">{{ skill.level }}%</span>
        </div>
        <p class="skill-desc" :class="{ 'blurred': skill.level === 0 }">{{ skill.description }}</p>
        <div class="skill-tags" :class="{ 'blurred': skill.level === 0 }">
          <span v-for="tag in skill.tags" :key="tag" class="skill-tag">{{ tag }}</span>
        </div>
      </div>
    </div>
    
    <div class="pixel-decorations">
      <div class="pixel-dot" v-for="n in 12" :key="n" :style="dotStyle(n)"></div>
    </div>

    <div class="notifications-container">
      <div v-for="n in notifications" :key="n.id" class="notification-toast">
        <img src="/src/img/icon.png" alt="icon" class="notification-icon" />
        <span v-html="n.message"></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const skills = ref([
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    level: 0, // Será actualizado dinámicamente
    description: 'Automating, analyzing, and conquering with elegance. My primary weapon for backend justice.',
    tags: ['Django', 'Flask', 'Pandas', 'Automation']
  },
  {
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    level: 0,
    description: 'When the mission demands robustness and corporate might. Enterprise-grade solutions.',
    tags: ['Spring', 'Maven', 'JUnit', 'Enterprise']
  },
  {
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    level: 0,
    description: 'The whip that powers the web. Dynamic and versatile for any frontend challenge.',
    tags: ['ES6+', 'DOM', 'AJAX', 'Web APIs']
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    level: 0,
    description: 'Crafting magical APIs and real-time spells. Backend sorcery at its finest.',
    tags: ['Express', 'Socket.io', 'REST', 'Real-time']
  },
  {
    name: 'Vue.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    level: 0,
    description: 'Dynamic vision and frontend agility. Reactive components that respond to my will.',
    tags: ['Vue 3', 'Composition API', 'Vite', 'Pinia']
  },
  {
    name: 'SQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    level: 0,
    description: 'Patrolling and protecting data like a digital sentinel. Database mastery.',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'ORM']
  },
  {
    name: 'PHP',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    level: 0,
    description: 'Personal forge for backend logic. Quick and powerful web solutions.',
    tags: ['Laravel', 'WordPress', 'Composer', 'Web']
  },
  {
    name: 'HTML/CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    level: 0,
    description: 'Invoking visual structure with finesse. Pixel-perfect layouts and animations.',
    tags: ['HTML5', 'CSS3', 'Sass', 'Responsive']
  },
  {
    name: 'CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    level: 0,
    description: 'Estilos modernos, animaciones y layouts responsivos. El arte de hacer la web hermosa.',
    tags: ['CSS3', 'Flexbox', 'Grid', 'Responsive']
  },
  {
    name: 'C',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    level: 0,
    description: 'The foundation of performance and control. For heroic low-level programming and system power.',
    tags: ['Pointers', 'Memory', 'Performance', 'Systems']
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    level: 0,
    description: 'The type-safe, scalable, and powerful language for modern web development.',
    tags: ['TypeScript', 'JavaScript', 'Frontend', 'Backend']
  },
  {
    name: 'C#',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    level: 0,
    description: 'The modern, versatile, and powerful language for building robust applications.',
    tags: ['C#', 'Microsoft', 'Windows', 'Cross-platform']
  },
  {
    name: 'Ruby',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    level: 0,
    description: 'The elegant, dynamic, and expressive language for web development.',
    tags: ['Ruby', 'Rails', 'Web', 'API']
  },
  {
    name: 'Go',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    level: 0,
    description: 'The fast, efficient, and scalable language for building high-performance applications.',
    tags: ['Go', 'Performance', 'Backend', 'Microservices']
  },
  {
    name: 'Rust',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
    level: 0,
    description: 'The systems programming language that prioritizes safety, performance, and concurrency.',
    tags: ['Rust', 'Systems', 'Performance', 'Concurrency']
  },
  {
    name: 'Kotlin',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
    level: 0,
    description: 'The modern, concise, and safe language for building applications.',
    tags: ['Kotlin', 'Android', 'Backend', 'Functional']
  },
  {
    name: 'Swift',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    level: 0,
    description: 'The fast, modern, and type-safe language for building iOS and macOS applications.',
    tags: ['Swift', 'iOS', 'macOS', 'App Development']
  },
  {
    name: 'Scala',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg',
    level: 0,
    description: 'Lenguaje híbrido funcional y orientado a objetos. Potente para big data y sistemas concurrentes.',
    tags: ['Scala', 'Functional', 'JVM', 'Big Data']
  }
]);

// Notificaciones tipo toast
const notifications = ref([]);
function showNotification(message) {
  const id = Date.now() + Math.random();
  notifications.value.push({ id, message });
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }, 3000);
}

// Detectar desbloqueo de skills
const previousLevels = {};
watch(skills, (newSkills) => {
  newSkills.forEach(skill => {
    if (previousLevels[skill.name] === 0 && skill.level > 0) {
      showNotification(`<b>Skill unlocked:</b> ${skill.name}`);
    }
    previousLevels[skill.name] = skill.level;
  });
}, { deep: true });

async function fetchLanguagesPercentages() {
  try {
    // Obtener todos los repositorios públicos del usuario
    const reposRes = await fetch('https://api.github.com/users/Tuteque-man/repos?per_page=100');
    const repos = await reposRes.json();
    let languageTotals = {};
    let totalBytes = 0;

    // Para cada repo, obtener los lenguajes usados
    for (const repo of repos) {
      const langRes = await fetch(repo.languages_url);
      const langData = await langRes.json();
      for (const [lang, bytes] of Object.entries(langData)) {
        languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
        totalBytes += bytes;
      }
    }

    // Mapear los lenguajes de skills a los datos de GitHub
    const langMap = {
      'Python': 'Python',
      'Java': 'Java',
      'JavaScript': 'JavaScript',
      'Node.js': 'JavaScript', // Node.js cuenta como JavaScript
      'Vue.js': 'Vue', // Vue.js puede aparecer como 'Vue' o 'JavaScript'
      'SQL': ['SQL', 'PLpgSQL', 'PLSQL', 'TSQL', 'MySQL', 'PostgreSQL'],
      'PHP': 'PHP',
      'HTML/CSS': ['HTML', 'CSS']
    };

    // Calcular el porcentaje para cada skill
    skills.value.forEach(skill => {
      let bytes = 0;
      const map = langMap[skill.name];
      if (Array.isArray(map)) {
        for (const l of map) {
          bytes += languageTotals[l] || 0;
        }
      } else {
        bytes = languageTotals[map] || 0;
      }
      skill.level = totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0;
    });
  } catch (e) {
    // Si falla, dejar los valores en 0
    console.error('Error fetching GitHub languages:', e);
  }
}

onMounted(() => {
  fetchLanguagesPercentages();
});

function dotStyle(n) {
  const left = Math.random() * 90 + '%';
  const top = Math.random() * 90 + '%';
  const delay = Math.random() * 2;
  return {
    left, top, animationDelay: delay + 's'
  };
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.skills-section {
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #000 0%, #111 50%, #000 100%);
  overflow: hidden;
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.skill-card {
  background: rgba(255, 0, 80, 0.05);
  border: 2px solid #ff0050;
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: card-float 3s infinite alternate;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 0, 80, 0.3);
  border-color: #00f2ea;
}

@keyframes card-float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-3px); }
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.skill-icon {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  border: 2px solid #ff0050;
  border-radius: 8px;
  overflow: hidden;
}

.skill-logo {
  width: 40px;
  height: 40px;
  z-index: 2;
  position: relative;
  filter: drop-shadow(0 0 5px #ff0050);
}

.icon-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 0, 80, 0.3) 0%, transparent 70%);
  animation: icon-pulse 2s infinite alternate;
}

@keyframes icon-pulse {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

.skill-name {
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  color: #fff;
  margin: 0;
  text-shadow: 1px 1px 0 #00ffe7;
}

.skill-bar-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.skill-bar-bg {
  flex: 1;
  height: 20px;
  background: #222;
  border: 2px solid #ff0050;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.skill-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff0050, #00f2ea);
  border-radius: 8px;
  transition: width 1.5s ease;
  position: relative;
  animation: bar-glow 2s infinite alternate;
}

@keyframes bar-glow {
  0% { box-shadow: 0 0 5px #ff0050; }
  100% { box-shadow: 0 0 15px #ff0050, 0 0 25px #00f2ea; }
}

.skill-bar-particles {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.1) 2px,
    rgba(255, 255, 255, 0.1) 4px
  );
  animation: particle-move 1s linear infinite;
}

@keyframes particle-move {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.skill-level {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  color: #ff0050;
  min-width: 40px;
  text-align: right;
}

.skill-desc {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  color: #ccc;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  background: rgba(255, 0, 80, 0.2);
  color: #ff0050;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #ff0050;
  text-shadow: 1px 1px 0 #000;
}

.pixel-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.pixel-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #00ffe7;
  border-radius: 2px;
  animation: dot-blink 3s infinite;
  opacity: 0.6;
}

@keyframes dot-blink {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Candado y overlay para skills bloqueados */
.skill-locked-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30, 30, 30, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 12px;
}
.lock-icon {
  font-size: 2.5rem;
  color: #ff0050;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 8px #ff0050;
}
.lock-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  color: #fff;
  text-shadow: 1px 1px 0 #ff0050;
  letter-spacing: 2px;
}
.blurred {
  filter: blur(2px) grayscale(1) brightness(0.7);
  pointer-events: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .skills-section {
    padding: 3rem 1rem;
  }

  .pixel-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 100%;
  }

  .skill-card {
    padding: 1.5rem;
  }

  .skill-icon {
    width: 50px;
    height: 50px;
  }

  .skill-logo {
    width: 35px;
    height: 35px;
  }

  .skill-name {
    font-size: 0.9rem;
  }

  .skill-level {
    font-size: 0.7rem;
  }

  .skill-tags {
    gap: 0.5rem;
  }

  .skill-tag {
    font-size: 0.6rem;
    padding: 0.3rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .skills-container {
    padding: 2rem 0.5rem;
  }

  .pixel-title {
    font-size: 1.4rem;
  }

  .skill-card {
    padding: 1rem;
  }

  .skill-icon {
    width: 40px;
    height: 40px;
  }

  .skill-logo {
    width: 28px;
    height: 28px;
  }

  .skill-name {
    font-size: 0.8rem;
  }

  .skill-level {
    font-size: 0.6rem;
  }

  .skill-tag {
    font-size: 0.5rem;
    padding: 0.2rem 0.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .pixel-title {
    font-size: 2rem;
  }
}

/* Notificaciones tipo toast */
.notifications-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.notification-toast {
  display: flex;
  align-items: center;
  background: rgba(30, 30, 30, 0.95);
  color: #fff;
  border: 2px solid #ff0050;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  box-shadow: 0 4px 24px #ff0050cc;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.9rem;
  min-width: 260px;
  max-width: 340px;
  animation: toast-in 0.3s;
}
.notification-icon {
  width: 32px;
  height: 32px;
  margin-right: 1rem;
  filter: drop-shadow(0 0 8px #ff0050);
}
@keyframes toast-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 