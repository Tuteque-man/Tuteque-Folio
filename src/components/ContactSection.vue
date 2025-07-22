<template>
  <section class="contact-section">
    <div class="section-header">
      <h2 class="pixel-title glitch" data-text="CONTACT">CONTACT</h2>
      <div class="pixel-line"></div>
    </div>
    
    <div class="contact-content">
      <div class="contact-info">
        <div class="contact-item" v-for="contact in contacts" :key="contact.type">
          <img v-if="contact.type === 'github'" src="/src/img/p2.gif" alt="GitHub Pixelart" class="github-pixelart" />
          <div class="contact-icon">
            <img :src="contact.icon" alt="Contact Icon" />
          </div>
          <div class="contact-details">
            <h3 class="contact-label">{{ contact.label }}</h3>
            <a :href="contact.link" class="contact-value" target="_blank">{{ contact.value }}</a>
          </div>
        </div>
      </div>
      <div class="contact-pixelart-container">
        <img src="/src/img/l0.png" alt="Back Background Pixelart" class="contact-back-background-img" />
        <img src="/src/img/l1.png" alt="Background Pixelart" class="contact-background-img" />
        <img src="/src/img/l2.png" alt="Middle Pixelart" class="contact-middle-img" />
        <img src="/src/img/c1.gif" alt="Contact Pixelart" class="contact-pixelart-img" />
      </div>
    </div>
    
    <div class="floating-elements">
      <div class="pixel-square" v-for="n in 6" :key="n" :style="squareStyle(n)"></div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Contactos existentes
const contacts = ref([
  {
    type: 'github',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg',
    label: 'GITHUB',
    value: 'github.com/tuteque-man',
    link: 'https://github.com/tuteque-man'
  },
  {
    type: 'youtube',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/youtube.svg',
    label: 'YOUTUBE',
    value: 'youtube.com/@tuteque-man',
    link: 'https://youtube.com/@tuteque-man'
  },
  {
    type: 'fiverr',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/fiverr.svg',
    label: 'FIVERR',
    value: 'fiverr.com/tutequeman',
    link: 'https://fiverr.com/tutequeman'
  },
  {
    type: 'instagram',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/instagram.svg',
    label: 'INSTAGRAM',
    value: 'instagram.com/tuteque-man',
    link: 'https://instagram.com/tuteque-man'
  },
  {
    type: 'tiktok',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tiktok.svg',
    label: 'TIKTOK',
    value: 'tiktok.com/@tuteque-man',
    link: 'https://tiktok.com/@tuteque-man'
  },
  {
    type: 'x',
    icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/x.svg',
    label: 'X',
    value: '@tuteque_man',
    link: 'https://x.com/tuteque_man'
  }
]);

function squareStyle(n) {
  const left = Math.random() * 90 + '%';
  const top = Math.random() * 90 + '%';
  const size = Math.random() * 30 + 15;
  const delay = Math.random() * 3;
  return {
    left, top, width: size + 'px', height: size + 'px', animationDelay: delay + 's'
  };
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.contact-section {
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #000 0%, #0a0a0a 50%, #000 100%);
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  align-items: flex-start;
}

.contact-pixelart-container {
  position: relative;
  width: 900px; /* Bigger container */
  height: auto;
  margin-left: auto;
  margin-right: -100px; /* Move more to the right */
  display: block;
}

.contact-back-background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 140%; /* Same size as l1 */
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  opacity: 1; /* Full opacity */
  z-index: 2; /* In front of l1 */
  transform: translateX(-290px); /* Move even more to the left */
}

.contact-background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 140%; /* Bigger than before */
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  opacity: 1; /* Full opacity */
  z-index: 1;
  transform: translateX(-20px); /* Move much more to the left */
}

.contact-middle-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Smaller than before */
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
  opacity: 1; /* Full opacity */
  z-index: 1.5; /* Between l1 and c1 */
  transform: translateX(20px); /* Move more to the right */
}

.contact-pixelart-img {
  width: 80%; /* Smaller than container */
  height: auto;
  image-rendering: pixelated;
  position: relative;
  z-index: 3; /* In front of l0 */
  margin-left: auto; /* Center it */
  margin-right: auto;
}
@media (max-width: 900px) {
  .contact-pixelart-img {
    width: 500px;
    max-width: 1000vw;
    margin: 1rem auto 0 auto;
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 0, 80, 0.05);
  border: 2px solid #ff0050;
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  animation: contact-float 4s infinite alternate;
}

.contact-item:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 25px rgba(255, 0, 80, 0.3);
  border-color: #00f2ea;
}

@keyframes contact-float {
  0% { transform: translateX(0); }
  100% { transform: translateX(3px); }
}

.contact-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff0050;
  border-radius: 8px;
  color: #000;
  position: relative; /* Added for positioning the second image */
}

.contact-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.github-pixelart {
  position: absolute;
  top: -98px; /* 2px closer to the GitHub container */
  left: 50%;
  transform: translateX(-50%);
  width: 200px; /* Much bigger size for 8-bit images */
  height: auto;
  image-rendering: pixelated;
  z-index: 1;
  animation: float-x 3s ease-in-out infinite;
}

