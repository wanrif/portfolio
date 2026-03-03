import React from 'react';

const ParticleBackground: React.FC = () => {
  return (
    <>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(41,255,206,0.22),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(255,188,45,0.2),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(41,255,206,0.1),transparent_48%)]' />
      <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(110,180,162,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(110,180,162,0.16)_1px,transparent_1px)] bg-size-[42px_42px] opacity-25' />
      <div className='scanline-overlay' />
    </>
  );
};

export default ParticleBackground;
