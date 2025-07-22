<template>
  <section class="projects-section">
    <div class="section-header">
      <h2 class="pixel-title glitch" data-text="PROJECTS">PROJECTS</h2>
      <div class="pixel-line"></div>
    </div>
    
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Cargando proyectos de Tuteque-man...</p>
    </div>
    <div v-else class="projects-carousel">
      <!-- Desktop images -->
      <img src="/src/img/h1.gif" alt="Left Pixelart 1" class="carousel-left-img h1-img" />
      <img src="/src/img/h2.gif" alt="Left Pixelart 2" class="carousel-left-img h2-img" />
      <img src="/src/img/h3.webp" alt="Left Pixelart 3" class="carousel-left-img h3-img" />
      <img src="/src/img/n2.png" alt="Projects Corner" class="carousel-corner-img" />
      
      <div class="carousel-track-wrapper">
        <div class="carousel-track" :style="{ transform: `translateX(-${carouselIndex * 100}%)` }">
          <div v-for="(project, index) in projects" :key="project.id" class="project-card carousel-card" :data-project-id="project.id">
            <!-- Holographic Card Container -->
            <div class="holographic-container">
              <!-- Card Glow Effect -->
              <div class="card-glow"></div>
              
              <!-- Holographic Border -->
              <div class="holographic-border">
                <div class="border-line border-line-1"></div>
                <div class="border-line border-line-2"></div>
                <div class="border-line border-line-3"></div>
                <div class="border-line border-line-4"></div>
            </div>
              
              <!-- Enhanced Project Content -->
              <div class="project-content">
                <!-- GitHub News Header -->
                <div class="github-news-header">
                  <div class="github-news-left">
                    <div class="github-logo">
                      <svg height="28" viewBox="0 0 16 16" width="28" aria-hidden="true" fill="#181717" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    </div>
                    <div class="github-news-title">GitHub News</div>
                  </div>
                  <div v-if="project.hasReadme" class="readme-badge">
                    <span class="readme-icon">📖</span>
                    <span class="readme-text">README</span>
                  </div>
                </div>
              
                <!-- Project Info with Newspaper Style -->
                <div class="project-info">
                  <div class="newspaper-header">
                    <div class="newspaper-title">
                      <h3 class="project-title">{{ project.title.toLowerCase().includes('tuteque') ? 'Who is Tuteque-man?' : project.title }}</h3>
                      <img 
                        v-if="project.hasReadme && project.readmeImages.length > 0" 
                        :src="project.readmeImages[0]" 
                        :alt="project.title" 
                        class="news-image" 
                        @error="handleImageError"
                      />
                      <img 
                        v-else
                        :src="`https://source.unsplash.com/400x200/?${project.title}&sig=${project.id}`" 
                        :alt="project.title" 
                        class="news-image" 
                      />
                    </div>
                    <div class="newspaper-date">{{ new Date(project.created_at).toLocaleDateString('es-AR') }}</div>
                  </div>
                  
                  <div class="newspaper-content">
                    <div class="newspaper-column">
                      <p class="newspaper-text">
                        {{ project.description || 'Un proyecto destacado de Tuteque-man, desarrollado con las últimas tecnologías y siguiendo las mejores prácticas de programación.' }}
                      </p>
                    </div>
                  </div>
                  
                  <!-- Newspaper Action Button -->
                  <div class="project-actions">
                    <a :href="project.github" target="_blank" class="newspaper-btn">
                      <span class="btn-text">LEER MÁS</span>
                      <span class="btn-icon">→</span>
                    </a>
                </div>
                </div>
              </div>
              
              <!-- Card Footer with Animated Elements -->
              <div class="card-footer">
                <div class="footer-line"></div>
                <div class="footer-dots">
                  <div class="dot" v-for="n in 5" :key="n"></div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-pagination">
        <span v-for="n in totalSlides" :key="n" 
              :class="['carousel-dot', { active: carouselIndex === n-1 }]" 
              @click="goToSlide(n-1)"></span>
      </div>
    </div>
    
    <!-- Images below carousel for mobile -->
    <div class="mobile-images">
      <img src="/src/img/h1.gif" alt="Left Pixelart 1" class="mobile-img h1-img" />
      <img src="/src/img/h2.gif" alt="Left Pixelart 2" class="mobile-img h2-img" />
      <img src="/src/img/h3.webp" alt="Left Pixelart 3" class="mobile-img h3-img" />
      <img src="/src/img/n2.png" alt="Projects Corner" class="mobile-img n2-img" />
    </div>
    

    
    <!-- Background Effects -->
    <div class="background-effects">
      <div class="grid-overlay"></div>
      <div class="energy-field"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// Eliminadas las importaciones de notificaciones

const projects = ref([]);
const loading = ref(true);
const totalPoints = ref(0);
const previousRepos = ref([]);

const carouselIndex = ref(0);
let carouselInterval = null;

const totalSlides = computed(() => {
  return Math.max(1, projects.value.length);
});

function nextSlide() {
  carouselIndex.value = (carouselIndex.value + 1) % projects.value.length;
}

function prevSlide() {
  carouselIndex.value = (carouselIndex.value - 1 + projects.value.length) % projects.value.length;
}

function goToSlide(idx) {
  carouselIndex.value = idx;
}

function startCarousel() {
  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = setInterval(() => {
    if (projects.value.length > 1) {
      nextSlide();
    }
  }, 3500);
}

function toggleN2Visibility() {
  // isN2Visible.value = !isN2Visible.value; // This line was removed
  // setTimeout(() => { // This line was removed
  //   isN2Visible.value = !isN2Visible.value; // This line was removed
  // }, 3000); // n2 visible for 3 seconds // This line was removed
}

// Start n2 visibility cycle // This line was removed
// onMounted(() => { // This line was removed
//   setInterval(toggleN2Visibility, 6000); // Every 6 seconds // This line was removed
// }); // This line was removed





