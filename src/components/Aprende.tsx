/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Globe, Check, Sparkles, Flame
} from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from './ui/design-system';

export default function Aprende() {
  const levels = [
    {
      id: "lvl-1",
      levelNumber: "Nivel 1",
      ageRange: "3 a 5+ años",
      title: "Primeros Pasos y Valor del Dinero",
      tagline: "Hábitos positivos desde la infancia temprana",
      themeColor: "sky",
      badgeColor: "bg-sky-50 text-sky-800 border-sky-200",
      accentBorder: "border-sky-200 hover:border-sky-400 hover:shadow-sky-100/50",
      glowBg: "from-sky-100/60 to-transparent",
      ambientGlow: "bg-sky-200/40",
      isPopular: true,
      image: "https://i.postimg.cc/635NJsht/Chat-GPT-Image-25-ago-2026-17-33-58-removebg-preview.png",
      points: [
        "Ahorrar antes de gastar",
        "Valor del dinero sin dramas",
        "Cuidado de juguetes y gratitud"
      ]
    },
    {
      id: "lvl-2",
      levelNumber: "Nivel 2",
      ageRange: "6 a 11+ años",
      title: "Ahorro Inteligente y Metas",
      tagline: "Criterio financiero y autocontrol",
      themeColor: "emerald",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      accentBorder: "border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100/50",
      glowBg: "from-emerald-100/60 to-transparent",
      ambientGlow: "bg-emerald-200/40",
      image: "https://i.postimg.cc/Bb9kSdT6/Chat-GPT-Image-25-ago-2026-17-43-21-removebg-preview-removebg-preview.png",
      points: [
        "Frenar compras por impulso",
        "Metas con su propio ahorro",
        "Criterio para su mesada"
      ]
    },
    {
      id: "lvl-3",
      levelNumber: "Nivel 3",
      ageRange: "12 a 16+ años",
      title: "Inversión y Decisiones Reales",
      tagline: "Preparación práctica para el futuro",
      themeColor: "amber",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      accentBorder: "border-amber-200 hover:border-amber-400 hover:shadow-amber-100/50",
      glowBg: "from-amber-100/60 to-transparent",
      ambientGlow: "bg-amber-200/40",
      image: "https://i.postimg.cc/7YLMCKKH/Chat-GPT-Image-25-ago-2026-17-49-47-removebg-preview-removebg-preview.png",
      points: [
        "Hacer crecer su dinero a futuro",
        "Práctica con simulador seguro",
        "Blindaje contra deudas juveniles"
      ]
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 py-12 sm:py-16 lg:py-20 border-y border-slate-100 overflow-hidden" id="que-aprendera">
      {/* Background soft ambient blurs */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeader 
          tag="PROGRAMA COMPLETO POR EDADES"
          tagVariant="emerald"
          title="¿Qué aprenderá tu hijo en cada etapa?"
          subtitle="Un recorrido progresivo, práctico y divertido diseñado especialmente según su edad para desarrollar inteligencia financiera desde hoy."
        />

        {/* 3 Age Levels Cards Grid */}
        <div className="mt-10 sm:mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch" id="niveles-educativos">
          {levels.map((lvl, idx) => {
            return (
              <motion.div
                key={lvl.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group relative rounded-3xl bg-white border-2 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${lvl.accentBorder}`}
              >
                {/* Popular badge */}
                {lvl.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider uppercase bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 border border-emerald-300 whitespace-nowrap">
                      <Flame className="h-3 w-3 animate-pulse text-amber-300" />
                      MÁS POPULAR ENTRE FAMILIAS
                    </span>
                  </div>
                )}

                {/* Subtle top glow */}
                <div className={`absolute inset-x-0 top-0 h-28 rounded-t-3xl bg-gradient-to-b ${lvl.glowBg} pointer-events-none`} />

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Top Level and Age Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center text-xs font-black tracking-wide uppercase px-3 py-1 rounded-xl border shadow-2xs ${lvl.badgeColor}`}>
                      {lvl.levelNumber} • {lvl.ageRange}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Kit Completo
                    </span>
                  </div>

                  {/* Hero Character Showcase - Prominent & striking */}
                  <div className="relative w-full h-52 sm:h-60 my-2 flex items-center justify-center">
                    {/* Ambient light halo behind character */}
                    <div className={`absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full ${lvl.ambientGlow} blur-2xl pointer-events-none transition-all duration-500 group-hover:scale-125 opacity-80`} />
                    
                    <img
                      src={lvl.image}
                      alt={`Personaje ${lvl.title}`}
                      className="relative z-10 h-full max-h-52 sm:max-h-60 w-auto object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-300 select-none"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Title and Tagline */}
                  <div className="mb-3 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                      {lvl.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">
                      {lvl.tagline}
                    </p>
                  </div>

                  {/* Concise, punchy points without clutter */}
                  <div className="space-y-2 flex-1 mb-4 pt-3 border-t border-slate-100">
                    {lvl.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700">
                        <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                        <span className="font-medium text-slate-800 leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clean Footer */}
                <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Check className="h-3.5 w-3.5 text-emerald-600" /> Práctico y aplicable
                  </span>
                  <span className="text-slate-400 text-[11px]">Acceso vitalicio</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Acceso 100% Digital Banner */}
        <div className="mt-10 flex justify-center" id="banner-acceso-digital">
          <div className="w-full max-w-3xl bg-gradient-to-r from-emerald-50 via-teal-50/80 to-sky-50 border-2 border-emerald-300 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left transition-all hover:shadow-md">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm">
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
