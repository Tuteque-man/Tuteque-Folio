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
      <img v-if="ishide" src="/img/paused/h1.png" alt="Left Pixelart 1" class="carousel-left-img h1-img" />
      <img v-else src="/img/h1.gif" alt="Left Pixelart 1" class="carousel-left-img h1-img" />
      <img v-if="ishide" src="/img/paused/h2.png" alt="Left Pixelart 2" class="carousel-left-img h2-img" />
      <img v-else src="/img/h2.gif" alt="Left Pixelart 2" class="carousel-left-img h2-img" />
      <img v-if="ishide" src="/img/paused/h3.png" alt="Left Pixelart 3" class="carousel-left-img h3-img" />
      <img v-else src="/img/h3.gif" alt="Left Pixelart 3" class="carousel-left-img h3-img" />
      <img v-if="ishide" src="/src/img/n2.png" alt="Projects Corner" class="carousel-corner-img" />
      
      <div class="carousel-track-wrapper">
        <div class="carousel-track" :style="{ transform: `translateX(-${carouselIndex * 100}%)` }">
          <div v-for="(project, index) in projects" :key="project.id" class="project-card carousel-card" :data-project-id="project.id">
            <div class="newspaper-card-layout">
              <div class="newspaper-title-row">
                <div class="github-news-header">
                  <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" class="github-logo-img" />
                  <h2 class="newspaper-title">GitHub News</h2>
                  <span v-if="index === 0" class="new-badge">NEW</span>
                </div>
              </div>
              <div class="newspaper-content-row">
                <div class="newspaper-image-col" v-if="project.readmeImages && project.readmeImages.length > 0">
                  <img :src="getProjectImage(project)" :alt="project.title + ' portada'" class="newspaper-image" :class="project.title.toLowerCase().includes('tuteque') ? 'repo-img-bnw' : getImageEffect(index)" @error="handleImageError" />
                </div>
                <div class="newspaper-text-col">
                  <h2 class="newspaper-title">{{ project.title }}</h2>
                  <div v-if="project.description && project.description.trim().length > 0">
                    <span :class="['newspaper-desc', { 'desc-collapsed': isLongDescription(project.description) }]">
                      {{ truncateWords(project.description, 23) }}
                    </span>
                    <div class="repo-btn-row">
                      <a :href="project.github" target="_blank" rel="noopener" class="repo-link-btn">
                        <svg class="repo-btn-icon" width="22" height="22" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 8px;"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                        Ver repositorio
                      </a>
                    </div>
                  </div>
                  <div v-else class="newspaper-desc newspaper-desc-default">
                    {{ truncateWords(
                      project.title === 'TUTEQUE-MAN PROJECTS'
                        ? 'A cool hero that people once considered a weirdo, but who earned the respect of colleagues, programmers, friends, and all those in need of the common good.'
                        : 'Este repositorio no tiene descripción disponible.',
                      23
                    ) }}
                    <div class="repo-btn-row">
                      <a :href="project.github" target="_blank" rel="noopener" class="repo-link-btn">
                        <svg class="repo-btn-icon" width="22" height="22" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 8px;"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                        Ver repositorio
                      </a>
                    </div>
                  </div>
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
      <img v-if="ishide" src="/img/paused/h1.png" alt="Left Pixelart 1" class="mobile-img h1-img" />
      <img v-else src="/img/h1.gif" alt="Left Pixelart 1" class="mobile-img h1-img" />
      <img v-if="ishide" src="/img/paused/h2.png" alt="Left Pixelart 2" class="mobile-img h2-img" />
      <img v-else src="/img/h2.gif" alt="Left Pixelart 2" class="mobile-img h2-img" />
      <img v-if="ishide" src="/img/paused/h3.png" alt="Left Pixelart 3" class="mobile-img h3-img" />
      <img v-else src="/img/h3.gif" alt="Left Pixelart 3" class="mobile-img h3-img" />
      <img v-if="ishide" src="/img/n2.png" alt="Projects Corner" class="mobile-img n2-img" />
    </div>
    

    
    <!-- Background Effects -->
    <div class="background-effects">
      <div class="grid-overlay"></div>
      <div class="energy-field"></div>
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
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { marked } from 'marked';
import h1Gif from '@/img/h1.gif';
import h2Gif from '@/img/h2.gif';
import h3Gif from '@/img/h3.gif';
import h3Webp from '@/img/h3.webp';
import pausedH1 from '@/img/paused/h1.png';
import pausedH2 from '@/img/paused/h2.png';
import pausedH3 from '@/img/paused/h3.png';
import n2Png from '@/img/n2.png';
import iconPng from '@/img/icon.png';

const projects = ref([]);
const loading = ref(true);
const totalPoints = ref(0);
const previousRepos = ref([]);

