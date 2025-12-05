'use client';

import React from 'react';

const steps = [
  {
    icon: "🛒",
    title: "1. Escolha o Plano",
    description: "Selecione a quantidade de refeições e o seu objetivo (emagrecimento, ganho de massa ou manutenção).",
    color: "bg-green-500",
  },
  {
    icon: "👨‍🍳",
    title: "2. Preparação dos Chefs",
    description: "Nossos chefs preparam tudo na semana, usando ingredientes frescos, orgânicos e zero conservantes.",
    color: "bg-blue-500",
  },
  {
    icon: "🚚",
    title: "3. Receba em Casa",
    description: "Entregamos suas marmitas em dias fixos, prontas e ultracongeladas para manter o sabor e nutrientes.",
    color: "bg-yellow-500",
  },
  {
    icon: "🍽️",
    title: "4. Aqueça e Coma",
    description: "Pronto em 5 minutos no micro-ondas. Desfrute de uma refeição balanceada, deliciosa e sem culpa.",
    color: "bg-red-500",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative p-6 bg-white rounded-xl shadow-2xl transition duration-500 hover:shadow-green-300/50 hover:scale-[1.02] border-t-4 border-green-500 flex flex-col items-center text-center h-full"
          >
            <div className={`w-16 h-16 ${step.color} text-white rounded-full flex items-center justify-center mb-4 shadow-xl shadow-gray-400/50`}>
              <span className="text-3xl" role="img" aria-label={step.title.split('.')[0]}>{step.icon}</span>
            </div>

            <h3 className="text-xl font-extrabold text-gray-900 mb-3 tracking-wide">{step.title}</h3>

            <p className="text-gray-600 text-sm">{step.description}</p>

            <div className="absolute top-0 right-0 p-2 text-xs font-black text-gray-400 opacity-20">{index + 1}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-2xl font-bold text-gray-700 mb-4">Tudo pensado para a sua conveniência e saúde.</p>
        <a
          href="#plans"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-lg"
        >
          Ver Planos Agora
        </a>
      </div>
    </div>
  );
};

export default HowItWorks;
