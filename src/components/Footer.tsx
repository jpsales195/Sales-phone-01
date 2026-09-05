import React from 'react';
import { Smartphone, ShieldCheck, Lock, CreditCard, Wrench, Headphones, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-16">
      {/* Value props banner */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-200 text-sm">Pagamento Stripe</h5>
              <p className="text-slate-400 text-xs">Transações criptografadas com segurança máxima.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-200 text-sm">Produtos Originais</h5>
              <p className="text-slate-400 text-xs">Garantia e nota fiscal em todos os produtos.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-200 text-sm">Assistência Técnica</h5>
              <p className="text-slate-400 text-xs">Conserto especializado com peças certificadas.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-slate-200 text-sm">Entrega Ágil</h5>
              <p className="text-slate-400 text-xs">Rastreamento direto e despacho rápido.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              SALES <span className="text-blue-500">PHONE</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            A SALES PHONE é referência em comercialização de smartphones topo de linha, acessórios originais Apple e serviços de manutenção técnica especializada.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
              CNPJ Ativo
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
              Suporte 24/7
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
              Certificação SSL
            </span>
          </div>
        </div>

        <div>
          <h5 className="font-bold text-slate-200 text-sm mb-3">Categorias Rápidas</h5>
          <ul className="space-y-2 text-xs">
            <li>
              <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Smartphones & Celulares
              </span>
            </li>
            <li>
              <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Carregadores & Cabos USB-C
              </span>
            </li>
            <li>
              <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Fones & Áudio (AirPods)
              </span>
            </li>
            <li>
              <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Capinhas & Películas 9H
              </span>
            </li>
            <li>
              <span className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Conserto de Telas & Peças
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-200 text-sm mb-3">Formas de Pagamento</h5>
          <p className="text-slate-400 text-xs mb-3">
            Processamento online via <strong>Stripe Checkout</strong> com suporte a:
          </p>
          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Cartão de Crédito</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Até 12x</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Apple Pay</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Google Pay</span>
            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Pix / Boleto</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-900 py-6 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} SALES PHONE. Todos os direitos reservados.</span>
          <span>Pagamentos processados com segurança por Stripe Checkout.</span>
        </div>
      </div>
    </footer>
  );
};
