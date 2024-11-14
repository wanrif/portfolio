import React, { useCallback } from 'react';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      options={{
        particles: {
          number: { value: 30, density: { enable: true, value_area: 800 } },
          color: { value: '#4e888c' },
          shape: { type: 'circle' },
          opacity: {
            value: 0.2,
            random: true,
            animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false },
          },
          size: {
            value: 3,
            random: true,
            animation: { enable: true, speed: 2, minimumValue: 0.3, sync: false },
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            outModes: { default: 'out' },
          },
        },
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onHover: { enable: true, mode: 'repulse' },
            resize: true,
          },
        },
        background: { color: 'transparent' },
      }}
    />
  );
};

export default ParticleBackground;
