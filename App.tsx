
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameState, Stats, GameCard, Monologue, Ending } from './types';
import { INITIAL_STATS, CARDS, MONOLOGUES, ENDINGS } from './constants';
import SwipeCard from './components/SwipeCard';
import Vignette from './components/Vignette';
import CharacterDrawing from './components/CharacterDrawing';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>(GameState.TITLE);
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startYear, setStartYear] = useState(1200);
  const [activeMonologue, setActiveMonologue] = useState<Monologue | null>(null);
  const [activeEnding, setActiveEnding] = useState<Ending | null>(null);
  const [breakingStat, setBreakingStat] = useState<string | null>(null);

  useEffect(() => {
    if (state !== GameState.GAME || breakingStat) return;

    const checkStats = () => {
      if (stats.family <= 0) return { key: 'family', ending: ENDINGS.FAMILY };
      if (stats.people <= 0) return { key: 'people', ending: ENDINGS.PEOPLE };
      if (stats.nobility <= 0) return { key: 'nobility', ending: ENDINGS.NOBILITY };
      return null;
    };

    const failure = checkStats();
    if (failure) {
      setBreakingStat(failure.key);
      setTimeout(() => {
        triggerEnding(failure.ending);
      }, 1500);
    }
  }, [stats, state, breakingStat]);

  const startGame = () => {
    const randomStart = Math.floor(Math.random() * (1450 - 1150) + 1150);
    setStartYear(randomStart);
    setStats({ ...INITIAL_STATS });
    setCurrentIndex(0);
    setBreakingStat(null);
    setActiveEnding(null);
    setActiveMonologue(null);
    setState(GameState.GAME);
  };

  const triggerEnding = (ending: Ending) => {
    setActiveMonologue(MONOLOGUES[99]);
    setActiveEnding(ending);
    setState(GameState.MONOLOGUE);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const card = CARDS[currentIndex];
    const choice = direction === 'left' ? card.left : card.right;

    const amplify = (val: number) => val < 0 ? val * 1.05 : val * 0.85;

    setTimeout(() => {
      setStats(prev => ({
        family: Math.max(0, Math.min(100, prev.family + amplify(choice.impact.family || 0))),
        people: Math.max(0, Math.min(100, prev.people + amplify(choice.impact.people || 0))),
        nobility: Math.max(0, Math.min(100, prev.nobility + amplify(choice.impact.nobility || 0)))
      }));

      if (choice.text === "Abdiquer") {
        triggerEnding(ENDINGS.ABDICATION);
        return;
      }

      const nextIndex = currentIndex + 1;
      
      const monologueTriggerIndices = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28];
      const mIdx = monologueTriggerIndices.indexOf(currentIndex + 1);
      
      if (mIdx !== -1 && MONOLOGUES[mIdx + 1]) {
        setActiveMonologue(MONOLOGUES[mIdx + 1]);
        setState(GameState.MONOLOGUE);
        setCurrentIndex(nextIndex);
      } else if (nextIndex >= CARDS.length) {
        triggerEnding(ENDINGS.VOID);
      } else {
        setCurrentIndex(nextIndex);
      }
    }, 100);
  };

  const nextFromMonologue = () => {
    if (activeEnding) {
      setState(GameState.ENDING);
    } else {
      setState(GameState.GAME);
      setActiveMonologue(null);
    }
  };

  const StatBar = ({ id, label, value, colorClass, icon }: { id: string, label: string, value: number, colorClass: string, icon: React.ReactNode }) => {
    const isCritical = value < 25; 
    const isBreaking = breakingStat === id;

    return (
      <div className={`flex flex-col items-center w-full max-w-[90px] md:max-w-[125px] transition-all duration-500 ${isBreaking ? 'scale-110 z-50' : ''}`}>
        <div className="flex flex-col items-center mb-1">
          <motion.div 
            animate={isBreaking ? { 
              rotate: [0, -15, 15, -15, 15, 0],
              scale: [1, 1.5, 1.2],
              color: ["#ffffff", "#ff0000", "#ffffff"]
            } : {}}
            className={`${isCritical ? 'text-rose-400 scale-110' : 'text-neutral-300'} transition-all duration-300 drop-shadow-md`}
          >
            {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5 md:w-6 md:h-6 fill-current" })}
          </motion.div>
          <span className={`text-[8px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.2em] royal-font font-bold mt-1 ${isCritical ? 'text-rose-500' : 'text-neutral-400'}`}>
            {label}
          </span>
        </div>
        <div className={`w-full h-2.5 md:h-4 bg-black/80 rounded-full p-[1px] md:p-[2px] border border-white/10 ${isBreaking ? 'border-white animate-pulse' : isCritical ? 'border-rose-600' : ''} shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] overflow-hidden relative`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={isBreaking ? {
              width: ["0%", "100%", "0%"],
              backgroundColor: ["#ffffff", "#ff0000", "#000000"]
            } : { width: `${value}%` }}
            transition={isBreaking ? { duration: 1 } : { type: "tween", ease: "easeOut", duration: 0.4 }}
            className={`h-full rounded-full ${isBreaking ? 'bg-white' : isCritical ? 'bg-rose-700' : colorClass} relative`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-40" />
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      animate={breakingStat ? { 
        x: [0, -10, 10, -10, 10, 0],
        y: [0, 5, -5, 5, -5, 0],
        filter: ["brightness(1)", "brightness(2)", "brightness(0.5)", "brightness(1)"]
      } : {}}
      transition={breakingStat ? { duration: 0.5, repeat: 1 } : {}}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden w-full h-full p-2 md:p-8"
    >
      <Vignette stats={stats} />

      <AnimatePresence mode="wait">
        {state === GameState.TITLE && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="z-50 text-center flex flex-col items-center justify-center h-full max-w-4xl px-6"
          >
            <h1 className="text-3xl md:text-7xl mb-6 md:mb-8 royal-font tracking-[0.15em] md:tracking-[0.3em] text-neutral-100 leading-tight uppercase">
              Gouverner, c’était renoncer
            </h1>
            <div className="h-px w-24 md:w-32 bg-neutral-800 mb-8 md:mb-10" />
            <p className="text-base md:text-2xl italic mb-12 md:mb-16 text-neutral-400 font-light leading-relaxed px-4 opacity-80">
              "Le pouvoir est un poison lent qui donne le contrôle mais enlève l’humanité."
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 md:px-12 md:py-5 border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl text-neutral-300 hover:text-white transition-all royal-font tracking-[0.3em] md:tracking-[0.5em] uppercase shadow-2xl active:scale-95"
            >
              PRENDRE LA COURONNE
            </button>
          </motion.div>
        )}

        {state === GameState.GAME && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-40 flex flex-col items-center w-full h-full justify-between py-4 md:py-12"
          >
            <div className="flex justify-center gap-2 md:gap-12 w-full max-w-4xl bg-black/40 backdrop-blur-xl px-4 md:px-8 py-3 md:py-6 rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl relative mb-2">
              <StatBar 
                id="family" label="Famille" value={stats.family} colorClass="bg-rose-600" 
                icon={<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
              />
              <StatBar 
                id="people" label="Peuple" value={stats.people} colorClass="bg-sky-500" 
                icon={<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>}
              />
              <StatBar 
                id="nobility" label="Noblesse" value={stats.nobility} colorClass="bg-amber-600" 
                icon={<svg viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z"/></svg>}
              />
            </div>

            <div className="flex-grow flex items-center justify-center w-full px-2 overflow-visible relative">
              <AnimatePresence>
                {!breakingStat && (
                  <motion.div
                    exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)", rotate: -5 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex justify-center items-center"
                  >
                    <SwipeCard 
                      key={CARDS[currentIndex].id}
                      card={CARDS[currentIndex]} 
                      onSwipe={handleSwipe} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-center gap-0.5 pb-2 md:pb-4">
              <div className="flex items-baseline gap-2 md:gap-3">
                <div className="text-white text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.4em] royal-font uppercase font-bold drop-shadow-lg">
                  An de grâce {startYear + currentIndex}
                </div>
                <div className="w-[1px] h-2.5 bg-white/20" />
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-amber-500/80 text-[9px] md:text-[11px] tracking-[0.1em] md:tracking-[0.2em] royal-font uppercase font-bold"
                >
                  {currentIndex} ans de règne
                </motion.div>
              </div>
              <div className="text-neutral-700 text-[8px] tracking-[0.3em] md:tracking-[0.5em] royal-font uppercase opacity-40">
                CHAPITRE {currentIndex + 1}
              </div>
            </div>
          </motion.div>
        )}

        {state === GameState.MONOLOGUE && (
          <motion.div
            key="monologue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 text-center px-6 md:px-10 max-w-3xl cursor-pointer flex flex-col items-center justify-center h-full bg-black/90 backdrop-blur-2xl"
            onClick={nextFromMonologue}
          >
            <div className="space-y-8 md:space-y-12">
              {activeMonologue?.text.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.8, duration: 0.8 }}
                  className="text-xl md:text-4xl italic text-neutral-100 font-light leading-relaxed readable-text"
                >
                  {line}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: (activeMonologue?.text.length || 0) * 1.0 }}
              className="mt-12 md:mt-20 text-neutral-500 text-[9px] md:text-[10px] royal-font tracking-[0.5em] uppercase"
            >
              [ Effleurez l'abîme ]
            </motion.div>
          </motion.div>
        )}

        {state === GameState.ENDING && activeEnding && (
          <motion.div
            key="ending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 text-center px-6 md:px-10 max-w-4xl overflow-y-auto no-scrollbar py-12 md:py-20 flex flex-col items-center h-full"
          >
            <div className="mb-8 md:mb-14">
              <CharacterDrawing type={activeEnding.characterType} className="w-32 h-32 md:w-48 md:h-48 mx-auto opacity-50 mb-6 md:mb-10" />
              <h2 className="text-3xl md:text-7xl royal-font mb-4 text-neutral-100 tracking-widest uppercase leading-tight">{activeEnding.title}</h2>
              <p className="text-lg md:text-2xl text-neutral-500 italic mb-6 md:mb-10 royal-font tracking-widest uppercase opacity-60">{activeEnding.context}</p>
              <div className="h-px w-16 md:w-32 bg-neutral-800 mx-auto" />
            </div>
            
            <div className="space-y-6 md:space-y-8 mb-12 md:mb-16 max-w-2xl">
              {activeEnding.description.map((line, idx) => (
                <p key={idx} className="text-lg md:text-3xl text-neutral-200 italic font-light leading-relaxed readable-text">{line}</p>
              ))}
            </div>

            <div className="pt-8 md:pt-12 w-full border-t border-white/5 pb-10">
              <p className="text-xl md:text-4xl royal-font text-white mb-12 md:mb-20 tracking-widest px-4 readable-text italic">
                "{activeEnding.finalQuote}"
              </p>
              
              <button
                onClick={startGame}
                className="px-8 py-4 md:px-12 md:py-6 border border-neutral-700 bg-neutral-900 hover:border-neutral-400 active:scale-95 transition-all royal-font tracking-[0.3em] md:tracking-[0.5em] uppercase text-xs md:text-sm shadow-xl"
              >
                RECOMMENCER LE CYCLE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;