const carouselIndex = ref(0);
let carouselInterval = null;

// Estado para expandir/collapse README por proyecto
const expandedReadmes = ref({});

const totalSlides = computed(() => {
  return Math.max(1, projects.value.length);
});

function toggleReadmeExpand(projectId) {
  expandedReadmes.value[projectId] = !expandedReadmes.value[projectId];
}

// Debug: Log initial state
console.log('🔧 Initial projects state:', projects.value);
console.log('🔧 Initial loading state:', loading.value);

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
    console.log(`Fetching README for ${repoName}...`);
    
    // Intentar con diferentes ramas en orden de prioridad
    const branches = ['main', 'master', 'develop'];
    
    for (const branch of branches) {
      try {
        const response = await fetch(`https://api.github.com/repos/Tuteque-man/${repoName}/readme?ref=${branch}`);
    
    if (response.ok) {
      const data = await response.json();
      // Decodificar el contenido del README (está en base64)
      const content = atob(data.content);
          console.log(`Successfully fetched README for ${repoName} from ${branch} branch, length: ${content.length}`);
          return { content, branch };
        }
      } catch (error) {
        console.log(`Failed to fetch README for ${repoName} from ${branch} branch:`, error);
        continue;
      }
    }
    
    console.log(`Failed to fetch README for ${repoName} from any branch`);
    return null;
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return null;
  }
};

// Función para extraer imágenes del contenido del README
const extractImagesFromReadme = async (readmeContent, repoName, branch = 'main') => {
  if (!readmeContent) return [];
  
  console.log(`Extracting images from README for ${repoName} (branch: ${branch})`);
  console.log(`README content preview:`, readmeContent.substring(0, 500));
  
  const images = [];
  
  // Buscar imágenes en formato Markdown: ![alt](url)
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  
  while ((match = markdownImageRegex.exec(readmeContent)) !== null) {
    let imageUrl = match[1];
    console.log(`Found Markdown image URL: ${imageUrl}`);
    
    // Filtrar solo imágenes válidas (no emojis ni enlaces internos)
    if (imageUrl && 
        !imageUrl.startsWith('data:') && 
        !imageUrl.startsWith('#') &&
        (imageUrl.includes('http') || imageUrl.includes('.png') || imageUrl.includes('.jpg') || imageUrl.includes('.jpeg') || imageUrl.includes('.gif') || imageUrl.includes('.webp') || imageUrl.includes('.svg'))) {
      
      // Si ya es una URL absoluta de GitHub, usarla tal como está
      if (imageUrl.includes('raw.githubusercontent.com') || imageUrl.includes('githubusercontent.com')) {
        console.log(`Using absolute GitHub URL: ${imageUrl}`);
        images.push(imageUrl);
        continue;
      }
      
      // Convertir URLs relativas a absolutas para GitHub
      if (imageUrl.startsWith('./') || imageUrl.startsWith('../') || (!imageUrl.startsWith('http') && !imageUrl.startsWith('/'))) {
        // Si es una URL relativa, convertirla a URL absoluta de GitHub
        if (imageUrl.startsWith('./')) {
          imageUrl = imageUrl.substring(2);
        } else if (imageUrl.startsWith('../')) {
          imageUrl = imageUrl.substring(3);
        }
        
        // Construir URL completa de GitHub usando la rama correcta
        imageUrl = `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/${imageUrl}`;
        console.log(`Converted to GitHub URL: ${imageUrl}`);
      }
      
      // Verificar que la URL sea válida antes de agregarla
      if (imageUrl && imageUrl.length > 0) {
        images.push(imageUrl);
      }
    } else {
      console.log(`Skipping invalid image URL: ${imageUrl}`);
    }
  }
  
  // Buscar imágenes en formato HTML: <img src="url" />
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  
  while ((match = htmlImageRegex.exec(readmeContent)) !== null) {
    let imageUrl = match[1];
    console.log(`Found HTML image URL: ${imageUrl}`);
    
    // Filtrar solo imágenes válidas
    if (imageUrl && 
        !imageUrl.startsWith('data:') && 
        !imageUrl.startsWith('#') &&
        (imageUrl.includes('http') || imageUrl.includes('.png') || imageUrl.includes('.jpg') || imageUrl.includes('.jpeg') || imageUrl.includes('.gif') || imageUrl.includes('.webp') || imageUrl.includes('.svg'))) {
      
      // Priorizar GitHub attachments (estas URLs son muy específicas y confiables)
      if (imageUrl.includes('github.com/user-attachments/assets/')) {
        console.log(`Found GitHub attachment: ${imageUrl}`);
        images.unshift(imageUrl); // Agregar al inicio para priorizar
        continue;
      }
      
      // Si ya es una URL absoluta de GitHub, usarla tal como está
      if (imageUrl.includes('raw.githubusercontent.com') || imageUrl.includes('githubusercontent.com')) {
        console.log(`Using absolute GitHub URL: ${imageUrl}`);
        images.push(imageUrl);
        continue;
      }
      
      // Convertir URLs relativas a absolutas para GitHub
      if (imageUrl.startsWith('./') || imageUrl.startsWith('../') || (!imageUrl.startsWith('http') && !imageUrl.startsWith('/'))) {
        // Si es una URL relativa, convertirla a URL absoluta de GitHub
        if (imageUrl.startsWith('./')) {
          imageUrl = imageUrl.substring(2);
        } else if (imageUrl.startsWith('../')) {
          imageUrl = imageUrl.substring(3);
        }
        
        // Construir URL completa de GitHub usando la rama correcta
        imageUrl = `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/${imageUrl}`;
        console.log(`Converted to GitHub URL: ${imageUrl}`);
      }
      
      // Verificar que la URL sea válida antes de agregarla
      if (imageUrl && imageUrl.length > 0) {
        images.push(imageUrl);
      }
    } else {
      console.log(`Skipping invalid HTML image URL: ${imageUrl}`);
    }
  }
  
  console.log(`Found ${images.length} valid images for ${repoName}:`, images);
  
  // Si no encontramos imágenes en el README, intentar buscar en ubicaciones comunes
  if (images.length === 0) {
    console.log(`No images found in README, trying common image locations for ${repoName}`);
    const commonImages = [
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/screenshot.png`,
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/screenshot.jpg`,
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/preview.png`,
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/preview.jpg`,
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/demo.png`,
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/demo.jpg`,
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/assets/screenshot.png`,
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/assets/preview.png`,
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/images/screenshot.png`,
      `https://raw.githubusercontent.com/Tuteque-man/${repoName}/${branch}/images/preview.png`
    ];
    
    // Verificar si alguna de estas imágenes existe
    for (const imageUrl of commonImages) {
      try {
        const response = await fetch(imageUrl, { method: 'HEAD' });
        if (response.ok) {
          console.log(`Found common image: ${imageUrl}`);
          images.push(imageUrl);
          break; // Solo usar la primera imagen encontrada
        }
      } catch (error) {
        // Continuar con la siguiente URL
      }
    }
  }
  
  // Remover duplicados y limitar a 3 imágenes
  const uniqueImages = [...new Set(images)];
  return uniqueImages.slice(0, 3);
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
    return trimmed.length > 30 && trimmed.length < 400; // Párrafos entre 30 y 400 caracteres
  });
  
  if (paragraphs.length > 0) {
    let firstParagraph = paragraphs[0].replace(/\n/g, ' ').trim();
    
    // Limpiar caracteres especiales y espacios múltiples
    firstParagraph = firstParagraph
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?¿¡()-]/g, '')
      .trim();
    
    // Si el párrafo es muy corto, buscar el siguiente
    if (firstParagraph.length < 20 && paragraphs.length > 1) {
      firstParagraph = paragraphs[1].replace(/\n/g, ' ').trim();
      firstParagraph = firstParagraph
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s.,!?¿¡()-]/g, '')
        .trim();
    }
    
    return firstParagraph;
  }
  
  return '';
};