// Función para obtener el estado del proyecto basado en las estadísticas
const getProjectStatus = (repo) => {
  if (repo.stargazers_count > 10) return { status: 'production', statusText: 'POPULAR' };
  if (repo.forks_count > 5) return { status: 'testing', statusText: 'ACTIVE' };
  if (repo.updated_at) {
    const daysSinceUpdate = (new Date() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 7) return { status: 'progress', statusText: 'RECENT' };
  }
  return { status: 'planning', statusText: 'STABLE' };
};

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

// Función para obtener el contenido del README de un repositorio
const fetchReadmeContent = async (repoName) => {
  try {
    const response = await fetch(`https://api.github.com/repos/Tuteque-man/${repoName}/readme`);
    if (response.ok) {
      const data = await response.json();
      // Decodificar el contenido del README (está en base64)
      const content = atob(data.content);
      return content;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return null;
  }
};

// Función para extraer imágenes del contenido del README
const extractImagesFromReadme = (readmeContent) => {
  if (!readmeContent) return [];
  
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images = [];
  let match;
  
  while ((match = imageRegex.exec(readmeContent)) !== null) {
    const imageUrl = match[1];
    // Solo incluir imágenes que sean URLs válidas
    if (imageUrl.startsWith('http') || imageUrl.startsWith('https')) {
      images.push(imageUrl);
    }
  }
  
  return images;
};

// Función para extraer el primer párrafo del README
const extractFirstParagraph = (readmeContent) => {
  if (!readmeContent) return '';
  
  // Remover encabezados y código
  let cleanContent = readmeContent
    .replace(/^#+\s+.*$/gm, '') // Remover encabezados
    .replace(/```[\s\S]*?```/g, '') // Remover bloques de código
    .replace(/`.*?`/g, '') // Remover código inline
    .replace(/\[.*?\]\(.*?\)/g, '') // Remover enlaces
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remover imágenes
    .replace(/^\s*[-*+]\s+/gm, '') // Remover listas
    .replace(/^\s*\d+\.\s+/gm, '') // Remover listas numeradas
    .trim();
  
  // Buscar el primer párrafo significativo
  const paragraphs = cleanContent.split('\n\n').filter(p => {
    const trimmed = p.trim();
    return trimmed.length > 30 && trimmed.length < 300; // Párrafos entre 30 y 300 caracteres
  });
  
  if (paragraphs.length > 0) {
    let firstParagraph = paragraphs[0].replace(/\n/g, ' ').trim();
    
    // Limpiar caracteres especiales y espacios múltiples
    firstParagraph = firstParagraph
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?-]/g, '')
      .trim();
    
    // Si el párrafo es muy corto, buscar el siguiente
    if (firstParagraph.length < 20 && paragraphs.length > 1) {
      firstParagraph = paragraphs[1].replace(/\n/g, ' ').trim();
      firstParagraph = firstParagraph
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s.,!?-]/g, '')
        .trim();
    }
    
    return firstParagraph;
  }
  
  return '';
};

// Función para obtener repositorios de GitHub
const fetchGitHubRepos = async () => {
  try {
    const response = await fetch('https://api.github.com/users/Tuteque-man/repos?sort=updated&per_page=6');
    const repos = await response.json();
    
    if (Array.isArray(repos)) {
      // Procesar solo los dos primeros repositorios con README
      const processedRepos = [];
      
      for (let i = 0; i < Math.min(2, repos.length); i++) {
        const repo = repos[i];
        const status = getProjectStatus(repo);
        const points = calculateRepoPoints(repo);
        
        // Obtener contenido del README
        const readmeContent = await fetchReadmeContent(repo.name);
        const readmeParagraph = extractFirstParagraph(readmeContent);
        const readmeImages = extractImagesFromReadme(readmeContent);
        
        processedRepos.push({
          id: i + 1,
          title: repo.name,
          description: readmeParagraph || repo.description || '',
          status: status.status,
          statusText: status.statusText,
          demo: repo.homepage || '#',
          github: repo.html_url,
          points: points,
          created_at: repo.created_at,
          readmeImages: readmeImages,
          hasReadme: !!readmeContent
        });
      }
      
      // Agregar los repositorios restantes sin procesar README
      for (let i = 2; i < repos.length; i++) {
        const repo = repos[i];
        const status = getProjectStatus(repo);
        const points = calculateRepoPoints(repo);
        
        processedRepos.push({
          id: i + 1,
          title: repo.name,
          description: repo.description || '',
          status: status.status,
          statusText: status.statusText,
          demo: repo.homepage || '#',
          github: repo.html_url,
          points: points,
          created_at: repo.created_at,
          readmeImages: [],
          hasReadme: false
        });
      }
      
      projects.value = processedRepos;
      
      // Calcular total de puntos
      totalPoints.value = projects.value.reduce((total, project) => total + project.points, 0);
      console.log('Proyectos cargados:', projects.value);
      console.log('Total de puntos:', totalPoints.value);
      
      // Guardar repos actuales para la próxima comparación
      previousRepos.value = repos.map(repo => repo.name);
    } else {
      // Fallback si la API falla
      projects.value = [
        {
          id: 1,
          title: 'TUTEQUE-MAN PROJECTS',
          description: 'Portfolio de proyectos de Tuteque-man',
          status: 'production',
          statusText: 'ACTIVE',
          technologies: ['GitHub'],
          demo: '#',
          github: 'https://github.com/Tuteque-man',
          points: 10,
          features: ['10 🎯 SCORE'],
          readmeImages: [],
          hasReadme: false
        }
      ];
      totalPoints.value = 10;
    }
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Fallback en caso de error
    projects.value = [
      {
        id: 1,
        title: 'TUTEQUE-MAN PROJECTS',
        description: 'Portfolio de proyectos de Tuteque-man',
        status: 'production',
        statusText: 'ACTIVE',
        technologies: ['GitHub'],
        demo: '#',
        github: 'https://github.com/Tuteque-man',
        points: 10,
        features: ['10 🎯 SCORE'],
        readmeImages: [],
        hasReadme: false
      }
    ];
    totalPoints.value = 10;
  } finally {
    loading.value = false;
  }
};

