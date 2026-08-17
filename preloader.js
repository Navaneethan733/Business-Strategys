/* ============================================================
   STACKLY - ULTRA-PREMIUM SUPER COOL PRELOADER SCRIPT
============================================================ */

(function () {
  'use strict';

  // Ensure DOM is ready enough to find or inject preloader
  function initPreloader() {
    let preloader = document.getElementById('site-preloader');
    
    // Auto-inject if not already in HTML
    if (!preloader) {
      preloader = document.createElement('div');
      preloader.id = 'site-preloader';
      preloader.className = 'site-preloader';
      preloader.setAttribute('aria-hidden', 'true');
      preloader.innerHTML = `
        <div class="preloader-ambient-glow"></div>
        <div class="preloader-content-box">
          <div class="preloader-brand-wrapper">
            <div class="preloader-pulse-shadow"></div>
            <div class="preloader-spin-ring-outer"></div>
            <div class="preloader-spin-ring-inner"></div>
            <div class="preloader-logo-core">
              <img src="images/Frame 808.webp" alt="Stackly Logo" class="preloader-logo-img" />
            </div>
          </div>
          <div class="preloader-meta-wrap">
            <span class="preloader-brand-title">Stackly</span>
            <span class="preloader-brand-tagline">Strategic Growth & Advisory</span>
          </div>
          <div class="preloader-progress-wrap">
            <div class="preloader-progress-track">
              <div class="preloader-progress-fill" id="preloader-progress-fill"></div>
            </div>
            <div class="preloader-percent-num" id="preloader-percent">0%</div>
          </div>
        </div>
      `;
      if (document.body) {
        document.body.insertBefore(preloader, document.body.firstChild);
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          document.body.insertBefore(preloader, document.body.firstChild);
        });
      }
    }

    const fill = document.getElementById('preloader-progress-fill');
    const percentText = document.getElementById('preloader-percent');

    let currentProgress = 0;
    let targetProgress = 85;
    let isFinished = false;

    // Smooth incremental progression
    const progressInterval = setInterval(() => {
      if (currentProgress < targetProgress) {
        currentProgress += Math.floor(Math.random() * 8) + 3;
        if (currentProgress > targetProgress) currentProgress = targetProgress;
        if (fill) fill.style.width = currentProgress + '%';
        if (percentText) percentText.textContent = currentProgress + '%';
      }
    }, 35);

    function completeAndExit() {
      if (isFinished) return;
      isFinished = true;
      clearInterval(progressInterval);

      const finalInterval = setInterval(() => {
        if (currentProgress < 100) {
          currentProgress += 6;
          if (currentProgress > 100) currentProgress = 100;
          if (fill) fill.style.width = currentProgress + '%';
          if (percentText) percentText.textContent = currentProgress + '%';
        } else {
          clearInterval(finalInterval);
          setTimeout(() => {
            if (preloader) {
              preloader.classList.add('is-loaded');
              setTimeout(() => {
                preloader.style.display = 'none';
              }, 750);
            }
          }, 200);
        }
      }, 20);
    }

    // Trigger completion on window load or after short delay
    if (document.readyState === 'complete') {
      setTimeout(completeAndExit, 400);
    } else {
      window.addEventListener('load', () => {
        setTimeout(completeAndExit, 400);
      });
    }

    // Safety fallback (guarantees preloader never blocks for more than 2 seconds)
    setTimeout(completeAndExit, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
  } else {
    initPreloader();
  }
})();
