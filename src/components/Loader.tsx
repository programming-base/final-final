import { useEffect } from "react";

export function Loader() {
  useEffect(() => {
    // Adaptive star count for mobile
    const isMobile = window.innerWidth < 768;
    const STAR_MULTIPLIER = isMobile ? 0.4 : 1;
    
    const sf = document.getElementById('loader-starfield');
    if (!sf) return;

    // Star type A - basic twinkle
    for(let i = 0; i < Math.floor(280 * STAR_MULTIPLIER); i++){
      const el = document.createElement('div');
      el.className = 'loader-star-a';
      const sz = 0.7 + Math.random() * 2;
      el.style.width = sz + 'px';
      el.style.height = sz + 'px';
      el.style.top = (Math.random() * 100) + '%';
      el.style.left = (Math.random() * 100) + '%';
      el.style.setProperty('--d', (2.5 + Math.random() * 4) + 's');
      el.style.setProperty('--del', (Math.random() * 6) + 's');
      el.style.setProperty('--pk', String(0.12 + Math.random() * 0.6));
      sf.appendChild(el);
    }

    // Star type B - flash
    for(let i = 0; i < Math.floor(120 * STAR_MULTIPLIER); i++){
      const el = document.createElement('div');
      el.className = 'loader-star-b';
      const sz = 0.6 + Math.random() * 1.6;
      el.style.width = sz + 'px';
      el.style.height = sz + 'px';
      el.style.top = (Math.random() * 100) + '%';
      el.style.left = (Math.random() * 100) + '%';
      el.style.setProperty('--d', (1.8 + Math.random() * 3.5) + 's');
      el.style.setProperty('--del', (Math.random() * 5) + 's');
      el.style.setProperty('--pk', String(0.3 + Math.random() * 0.55));
      sf.appendChild(el);
    }

    // Star type C - cross
    for(let i = 0; i < Math.floor(90 * STAR_MULTIPLIER); i++){
      const el = document.createElement('div');
      el.className = 'loader-star-c';
      const sz = 3 + Math.random() * 5;
      el.style.top = (Math.random() * 100) + '%';
      el.style.left = (Math.random() * 100) + '%';
      el.style.setProperty('--sz', sz + 'px');
      el.style.setProperty('--d', (3 + Math.random() * 5) + 's');
      el.style.setProperty('--del', (Math.random() * 6) + 's');
      el.style.setProperty('--pk', String(0.15 + Math.random() * 0.45));
      sf.appendChild(el);
    }

    // Star type D - glow
    for(let i = 0; i < Math.floor(70 * STAR_MULTIPLIER); i++){
      const el = document.createElement('div');
      el.className = 'loader-star-d';
      const sz = 1.5 + Math.random() * 2.5;
      el.style.width = sz + 'px';
      el.style.height = sz + 'px';
      el.style.top = (Math.random() * 100) + '%';
      el.style.left = (Math.random() * 100) + '%';
      el.style.setProperty('--d', (3 + Math.random() * 4) + 's');
      el.style.setProperty('--del', (Math.random() * 5.5) + 's');
      el.style.setProperty('--pk', String(0.2 + Math.random() * 0.5));
      el.style.setProperty('--gl', (sz * 0.8) + 'px');
      el.style.setProperty('--gl2', (sz * 0.4) + 'px');
      sf.appendChild(el);
    }

    // Pause animations when tab hidden
    const handleVisibilityChange = () => {
      document.body.classList.toggle('loader-paused', document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