// Función para detectar repos nuevos
const checkForNewRepos = async (repos) => {
  if (previousRepos.value.length === 0) return; // Primera carga
  
  const newRepos = repos.filter(repo => !previousRepos.value.includes(repo.name));
  
  for (const repo of newRepos) {
    try {
      // Eliminadas las llamadas a funciones de notificaciones
    } catch (error) {
      console.error('Error creando notificación de nuevo repo:', error);
    }
  }
};

// Función para detectar milestones
const checkMilestones = async (repos) => {
  const milestones = [10, 25, 50, 100];
  const repoCount = repos.length;
  
  for (const milestone of milestones) {
    if (repoCount >= milestone && !localStorage.getItem(`milestone_${milestone}`)) {
      try {
        // Eliminadas las llamadas a funciones de notificaciones
        localStorage.setItem(`milestone_${milestone}`, 'true');
        
        // Eliminadas las llamadas a funciones de notificaciones
      } catch (error) {
        console.error('Error creando notificación de milestone:', error);
      }
    }
  }
};

// Función para detectar repos populares
const checkPopularRepos = async (repos) => {
  const popularThresholds = [10, 25, 50, 100];
  
  for (const repo of repos) {
    for (const threshold of popularThresholds) {
      if (repo.stargazers_count >= threshold && 
          !localStorage.getItem(`popular_${repo.name}_${threshold}`)) {
        try {
          // Eliminadas las llamadas a funciones de notificaciones
          localStorage.setItem(`popular_${repo.name}_${threshold}`, 'true');
          
          // Eliminadas las llamadas a funciones de notificaciones
        } catch (error) {
          console.error('Error creando notificación de repo popular:', error);
        }
      }
    }
  }
};

onMounted(() => {
  fetchGitHubRepos().then(() => {
    startCarousel();
  });
});

function pixelStyle(n) {
  const left = Math.random() * 90 + '%';
  const top = Math.random() * 90 + '%';
  const size = Math.random() * 20 + 10;
  const delay = Math.random() * 3;
  return {
    left, top, width: size + 'px', height: size + 'px', animationDelay: delay + 's'
  };
}

// Función para manejar errores de carga de imágenes
const handleImageError = (event) => {
  const img = event.target;
  const projectId = img.closest('.project-card').dataset.projectId;
  const project = projects.value.find(p => p.id == projectId);
  
  if (project && project.readmeImages.length > 1) {
    // Intentar con la siguiente imagen del README
    const currentIndex = project.readmeImages.indexOf(img.src);
    const nextIndex = (currentIndex + 1) % project.readmeImages.length;
    img.src = project.readmeImages[nextIndex];
  } else {
    // Fallback a Unsplash
    img.src = `https://source.unsplash.com/400x200/?${project?.title || 'code'}&sig=${projectId}`;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.projects-section {
  position: relative;
  padding: 6rem 2rem 4rem 2rem;
  background: linear-gradient(135deg, #000 0%, #0a0a0a 50%, #000 100%);
  overflow: hidden;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 2rem;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 0, 80, 0.3);
  border-top: 4px solid #ff0050;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  color: #ff0050;
  text-align: center;
  text-shadow: 2px 2px 0 #000;
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







.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;
}

.project-card {
  background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
  border: 3px solid #ff0050;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease;
  animation: card-float 4s infinite alternate;
  box-shadow: 0 8px 32px rgba(255, 0, 80, 0.2);
  height: 500px;
  width: 320px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 50px rgba(255, 0, 80, 0.4);
  border-color: #00f2ea;
}

@keyframes card-float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-5px); }
}

.cartridge-top, .cartridge-bottom {
  background: #333;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  border-bottom: 2px solid #00ffe7;
}

.cartridge-bottom {
  border-bottom: none;
  border-top: 2px solid #00ffe7;
}

.cartridge-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  color: #00ffe7;
  text-shadow: 1px 1px 0 #000;
}

.cartridge-pins {
  display: flex;
  gap: 4px;
}

.cartridge-pins::before,
.cartridge-pins::after {
  content: '';
  width: 8px;
  height: 8px;
  background: #00ffe7;
  border-radius: 50%;
  box-shadow: 0 0 5px #00ffe7;
}

.project-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}



.project-info {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}





.project-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 0 #00ffe7;
}

.project-desc {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  color: #ccc;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.project-status {
  margin-bottom: 0.5rem;
}

.status-badge {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid;
  text-shadow: 1px 1px 0 #000;
}

.status-badge.progress {
  background: #ffa500;
  color: #000;
  border-color: #ff8c00;
}

.status-badge.production {
  background: #00ff00;
  color: #000;
  border-color: #00cc00;
}

.status-badge.testing {
  background: #00bfff;
  color: #000;
  border-color: #0099cc;
}

.status-badge.planning {
  background: #ff69b4;
  color: #000;
  border-color: #ff1493;
}









.project-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 10;
}

.action-btn {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  background: linear-gradient(135deg, #00ffe7 0%, #00bfff 25%, #ff0050 50%, #e6004c 75%, #00ffe7 100%);
  color: #000;
  border: none;
  padding: 1.2rem 3rem;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 
    0 0 30px rgba(0, 255, 231, 0.8),
    0 0 60px rgba(255, 0, 80, 0.6),
    0 0 90px rgba(0, 191, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  text-shadow: 0 0 10px rgba(0, 255, 231, 0.8);
  font-weight: bold;
  letter-spacing: 3px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(0, 255, 231, 0.8);
  animation: cyberpunk-pulse 2s infinite ease-in-out;
  z-index: 20;
  cursor: pointer;
  display: inline-block;
  min-width: 200px;
  text-align: center;
  clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px);
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 231, 0.6), rgba(255, 0, 80, 0.6), transparent);
  transition: left 0.5s ease;
  filter: blur(1px);
}

.action-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(0, 255, 231, 0.8) 0%, rgba(255, 0, 80, 0.6) 30%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
  filter: blur(2px);
}

