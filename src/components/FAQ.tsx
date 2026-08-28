/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, KeyRound, MonitorPlay, CheckCircle2 } from 'lucide-react';
import { SectionHeader, Card } from './ui/design-system';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const top3Questions = [
    {
      question: "¿Para qué edades está recomendado?",
      answer: "Está diseñado para niños y adolescentes de entre 3 y 16+ años, dividido en 3 niveles de edad (3 a 5+, 5 a 12+ y 12 a 16+ años). Todos los conceptos están adaptados mediante analogías simples y dinámicas familiares visuales."
    },
    {
      question: "¿Necesito conocimientos financieros previos como padre?",
      answer: "No. El programa incluye la guía completa para padres con el paso a paso detallado. Aprenderán juntos de forma divertida sin explicaciones complejas."
    },
    {
      question: "¿Cómo recibo el material y cómo ingreso al programa?",
      isDetailedAccess: true,
      answer: "Una vez completada tu compra, recibirás automáticamente un correo electrónico con tu confirmación y tus credenciales personales (usuario y contraseña). Con ellas podrás ingresar de inmediato a nuestra exclusiva Área de Miembros protegida, donde se encuentra alojado todo el método paso a paso, las guías, los simuladores y los materiales listos para usar o imprimir las 24/7 de por vida."
    }
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-slate-50/60 py-16 lg:py-20 border-y border-slate-100" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeader 
          tag="RESPUESTAS RÁPIDAS"
          tagVariant="emerald"
          title="Preguntas Frecuentes"
          subtitle="Resolvemos las dudas principales para ayudarte a dar el paso hoy mismo con total tranquilidad."
        />

        <div className="mt-10 space-y-3">
          {top3Questions.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card 
                key={idx}
                variant="flat"
                className={`overflow-hidden border bg-white rounded-2xl transition-all duration-200 ${
                  isOpen ? 'border-emerald-300 shadow-md shadow-emerald-500/5' : 'border-slate-200/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-black text-slate-900 cursor-pointer text-sm sm:text-base gap-3 hover:bg-slate-50/50"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 p-5 bg-slate-50/40">
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.answer}
                    </p>

                    {/* Step-by-step visual workflow for the access process */}
                    {item.isDetailedAccess && (
                      <div className="mt-4 pt-4 border-t border-slate-200/70 grid sm:grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                          <div className="h-7 w-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-2">
                            <Mail className="h-4 w-4" />
                          </div>
                          <p className="text-xs font-black text-slate-900">1. Correo Inmediato</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            Llega a tu bandeja de entrada segundos tras tu compra.
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                          <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                            <KeyRound className="h-4 w-4" />
                          </div>
                          <p className="text-xs font-black text-slate-900">2. Usuario y Clave</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            Tus credenciales seguras para entrar cuando quieras.
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                          <div className="h-7 w-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                            <MonitorPlay className="h-4 w-4" />
                          </div>
                          <p className="text-xs font-black text-slate-900">3. Área de Miembros</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            Todo el método alojado paso a paso de por vida.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
