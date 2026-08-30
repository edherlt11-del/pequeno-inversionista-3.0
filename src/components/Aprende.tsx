/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Globe, Check, Sparkles, TrendingUp, PiggyBank, Award, Flame, Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from './ui/design-system';
import { FastImage } from './ui/FastImage';

export default function Aprende() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const levels = [
    {
      id: "lvl-1",
      levelNumber: "NIVEL 1",
      levelRank: "Rango: Ahorrador Novato",
      ageRange: "3 a 5+ años",
      title: "Primeros Pasos y Valor del Dinero",
      tagline: "Hábitos básicos y relación positiva con el dinero",
      icon: PiggyBank,
      xpBadge: "+150 XP",
      coinsBadge: "⭐ Nivel Destacado",
      progressBar: 35,
      themeColor: "sky",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-300 shadow-sky-100",
      accentBorder: "border-sky-300 hover:border-sky-500 group-hover:shadow-sky-100 ring-2 ring-sky-500/25",
      glowBg: "from-sky-500/15 via-sky-100/40 to-transparent",
      glowCircle: "bg-sky-200/70",
      iconBg: "bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-sky-200",
      isPopular: true,
      image: "https://i.postimg.cc/635NJsht/Chat-GPT-Image-25-ago-2026-17-33-58-removebg-preview.png",
      missions: [
        { label: "Valor del dinero", xp: "+40 XP" },
        { label: "Guardar antes de gastar", xp: "+35 XP" },
        { label: "Cuidar pertenencias", xp: "+35 XP" },
        { label: "Gratitud familiar", xp: "+40 XP" }
      ],
      unlockedReward: "Insignia: Guardian del Chanchito 🐷"
    },
    {
      id: "lvl-2",
      levelNumber: "NIVEL 2",
      levelRank: "Rango: Administrador Pro",
      ageRange: "6 a 11+ años",
      title: "Ahorro Inteligente y Metas",
      tagline: "Criterio financiero y control de compras",
      icon: Sparkles,
      xpBadge: "+350 XP",
      coinsBadge: "🔥 4 Misiones",
      progressBar: 70,
      themeColor: "emerald",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300 shadow-emerald-100",
      accentBorder: "border-emerald-200 hover:border-emerald-400 group-hover:shadow-emerald-100",
      glowBg: "from-emerald-500/10 via-emerald-100/30 to-transparent",
      glowCircle: "bg-emerald-200/70",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-emerald-200",
      image: "https://i.postimg.cc/Bb9kSdT6/Chat-GPT-Image-25-ago-2026-17-43-21-removebg-preview-removebg-preview.png",
      missions: [
        { label: "Control de impulsos", xp: "+80 XP" },
        { label: "Ahorro con metas", xp: "+90 XP" },
        { label: "Necesidad vs. antojo", xp: "+90 XP" },
        { label: "Manejo de mesada", xp: "+90 XP" }
      ],
      unlockedReward: "Insignia: Maestro del Presupuesto 🏆"
    },
    {
      id: "lvl-3",
      levelNumber: "NIVEL 3",
      levelRank: "Rango: Joven Inversionista",
      ageRange: "12 a 16+ años",
      title: "Inversión, Decisiones y Futuro",
      tagline: "Preparación para el mundo real",
      icon: TrendingUp,
      xpBadge: "+500 XP",
      coinsBadge: "🚀 Rango Máximo",
      progressBar: 100,
      themeColor: "amber",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300 shadow-amber-100",
      accentBorder: "border-amber-200 hover:border-amber-400 group-hover:shadow-amber-100",
      glowBg: "from-amber-500/10 via-amber-100/30 to-transparent",
      glowCircle: "bg-amber-200/70",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-200",
      image: "https://i.postimg.cc/7YLMCKKH/Chat-GPT-Image-25-ago-2026-17-49-47-removebg-preview-removebg-preview.png",
      missions: [
        { label: "Mentalidad de inversión", xp: "+120 XP" },
        { label: "Simulador interactivo", xp: "+130 XP" },
        { label: "Blindaje contra deudas", xp: "+120 XP" },
        { label: "Independencia futura", xp: "+130 XP" }
      ],
      unlockedReward: "Insignia: Estratega Financiero 💎"
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 py-10 sm:py-16 lg:py-24 border-y border-slate-100 overflow-hidden" id="que-aprendera">
      {/* Background playful elements */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        
        <SectionHeader 
          tag="🎮 AVENTURA POR NIVELES Y MISIONES"
          tagVariant="emerald"
          title="¿Qué aprenderá tu hijo en cada etapa?"
          subtitle="Un mapa de aprendizaje gamificado, progresivo y divertido estructurado según su edad para desbloquear superpoderes financieros reales."
        />

        {/* 3 Age Levels Cards Grid Gamified */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 lg:grid-cols-3 items-stretch" id="niveles-educativos">
          {levels.map((lvl, idx) => {
            const Icon = lvl.icon;
            const isHovered = activeCard === idx;
            
            return (
              <motion.div
                key={lvl.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative rounded-2xl sm:rounded-3xl bg-white border-2 p-4 sm:p-5 lg:p-6 shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl ${lvl.accentBorder}`}
              >
                {/* Gamified Top Corner Floating Ribbon */}
                {lvl.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider uppercase bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-md shadow-emerald-500/30 border border-emerald-300 whitespace-nowrap">
                      <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-pulse text-amber-300" />
                      MÁS POPULAR ENTRE FAMILIAS
                    </span>
                  </div>
                )}

                {/* Card Glow Top Gradient */}
                <div className={`absolute inset-x-0 top-0 h-24 sm:h-32 rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-b ${lvl.glowBg} pointer-events-none opacity-80`} />

                <div className="relative z-10">
                  {/* Top Level and Rank Row */}
                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                    <span className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-black tracking-wide uppercase px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl border shadow-2xs ${lvl.badgeColor}`}>
                      <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      {lvl.levelNumber} • {lvl.ageRange}
                    </span>

                    <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      {lvl.levelRank}
                    </span>
                  </div>

                  {/* Level Header with Icon & Title */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2 sm:mb-3">
                    <motion.div 
                      animate={isHovered ? { scale: 1.08, rotate: [0, -4, 4, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl sm:rounded-2xl ${lvl.iconBg} flex items-center justify-center shadow-md`}
                    >
                      <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug">
                        {lvl.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">
                        {lvl.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Figura protagónica al medio y más grande */}
                  {lvl.image && (
                    <div className="relative my-2 sm:my-3.5 flex items-center justify-center">
                      {/* Aura suave de color detrás de la figura */}
                      <div className={`absolute w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full ${lvl.glowCircle} blur-xl pointer-events-none opacity-65`} />

                      <motion.div 
                        whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                        transition={{ type: "spring", stiffness: 300, damping: 16 }}
                        className="relative z-10 cursor-pointer flex items-center justify-center"
                      >
                        <FastImage
                          src={lvl.image}
                          alt={`Personaje ${lvl.title}`}
                          priority={idx === 0}
                          containerClassName="h-36 w-36 sm:h-44 sm:w-44 lg:h-48 lg:w-48 flex items-center justify-center"
                          className="h-full w-full object-contain drop-shadow-xl filter hover:brightness-105 transition-all duration-300 select-none"
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Misiones de Aprendizaje sutiles con pocas letras */}
                  <div className="space-y-1.5 sm:space-y-2 pt-1 border-t border-slate-100/90">
                    <div className="flex items-center justify-between px-0.5">
                      <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Award className="h-3 w-3 text-slate-400" />
                        Misiones clave:
                      </p>
                      <span className="text-[9px] sm:text-[10px] font-medium text-slate-400">
                        {lvl.missions.length} logros
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      {lvl.missions.map((mission, mIdx) => {
                        const itemKey = `${lvl.id}-${mIdx}`;
                        const isDone = completedItems[itemKey];

                        return (
                          <div 
                            key={mIdx} 
                            onClick={() => toggleItem(itemKey)}
                            className={`flex items-center gap-1.5 p-1.5 sm:p-2 rounded-xl border text-left cursor-pointer transition-all duration-200 select-none ${
                              isDone 
                                ? 'bg-emerald-50 text-emerald-950 font-bold border-emerald-300 shadow-2xs' 
                                : 'bg-slate-50/90 hover:bg-slate-100/90 text-slate-700 font-medium border-slate-200/70'
                            }`}
                          >
                            <div className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 rounded-full flex items-center justify-center transition-all ${
                              isDone 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[3]" />
                            </div>
                            <span className="text-[11px] sm:text-xs leading-tight truncate">
                              {mission.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Footer Clean */}
                <div className="relative z-10 mt-3 sm:mt-4 pt-2.5 border-t border-slate-100/90 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-500">
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> Todo incluido en el kit
                  </span>
                  <span className="text-slate-400 font-medium">Acceso vitalicio</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Acceso 100% Digital Banner Gamified */}
        <div className="mt-10 flex justify-center" id="banner-acceso-digital">
          <div className="w-full max-w-3xl bg-gradient-to-r from-emerald-50 via-teal-50/80 to-sky-50 border-2 border-emerald-300 rounded-3xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left transition-all hover:shadow-lg">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-md">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                Acceso 100% Digital e Inmediato de por vida
              </p>
              <p className="text-xs sm:text-[13px] font-medium text-slate-700 mt-0.5 leading-relaxed">
                Todo el contenido está organizado en una <strong className="text-emerald-800 font-black">plataforma privada y segura</strong>, disponible para siempre desde cualquier celular, tablet o computadora.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