.action-btn:hover {
  background: linear-gradient(135deg, #ff0050 0%, #00ffe7 25%, #00bfff 50%, #e6004c 75%, #ff0050 100%);
  transform: translateY(-5px) scale(1.08);
  box-shadow: 
    0 20px 60px rgba(255, 0, 80, 1),
    0 0 120px rgba(0, 255, 231, 0.8),
    0 0 180px rgba(0, 191, 255, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5);
  color: #000;
  letter-spacing: 5px;
  clip-path: polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px);
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:hover::after {
  width: 400px;
  height: 400px;
  filter: blur(3px);
}

.action-btn:active {
  transform: translateY(-2px) scale(0.95);
  box-shadow: 
    0 10px 40px rgba(255, 0, 80, 0.9),
    0 0 100px rgba(0, 255, 231, 0.7),
    0 0 150px rgba(0, 191, 255, 0.5),
    inset 0 3px 0 rgba(255, 255, 255, 0.8),
    inset 0 -2px 0 rgba(0, 0, 0, 0.6);
  clip-path: polygon(5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px), 0 5px);
}

.holographic-btn {
  position: relative;
  overflow: hidden;
}

.btn-text {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.btn-icon {
  position: relative;
  z-index: 2;
  margin-left: 8px;
  font-size: 1.2em;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.action-btn:hover .btn-text {
  transform: translateX(-5px);
}

.action-btn:hover .btn-icon {
  transform: translateX(5px);
  opacity: 1;
}

@keyframes button-pulse {
  0%, 100% { 
    box-shadow: 
      0 0 40px rgba(255, 0, 80, 0.6),
      0 0 80px rgba(255, 0, 80, 0.4);
  }
  50% { 
    box-shadow: 
      0 0 60px rgba(255, 0, 80, 0.8),
      0 0 120px rgba(255, 0, 80, 0.6);
  }
}

@keyframes button-glow {
  0%, 100% { 
    background: linear-gradient(135deg, #00ffe7 0%, #00bfff 50%, #00ffe7 100%);
  }
  50% { 
    background: linear-gradient(135deg, #00bfff 0%, #00ffe7 50%, #00bfff 100%);
  }
}

.pixel-btn:hover {
  background: #000;
  color: #ff0050;
  transform: translateY(2px);
  box-shadow: 0 1px 0 #ff0050;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid rgba(0, 255, 231, 0.3);
  position: relative;
}

.card-footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff0050, transparent);
  animation: footer-glow 3s infinite alternate;
}

@keyframes footer-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.footer-line {
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ffe7, transparent);
  opacity: 0.5;
  margin: 0 10px;
}

.footer-dots {
  display: flex;
  gap: 5px;
}

.dot {
  width: 8px;
  height: 8px;
  background: linear-gradient(145deg, #00ffe7, #00bfff);
  border-radius: 50%;
  box-shadow: 0 0 8px #00ffe7;
  animation: pulse-dot 3s infinite;
  position: relative;
}

.dot::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(0, 255, 231, 0.3), transparent);
  border-radius: 50%;
  animation: dot-glow 3s infinite;
}

@keyframes dot-glow {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 0.8; }
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .projects-section {
    padding: 3rem 1rem;
  }

  .pixel-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .points-text {
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 100%;
  }

  .project-card {
    padding: 1.5rem;
  }

  .project-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .pixel-screen {
    width: 100px;
    height: 70px;
}

.screen-content {
    width: 70px;
    height: 70px;
  }

  .project-title {
    font-size: 1rem;
  }

  .project-desc {
    font-size: 0.8rem;
  }

  .project-status {
    font-size: 0.7rem;
  }

  .project-actions {
    flex-direction: column;
    gap: 0.8rem;
  }

  .action-btn {
    font-size: 0.5rem;
    padding: 0.8rem 2rem;
    min-width: 160px;
  }
}

