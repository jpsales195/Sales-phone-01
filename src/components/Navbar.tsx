import React from 'react';
import { ShoppingBag, Search, X, ShieldCheck, Zap, PhoneCall } from 'lucide-react';
import { CATEGORIES } from '../data/products.ts';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  categoryCounts: Record<string, number>;
  activeNavTab?: string;
  onSelectNavTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  categoryCounts,
  activeNavTab = 'CATÁLOGO',
  onSelectNavTab,
}) => {
  const navTabs = ['CATÁLOGO', 'SERVIÇOS', 'SOBRE NÓS', 'CONTATO'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* Top micro banner */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Checkout Oficial & Seguro Stripe</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Envio Expresso para todo o Brasil</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Suporte SALES PHONE</span>
            <a
              href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20tirar%20uma%20dúvida%20na%20Sales%20Phone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={() => {
            onSelectCategory('TODOS');
            onSearchChange('');
            onSelectNavTab?.('CATÁLOGO');
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            S
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            SALES <span className="text-blue-600">PHONE</span>
          </h1>
        </div>

        {/* Center Nav tabs (Sleek Interface style) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          {navTabs.map((tab) => {
            const isActive = activeNavTab === tab;
            return (
              <span
                key={tab}
                onClick={() => {
                  onSelectNavTab?.(tab);
                  if (tab === 'SERVIÇOS') {
                    onSelectCategory('CONCERTOS');
                  } else if (tab === 'CATÁLOGO') {
                    onSelectCategory('TODOS');
                  }
                }}
                className={`cursor-pointer transition-colors py-5 border-b-2 font-semibold text-xs tracking-wider ${
                  isActive
                    ? 'text-blue-600 border-blue-600'
                    : 'text-slate-500 border-transparent hover:text-blue-600'
                }`}
              >
                {tab}
              </span>
            );
          })}
        </nav>

        {/* Right side controls: Search & Cart */}
        <div className="flex items-center gap-3">
          {/* Pill Search */}
          <div className="relative hidden sm:block">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                id="search-input"
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 pr-7 py-2 bg-slate-100 hover:bg-slate-200/70 focus:bg-white focus:border-blue-500 rounded-full text-xs font-medium text-slate-700 placeholder:text-slate-400 border border-transparent focus:outline-none transition-all w-48 lg:w-60"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Limpar busca"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Cart Icon (Sleek circular button) */}
          <button
            id="btn-open-cart"
            type="button"
            onClick={onOpenCart}
            className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-xs hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-700 active:scale-95"
            aria-label="Carrinho de compras"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="px-4 pb-3 sm:hidden border-t border-slate-100 pt-2 bg-white">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-8 py-2 bg-slate-100 rounded-full text-xs font-medium text-slate-700 focus:bg-white focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Categories horizontal bar */}
      <div className="border-t border-slate-100 bg-[#F4F7FA]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none flex items-center gap-2">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] ?? 0;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-blue-700 text-blue-100'
                      : 'bg-slate-100 text-slate-500 font-mono'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