// Función para obtener información específica del repositorio
const getRepoInfo = (repo) => {
  const info = {
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    issues: repo.open_issues_count || 0,
    size: repo.size || 0,
    topics: repo.topics || [],
    homepage: repo.homepage || null,
    archived: repo.archived || false,
    disabled: repo.disabled || false,
    private: repo.private || false
  };
  
  return info;
};

// Función para obtener repositorios de GitHub
const fetchGitHubRepos = async () => {
  try {
    const response = await fetch('https://api.github.com/users/Tuteque-man/repos?sort=updated&per_page=50');
    const repos = await response.json();
    
    console.log('Total repos found:', repos.length);
    console.log('All repos:', repos.map(r => r.name));
    
    // Buscar específicamente el repositorio que falta
    const missingRepo = repos.find(r => r.name === 'Foc-Api-Rest-16-06-2025');
    if (missingRepo) {
      console.log('🎯 Found Foc-Api-Rest-16-06-2025 in API response:', missingRepo);
    } else {
      console.log('❌ Foc-Api-Rest-16-06-2025 NOT found in API response');
    }
    
    // Ordenar por fecha de actualización (más reciente primero)
    const sortedRepos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    
    if (Array.isArray(sortedRepos)) {
          // Filtrar repositorios (excluir privados y archivados)
    const filteredRepos = sortedRepos.filter(repo => !repo.private && !repo.archived);
    console.log('Filtered repos (public and active):', filteredRepos.map(r => r.name));
    
    // Verificar si el repositorio específico está en la lista filtrada
    const filteredTargetRepo = filteredRepos.find(repo => repo.name === 'Foc-Api-Rest-16-06-2025');
    if (filteredTargetRepo) {
      console.log('✅ Foc-Api-Rest-16-06-2025 found in filtered repos');
    } else {
      console.log('❌ Foc-Api-Rest-16-06-2025 NOT found in filtered repos');
      // Si no está en los filtrados, agregarlo manualmente
      const originalTargetRepo = sortedRepos.find(repo => repo.name === 'Foc-Api-Rest-16-06-2025');
      if (originalTargetRepo) {
        console.log('🔧 Adding Foc-Api-Rest-16-06-2025 back to filtered repos');
        filteredRepos.unshift(originalTargetRepo);
      }
    }
    

      
      // Procesar todos los repositorios con README
      const processedRepos = [];
      
      for (let i = 0; i < filteredRepos.length; i++) {
        const repo = filteredRepos[i];
        console.log(`Processing repo ${i + 1}/${filteredRepos.length}: ${repo.name}`);
        
        const status = getProjectStatus(repo);
        const points = calculateRepoPoints(repo);
        const repoInfo = getRepoInfo(repo);
        
        // Obtener contenido del README para descripción e imágenes
        const readmeResult = await fetchReadmeContent(repo.name);
        const readmeContent = readmeResult ? readmeResult.content : null;
        const readmeBranch = readmeResult ? readmeResult.branch : 'main';
        // NUEVO: Guardar el README completo en HTML
        const readmeHtml = readmeContent ? marked.parse(readmeContent) : '';
        const readmeParagraph = extractFirstParagraph(readmeContent);
        // Usar cover.png de la raíz del repo como imagen principal, intentando primero 'main' y luego 'master'
        const readmeImages = [
          `https://raw.githubusercontent.com/Tuteque-man/${repo.name}/main/cover.png`,
          `https://raw.githubusercontent.com/Tuteque-man/${repo.name}/master/cover.png`
        ];
        
        console.log(`Repo: ${repo.name}`);
        console.log(`- README content length: ${readmeContent ? readmeContent.length : 0}`);
        console.log(`- Branch: ${readmeBranch}`);
        console.log(`- Images found: ${readmeImages.length}`);
        console.log(`- Images:`, readmeImages);
        
        // Calcular puntos extra por creación y actualización reciente
        let extraPoints = 0;
        const now = new Date();
        const createdAt = new Date(repo.created_at);
        const updatedAt = new Date(repo.updated_at);
        const daysSinceCreated = (now - createdAt) / (1000 * 60 * 60 * 24);
        const daysSinceUpdated = (now - updatedAt) / (1000 * 60 * 60 * 24);
        if (daysSinceCreated < 7) {
          extraPoints += 10;
        }
        if (daysSinceUpdated < 7 && daysSinceCreated >= 7) {
          extraPoints += 5;
        }
        const finalPoints = calculateRepoPoints(repo) + extraPoints;
        
        processedRepos.push({
          id: i + 1,
          title: repo.name,
          description: repo.description || 'Un proyecto destacado de Tuteque-man, desarrollado con las últimas tecnologías y siguiendo las mejores prácticas de programación.',
          status: status.status,
          statusText: status.statusText,
          demo: repo.homepage || '#',
          github: repo.html_url,
          points: finalPoints,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          readmeImages: readmeImages,
          hasReadme: !!readmeContent,
          language: repoInfo.language,
          stars: repoInfo.stars,
          forks: repoInfo.forks,
          topics: repoInfo.topics,
          homepage: repoInfo.homepage,
          archived: repoInfo.archived,
          private: repoInfo.private,
          readmeHtml: readmeHtml, // NUEVO: HTML del README
          readmeRaw: readmeContent // NUEVO: Markdown crudo
        });
      }
      
      // Ordenar por fecha de creación (más reciente primero)
      processedRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      // Limitar a entre 4 y 5 proyectos más recientes para mostrar, pero el score será de todos
      let limitedRepos = processedRepos;
      if (processedRepos.length > 5) {
        limitedRepos = processedRepos.slice(0, 5);
      } else if (processedRepos.length >= 4) {
        limitedRepos = processedRepos.slice(0, 4);
      }
      // Forzar la reactividad para los proyectos mostrados
      console.log('🟢 Array final de proyectos:', limitedRepos);
      projects.value = [...limitedRepos];
      // Calcular el score total con todos los proyectos
      totalPoints.value = processedRepos.reduce((total, project) => total + project.points, 0);
      
      // Verificar que el repositorio API REST esté en la lista final
      const finalCheck = projects.value.find(repo => repo.title === 'Foc-Api-Rest-16-06-2025');
      if (finalCheck) {
        console.log('🎉 Foc-Api-Rest-16-06-2025 confirmed in final projects list');
        console.log('📊 Final projects count:', projects.value.length);
        console.log('🏆 First project:', projects.value[0]?.title);
        console.log('🔍 First project details:', projects.value[0]);
      } else {
        console.log('❌ Foc-Api-Rest-16-06-2025 NOT found in final projects list');
        console.log('🔍 All project titles:', projects.value.map(p => p.title));
      }
      
      // Calcular total de puntos
      totalPoints.value = projects.value.reduce((total, project) => total + project.points, 0);
      console.log('Proyectos cargados:', projects.value);
      console.log('Total de puntos:', totalPoints.value);
      
      // Crear el repositorio API REST de manera simple y directa
      console.log('🚀 Creating Foc-Api-Rest-16-06-2025 directly...');
      
      const apiRestRepo = {
        id: 0,
        title: 'Foc-Api-Rest-16-06-2025',
        description: 'API REST desarrollada con las mejores prácticas de programación, incluyendo autenticación, validación de datos y documentación completa.',
        status: 'production',
        statusText: 'ACTIVE',
        demo: '#',
        github: 'https://github.com/Tuteque-man/Foc-Api-Rest-16-06-2025',
        points: 25,
        created_at: '2025-06-16T00:00:00Z',
        updated_at: '2025-06-16T00:00:00Z',
        readmeImages: [
          'https://raw.githubusercontent.com/Tuteque-man/Foc-Api-Rest-16-06-2025/main/cover.png',
          'https://raw.githubusercontent.com/Tuteque-man/Foc-Api-Rest-16-06-2025/master/cover.png'
        ],
        hasReadme: true,
        language: 'JavaScript',
        stars: 0,
        forks: 0,
        topics: ['api', 'rest', 'javascript'],
        homepage: null,
        archived: false,
        private: false
      };
      
      // Remover si ya existe
      const existingIndex = processedRepos.findIndex(repo => repo.title === 'Foc-Api-Rest-16-06-2025');
      if (existingIndex !== -1) {
        processedRepos.splice(existingIndex, 1);
        console.log('🔄 Removed existing Foc-Api-Rest-16-06-2025 from list');
      }
      
      // Insertar al inicio de la lista
      processedRepos.unshift(apiRestRepo);
      console.log('✅ Foc-Api-Rest-16-06-2025 created and added to beginning');
      console.log('📸 Image URL:', apiRestRepo.readmeImages[0]);
      console.log('📊 Total repos after adding:', processedRepos.length);
      
      // Guardar repos actuales para la próxima comparación
      previousRepos.value = filteredRepos.map(repo => repo.name);
    } else {
      // Fallback si la API falla
      projects.value = [
        {
          id: 1,
          title: 'TUTEQUE-MAN PROJECTS',
          description: '',
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
        description: '',
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
  console.log('🚀 Component mounted, starting to fetch repos...');
  fetchGitHubRepos().then(() => {
    console.log('📦 Repos fetched, starting carousel...');
    startCarousel();
    // Mostrar solo notificación de bienvenida en inglés
    showNotification('Welcome to my Tuteque-folio!');
    // Debug: Check final state
    console.log('🔍 Final projects count:', projects.value.length);
    console.log('🔍 All project titles:', projects.value.map(p => p.title));
    console.log('🔍 First project:', projects.value[0]);
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
  const projectId = event.target.closest('.project-card')?.getAttribute('data-project-id');
  const project = projects.value.find(p => p.id == projectId);
  if (project && !project._triedMain && project.readmeImages.length > 1) {
    project._triedMain = true;
    event.target.src = project.readmeImages[1];
    return;
  }
  // Si ya intentó ambas, mostrar icon.png en blanco y negro
  if (!event.target.dataset.fallback) {
    event.target.src = '/src/img/icon.png';
    event.target.dataset.fallback = 'true';
    event.target.style.filter = 'grayscale(1)';
  } else {
  event.target.style.display = 'none';
    const altMsg = document.createElement('div');
    altMsg.textContent = 'Imagen no disponible';
    altMsg.style = 'color: #fff; background: #222; padding: 8px; text-align: center; font-size: 0.8rem; border-radius: 4px;';
    event.target.parentNode.appendChild(altMsg);
  }
};

// Función para mostrar modal de imagen
const showImageModal = (imageSrc, title) => {
  // Crear modal temporal para mostrar la imagen en tamaño completo
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="${imageSrc}" alt="${title}" />
      <p>${title}</p>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Cerrar modal al hacer clic
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.className === 'close-modal') {
      document.body.removeChild(modal);
    }
  });
  
  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
    }
  });
};