@media (max-width: 480px) {
  .projects-section {
    padding: 2rem 0.5rem;
  }

  .pixel-title {
    font-size: 1.4rem;
  }

  .points-text {
    font-size: 0.6rem;
    padding: 0.4rem 0.8rem;
  }

  .project-card {
    padding: 1rem;
  }

  .pixel-screen {
    width: 80px;
    height: 60px;
  }

  .screen-content {
    width: 60px;
    height: 60px;
  }

  .project-title {
    font-size: 0.9rem;
  }

  .project-desc {
    font-size: 0.7rem;
  }

  .action-btn {
    font-size: 0.5rem;
    padding: 0.8rem 2rem;
    min-width: 160px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .pixel-title {
    font-size: 2rem;
  }
}

.projects-carousel { width: 100%; display: flex; flex-direction: column; align-items: center; min-height: 320px; position: relative; padding: 1rem 0 0.25rem 0; box-sizing: border-box; }
.carousel-track-wrapper { overflow: hidden; width: 100%; max-width: 900px; padding: 0 2vw; box-sizing: border-box; }
.carousel-track { display: flex; transition: transform 0.7s cubic-bezier(.77,0,.18,1); width: 100%; }
.carousel-card { flex: 0 0 100%; max-width: 100%; min-width: 320px; min-height: 420px; box-sizing: border-box; margin: 0 auto; background: rgba(0,255,231,0.08); border: 2px solid #00ffe7; border-radius: 14px; box-shadow: 0 2px 16px #00ffe733; transition: box-shadow 0.3s, border-color 0.3s; }
.carousel-card:hover { border-color: #ff0050; box-shadow: 0 4px 32px #ff005088; }
.carousel-pagination { display: flex; justify-content: center; margin-top: 1rem; gap: 0.5rem; }
.carousel-dot { width: 12px; height: 12px; border-radius: 50%; background: #00ffe7; opacity: 0.4; cursor: pointer; transition: opacity 0.2s, background 0.2s; }
.carousel-dot.active { opacity: 1; background: #ff0050; }
@media (max-width: 900px) { .carousel-card { min-width: 220px; min-height: 340px; } .carousel-track-wrapper { max-width: 98vw; } }
@media (max-width: 700px) { .carousel-card, .carousel-track { flex: 0 0 100%; max-width: 100%; } .carousel-track-wrapper { max-width: 99vw; padding: 0; } .projects-carousel { padding: 0.5rem 0 0.1rem 0; } }
.carousel-fade-enter-active, .carousel-fade-leave-active { transition: opacity 0.5s; }
.carousel-fade-enter-from, .carousel-fade-leave-to { opacity: 0; }

.carousel-left-img {
  position: absolute;
  left: -200px; /* Move even more to the left */
  top: 280px; /* Move down but not as much */
  width: 450px; /* Much bigger (150px + 300px) */
  height: auto;
  image-rendering: pixelated;
  animation: control-animation 6s ease-in-out infinite;
}

@keyframes control-animation {
  0%, 20% { 
    animation-play-state: running;
  }
  25%, 75% { 
    animation-play-state: paused;
  }
  80%, 100% { 
    animation-play-state: running;
  }
}

.carousel-left-img.paused {
  animation-play-state: paused !important;
}

.carousel-left-img.playing {
  animation-play-state: running !important;
}

.h1-img {
  z-index: 3; /* Front */
  transform: translateX(0px) translateY(30px); /* First position + move down */
}

.h2-img {
  z-index: 2; /* Middle */
  transform: translateX(30px); /* Second position */
}

.h3-img {
  z-index: 1; /* Back */
  transform: translateX(60px) scaleX(-1); /* Third position + flip */
}

@media (max-width: 900px) {
  .carousel-left-img {
    width: 400px; /* Much bigger for mobile too (100px + 300px) */
    left: -150px; /* Move even more to the left on mobile */
    top: 150px; /* Move down but not as much on mobile */
  }
}

.carousel-corner-img {
  position: absolute;
  top: 180px; /* Move down more */
  right: -30px; /* Move 10px more to the left */
  width: 280px; /* Even bigger */
  height: auto;
  image-rendering: pixelated;
  z-index: 2;
  animation: hide-and-seek 6s ease-in-out infinite, glow-pulse 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(0, 255, 231, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 80, 0.6));
}

@keyframes hide-and-seek {
  0%, 20% { 
    opacity: 1;
    transform: translateX(0);
    filter: drop-shadow(0 0 20px rgba(0, 255, 231, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 80, 0.6));
  }
  25%, 75% { 
    opacity: 0;
    transform: translateX(50px);
    filter: drop-shadow(0 0 10px rgba(0, 255, 231, 0.4)) drop-shadow(0 0 20px rgba(255, 0, 80, 0.3));
  }
  80%, 100% { 
    opacity: 1;
    transform: translateX(0);
    filter: drop-shadow(0 0 20px rgba(0, 255, 231, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 80, 0.6));
  }
}

@keyframes glow-pulse {
  0%, 100% { 
    filter: drop-shadow(0 0 20px rgba(0, 255, 231, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 80, 0.6));
  }
  50% { 
    filter: drop-shadow(0 0 30px rgba(0, 255, 231, 1)) drop-shadow(0 0 60px rgba(255, 0, 80, 0.8));
  }
}

@media (max-width: 900px) {
  .carousel-corner-img {
    width: 180px; /* Bigger for mobile too */
    top: 60px; /* Move down more on mobile */
    right: -30px; /* Move more to the right like on PC */
  }
}

/* Enhanced Holographic Card Styles */
.holographic-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  box-sizing: border-box;
  background: #f8f8f8;
  border-radius: 8px;
  border: 2px solid #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
}

.holographic-container:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  transition: box-shadow 0.3s;
}

.carousel-card:hover .holographic-container {
  transform: translateY(-10px) scale(1.02);
  border-color: rgba(255, 0, 80, 0.6);
  box-shadow: 
    0 20px 60px rgba(255, 0, 80, 0.3),
    0 0 30px rgba(0, 255, 231, 0.2),
    inset 0 0 20px rgba(255, 0, 80, 0.1);
}

.card-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background: radial-gradient(circle, rgba(255,0,80,0.2) 0%, transparent 70%);
  border-radius: 15px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  animation: pulse-glow 3s infinite;
}

.holographic-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  animation: pulse-border 3s infinite;
}

.border-line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ffe7, transparent);
  opacity: 0.5;
  transform: scaleX(0);
  transition: transform 0.5s ease-in-out;
}

.border-line-1 { top: 0; }
.border-line-2 { bottom: 0; }
.border-line-3 { left: 0; }
.border-line-4 { right: 0; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
}

.header-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background: radial-gradient(circle, rgba(255,0,80,0.1) 0%, transparent 70%);
  border-radius: 15px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  animation: pulse-glow 3s infinite;
}

.project-badge {
  background: #00ffe7;
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  text-shadow: 1px 1px 0 #000;
  border: 1px solid #fff;
  box-shadow: 0 2px 5px rgba(0, 255, 231, 0.3);
  position: relative;
  overflow: hidden;
}

.badge-icon {
  font-size: 0.8rem;
}

.badge-text {
  font-weight: bold;
}

.project-score {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.score-ring {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #000;
  border: 2px solid #00ffe7;
  box-shadow: inset 0 0 10px rgba(0, 255, 231, 0.2);
  overflow: hidden;
}

.score-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg); /* Start from the top */
}

.score-bg {
  fill: none;
  stroke: #00ffe7;
  stroke-width: 5;
  stroke-dasharray: 157; /* Circumference of the circle */
  stroke-dashoffset: 157; /* Start hidden */
  transition: stroke-dashoffset 0.5s ease-in-out;
}

