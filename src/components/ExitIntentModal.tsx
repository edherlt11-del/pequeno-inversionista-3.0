/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { handleHotmartCheckout } from '../utils/checkout';

const PUPPY_IMAGE_URL = "https://i.postimg.cc/VNCggRrk/Chat-GPT-Image-27-ago-2026-20-44-28-removebg-preview-(1).png";

declare global {
  interface Window {
    openExitIntentModal?: () => void;
  }
}

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const hasTriggeredRef = useRef(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsOpen(true);
    setCountdown(10);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    hasTriggeredRef.current = true;
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  }, []);

  // 10 to 0 seconds countdown for the gentle pause
  useEffect(() => {
    if (!isOpen) return;

    timerIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Exit intent detection logic (Desktop + Mobile)
  useEffect(() => {
    // Expose test helper in window for preview / QA
    window.openExitIntentModal = () => {
      openModal();
    };

    let canTrigger = false;
    let hasMovedIntoPage = false;

    // Small delay (400ms) to ensure page has mounted and avoid instant trigger on load
    const armTimer = setTimeout(() => {
      canTrigger = true;
    }, 400);

    // Desktop 1: detect mouse moving to the top of viewport (clientY <= 10)
    const handleMouseMove = (e: MouseEvent) => {
      if (!canTrigger || hasTriggeredRef.current) return;

      // Track that user has moved cursor into the main area
      if (e.clientY > 35) {
        hasMovedIntoPage = true;
      }

      // Trigger if cursor reaches top boundary (<= 10px) after having moved in page
      if (hasMovedIntoPage && e.clientY <= 10) {
        openModal();
      }
    };

    // Desktop 2: detect cursor leaving document towards the top
    const handleMouseLeave = (e: MouseEvent) => {
      if (!canTrigger || hasTriggeredRef.current) return;
      if (e.clientY <= 20 || e.clientY <= 0) {
        openModal();
      }
    };

    // Desktop 3: detect mouseout when leaving window/iframe towards the top
    const handleMouseOut = (e: MouseEvent) => {
      if (!canTrigger || hasTriggeredRef.current) return;
      const toElement = e.relatedTarget || (e as unknown as { toElement?: Element }).toElement;
      if (!toElement && (e.clientY <= 25 || e.clientY <= 0)) {
        openModal();
      }
    };

    // Mobile: detection via history popstate / back button
    const handlePopState = () => {
      if (canTrigger && !hasTriggeredRef.current) {
        openModal();
        try {
          window.history.pushState({ exitIntentShown: true }, '');
        } catch {
          // Ignore
        }
      }
    };

    // Push state after 1.5s to capture mobile back button
    const historyTimer = setTimeout(() => {
      try {
        if (!hasTriggeredRef.current && window.history && window.history.pushState) {
          window.history.pushState({ page: 'pequeno-inversionista' }, '');
          window.addEventListener('popstate', handlePopState);
        }
      } catch {
        // Ignore
      }
    }, 1500);

    // Mobile: rapid scroll-up after scrolling down into page
    let maxScroll = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!canTrigger || hasTriggeredRef.current) return;
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = docHeight > 0 ? (currentY / docHeight) * 100 : 0;

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
      }

      // If user explored > 30% and then scrolls back towards top
      if (maxScroll > 30 && currentY < 60 && lastScrollY - currentY > 40) {
        openModal();
      }
      lastScrollY = currentY;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(armTimer);
      clearTimeout(historyTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      delete window.openExitIntentModal;
    };
  }, [openModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="exit-intent-overlay fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-slate-950/75 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="exit-intent-modal relative w-full max-w-[540px] max-h-[92vh] flex flex-col rounded-3xl bg-white border border-slate-100 shadow-2xl overflow-hidden text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button (X) */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Cerrar ventana"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 h-8 w-8 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            >
              <X className="h-4 w-4 stroke-[2.5]" />
            </button>

            {/* Scrollable container for mobile responsiveness */}
            <div className="overflow-y-auto p-4 sm:p-6 sm:px-7 overscroll-contain">
              
              {/* 2. Encabezado sutil: Pausa de 10 segundos con recuento de 10 a 0 */}
              <div className="exit-intent-header flex flex-col items-center gap-1.5 pt-1 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-extrabold shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span>
                    ¡Pausa de {countdown} {countdown === 1 ? 'segundo' : 'segundos'} antes de irte!
                  </span>
                </div>
                {/* Visual smooth progress track */}
                <div className="w-36 h-1 bg-amber-100/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(countdown / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* 1. Imagen del perrito - Elemento visual principal */}
              <div className="flex justify-center my-1 sm:my-2">
                <img
                  src={PUPPY_IMAGE_URL}
                  alt="Perrito Pequeño Inversionista"
                  className="exit-intent-image h-32 sm:h-40 w-auto object-contain drop-shadow-md select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>

              {/* 3. Contenido principal debajo de la imagen */}
              <div className="exit-intent-content text-center space-y-1.5 sm:space-y-2 mt-1">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  Prepara a tu hijo para el mundo real. 💼
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
                  Dale las herramientas para ahorrar de forma inteligente, tomar decisiones financieras audaces y asegurar su independencia futura.
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-emerald-700">
                  Invierte hoy en su éxito del mañana.
                </p>
              </div>

              {/* 4. Beneficios organizados en estructura visual compacta */}
              <div className="exit-intent-benefits mt-3.5 pt-3 border-t border-slate-100">
                <p className="text-[11px] sm:text-xs font-black text-slate-500 uppercase tracking-wider text-center mb-2">
                  Todo lo que estás a punto de perder hoy:
                </p>
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-2 sm:p-2.5">
                    <span className="text-base shrink-0">🎁</span>
                    <span className="text-[11px] sm:text-xs font-black text-slate-800 leading-tight">
                      4 BONOS GRATIS
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-2 sm:p-2.5">
                    <span className="text-base shrink-0">📚</span>
                    <span className="text-[11px] sm:text-xs font-black text-slate-800 leading-tight">
                      MÉTODO COMPLETO PASO A PASO
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-2 sm:p-2.5">
                    <span className="text-base shrink-0">♾️</span>
                    <span className="text-[11px] sm:text-xs font-black text-slate-800 leading-tight">
                      ACCESO VITALICIO 24/7
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-2 sm:p-2.5">
                    <span className="text-base shrink-0">🛡️</span>
                    <span className="text-[11px] sm:text-xs font-black text-slate-800 leading-tight">
                      GARANTÍA DE 7 DÍAS
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Precio */}
              <div className="exit-intent-price text-center mt-3 sm:mt-4">
                <span className="text-xs text-slate-400 line-through font-semibold block">
                  Antes $37 USD
                </span>
                <div className="flex items-baseline justify-center gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-slate-500 uppercase">HOY</span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">
                    $12
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-700">
                    USD
                  </span>
                </div>
              </div>

              {/* 6. Botón Principal CTA */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={(e) => {
                    handleClose();
                    handleHotmartCheckout(e);
                  }}
                  className="exit-intent-cta w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-black text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>SÍ, QUIERO ENSEÑARLE FINANZAS</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* 7. Opción para cerrar discreta */}
              <div className="text-center mt-2.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="exit-intent-dismiss text-[11px] sm:text-xs text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-2 cursor-pointer font-medium"
                >
                  No, prefiero que aprenda a golpes con el dinero 😬
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
