
import React from 'react';
import { CharacterType } from '../types';

interface Props {
  type: CharacterType;
  className?: string;
}

const CharacterDrawing: React.FC<Props> = ({ type, className = "" }) => {
  return (
    <div className={`flex items-center justify-center p-2 transition-all duration-1000 ${className}`}>
      <div className="w-full h-full max-w-[260px] max-h-[260px] drop-shadow-[0_15px_45px_rgba(0,0,0,0.8)]">
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <defs>
            {/* Filtres de Finition Digitale */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <filter id="inner-light" x="-20%" y="-20%" width="140%" height="140%">
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.8"/>
              </feComponentTransfer>
            </filter>

            {/* Gradients Premium */}
            <linearGradient id="gold-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1B8" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8A6E15" />
            </linearGradient>

            <linearGradient id="purple-royal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6C3483" />
              <stop offset="100%" stopColor="#2E1A47" />
            </linearGradient>

            <linearGradient id="steel-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#515A5A" />
              <stop offset="100%" stopColor="#1C2833" />
            </linearGradient>

            <radialGradient id="eye-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <g filter="url(#glow)">
            {type === 'advisor' && (
              <g>
                {/* Silhouette Cape Sophistiquée */}
                <path d="M120 40 C80 40, 60 70, 50 120 L45 200 Q120 220, 195 200 L190 120 C180 70, 160 40, 120 40" fill="url(#steel-dark)" />
                <path d="M120 45 C90 45, 75 70, 65 110 L60 190 Q120 205, 180 190 L175 110 C165 70, 150 45, 120 45" fill="#212F3D" opacity="0.8" />
                
                {/* Capuche et masque partiel */}
                <path d="M120 40 Q90 40, 75 80 L120 130 L165 80 Q150 40, 120 40" fill="#17202A" />
                <path d="M100 85 Q120 75, 140 85" stroke="url(#gold-bevel)" strokeWidth="2" fill="none" opacity="0.6" />
                
                {/* Parchemin flottant stylisé */}
                <rect x="130" y="140" width="50" height="60" rx="4" fill="#FDFEFE" opacity="0.9" transform="rotate(-10 155 170)" />
                <path d="M135 155 H165 M135 165 H175 M135 175 H160" stroke="#ABB2B9" strokeWidth="1" transform="rotate(-10 155 170)" />
              </g>
            )}

            {type === 'military' && (
              <g>
                {/* Heaume Vectoriel Précis */}
                <path d="M120 30 L70 80 V180 Q120 200, 170 180 V80 L120 30" fill="url(#steel-dark)" />
                <path d="M120 40 L85 85 V165 Q120 185, 155 165 V85 L120 40" fill="#2E4053" opacity="0.7" />
                
                {/* Crête rouge néon */}
                <path d="M120 30 C120 10, 60 0, 40 70" fill="none" stroke="#C0392B" strokeWidth="12" strokeLinecap="round" />
                <path d="M120 30 C120 15, 80 10, 60 60" fill="none" stroke="#E74C3C" strokeWidth="4" strokeLinecap="round" />
                
                {/* Visière dorée */}
                <rect x="90" y="100" width="60" height="25" rx="2" fill="#17202A" />
                <line x1="95" y1="112" x2="145" y2="112" stroke="url(#gold-bevel)" strokeWidth="1" opacity="0.5" />
              </g>
            )}

            {type === 'royal' && (
              <g>
                {/* Trône abstrait géométrique */}
                <path d="M40 200 L120 20 L200 200 Z" fill="url(#purple-royal)" opacity="0.3" />
                
                {/* Coussin Premium */}
                <path d="M50 170 Q120 195, 190 170 L200 195 Q120 220, 40 195 Z" fill="#7B241C" />
                <path d="M55 175 Q120 190, 185 175" stroke="#E67E22" strokeWidth="2" opacity="0.3" fill="none" />
                
                {/* Couronne en Design Informatique */}
                <path d="M60 160 H180 L200 60 L155 105 L120 30 L85 105 L40 60 Z" fill="url(#gold-bevel)" />
                <path d="M70 150 H170 L185 75 L155 115 L120 55 L85 115 L55 75 Z" fill="#FFF1B8" opacity="0.4" />
                
                {/* Gemmes lumineuses */}
                <circle cx="120" cy="45" r="6" fill="#CB4335" />
                <circle cx="120" cy="45" r="2" fill="#FADBD8" opacity="0.8" />
                <circle cx="85" cy="115" r="4" fill="#2874A6" />
                <circle cx="155" cy="115" r="4" fill="#2874A6" />
              </g>
            )}

            {type === 'citizen' && (
              <g>
                {/* Silhouette Travailleur Vectoriel */}
                <path d="M120 50 Q90 50, 80 80 V190 H160 V80 Q150 50, 120 50" fill="#6E2C00" />
                <path d="M120 55 Q100 55, 90 80 V180 H150 V80 Q140 55, 120 55" fill="#873600" opacity="0.6" />
                
                {/* Chapeau paille design */}
                <ellipse cx="120" cy="65" rx="50" ry="12" fill="#D35400" />
                
                {/* Outil tranchant net */}
                <path d="M80 190 L100 40" stroke="#1B2631" strokeWidth="6" strokeLinecap="round" />
                <path d="M100 40 Q160 30, 185 90" fill="none" stroke="#D5D8DC" strokeWidth="4" strokeLinecap="round" />
                <path d="M100 40 Q155 35, 175 85" fill="none" stroke="#F8F9F9" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              </g>
            )}

            {type === 'elite' && (
              <g>
                {/* Habit de Soie Sophistiqué */}
                <path d="M70 190 L170 190 L185 80 Q120 40, 55 80 Z" fill="url(#purple-royal)" />
                <path d="M75 185 L165 185 L175 85 Q120 50, 65 85 Z" fill="#8E44AD" opacity="0.4" />
                
                {/* Collerette Fraise Géométrique */}
                <circle cx="120" cy="80" r="45" fill="#F7F9F9" opacity="0.9" />
                <circle cx="120" cy="80" r="40" fill="#EAEDED" stroke="#D5D8DC" strokeWidth="1" />
                
                {/* Médaille d'Or */}
                <path d="M100 110 Q120 140, 140 110" fill="none" stroke="url(#gold-bevel)" strokeWidth="4" />
                <circle cx="120" cy="140" r="14" fill="url(#gold-bevel)" />
                <circle cx="120" cy="140" r="11" fill="#7D6608" opacity="0.3" />
              </g>
            )}

            {type === 'mystic' && (
              <g>
                {/* Aura Circulaire */}
                <circle cx="120" cy="120" r="90" fill="none" stroke="#7D3C98" strokeWidth="1" strokeDasharray="10 5" opacity="0.4" />
                
                {/* Oeil Mystique Clean */}
                <path d="M40 120 Q120 40, 200 120 Q120 200, 40 120" fill="#17202A" />
                <path d="M55 120 Q120 60, 185 120 Q120 180, 55 120" fill="url(#purple-royal)" opacity="0.5" />
                
                <circle cx="120" cy="120" r="30" fill="#5B2C6F" />
                <circle cx="120" cy="120" r="12" fill="#17202A" />
                
                {/* Point de lumière glow */}
                <circle cx="115" cy="115" r="4" fill="url(#eye-glow)" opacity="0.8" />
              </g>
            )}

            {type === 'destiny' && (
              <g>
                {/* Sablier Design Industriel */}
                <path d="M70 50 H170 V65 H70 Z" fill="url(#gold-bevel)" />
                <path d="M70 175 H170 V190 H70 Z" fill="url(#gold-bevel)" />
                
                <path d="M85 65 Q120 120, 155 65 Z" fill="#EBEDEF" opacity="0.2" />
                <path d="M85 175 Q120 120, 155 175 Z" fill="#EBEDEF" opacity="0.2" />
                
                {/* Sable d'or vectoriel */}
                <path d="M95 65 Q120 110, 145 65 Z" fill="#D4AF37" opacity="0.8" />
                <path d="M90 175 Q120 115, 150 175 Z" fill="#D4AF37" opacity="0.6" />
                
                {/* Fil de lumière vertical */}
                <line x1="120" y1="90" x2="120" y2="150" stroke="url(#gold-bevel)" strokeWidth="2" strokeDasharray="4 2" />
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CharacterDrawing;