.score-progress {
  fill: none;
  stroke: url(#score-gradient);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 157; /* Circumference of the circle */
  stroke-dashoffset: 157; /* Start hidden */
  transition: stroke-dashoffset 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0 0 5px #00ffe7);
  animation: progress-glow 2s infinite alternate;
}

@keyframes progress-glow {
  0%, 100% { filter: drop-shadow(0 0 5px #00ffe7); }
  50% { filter: drop-shadow(0 0 15px #00ffe7); }
}

.score-value {
  position: absolute;
  font-family: 'Press Start 2P', monospace;
  font-size: 1.2rem;
  color: #00ffe7;
  text-shadow: 1px 1px 0 #000;
  z-index: 2;
}

.project-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}



@keyframes pulse-glow {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

@keyframes pulse-border {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

@keyframes pulse-screen {
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 
      inset 0 0 30px rgba(255, 0, 80, 0.4),
      0 0 20px rgba(255, 0, 80, 0.3),
      0 0 40px rgba(0, 255, 231, 0.2);
  }
  50% { 
    transform: scale(1.03); 
    box-shadow: 
      inset 0 0 40px rgba(255, 0, 80, 0.6),
      0 0 30px rgba(255, 0, 80, 0.5),
      0 0 60px rgba(0, 255, 231, 0.4);
  }
}

@keyframes holographic-sweep {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(200%) rotate(45deg); }
}

@keyframes glitch-scanlines {
  0% { transform: translateY(0); opacity: 0.05; }
  50% { transform: translateY(2px); opacity: 0.1; }
  100% { transform: translateY(0); opacity: 0.05; }
}







@keyframes float-icon {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-5px) scale(1.05); }
}

.project-info {
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* GitHub News Header */
.github-news-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #000;
}

.github-news-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.github-logo {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.github-news-title {
  font-family: 'Impact', 'Arial Black', 'Helvetica Black', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.readme-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #00ffe7;
  color: #000;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  border: 1px solid #000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  animation: readme-pulse 2s infinite;
}

.readme-icon {
  font-size: 0.6rem;
}

.readme-text {
  font-weight: bold;
  text-shadow: 1px 1px 0 #fff;
}

@keyframes readme-pulse {
  0%, 100% { 
    background: #00ffe7;
    transform: scale(1);
  }
  50% { 
    background: #00bfff;
    transform: scale(1.05);
  }
}

/* Newspaper Styles */
.newspaper-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  border-bottom: 2px solid #000;
  padding-bottom: 0.5rem;
}

.newspaper-title {
  flex: 1;
}

.newspaper-title h3 {
  font-family: 'Impact', 'Arial Black', 'Helvetica Black', sans-serif;
  font-size: 2rem;
  font-weight: 400;
  color: #000;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.newspaper-subtitle {
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.newspaper-date {
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
  font-size: 0.7rem;
  color: #666;
  font-weight: 600;
  text-align: right;
  min-width: 80px;
}

.newspaper-content {
  flex: 1;
  margin-bottom: 1rem;
}

.newspaper-column {
  column-count: 1;
  column-gap: 1rem;
}

.newspaper-text {
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #333;
  margin: 0 0 1rem 0;
  text-align: justify;
  font-weight: 400;
}

.newspaper-btn {
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  background: #000;
  color: #fff;
  border: 2px solid #000;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  display: inline-block;
  text-align: center;
}

.newspaper-btn:hover {
  background: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.project-title {
  font-family: 'Impact', 'Arial Black', 'Helvetica Black', sans-serif;
  font-size: 2rem;
  font-weight: 400;
  color: #000;
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-desc {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  color: #ccc;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 0 #000;
}

.project-status {
  margin-bottom: 0.5rem;
}

.status-badge {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid;
  text-shadow: 1px 1px 0 #000;
}

.status-badge.progress {
  background: #ffa500;
  color: #000;
  border-color: #ff8c00;
}

.status-badge.production {
  background: #00ff00;
  color: #000;
  border-color: #00cc00;
}

.status-badge.testing {
  background: #00bfff;
  color: #000;
  border-color: #0099cc;
}

.status-badge.planning {
  background: #ff69b4;
  color: #000;
  border-color: #ff1493;
}









.project-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 10;
}

.action-btn {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  background: linear-gradient(135deg, #00ffe7 0%, #00bfff 25%, #ff0050 50%, #e6004c 75%, #00ffe7 100%);
  color: #000;
  border: none;
  padding: 1.2rem 3rem;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 
    0 0 30px rgba(0, 255, 231, 0.8),
    0 0 60px rgba(255, 0, 80, 0.6),
    0 0 90px rgba(0, 191, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  text-shadow: 0 0 10px rgba(0, 255, 231, 0.8);
  font-weight: bold;
  letter-spacing: 3px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(0, 255, 231, 0.8);
  animation: cyberpunk-pulse 2s infinite ease-in-out;
  z-index: 20;
  cursor: pointer;
  display: inline-block;
  min-width: 200px;
  text-align: center;
  clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px);
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 231, 0.6), rgba(255, 0, 80, 0.6), transparent);
  transition: left 0.5s ease;
  filter: blur(1px);
}

.action-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(0, 255, 231, 0.8) 0%, rgba(255, 0, 80, 0.6) 30%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
  filter: blur(2px);
}

.action-btn:hover {
  background: linear-gradient(135deg, #ff0050 0%, #00ffe7 25%, #00bfff 50%, #e6004c 75%, #ff0050 100%);
  transform: translateY(-5px) scale(1.08);
  box-shadow: 
    0 20px 60px rgba(255, 0, 80, 1),
    0 0 120px rgba(0, 255, 231, 0.8),
    0 0 180px rgba(0, 191, 255, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5);
  color: #000;
  letter-spacing: 5px;
  clip-path: polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px);
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:hover::after {
  width: 400px;
  height: 400px;
  filter: blur(3px);
}

.action-btn:active {
  transform: translateY(-2px) scale(0.95);
  box-shadow: 
    0 10px 40px rgba(255, 0, 80, 0.9),
    0 0 100px rgba(0, 255, 231, 0.7),
    0 0 150px rgba(0, 191, 255, 0.5),
    inset 0 3px 0 rgba(255, 255, 255, 0.8),
    inset 0 -2px 0 rgba(0, 0, 0, 0.6);
  clip-path: polygon(5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px), 0 5px);
}

.holographic-btn {
  position: relative;
  overflow: hidden;
}

.btn-text {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.btn-icon {
  position: relative;
  z-index: 2;
  margin-left: 8px;
  font-size: 1.2em;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.action-btn:hover .btn-text {
  transform: translateX(-5px);
}

.action-btn:hover .btn-icon {
  transform: translateX(5px);
  opacity: 1;
}

@keyframes button-pulse {
  0%, 100% { 
    box-shadow: 
      0 0 40px rgba(255, 0, 80, 0.6),
      0 0 80px rgba(255, 0, 80, 0.4);
  }
  50% { 
    box-shadow: 
      0 0 60px rgba(255, 0, 80, 0.8),
      0 0 120px rgba(255, 0, 80, 0.6);
  }
}

@keyframes button-glow {
  0%, 100% { 
    background: linear-gradient(135deg, #00ffe7 0%, #00bfff 50%, #00ffe7 100%);
  }
  50% { 
    background: linear-gradient(135deg, #00bfff 0%, #00ffe7 50%, #00bfff 100%);
  }
}

.pixel-btn:hover {
  background: #000;
  color: #ff0050;
  transform: translateY(2px);
  box-shadow: 0 1px 0 #ff0050;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid rgba(0, 255, 231, 0.3);
  position: relative;
}

.card-footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff0050, transparent);
  animation: footer-glow 3s infinite alternate;
}

@keyframes footer-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.footer-line {
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ffe7, transparent);
  opacity: 0.5;
  margin: 0 10px;
}

.footer-dots {
  display: flex;
  gap: 5px;
}

.dot {
  width: 8px;
  height: 8px;
  background: linear-gradient(145deg, #00ffe7, #00bfff);
  border-radius: 50%;
  box-shadow: 0 0 8px #00ffe7;
  animation: pulse-dot 3s infinite;
  position: relative;
}

.dot::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(0, 255, 231, 0.3), transparent);
  border-radius: 50%;
  animation: dot-glow 3s infinite;
}

@keyframes dot-glow {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 0.8; }
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .projects-section {
    padding: 3rem 1rem;
  }

  .pixel-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .points-text {
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 100%;
  }

  .project-card {
    padding: 1.5rem;
  }

  .project-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .pixel-screen {
    width: 100px;
    height: 70px;
  }

  .screen-content {
    width: 70px;
    height: 70px;
  }

  .project-title {
    font-size: 1rem;
  }

  .project-desc {
    font-size: 0.8rem;
  }

  .project-status {
    font-size: 0.7rem;
  }

  .project-actions {
    flex-direction: column;
    gap: 0.8rem;
  }

  .action-btn {
    font-size: 0.5rem;
    padding: 0.8rem 2rem;
    min-width: 160px;
  }
}

@media (max-width: 480px) {
  .projects-section {
    padding: 2rem 0.5rem;
  }

  .pixel-title {
    font-size: 1.4rem;
  }

  .points-text {
    font-size: 0.6rem;
    padding: 0.4rem 0.8rem;
  }

  .project-card {
    padding: 1rem;
  }

  .pixel-screen {
    width: 80px;
    height: 60px;
  }

  .screen-content {
    width: 60px;
    height: 60px;
  }

  .project-title {
    font-size: 0.9rem;
  }

  .project-desc {
    font-size: 0.7rem;
  }

  .action-btn {
    font-size: 0.5rem;
    padding: 0.8rem 2rem;
    min-width: 160px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .pixel-title {
    font-size: 2rem;
  }
}

.projects-carousel { width: 100%; display: flex; flex-direction: column; align-items: center; min-height: 320px; position: relative; padding: 1rem 0 0.25rem 0; box-sizing: border-box; }
.carousel-track-wrapper { overflow: hidden; width: 100%; max-width: 900px; padding: 0 2vw; box-sizing: border-box; }
.carousel-track { display: flex; transition: transform 0.7s cubic-bezier(.77,0,.18,1); width: 100%; }
.carousel-card { flex: 0 0 100%; max-width: 100%; min-width: 320px; min-height: 420px; box-sizing: border-box; margin: 0 auto; background: rgba(0,255,231,0.08); border: 2px solid #00ffe7; border-radius: 14px; box-shadow: 0 2px 16px #00ffe733; transition: box-shadow 0.3s, border-color 0.3s; }
.carousel-card:hover { border-color: #ff0050; box-shadow: 0 4px 32px #ff005088; }
.carousel-pagination { display: flex; justify-content: center; margin-top: 1rem; gap: 0.5rem; }
.carousel-dot { width: 12px; height: 12px; border-radius: 50%; background: #00ffe7; opacity: 0.4; cursor: pointer; transition: opacity 0.2s, background 0.2s; }
.carousel-dot.active { opacity: 1; background: #ff0050; }
@media (max-width: 900px) { .carousel-card { min-width: 220px; min-height: 340px; } .carousel-track-wrapper { max-width: 98vw; } }
@media (max-width: 700px) { .carousel-card, .carousel-track { flex: 0 0 100%; max-width: 100%; } .carousel-track-wrapper { max-width: 99vw; padding: 0; } .projects-carousel { padding: 0.5rem 0 0.1rem 0; } }
.carousel-fade-enter-active, .carousel-fade-leave-active { transition: opacity 0.5s; }
.carousel-fade-enter-from, .carousel-fade-leave-to { opacity: 0; }

.carousel-left-img {
  position: absolute;
  left: -200px; /* Move even more to the left */
  top: 280px; /* Move down but not as much */
  width: 450px; /* Much bigger (150px + 300px) */
  height: auto;
  image-rendering: pixelated;
  animation: control-animation 6s ease-in-out infinite;
}

@keyframes control-animation {
  0%, 20% { 
    animation-play-state: running;
  }
  25%, 75% { 
    animation-play-state: paused;
  }
  80%, 100% { 
    animation-play-state: running;
  }
}

.carousel-left-img.paused {
  animation-play-state: paused !important;
}

.carousel-left-img.playing {
  animation-play-state: running !important;
}

.h1-img {
  z-index: 3; /* Front */
  transform: translateX(0px) translateY(30px); /* First position + move down */
}

.h2-img {
  z-index: 2; /* Middle */
  transform: translateX(30px); /* Second position */
}

.h3-img {
  z-index: 1; /* Back */
  transform: translateX(60px) scaleX(-1); /* Third position + flip */
}

@media (max-width: 900px) {
  .carousel-left-img {
    width: 400px; /* Much bigger for mobile too (100px + 300px) */
    left: -150px; /* Move even more to the left on mobile */
    top: 150px; /* Move down but not as much on mobile */
  }
}

.carousel-corner-img {
  position: absolute;
  top: 180px; /* Move down more */
  right: -30px; /* Move 10px more to the left */
  width: 280px; /* Even bigger */
  height: auto;
  image-rendering: pixelated;
  z-index: 2;
  animation: hide-and-seek 6s ease-in-out infinite, glow-pulse 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(0, 255, 231, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 80, 0.6));
}

@keyframes hide-and-seek {
  0%, 20% { 
    opacity: 1;
    transform: translateX(0);
    filter: drop-shadow(0 0 20px rgba(0, 255, 231, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 80, 0.6));
  }
  25%, 75% { 
    opacity: 0;
    transform: translateX(50px);
    filter: drop-shadow(0 0 10px rgba(0, 255, 231, 0.4)) drop-shadow(0 0 20px rgba(255, 0, 80, 0.3));
  }
  80%, 100% { 
    opacity: 1;
    transform: translateX(0);
    filter: drop-shadow(0 0 20px rgba(0, 255, 231, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 80, 0.6));
  }
}

@keyframes glow-pulse {
  0%, 100% { 
    filter: drop-shadow(0 0 20px rgba(0, 255, 231, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 80, 0.6));
  }
  50% { 
    filter: drop-shadow(0 0 30px rgba(0, 255, 231, 1)) drop-shadow(0 0 60px rgba(255, 0, 80, 0.8));
  }
}

@media (max-width: 900px) {
  .carousel-corner-img {
    width: 180px; /* Bigger for mobile too */
    top: 60px; /* Move down more on mobile */
    right: -30px; /* Move more to the right like on PC */
  }
}

/* New styles for background effects */
.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.05) 0px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 2px
  );
  opacity: 0.1;
  animation: grid-pulse 5s infinite linear;
}

.energy-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 255, 231, 0.05) 0%, transparent 70%);
  opacity: 0.1;
  animation: energy-pulse 8s infinite linear;
}

