/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { preloadImages } from './components/ui/FastImage';

const CRITICAL_ILLUSTRATIONS = [
  "https://i.postimg.cc/635NJsht/Chat-GPT-Image-25-ago-2026-17-33-58-removebg-preview.png",
  "https://i.postimg.cc/Bb9kSdT6/Chat-GPT-Image-25-ago-2026-17-43-21-removebg-preview-removebg-preview.png",
  "https://i.postimg.cc/7YLMCKKH/Chat-GPT-Image-25-ago-2026-17-49-47-removebg-preview-removebg-preview.png",
  "https://i.postimg.cc/3wpJtHJs/Chat-GPT-Image-25-ago-2026-18-24-14-removebg-preview.png",
  "https://i.postimg.cc/jSmG3wD2/Chat-GPT-Image-25-ago-2026-18-07-51-removebg-preview.png",
  "https://i.postimg.cc/Ss2LTRzx/Chat-GPT-Image-25-ago-2026-18-16-40-removebg-preview.png",
  "https://i.postimg.cc/qRVgrv5C/Chat-GPT-Image-25-ago-2026-18-22-39-removebg-preview.png"
];

// Below-the-fold components loaded dynamically for maximum initial load performance
const Aprende = lazy(() => import('./components/Aprende'));
const AsiFunciona = lazy(() => import('./components/AsiFunciona'));
const Bonuses = lazy(() => import('./components/Bonuses'));
const Garantia = lazy(() => import('./components/Garantia'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const Pricing = lazy(() => import('./components/Pricing'));
const Footer = lazy(() => import('./components/Footer'));
const SalesPopups = lazy(() => import('./components/SalesPopups'));

export default function App() {
  useEffect(() => {
    // Pre-cache all illustrations in browser memory for instant rendering
    preloadImages(CRITICAL_ILLUSTRATIONS);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-emerald-100 selection:text-emerald-900 scroll-smooth">
      {/* Sticky Header - Critical for immediate view */}
      <Header />

      <main>
        {/* 1. Hero con propuesta de valor, video lazy y botón principal */}
        <Hero />

        {/* Below-the-fold sections loaded with React.lazy */}
        <Suspense fallback={<div className="py-12 flex justify-center text-slate-400 text-sm" />}>
          {/* 2. Sección "¿Qué aprenderá tu hijo y qué incluye el programa?" (Organizado por niveles) */}
          <Aprende />

          {/* 3. Sección "Así funciona" (3 pasos ilustrados) */}
          <AsiFunciona />

          {/* 5. Sección de bonos (Tarjetas individuales) */}
          <Bonuses />

          {/* 6. Sección de garantía simplificada (Mensaje corto con icono de escudo) */}
          <Garantia />

          {/* 7. Sección de preguntas frecuentes (Reducida a las 3 principales) */}
          <FAQ />

          {/* 9. Sección final muy emocional con mensaje inspirador y botón de compra */}
          <Pricing />
        </Suspense>
      </main>

      {/* Footer & Notifications loaded lazily */}
      <Suspense fallback={null}>
        <Footer />
        <SalesPopups />
      </Suspense>
    </div>
  );
}
