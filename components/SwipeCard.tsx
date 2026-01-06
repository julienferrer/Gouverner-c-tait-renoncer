
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { GameCard, Stats } from '../types';
import CharacterDrawing from './CharacterDrawing';

interface SwipeCardProps {
  card: GameCard;
  onSwipe: (direction: 'left' | 'right') => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ card, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-10, 10]);
  const opacity = useTransform(x, [-350, -300, 0, 300, 350], [0, 1, 1, 1, 0]);
  
  const leftIndicatorOpacity = useTransform(x, [-180, -60], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [60, 180], [0, 1]);

  const [exitX, setExitX] = useState<number>(0);
  const [hoveredChoice, setHoveredChoice] = useState<'left' | 'right' | null>(null);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -80) {
      triggerSwipe('left');
    } else if (info.offset.x > 80) {
      triggerSwipe('right');
    }
  };

  const triggerSwipe = (direction: 'left' | 'right') => {
    const finalX = direction === 'left' ? -1000 : 1000;
    setExitX(finalX);
    onSwipe(direction);
    setHoveredChoice(null);
  };

  const renderImpacts = (impact: Partial<Stats>) => {
    const lines: string[] = [];
    if (impact.family !== undefined) lines.push(`FAMILLE ${impact.family > 0 ? '↑' : '↓'}`);
    if (impact.people !== undefined) lines.push(`PEUPLE ${impact.people > 0 ? '↑' : '↓'}`);
    if (impact.nobility !== undefined) lines.push(`NOBLESSE ${impact.nobility > 0 ? '↑' : '↓'}`);
    
    return lines.map((l, i) => (
      <span key={i} className={`mx-2 text-[10px] royal-font uppercase tracking-widest font-bold ${l.includes('↑') ? 'text-emerald-400' : 'text-rose-500'}`}>
        {l}
      </span>
    ));
  };

  return (
    <div className="relative flex flex-col items-center gap-4 w-full max-w-[380px] mx-auto h-full justify-center">
      <div className="relative w-full aspect-[3/4.4] max-w-[320px] mx-auto perspective-1000 flex-shrink-0">
        <motion.div
          key={card.id}
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ x: exitX, opacity: 0, transition: { duration: 0.4 } }}
          className="absolute inset-0 bg-[#fdfaf2] border-[6px] border-[#8b6e15] rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing overflow-hidden flex flex-col items-center z-20 select-none"
        >
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
          
          <div className="mt-4 w-[90%] h-[38%] relative flex items-center justify-center bg-black/5 rounded-xl overflow-hidden border border-[#8b6e15]/20 shadow-inner flex-shrink-0">
            <CharacterDrawing type={card.characterType} className="w-full h-full scale-100" />
            
            <motion.div style={{ opacity: leftIndicatorOpacity }} className="absolute inset-0 flex items-center justify-center bg-rose-950/70 backdrop-blur-sm pointer-events-none z-30">
              <span className="border-2 border-white text-white px-5 py-2 font-bold uppercase rotate-12 royal-font text-xl shadow-xl tracking-tighter text-center">
                {card.left.text}
              </span>
            </motion.div>
            
            <motion.div style={{ opacity: rightIndicatorOpacity }} className="absolute inset-0 flex items-center justify-center bg-emerald-950/70 backdrop-blur-sm pointer-events-none z-30">
              <span className="border-2 border-white text-white px-5 py-2 font-bold uppercase -rotate-12 royal-font text-xl shadow-xl tracking-tighter text-center">
                {card.right.text}
              </span>
            </motion.div>
          </div>

          <div className="px-5 py-3 text-center flex flex-col items-center flex-grow w-full z-10 overflow-hidden">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#8b6e15] font-bold royal-font mb-1.5 opacity-70">
              {card.speaker}
            </span>
            <div className="w-10 h-[1px] bg-[#8b6e15]/30 mb-3" />
            
            <div className="flex flex-col gap-3 h-full overflow-y-auto no-scrollbar px-1 pb-2">
              <h3 className="text-lg md:text-xl leading-snug text-[#0a0a0a] font-serif font-bold italic">
                "{card.prompt}"
              </h3>
              
              {card.description && (
                <p className="text-sm md:text-base leading-relaxed text-[#1a1a1a] font-serif opacity-90 text-justify px-2 border-t border-[#8b6e15]/10 pt-3">
                  {card.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="mb-4 w-full px-8 flex items-center justify-center gap-3 opacity-20 flex-shrink-0">
            <div className="h-[1px] flex-grow bg-[#8b6e15]" />
            <div className="w-2 h-2 rotate-45 border border-[#8b6e15]" />
            <div className="h-[1px] flex-grow bg-[#8b6e15]" />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        <div className="h-10 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {(hoveredChoice || Math.abs(x.get()) > 10) ? (
              <motion.div 
                key={hoveredChoice || (x.get() < 0 ? 'left' : 'right')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center text-white bg-neutral-900/80 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl shadow-lg"
              >
                {renderImpacts((hoveredChoice === 'left' || x.get() < 0) ? card.left.impact : card.right.impact)}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 royal-font">
                CHOISISSEZ VOTRE VOIE
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between w-full max-w-[320px] gap-4">
          <button 
            onMouseEnter={() => setHoveredChoice('left')}
            onMouseLeave={() => setHoveredChoice(null)}
            onClick={() => triggerSwipe('left')}
            className="group flex-1 flex flex-col items-center gap-2 outline-none"
          >
            <div className="w-12 h-12 rounded-xl border border-white/10 bg-neutral-900/40 flex items-center justify-center text-neutral-500 group-hover:text-rose-500 group-hover:border-rose-900/50 group-hover:bg-rose-950/20 transition-all duration-300">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[9px] uppercase tracking-widest royal-font text-neutral-600 group-hover:text-rose-400 font-bold transition-colors text-center line-clamp-1 w-full">
              {card.left.text}
            </span>
          </button>

          <button 
            onMouseEnter={() => setHoveredChoice('right')}
            onMouseLeave={() => setHoveredChoice(null)}
            onClick={() => triggerSwipe('right')}
            className="group flex-1 flex flex-col items-center gap-2 outline-none"
          >
            <div className="w-12 h-12 rounded-xl border border-white/10 bg-neutral-900/40 flex items-center justify-center text-neutral-500 group-hover:text-emerald-500 group-hover:border-emerald-900/50 group-hover:bg-emerald-950/20 transition-all duration-300">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[9px] uppercase tracking-widest royal-font text-neutral-600 group-hover:text-emerald-400 font-bold transition-colors text-center line-clamp-1 w-full">
              {card.right.text}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