@keyframes grid-pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}

@keyframes energy-pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}

@keyframes cyberpunk-pulse {
  0%, 100% { 
    box-shadow: 
      0 0 30px rgba(0, 255, 231, 0.8),
      0 0 60px rgba(255, 0, 80, 0.6),
      0 0 90px rgba(0, 191, 255, 0.4);
    background: linear-gradient(135deg, #00ffe7 0%, #00bfff 25%, #ff0050 50%, #e6004c 75%, #00ffe7 100%);
  }
  25% { 
    box-shadow: 
      0 0 40px rgba(255, 0, 80, 0.9),
      0 0 80px rgba(0, 255, 231, 0.7),
      0 0 120px rgba(0, 191, 255, 0.5);
    background: linear-gradient(135deg, #ff0050 0%, #00ffe7 25%, #00bfff 50%, #e6004c 75%, #ff0050 100%);
  }
  50% { 
    box-shadow: 
      0 0 50px rgba(0, 191, 255, 1),
      0 0 100px rgba(255, 0, 80, 0.8),
      0 0 150px rgba(0, 255, 231, 0.6);
    background: linear-gradient(135deg, #00bfff 0%, #ff0050 25%, #00ffe7 50%, #e6004c 75%, #00bfff 100%);
  }
  75% { 
    box-shadow: 
      0 0 40px rgba(230, 0, 76, 0.9),
      0 0 80px rgba(0, 255, 231, 0.7),
      0 0 120px rgba(255, 0, 80, 0.5);
    background: linear-gradient(135deg, #e6004c 0%, #00bfff 25%, #ff0050 50%, #00ffe7 75%, #e6004c 100%);
  }
}

/* Mobile images container */
.mobile-images {
  display: none;
  position: relative;
  width: 200px;
  height: 200px;
  margin: 2rem auto;
  padding: 1rem;
}

.mobile-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 0 10px rgba(0, 255, 231, 0.6));
  transition: all 0.3s ease;
  z-index: 1;
}

.mobile-img:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 15px rgba(255, 0, 80, 0.8));
  z-index: 10;
}

/* Specific positioning for each image */
.mobile-img.h1-img {
  z-index: 4;
  transform: translateX(-150px) translateY(30px);
  filter: none;
}

.mobile-img.h2-img {
  z-index: 3;
  transform: translateX(-120px);
  filter: none;
}

.mobile-img.h3-img {
  z-index: 2;
  transform: translateX(-90px) scaleX(-1);
  filter: none;
}

/* n2 image (last one) */
.mobile-img.n2-img {
  z-index: 1 !important;
  transform: translateX(120px) scale(0.6) !important;
  animation: hide-and-seek 6s ease-in-out infinite, glow-pulse 3s ease-in-out infinite !important;
}

/* Desktop images - hide on mobile */
@media (max-width: 900px) {
  .carousel-left-img,
  .carousel-corner-img {
    display: none !important;
  }
}

/* Mobile styles to position images below carousel */
@media (max-width: 900px) {
  .mobile-images {
    display: flex;
  }
}

.news-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 6px 6px 0 0;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.news-image:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Estilos para imágenes que fallan al cargar */
.news-image[src*="unsplash"] {
  filter: grayscale(0.3);
}

.news-image[src*="unsplash"]:hover {
  filter: grayscale(0);
}

</style> 