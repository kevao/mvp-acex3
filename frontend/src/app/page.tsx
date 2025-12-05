'use client';

import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import PlansSection from "@/components/landing/PlansSection";
import HowItWorks from "@/components/landing/HowItWorks";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import AuthStatus from "@/components/landing/AuthStatus";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const scrollToPlans = () => {
    const el = document.getElementById('plans');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckout = async (planId: string) => {
    setLoading(true);
    // Se não estiver autenticado, redireciona para a tela de login
    if (typeof window !== 'undefined' && !localStorage.getItem('auth_token')) {
      // inclui next para retornar ao fluxo após login
      const next = `/checkout?planId=${encodeURIComponent(planId)}`;
      router.push(`/auth/login?next=${encodeURIComponent(next)}`);
      setLoading(false);
      return;
    }

    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:3001';
    const apiUrl = `${base}/checkout`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, goal: 'Ganho de Massa' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Falha ao iniciar o checkout.');
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Erro no Checkout:', error);
      alert('Erro ao processar assinatura. Verifique se o backend está disponível.');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Marmitas Fitness por Assinatura | Sua Dieta Pronta</title>
        <meta
          name="description"
          content="Ganhe massa ou emagreça sem perder tempo. Refeições calculadas e entregues semanalmente."
        />
      </Head>

      <header className="w-full bg-gray-800 p-4 flex justify-between items-center text-white shadow-lg sticky top-0 z-50">
        <Link href="/" className="text-xl font-bold tracking-wider hover:text-green-400 transition duration-200">
          Marmitas Fit
        </Link>
        <AuthStatus />
      </header>

      <main className="flex min-h-screen flex-col items-center justify-between">
        <section className="relative w-full h-[55vh] min-h-[100vh] flex items-center justify-start text-left">
          <Image
            src="/69326832446ad.webp"
            alt="Pessoas felizes com marmitas fitness prontas"
            fill
            priority
            quality={90}
            className="absolute z-0 object-cover"
          />

          <div className="absolute inset-0 bg-gray-900 opacity-60 z-10" />

          <div className="relative z-20 text-white p-10 sm:p-24 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
              ALIMENTAÇÃO DE VERDADE, O SABOR QUE TRANSFORMA
            </h1>

            <h2 className="text-lg sm:text-xl mb-6 max-w-lg">
              Refeições saudáveis, saborosas e balanceadas. Experimente e surpreenda-se!
            </h2>

            <button
              onClick={scrollToPlans}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-xl shadow-green-600/50 mr-4"
              disabled={loading}
            >
              ASSINAR AGORA
            </button>

            <button
              onClick={scrollToPlans}
              className="mt-4 sm:mt-0 bg-transparent border-2 border-white hover:border-yellow-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Saiba Mais
            </button>
          </div>
        </section>

        <section className="py-16 w-full bg-white">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">COMO FUNCIONA</h2>
          <HowItWorks />
        </section>

        <section id="plans" className="py-16 bg-gray-50 w-full">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">PLANOS</h2>
          <PlansSection onSelectPlan={handleCheckout} />
        </section>

        <section className="py-16 bg-white w-full">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">DEPOIMENTOS</h2>
          <TestimonialsSection />
        </section>
      </main>

      <footer className="w-full text-center py-4 bg-gray-800 text-white text-sm">
        <p>© 2025 Marmitas Fit. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
