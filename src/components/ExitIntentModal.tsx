/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock } from 'lucide-react';
import { handleHotmartCheckout } from '../utils/checkout';

const MODAL_IMAGE_URL = "https://i.postimg.cc/pL0ZHJMH/Chat-GPT-Image-30-ago-2026-18-18-32-(1).jpg";
const COUNTDOWN_SECONDS = 50;

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredRef = useRef(false);

  // Preload modal image immediately
  useEffect(() => {
    const img = new Image();
    img.src = MODAL_IMAGE_URL;
    img.referrerPolicy = 'no-referrer';
  }, []);

  // Open modal trigger handler
  const triggerExitIntent = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setTimeLeft(COUNTDOWN_SECONDS);
    setIsOpen(true);
  }, []);

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // 20-Second Countdown timer
  useEffect(() => {
    if (!isOpen) return;

    // Reset countdown to 20 seconds when opened
    setTimeLeft(COUNTDOWN_SECONDS);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen]);

  // Exit-intent mouse tracking
  useEffect(() => {
    // 1. Mouse leaving towards top of browser window / tab bar
    const handleMouseLeave = (e: MouseEvent) => {
      // clientY <= 15 means cursor moved up to the browser chrome / tab bar
      if (e.clientY <= 15 && !hasTriggeredRef.current) {
        triggerExitIntent();
      }
    };

    // 2. Mouse moving fast towards top boundary
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 8 && !hasTriggeredRef.current) {
        triggerExitIntent();
      }
    };

    // 3. Page visibility change (tab switch / window unfocus)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasTriggeredRef.current) {
        triggerExitIntent();
      }
    };

    // 4. Mobile exit intent detection: scroll up rapidly after scrolling down or after 25s
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If user scrolled down at least 500px and then scrolls up aggressively
      if (lastScrollY > 600 && currentScrollY < 200 && !hasTriggeredRef.current) {
        triggerExitIntent();
      }
      lastScrollY = currentScrollY;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerExitIntent]);

  // Keyboard shortcut (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Format seconds into 00:SS
  const formattedSeconds = timeLeft < 10 ? `0${timeLeft}` : `${timeLeft}`;
  const progressPercent = ((COUNTDOWN_SECONDS - timeLeft) / COUNTDOWN_SECONDS) * 100;

  const handleCheckoutClick = (e: React.MouseEvent) => {
    handleHotmartCheckout(e);
  };

  return (
    <AnimatePresence>
      {isOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            id="exit-intent-modal-overlay"
          >
            {/* Darkened blurred backdrop behind the modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Compact Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="relative w-full max-w-[460px] max-h-[95vh] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-auto text-slate-800 flex flex-col"
              id="exit-intent-modal-content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="exit-modal-title"
            >
              {/* Top Urgency Header with Countdown & Close Button */}
              <div className="bg-slate-900 text-white px-3.5 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Clock className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-black tracking-wide text-slate-200">OFERTA EXPIRA EN:</span>
                  <span className="font-mono text-amber-300 font-black text-xs sm:text-sm">00:{formattedSeconds}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/95 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    68% DESCUENTO
                  </span>
                  <button
                    type="button"
                    onClick={closeModal}
                    id="btn-close-exit-modal"
                    aria-label="Cerrar modal"
                    className="h-6 w-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Countdown Progress Bar */}
              <div className="h-1 w-full bg-slate-800 overflow-hidden shrink-0">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-linear"
                  style={{ width: `${100 - progressPercent}%` }}
                />
              </div>

              {/* Scrollable / Compact Body Container */}
              <div className="overflow-y-auto overflow-x-hidden flex-1">
                {/* Large Image - 100% complete, uncropped, sin contorno */}
                <div className="w-full bg-white pt-3 pb-1 px-4 flex items-center justify-center">
                  <img
                    src={MODAL_IMAGE_URL}
                    alt="Educación financiera práctica para niños"
                    className="w-auto h-auto max-h-[195px] sm:max-h-[225px] max-w-[92%] sm:max-w-[85%] object-contain mx-auto block select-none"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Modal Content - Vertically Compact */}
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 space-y-3">
                  
                  {/* Titles */}
                  <div className="text-center space-y-1">
                    <h3 
                      id="exit-modal-title"
                      className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-snug"
                    >
                      ¿En serio vas a dejar pasar esta oportunidad para tu hijo?
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Dale las herramientas y prepara a tu hijo para el mundo real. 💼
                    </p>
                  </div>

                  {/* Benefits Section Header */}
                  <div className="pt-0.5">
                    <div className="text-center">
                      <span className="inline-block text-[10px] sm:text-[11px] font-black tracking-wider text-emerald-700 uppercase bg-emerald-50/90 border border-emerald-200/60 px-3 py-0.5 rounded-lg">
                        TODO LO QUE ESTÁS A PUNTO DE OBTENER HOY:
                      </span>
                    </div>

                    {/* 2-Column Benefits Grid with small elegant cards */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-1.5">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-2 py-1.5 flex items-center gap-2 shadow-2xs hover:border-emerald-200 transition-colors">
                        <span className="text-sm shrink-0 leading-none">🎁</span>
                        <span className="text-[10px] sm:text-[11px] font-black text-slate-800 tracking-tight leading-tight">
                          4 BONOS GRATIS
                        </span>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-2 py-1.5 flex items-center gap-2 shadow-2xs hover:border-emerald-200 transition-colors">
                        <span className="text-sm shrink-0 leading-none">📚</span>
                        <span className="text-[10px] sm:text-[11px] font-black text-slate-800 tracking-tight leading-tight">
                          MÉTODO COMPLETO PASO A PASO
                        </span>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-2 py-1.5 flex items-center gap-2 shadow-2xs hover:border-emerald-200 transition-colors">
                        <span className="text-sm shrink-0 leading-none">♾️</span>
                        <span className="text-[10px] sm:text-[11px] font-black text-slate-800 tracking-tight leading-tight">
                          ACCESO VITALICIO 24/7
                        </span>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-2 py-1.5 flex items-center gap-2 shadow-2xs hover:border-emerald-200 transition-colors">
                        <span className="text-sm shrink-0 leading-none">🛡️</span>
                        <span className="text-[10px] sm:text-[11px] font-black text-slate-800 tracking-tight leading-tight">
                          GARANTÍA DE 7 DÍAS
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="bg-slate-50/90 border border-slate-200/70 rounded-xl py-1.5 px-3 flex items-center justify-center gap-3">
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">
                        Antes
                      </span>
                      <span className="text-xs font-semibold text-slate-400 line-through">
                        $37 USD
                      </span>
                    </div>

                    <div className="h-5 w-px bg-slate-200" />

                    <div className="text-left flex items-baseline gap-1.5">
                      <span className="text-[10px] font-black text-emerald-700 uppercase leading-none">
                        HOY
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight leading-none">
                        $12 USD
                      </span>
                    </div>
                  </div>

                  {/* CTA Call to Action Button */}
                  <div className="space-y-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={handleCheckoutClick}
                      id="btn-exit-intent-checkout"
                      className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-sm sm:text-base tracking-wide shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>SÍ, QUIERO ENSEÑARLE FINANZAS →</span>
                    </button>

                    {/* Discreet humorous rejection link */}
                    <button
                      type="button"
                      onClick={closeModal}
                      id="btn-exit-intent-dismiss"
                      className="w-full text-center text-[10px] sm:text-[11px] text-slate-400 hover:text-slate-600 transition-colors py-0.5 block cursor-pointer underline-offset-2 hover:underline"
                    >
                      No, prefiero que aprenda a golpes con el dinero 😬
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  );
}
