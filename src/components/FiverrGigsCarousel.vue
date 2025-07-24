<template>
  <div class="fiverr-carousel-bg">
    <div class="section-header">
      <h2 class="pixel-title glitch" data-text="FIVERR GIGS">FIVERR GIGS</h2>
      <div class="pixel-line"></div>
    </div>
    <div class="gigs-grid">
      <a
        v-for="gig in gigs.slice(0, 3)"
        :key="gig.id"
        class="gig-card"
        :href="gig.link"
        target="_blank"
        rel="noopener"
      >
        <img :src="gig.image" :alt="gig.title" class="gig-image" />
        <h3 class="gig-title">{{ gig.title }}</h3>
      </a>
    </div>
    <a
      class="show-more-btn"
      :href="fiverrProfileUrl"
      target="_blank"
      rel="noopener"
    >Show more</a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Datos mockeados de gigs de Fiverr
const gigs = [
  {
    id: 1,
    title: 'I will build a modern and responsive website',
    image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/442142463/original/450ac5e13ae2d6e6d153fcbcc393036a165463e6/build-a-modern-and-responsive-website.png',
    link: 'https://www.fiverr.com/tutequeman/build-a-modern-and-responsive-website?context_referrer=seller_page&ref_ctx_id=42706f2bfe4d4816bcb05c55e1f0ddb9&pckg_id=1&pos=1&imp_id=555d7a9c-03e4-42ee-928f-3b1fc8582974',
  },
  {
    id: 2,
    title: 'I will build custom Python scripts or minigames using Pygame',
    image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/442218304/original/37d16e3723850400ba33aa2140355230c9386c00/build-custom-python-scripts-or-minigames-using-pygame.png',
    link: 'https://www.fiverr.com/tutequeman/build-custom-python-scripts-or-minigames-using-pygame?context_referrer=seller_page&ref_ctx_id=42706f2bfe4d4816bcb05c55e1f0ddb9&pckg_id=1&pos=2&imp_id=3b9f6e01-bbd2-4260-b7a8-b147c6aaa5a5',
  },
  {
    id: 3,
    title: 'I will build a modern and fast website using Vue.js',
    image: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/442232308/original/c4d6b5c984765198ede7d1e484f34d98045bc882/build-a-modern-and-fast-website-using-vuejs.png',
    link: 'https://www.fiverr.com/tutequeman/build-a-modern-and-fast-website-using-vuejs?context_referrer=seller_page&ref_ctx_id=42706f2bfe4d4816bcb05c55e1f0ddb9&pckg_id=1&pos=3&imp_id=ef961c53-9268-4e65-8fb7-1a9384e521c4',
  },
];
const fiverrProfileUrl = 'https://www.fiverr.com/tutequeman';

const currentIndex = ref(0);
let interval = null;

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % gigs.length;
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + gigs.length) % gigs.length;
}

function goToSlide(idx) {
  currentIndex.value = idx;
}

function startAutoSlide() {
  interval = setInterval(() => {
    nextSlide();
  }, 3000);
}

