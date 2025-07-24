<template>
  <div class="soundtrack-showcase-bg">
    <div class="section-header">
      <h2 class="pixel-title glitch" data-text="SOUNDTRACK">SOUNDTRACK</h2>
      <div class="pixel-line"></div>
    </div>
    <div class="soundtrack-flex-block">
      <img src="/img/p4.gif" alt="Pixelart Left" class="side-img left" />
      <a href="https://youtu.be/csQNux6mBi4" target="_blank" rel="noopener" class="video-block">
        <img src="/img/sountrack.png" alt="Soundtrack" class="video-thumb" />
        <div class="video-play-icon-img">
          <img src="/img/play-video.png" alt="Play Video" class="default" />
          <img src="/img/play-video2.png" alt="Play Video Hover" class="hover" />
        </div>
      </a>
      <img src="/img/p3.png" alt="Pixelart Right" class="side-img right" />
    </div>
    <div class="side-img-row">
      <img src="/img/p4.gif" alt="Pixelart Left" class="side-img left mobile-only" />
      <img src="/img/p3.png" alt="Pixelart Right" class="side-img right mobile-only" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
.soundtrack-showcase-bg {
  width: 100vw;
  max-width: 100%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2.5rem 0 2rem 0;
  position: relative;
  background:rgba(128, 0, 128, 0.1) ;
}
.section-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

img, svg, .pixelart-below-desc, .pixelart-side-img, .about-image-pixel, .contact-pixelart-img {
  -webkit-user-drag: none;
  user-drag: none;
  user-select: none;
  pointer-events: auto;
}

.pixel-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 3.2rem;
  color: #fff;
  letter-spacing: 3px;
  margin: 0 0 1.2rem 0;
  text-align: center;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ff0050 0%, #00aaff 50%, #ff4edb 100%);
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
  text-shadow: 2px 2px 0 #ff0050, 4px 4px 0 #ff4edb;
  animation: glitchTop 2.5s infinite linear alternate-reverse;
  clip-path: inset(0 0 60% 0);
}
.glitch:after {
  color: #ff0050;
  text-shadow: 2px 2px 0 #00aaff, 4px 4px 0 #ff4edb;
  animation: glitchBot 2.5s infinite linear alternate;
  clip-path: inset(60% 0 0 0);
}
@keyframes glitch-anim {
  0% { text-shadow: 2px 2px 0 #ff0050, 4px 4px 0 #00aaff; }
  20% { text-shadow: 2px 2px 0 #ff4edb, 4px 4px 0 #00aaff; }
  40% { text-shadow: 2px 2px 0 #00aaff, 4px 4px 0 #ff4edb; }
  60% { text-shadow: 2px 2px 0 #ff0050, 4px 4px 0 #ff4edb; }
  100% { text-shadow: 2px 2px 0 #ff4edb, 4px 4px 0 #ff0050; }
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
  width: 160px;
  height: 8px;
  background: linear-gradient(90deg, #ff0050 0%, #00aaff 50%, #ff4edb 100%);
  margin: 1.2rem 0 0 0;
  border-radius: 4px;
}
.soundtrack-flex-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  width: 100%;
  max-width: 1400px;
  margin-bottom: 2.5rem;
}
.side-img, .side-img.left, .side-img.right {
  image-rendering: pixelated;
}
.side-img.left {
  margin-top: 38px;
  max-width: 320px;
  width: 100%;
  height: auto;
  transform: translateX(24px);
}
.side-img.right {
  max-width: 220px;
  width: 100%;
  height: auto;
  transform: translateX(-24px);
}
@media (max-width: 900px) {
  .side-img.left {
    max-width: 120px;
  }
  .side-img.right {
    max-width: 60px;
  }
}
@media (max-width: 600px) {
  .side-img.left {
    max-width: 90px;
  }
}
.video-block {
  position: relative;
  display: inline-block;
  width: 98vw;
  max-width: 900px;
  aspect-ratio: 16/9;
  height: auto;
  min-width: 320px;
  min-height: 180px;
  box-sizing: border-box;
  border: 6px solid #fff;
  background: #000;
  transition: border-color 0.25s, box-shadow 0.25s;
  cursor: pointer;
  margin: 0 2vw;
  box-shadow: 0 0 32px 0 #ff4edb55;
}
.video-block:hover {
  border-color: #00aaff;
  box-shadow: 0 0 48px 8px #ff4edb99, 0 0 32px #00aaff88;
}
.video-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  image-rendering: pixelated;
  border: none;
  background: #000;
  box-shadow: none;
}
.video-play-icon-img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 220px !important;
  height: 220px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.video-play-icon-img img.default,
.video-play-icon-img img.hover {
  width: 100% !important;
  height: 100% !important;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  pointer-events: auto;
}
.video-play-icon-img img.hover {
  display: none;
}
.video-block:hover .video-play-icon-img img.default {
  display: none;
}
.video-block:hover .video-play-icon-img img.hover {
  display: inline;
}
@media (max-width: 900px) {
  .video-block {
    width: 340px;
    height: 191px;
    min-width: 180px;
    min-height: 101px;
  }
  .video-play-icon-img {
    width: 96px !important;
    height: 96px !important;
  }
}
@media (max-width: 600px) {
  .video-block {
    width: 180px;
    height: 101px;
    min-width: 90px;
    min-height: 50px;
  }
  .video-play-icon-img {
    width: 64px;
    height: 32px;
  }
}
@media (max-width: 900px) {
  .pixel-title {
    font-size: 1.8rem;
  }
  .video-block {
    width: 100vw;
    max-width: 100vw;
    min-width: 0;
    aspect-ratio: 16/9;
    height: auto;
  }
  .video-play-icon-img {
    width: 120px;
    height: 60px;
  }
  .side-img.left.mobile-only,
  .side-img.right.mobile-only {
    max-width: 100px;
  }
}
@media (max-width: 600px) {
  .pixel-title {
    font-size: 1.2rem;
  }
  .side-img.left.mobile-only,
  .side-img.right.mobile-only {
    max-width: 100px;
  }
  .video-block {
    width: 100vw;
    max-width: 100vw;
    min-width: 0;
    aspect-ratio: 16/9;
    height: auto;
  }
  .video-play-icon-img {
    width: 64px;
    height: 32px;
  }
}
@media (max-width: 600px) {
  .soundtrack-flex-block {
    flex-direction: column;
    align-items: center;
  }
  .side-img.left,
  .side-img.right {
    display: none;
  }
  .side-img-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    gap: 0.5rem;
    margin-top: 0.7rem;
  }
  .side-img.left.mobile-only,
  .side-img.right.mobile-only {
    display: block;
    max-width: 48px;
    width: 100%;
    height: auto;
    margin: 0;
    transform: none;
  }
}
@media (min-width: 601px) {
  .side-img-row {
    display: none;
  }
  .side-img.left.mobile-only,
  .side-img.right.mobile-only {
    display: none;
  }
}
@media (max-width: 600px) {
  .side-img.left.mobile-only,
  .side-img.right.mobile-only {
    width: 40vw;
    max-width: 160px;
    min-width: 80px;
    height: auto;
  }
  .side-img-row {
    gap: 1.5rem;
  }
}
</style> 