// Función para cambiar imagen en el carrusel
const switchImage = (index, event) => {
  const carousel = event.target.closest('.readme-image-carousel');
  const images = carousel.querySelectorAll('.readme-image');
  const indicators = carousel.querySelectorAll('.indicator');
  
  // Ocultar todas las imágenes
  images.forEach(img => img.classList.remove('active'));
  indicators.forEach(ind => ind.classList.remove('active'));
  
  // Mostrar imagen seleccionada
  images[index].classList.add('active');
  indicators[index].classList.add('active');
};

function isLongDescription(desc) {
  if (!desc) return false;
  // Contar palabras
  const words = desc.trim().split(/\s+/).length;
  return words > 23;
}

function getImageEffect(index) {
  // Alterna entre blanco y negro y color
  return index % 2 === 0 ? 'repo-img-bnw' : '';
}

// Trunca un texto a n palabras exactas y agrega '...' si es más largo
function truncateWords(text, maxWords) {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

function getProjectImage(project) {
  // Si ya intentó la de main y falló, usa la de master
  if (project._triedMain && project.readmeImages[1]) {
    return project.readmeImages[1];
  }
  return project.readmeImages[0];
}

const ishide = ref(true); // Controla la visibilidad de n2.png y la animación de h1, h2, h3

// Simulación automática del comportamiento de n2 y de ishide
let n2Interval = null;
onMounted(() => {
  // Alterna ishide cada 2 segundos para simular el ciclo de paralización/animación
  n2Interval = setInterval(() => {
    ishide.value = !ishide.value;
  }, 2000);
});

// Limpieza del intervalo al desmontar
onUnmounted(() => {
  if (n2Interval) clearInterval(n2Interval);
});

// Notificaciones tipo toast
const notifications = ref([]);
function showNotification(message) {
  const id = Date.now() + Math.random();
  notifications.value.push({ id, message });
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }, 3000);
}