function stopAutoSlide() {
  if (interval) clearInterval(interval);
}

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<style scoped>
.fiverr-carousel-bg {
  width: 100vw;
  max-width: 100%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2.5rem 0 2rem 0;
  position: relative;
  background: linear-gradient(135deg,rgba(15, 12, 41, 0.3) 0%,rgba(48, 43, 99, 0.38) 50%,rgba(36, 36, 62, 0.43) 100%);
}
.section-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}
.pixel-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 2.2rem;
  color: #fff;
  letter-spacing: 2px;
  margin: 0 0 1.2rem 0;
  text-align: center;
  text-transform: uppercase;
  background: linear-gradient(90deg, #00ff50 0%, #00aaff 50%, #ff4edb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow:
    2px 2px 0 #fff,
    -2px 2px 0 #fff,
    2px -2px 0 #fff,
    -2px -2px 0 #fff,
    0 2px 0 #fff,
    2px 0 0 #fff,
    0 -2px 0 #fff,
    -2px 0 0 #fff;
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
  z-index: 2;
  opacity: 0.7;
  pointer-events: none;
}
.glitch:before {
  color: #00aaff;
  text-shadow: 2px 2px 0 #00ff50, 4px 4px 0 #ff4edb;
  animation: glitchTop 2.5s infinite linear alternate-reverse;
  clip-path: inset(0 0 60% 0);
}
.glitch:after {
  color: #00ff50;
  text-shadow: 2px 2px 0 #00aaff, 4px 4px 0 #ff4edb;
  animation: glitchBot 2.5s infinite linear alternate;
  clip-path: inset(60% 0 0 0);
}
@keyframes glitch-anim {
  0% { text-shadow: 2px 2px 0 #00ff50, 4px 4px 0 #00aaff; }
  20% { text-shadow: 2px 2px 0 #ff4edb, 4px 4px 0 #00aaff; }
  40% { text-shadow: 2px 2px 0 #00aaff, 4px 4px 0 #ff4edb; }
  60% { text-shadow: 2px 2px 0 #00ff50, 4px 4px 0 #ff4edb; }
  100% { text-shadow: 2px 2px 0 #ff4edb, 4px 4px 0 #00ff50; }
}
.gigs-grid {
  display: flex;
  gap: 2.2rem;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 2.2rem;
  flex-wrap: wrap;
}
.gig-card {
  width: 320px;
  min-width: 320px;
  max-width: 320px;
  height: 390px;
  min-height: 390px;
  max-height: 390px;
  background: #181c2b;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 #00ff5099, 0 0 0 4px #fff2, 0 2px 8px 0 #000a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid #00ff50;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}
.gig-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 16px 48px 0 #00ff50cc, 0 0 0 6px #fff4;
}
.gig-card:hover .gig-title {
  color: #00ff50;
}
img, svg, .pixelart-below-desc, .pixelart-side-img, .about-image-pixel, .contact-pixelart-img {
  -webkit-user-drag: none;
  user-drag: none;
  user-select: none;
  pointer-events: auto;
}
.gig-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: #fff;
  border: none;
  margin-bottom: 0;
  margin-top: 0;
  display: block;
}
.gig-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 1.13rem;
  color: #fff;
  text-align: center;
  text-shadow: 1px 1px 0 #00ff50, 2px 2px 0 #111;
  margin: 0;
  letter-spacing: 1px;
  background: transparent;
  padding: 1.1rem 1rem 1.1rem 1rem;
  border-radius: 0 0 14px 14px;
  min-height: 3.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid #00ff50;
  border-top: 1px solid #222b;
  width: 100%;
  font-weight: bold;
  position: relative;
  z-index: 2;
  margin-top: auto;
}
.show-more-btn {
  font-family: 'Press Start 2P', monospace;
  font-size: 1.1rem;
  color: #fff;
  background: linear-gradient(90deg, #00ff50 0%, #00aaff 100%);
  border: none;
  border-radius: 10px;
  padding: 0.8rem 2.2rem;
  margin: 0 auto;
  display: block;
  box-shadow: 0 2px 8px 0 #00ff5099;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  text-shadow: 1px 1px 0 #111;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
}
.show-more-btn:hover {
  background: linear-gradient(90deg, #ff4edb 0%, #00ff50 100%);
  color: #222;
  box-shadow: 0 4px 16px 0 #ff4edb99;
}
@media (max-width: 1100px) {
  .gig-card {
    width: 90vw;
    min-width: 220px;
    max-width: 340px;
    height: 390px;
    min-height: 390px;
    max-height: 390px;
    padding: 0;
  }
  .gigs-grid {
    gap: 1.2rem;
  }
}
@media (max-width: 600px) {
  .pixel-title {
    font-size: 1.5rem;
  }
  .gigs-grid {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
  .gig-card {
    width: 95vw;
    min-width: 180px;
    max-width: 98vw;
    height: auto;
    min-height: unset;
    max-height: 220px;
    padding: 0;
  }
  .gig-image {
    width: 100%;
    height: 28vw;
    min-height: 70px;
    max-height: 110px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
  .gig-title {
    margin: 0;
    margin-top: auto;
  }
}
</style> 