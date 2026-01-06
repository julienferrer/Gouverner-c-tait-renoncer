
import React from 'react';
import { Stats } from '../types';

interface VignetteProps {
  stats: Stats;
}

const Vignette: React.FC<VignetteProps> = ({ stats }) => {
  // Calcul de l'intensité basé sur la stat la plus basse
  const lowest = Math.min(stats.family, stats.people, stats.nobility);
  const opacity = Math.max(0.4, 1 - (lowest / 100));
  const blur = Math.max(0, 5 - (lowest / 20));

  return (
    <>
      <div 
        className="vignette transition-opacity duration-1000" 
        style={{ boxShadow: `inset 0 0 ${100 + opacity * 300}px rgba(0,0,0,${0.6 + opacity * 0.4})` }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-30 transition-all duration-1000"
        style={{ backdropFilter: `blur(${blur}px)` }}
      />
      <div className="grain" />
    </>
  );
};

export default Vignette;