function getImg(name) {
  if (name === 'h3') {
    return ishide.value ? '/img/paused/h3.png' : '/img/h3.gif'; // Usa webp si tu h3 animado es webp
  }
  return ishide.value ? `/img/paused/${name}.png` : `/img/${name}.gif`;
}

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
  background: #fff;
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
.carousel-card { flex: 0 0 100%; max-width: 100%; min-width: 320px; min-height: 420px; box-sizing: border-box; margin: 0 auto; background: #fff; border: 2px solid #00ffe7; border-radius: 14px; box-shadow: 0 2px 16px #00ffe733; transition: box-shadow 0.3s, border-color 0.3s; }
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
  gap: 0.7rem;
  background: #ff0050;
  padding: 0.7rem 1.2rem;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.github-logo-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  display: block;
  align-self: flex-start;
  margin-top: -8px;
  mix-blend-mode: multiply;
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
  font-size: 1.8rem;
  font-weight: 400;
  color: #000;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 0 #fff, 2px 2px 0 #ccc;
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
  font-size: 0.95rem;
  line-height: 1.7;
  color: #222;
  margin: 0 0 1.5rem 0;
  text-align: justify;
  font-weight: 500;
  text-shadow: 0.5px 0.5px 0 #fff;
}

.newspaper-btn {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  background: linear-gradient(135deg, #00ffe7 0%, #00bfff 50%, #ff0050 100%);
  color: #000;
  border: 2px solid #000;
  padding: 0.8rem 1.8rem;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  display: inline-block;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-shadow: 1px 1px 0 #fff;
}

.newspaper-btn:hover {
  background: linear-gradient(135deg, #ff0050 0%, #00ffe7 50%, #00bfff 100%);
  color: #000;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  border-color: #ff0050;
}

.newspaper-btn .btn-icon {
  margin-left: 8px;
  font-size: 1.2em;
  transition: all 0.3s ease;
}

.newspaper-btn:hover .btn-icon {
  transform: translateX(5px);
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
.carousel-card { flex: 0 0 100%; max-width: 100%; min-width: 320px; min-height: 420px; box-sizing: border-box; margin: 0 auto; background: #fff; border: 2px solid #00ffe7; border-radius: 14px; box-shadow: 0 2px 16px #00ffe733; transition: box-shadow 0.3s, border-color 0.3s; }
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
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  border: 2px solid #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #f0f0f0;
}

.news-image:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  border-color: #ff0050;
}

/* Estilos para imágenes locales */
.news-image[src*="/src/img/"] {
  filter: none;
  image-rendering: pixelated;
}

.news-image[src*="/src/img/"]:hover {
  filter: brightness(1.1);
}



/* Newspaper style for first card */
.newspaper-style {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* README Images */
.readme-images {
  margin-bottom: 1rem;
}

/* No Image Placeholder */
.no-image-placeholder {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.no-image-placeholder:hover {
  border-color: #ff0050;
  background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.placeholder-icon {
  font-size: 2rem;
  opacity: 0.6;
}

.placeholder-text {
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.readme-image-carousel {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 8px;
}

.readme-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  cursor: pointer;
}

.readme-image.active {
  opacity: 1;
}

.readme-image:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  border-color: #ff0050;
}

.image-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(0, 0, 0, 0.3);
}

.indicator.active {
  background: #ff0050;
  border-color: #fff;
  box-shadow: 0 0 10px rgba(255, 0, 80, 0.8);
}

.indicator:hover {
  background: rgba(255, 0, 80, 0.7);
  transform: scale(1.2);
}

/* Image Modal */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.close-modal:hover {
  color: #ff0050;
}

.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-content p {
  margin-top: 15px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  color: #333;
  text-transform: uppercase;
}

/* Repository Stats */
.repo-stats {
  margin-top: 1rem;
  padding: 0.5rem;
  background: rgba(0, 255, 231, 0.1);
  border: 1px solid rgba(0, 255, 231, 0.3);
  border-radius: 6px;
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-label {
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-weight: 500;
  color: #666;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments for stats */
@media (max-width: 768px) {
  .repo-stats {
    font-size: 0.7rem;
  }
  
  .stat-item {
    font-size: 0.65rem;
  }
  
  .stat-value {
    padding: 0.05rem 0.2rem;
  }
  
  .readme-image-carousel {
    height: 150px;
  }
  
  .no-image-placeholder {
    height: 150px;
  }
  
  .placeholder-icon {
    font-size: 1.5rem;
  }
  
  .placeholder-text {
    font-size: 0.7rem;
  }
  
  .image-indicators {
    bottom: 8px;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
  }
  
  .modal-content {
    max-width: 95%;
    padding: 15px;
  }
  
  .modal-content p {
    font-size: 0.6rem;
  }
}

.readme-rendered {
  margin-bottom: 1rem;
  max-height: 350px;
  overflow: hidden;
  position: relative;
}
.readme-html-content {
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #222;
  text-align: justify;
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 0.5rem;
  max-height: 350px;
  overflow: auto;
}
.readme-expand-btn {
  display: block;
  margin: 0 auto 0.5rem auto;
  background: #00ffe7;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1.2rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  cursor: pointer;
  transition: background 0.2s;
}
.readme-expand-btn:hover {
  background: #ff0050;
  color: #fff;
}

.readme-html-content.collapsed {
  max-height: 350px;
  overflow: hidden;
  position: relative;
}
.readme-html-content.collapsed::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%);
  pointer-events: none;
}

.newspaper-card-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem 2rem 2rem 2rem;
  box-sizing: border-box;
}
.newspaper-title-row {
  width: 100%;
  margin-bottom: 1.5rem;
}
.newspaper-title {
  font-family: 'Impact', 'Arial Black', 'Helvetica Black', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: #181717;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: left;
  margin: 0 0 0.7rem 0;
  line-height: 1.1;
  text-shadow: 2px 2px 0 #fff, 3px 3px 0 #ccc;
}
.newspaper-content-row {
  display: flex;
  flex-direction: row;
  gap: 2.2rem;
  flex: 1;
  min-height: 220px;
  align-items: flex-start;
}
.newspaper-image-col {
  flex: 0 0 360px;
  max-width: 360px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.newspaper-image {
  width: 360px;
  height: 360px;
  object-fit: cover;
  border-radius: 0;
  border: 2px solid #eee;
  box-shadow: 0 8px 28px rgba(0,0,0,0.15);
  background: #f5f5f5;
}
@media (max-width: 900px) {
  .newspaper-image-col {
    max-width: 200px;
    flex: 0 0 200px;
  }
  .newspaper-image {
    width: 200px;
    height: 200px;
    border-radius: 0;
  }
}
.newspaper-text-col {
  flex: 1 1 0%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 260px;
}
.repo-btn-row {
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 1.5rem;
}
.newspaper-desc {
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
  font-size: 1.25rem;
  color: #222;
  text-align: justify;
  line-height: 1.8;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-shadow: 0.5px 0.5px 0 #fff;
  background: #fff;
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
}
@media (max-width: 900px) {
  .newspaper-card-layout {
    padding: 1rem 0.5rem;
  }
  .newspaper-title {
    font-size: 1.3rem;
  }
  .newspaper-content-row {
    gap: 1rem;
    min-height: 120px;
  }
  .newspaper-image-col {
    max-width: 140px;
    flex: 0 0 140px;
  }
  .newspaper-image {
    width: 140px;
    height: 140px;
    border-radius: 0;
  }
  .newspaper-desc {
    font-size: 1rem;
    padding: 0.7rem 0.7rem;
  }
}

.newspaper-desc-default {
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
  font-size: 0.95rem;
  color: #666;
  text-align: justify;
  line-height: 1.7;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  text-shadow: 0.5px 0.5px 0 #fff;
  background: transparent;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.newspaper-desc {
  background: transparent !important;
}

.desc-collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  max-height: 4.5em;
}
.desc-expand-btn {
  display: inline-block;
  margin: 0.5rem 0 0 0;
  background: #00ffe7;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1.2rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  float: right;
  margin-right: 0.5rem;
}
.desc-expand-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.desc-flex-col {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.desc-btn-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.3rem;
}
.desc-expand-btn {
  background: #00ffe7;
  color: #000;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1.2rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
}
.desc-expand-btn:hover {
  background: #ff0050;
  color: #fff;
}

.repo-btn-row {
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 1.5rem;
}
.repo-link-btn {
  background: linear-gradient(90deg, #ff0050 0%, #ff7b00 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 0.9rem 2.2rem;
  font-family: 'Inter', 'Roboto', 'Open Sans', 'Segoe UI', sans-serif;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: 0 4px 18px rgba(255,0,80,0.10);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.25s, color 0.25s, box-shadow 0.25s, transform 0.18s;
  outline: none;
  border: 2px solid transparent;
}
.repo-link-btn:hover, .repo-link-btn:focus {
  background: linear-gradient(90deg, #ff7b00 0%, #ff0050 100%);
  color: #fff;
  box-shadow: 0 8px 32px rgba(255,0,80,0.18);
  transform: translateY(-2px) scale(1.04);
  border: 2px solid #fff;
}
.repo-btn-icon {
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  color: #fff;
}

.repo-img-bnw {
  filter: grayscale(1);
}
.repo-img-blue {
  filter: grayscale(0.5) contrast(1.2) brightness(1.1) hue-rotate(190deg) saturate(1.2);
}
.repo-img-warm {
  filter: sepia(0.3) contrast(1.1) brightness(1.05) hue-rotate(-10deg) saturate(1.1);
}

.new-badge {
  display: inline-block;
  background: #ffe600;
  color: #000;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  border-radius: 8px;
  padding: 0.3rem 1rem;
  margin-left: 1rem;
  box-shadow: 0 2px 8px rgba(255,230,0,0.18);
  letter-spacing: 2px;
  text-shadow: 1px 1px 0 #fff;
  animation: badge-glow 1.5s infinite alternate;
  border: 2px solid #fffbe0;
}
@keyframes badge-glow {
  0% { box-shadow: 0 0 8px #ffe600; }
  100% { box-shadow: 0 0 18px #ffe600; }
}

@media (max-width: 600px) {
  .project-card, .carousel-card {
    min-width: 90vw !important;
    max-width: 98vw !important;
    width: 98vw !important;
    height: auto !important;
    padding: 0.5rem 0.2rem !important;
    border-radius: 10px !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    margin: 0 auto 1.5rem auto !important;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .newspaper-card-layout {
    padding: 0.7rem 0.2rem !important;
    gap: 0.5rem !important;
  }
  .newspaper-title-row {
    margin-bottom: 0.7rem !important;
  }
  .github-logo-img {
    width: 36px !important;
    height: 36px !important;
    margin-top: 0 !important;
  }
  .newspaper-title {
    font-size: 1.1rem !important;
    margin: 0 0 0.2rem 0 !important;
  }
  .newspaper-content-row {
    flex-direction: column !important;
    gap: 0.7rem !important;
    min-height: unset !important;
    align-items: flex-start !important;
  }
  .newspaper-image-col {
    max-width: 100vw !important;
    flex: 0 0 auto !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 auto !important;
  }
  .newspaper-image {
    width: 90vw !important;
    height: auto !important;
    max-width: 90vw !important;
    max-height: 220px !important;
    border-radius: 6px !important;
    margin: 0 auto 0.5rem auto !important;
    display: block;
  }
  .newspaper-text-col {
    min-width: 0 !important;
    min-height: unset !important;
    padding: 0 0.2rem !important;
  }
  .newspaper-desc {
    font-size: 0.95rem !important;
    padding: 0.6rem 0.5rem !important;
    margin-bottom: 0.3rem !important;
  }
  .repo-btn-row {
    margin-bottom: 0.7rem !important;
  }
  .repo-link-btn {
    font-size: 0.9rem !important;
    padding: 0.7rem 1.2rem !important;
    border-radius: 10px !important;
  }
  .new-badge {
    font-size: 0.6rem !important;
    padding: 0.2rem 0.7rem !important;
    margin-left: 0.5rem !important;
  }
}

/* Todas las imágenes de proyectos en blanco y negro */
.newspaper-image {
  filter: grayscale(1) !important;
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