@keyframes float-x {
  0%, 100% { transform: translateX(-50%) translateX(0px); }
  50% { transform: translateX(-50%) translateX(10px); }
}

@media (max-width: 900px) {
  .github-pixelart {
    width: 120px; /* Smaller size for mobile */
    top: -60px; /* Adjust position for mobile */
  }
}

.contact-details {
  flex: 1;
}

.contact-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  color: #ff0050;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 0 #000;
}

.contact-value {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-value:hover {
  color: #ff0050;
  text-shadow: 0 0 5px #ff0050;
}

.contact-form {
  background: rgba(255, 0, 80, 0.05);
  border: 2px solid #ff0050;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  color: #ff0050;
  text-shadow: 1px 1px 0 #000;
}

.pixel-input, .pixel-textarea {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  background: #111;
  border: 2px solid #00ffe7;
  border-radius: 6px;
  padding: 0.8rem;
  color: #fff;
  transition: all 0.3s ease;
}

.pixel-input:focus, .pixel-textarea:focus {
  outline: none;
  border-color: #00f2ea;
  box-shadow: 0 0 15px rgba(255, 0, 80, 0.5);
  background: #0a0a0a;
}

.pixel-input::placeholder, .pixel-textarea::placeholder {
  color: #666;
}

.pixel-submit-btn {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  background: #ff0050;
  color: #000;
  border: 3px solid #fff;
  border-radius: 8px;
  padding: 1rem 2rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 0 #ff0050;
  margin-top: 1rem;
}

.pixel-submit-btn:hover {
  background: #000;
  color: #ff0050;
  transform: translateY(2px);
  box-shadow: 0 2px 0 #ff0050;
}

.btn-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.pixel-submit-btn:hover .btn-glow {
  transform: translateX(100%);
}

.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.pixel-square {
  position: absolute;
  background: #00ffe7;
  border-radius: 2px;
  animation: square-float 5s infinite;
  opacity: 0.3;
}

@keyframes square-float {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-30px) rotate(180deg); opacity: 0.6; }
}

.error-message, .success-message {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  color: #ff0050;
  margin-top: 0.5rem;
  text-shadow: 1px 1px 0 #000;
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-section {
    padding: 3rem 1rem;
  }

  .pixel-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
  }

  .contact-pixelart-img {
    width: 120px;
    margin: 1rem auto 0 auto;
  }

  .contact-list {
    gap: 1.5rem;
  }

  .contact-item {
    padding: 1.5rem;
  }

  .contact-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .contact-logo {
    width: 35px;
    height: 35px;
  }

  .contact-label {
    font-size: 0.7rem;
  }

  .contact-value {
    font-size: 0.8rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .form-label {
    font-size: 0.6rem;
  }

  .pixel-input, .pixel-textarea {
    font-size: 0.8rem;
    padding: 0.8rem;
  }

  .pixel-submit-btn {
    font-size: 0.7rem;
    padding: 0.8rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .contact-section {
    padding: 2rem 0.5rem;
  }

  .pixel-title {
    font-size: 1.4rem;
  }

  .contact-item {
    padding: 1rem;
  }

  .contact-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .contact-logo {
    width: 28px;
    height: 28px;
  }

  .contact-label {
    font-size: 0.6rem;
  }

  .contact-value {
    font-size: 0.7rem;
  }

  .contact-form {
    padding: 1rem;
  }

  .form-label {
    font-size: 0.5rem;
  }

  .pixel-input, .pixel-textarea {
    font-size: 0.7rem;
    padding: 0.6rem;
  }

  .pixel-submit-btn {
    font-size: 0.6rem;
    padding: 0.6rem 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .pixel-title {
    font-size: 2rem;
  }
}

@media (max-width: 900px) {
  .github-pixelart {
    width: 120px; /* Smaller size for mobile */
    top: -60px; /* Adjust position for mobile */
  }
}

@media (max-width: 900px) {
  .contact-pixelart-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
  
  .contact-back-background-img {
    z-index: 0.5; /* Behind c1 on mobile */
    transform: translateX(0); /* Center on mobile */
    width: 100%;
  }
  
  .contact-background-img {
    z-index: 0.7; /* Behind c1 on mobile */
    transform: translateX(0); /* Center on mobile */
    width: 100%;
  }
  
  .contact-middle-img {
    z-index: 0.9; /* Behind c1 on mobile */
    transform: translateX(0); /* Center on mobile */
    width: 100%;
  }
  
  .contact-pixelart-img {
    z-index: 2; /* In front of all others on mobile */
    margin-left: 0; /* Center on mobile */
    margin-right: 0; /* Center on mobile */
    width: 80%;
  }
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-pixelart-container {
    width: 100%;
    margin: 2rem auto 0 auto;
  }
  
  .contact-pixelart-img {
    width: 70%;
  }
}

@media (max-width: 480px) {
  .contact-pixelart-container {
    width: 100%;
    margin: 1rem auto 0 auto;
  }
  
  .contact-pixelart-img {
    width: 60%;
  }
  
  .github-pixelart {
    width: 80px;
    top: -40px;
  }
}
</style> 