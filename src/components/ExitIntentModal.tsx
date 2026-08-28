/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle2, 
  PiggyBank, Gift, Flame, HeartHandshake, AlertCircle 
} from 'lucide-react';
import { Button } from './ui/design-system';
import { handleHotmartCheckout } from '../utils/checkout';

const STORAGE_KEY = 'pequeno_inversionista_exit_intent_seen';

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(599); // 09:59 minutes countdown
  const hasTriggeredRef = useRef(false);
  const scrollPosRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());

  // Countdown timer for session urgency
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerModal = useCallback(() => {
    if (hasTriggeredRef.current) return;

    // Check session storage so we don't bombard the user multiple times
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      // Ignore sessionStorage issues
    }

    hasTriggeredRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore
    }
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Expose a helper on window for easy testing in development/preview
    if (typeof window !== 'undefined') {
      (window as unknown as { triggerExitIntent?: () => void }).triggerExitIntent = () => {
        setIsOpen(true);
      };
    }
    // Only arm the trigger 4 seconds after page load to prevent accidental firing
    let isArmed = false;
    const armTimer = setTimeout(() => {
      isArmed = true;
    }, 3500);

    // 1. DESKTOP EXIT-INTENT: Detect mouse leaving viewport towards browser toolbar/tabs
    const handleMouseLeave = (e: MouseEvent) => {
      if (!isArmed || hasTriggeredRef.current) return;
      // Trigger if cursor exits towards the top (y <= 15)
      if (e.clientY <= 15) {
        triggerModal();
      }
    };

    // Also detect mouseout with null relatedTarget (cursor leaves window)
    const handleMouseOut = (e: MouseEvent) => {
      if (!isArmed || hasTriggeredRef.current) return;
      if (!e.relatedTarget && e.clientY <= 25) {
        triggerModal();
      }
    };

    // 2. MOBILE EXIT-INTENT:
    // When user scrolls down significantly (>400px) and suddenly scrolls rapidly upwards
    const handleScroll = () => {
      if (!isArmed || hasTriggeredRef.current) return;
      const currentScroll = window.scrollY;
      const now = Date.now();
      const timeDiff = now - lastScrollTimeRef.current;

      if (timeDiff > 50 && timeDiff < 300) {
        const delta = scrollPosRef.current - currentScroll;
        // User scrolled down deep and is now rapidly flicking upwards to URL bar / exit
        if (scrollPosRef.current > 600 && delta > 180) {
          triggerModal();
        }
      }

      scrollPosRef.current = currentScroll;
      lastScrollTimeRef.current = now;
    };

    // 3. INACTIVITY / MOBILE TAB SWITCH:
    // If user switches away from the tab or is idle for 60 seconds after scrolling
    const handleVisibilityChange = () => {
      if (!isArmed || hasTriggeredRef.current) return;
      if (document.visibilityState === 'hidden' && window.scrollY > 400) {
        // Trigger so when they tab back, it's there
        triggerModal();
      }
    };

    // 4. BACK BUTTON INTERCEPT (History API popstate)
    const handlePopState = () => {
      if (!hasTriggeredRef.current && isArmed) {
        triggerModal();
      }
    };

    // Push state gently so the back button catches exit intent once
    try {
      window.history.pushState({ page: 'landing' }, '');
    } catch {
      // Ignore
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('popstate', handlePopState);

    // Escape key listener to close cleanly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, triggerModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="exit-intent-modal-overlay"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <motion.div
            id="exit-intent-modal-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-emerald-400 overflow-hidden my-auto"
          >
            {/* Top decorative header gradient */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-5 py-3 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                  ¡Pausa de 10 segundos antes de irte!
                </span>
              </div>

              {/* Countdown timer badge */}
              <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-black text-amber-200 border border-white/20">
                <Clock className="h-3 w-3 text-amber-300" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              type="button"
              className="absolute top-2.5 right-3.5 z-20 h-7 w-7 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="h-4 w-4 stroke-[2.5]" />
            </button>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 text-center">
              {/* Visual Pattern Interrupt Badge & Mascot */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-100 via-teal-50 to-amber-100 border border-emerald-200 flex items-center justify-center shadow-inner">
                  <PiggyBank className="h-8 w-8 text-emerald-600 animate-bounce" />
                </div>
                <div className="text-left">
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                    RUPTURA DE PATRÓN 🎯
                  </span>
                  <p className="text-xs font-extrabold text-slate-700 mt-0.5">
                    El chanchito te vio apuntando a la "X" 😅
                  </p>
                </div>
              </div>

              {/* Main Catchy Headline (Toque Inesperado y Humor) */}
              <h3 
                id="exit-intent-title"
                className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug"
              >
                ¿En serio vas a cerrar la pestaña sin asegurar esta ventaja para tu hijo?
              </h3>

              {/* Light humor / emotional perspective shift */}
              <p className="mt-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium">
                Sabemos que estás a un clic de volver a ver redes o videos de perritos 🐶... pero piensa en esto: 
                <strong className="text-slate-900 font-bold"> $12 USD es menos de lo que cuesta una pizza familiar</strong>, 
                y le dará a tu hijo la educación financiera que el 90% de los adultos desearía haber recibido a su edad.
              </p>

              {/* Value recap card */}
              <div className="mt-4 bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 text-left space-y-2">
                <p className="text-[11px] font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <Gift className="h-3.5 w-3.5" /> Todo lo que estás a punto de perder hoy:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Método Completo Paso a Paso</strong> (de 3 a 16+ años)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Los 4 Bonos Exclusivos GRATIS</strong> (Banco Familiar, Juegos, Plantillas y Guía)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Área de Miembros con Acceso Vitalicio 24/7</strong> mediante usuario y clave</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Garantía Incondicional de 7 Días</strong>: si no te fascina, te devolvemos el 100%</span>
                  </li>
                </ul>
              </div>

              {/* Price comparison pill */}
              <div className="mt-4 flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-xl">
                <span className="text-xs text-slate-500 line-through font-bold">$37 USD</span>
                <span className="text-lg sm:text-xl font-black text-emerald-700">$12 USD</span>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-md uppercase">
                  67% DESCUENTO EN ESTA SESIÓN
                </span>
              </div>

              {/* Big CTA Button (Linked with Meta Pixel Tracking) */}
              <div className="mt-4">
                <Button
                  id="btn-exit-intent-checkout"
                  onClick={handleHotmartCheckout}
                  variant="primary"
                  size="lg"
                  glow
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full py-4 text-sm sm:text-base font-black bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/25 transition-all"
                >
                  ¡Aprovechar los $12 USD y Probar sin Riesgo! 🚀
                </Button>
              </div>

              {/* Security badges & reassurance */}
              <div className="mt-2.5 flex items-center justify-center gap-3 text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Compra 100% segura
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <HeartHandshake className="h-3.5 w-3.5 text-emerald-600" /> Garantía 7 días
                </span>
              </div>

              {/* Lighthearted Decline Option */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-[11px] sm:text-xs text-slate-400 hover:text-slate-600 underline font-medium transition-colors cursor-pointer"
                >
                  No gracias, prefiero que mi hijo aprenda finanzas cuando le cobren su primera tarjeta 😅
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
