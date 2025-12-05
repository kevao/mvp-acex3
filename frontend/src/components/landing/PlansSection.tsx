'use client';

import React from 'react';

interface Plan {
  id: string; // slug
  name: string;
  description: string;
  priceCents: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  isFeatured?: boolean;
}

// Plans aligned with backend seeds (backend/src/database/seeds/seed.ts)
const plans: Plan[] = [
  {
    id: 'plano-basico',
    name: 'Plano Básico',
    description: 'Refeições planejadas para você',
    priceCents: 49000,
    billingPeriod: 'monthly',
    features: [
      '5 marmitas por semana',
      'Entrega gratuita',
      '1 sobremesa exclusiva por mês',
    ],
    isFeatured: false,
  },
  {
    id: 'plano-casal',
    name: 'Plano Casal',
    description: 'Refeições planejadas para duas pessoas',
    priceCents: 93000,
    billingPeriod: 'monthly',
    features: [
      '10 marmitas por semana',
      'Entrega gratuita',
      '2 sobremesas exclusivas por mês',
    ],
    isFeatured: true,
  },
  {
    id: 'plano-familia',
    name: 'Plano Família',
    description: 'Refeições planejadas para toda a família',
    priceCents: 177000,
    billingPeriod: 'monthly',
    features: [
      '20 marmitas por semana',
      'Entrega gratuita',
      '4 sobremesas exclusivas por mês',
    ],
    isFeatured: false,
  },
];

function formatPrice(cents: number) {
  const reais = cents / 100;
  return reais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

interface PlansSectionProps {
  onSelectPlan: (planId: string) => void;
}

const PlansSection: React.FC<PlansSectionProps> = ({ onSelectPlan }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center text-center transform transition duration-500 border-4 ${plan.isFeatured ? 'border-green-500 scale-[1.05] hover:shadow-green-400/50' : 'border-gray-200 hover:shadow-lg'}`}
          >
            {plan.isFeatured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform bg-green-500 text-white text-xs font-bold py-1 px-4 rounded-full shadow-lg">
                MAIS POPULAR
              </div>
            )}
            {plan.discount && !plan.isFeatured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform bg-blue-500 text-white text-xs font-bold py-1 px-4 rounded-full shadow-lg">
                {plan.discount}
              </div>
            )}

            <h3 className="text-3xl font-extrabold text-gray-900 mt-4 mb-2">{plan.name}</h3>

            <p className="text-gray-500 mb-6 h-12 flex items-center justify-center">{plan.description}</p>

            <div className="flex items-end mb-6">
              <span className="text-5xl font-extrabold text-green-600">{formatPrice(plan.priceCents)}</span>
              <span className="text-xl text-gray-500 ml-1">/{plan.billingPeriod === 'monthly' ? 'mês' : 'ano'}</span>
            </div>

            <ul className="text-left space-y-3 mb-8 w-full max-w-xs flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700 text-md">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelectPlan(plan.id)}
              className={`mt-auto w-full py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 shadow-md ${plan.isFeatured ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-500/50' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/50'}`}
            >
              Assinar Agora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansSection;
