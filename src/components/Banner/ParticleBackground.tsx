import React from 'react';

const ParticleBackground: React.FC = () => {
  return (
    <>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(32,224,200,0.18),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(32,120,224,0.14),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(32,224,200,0.12),transparent_46%)]' />
      <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(99,115,131,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,115,131,0.12)_1px,transparent_1px)] bg-size-[42px_42px] opacity-20' />
      <div className='scanline-overlay' />
    </>
  );
};

export default ParticleBackground;
