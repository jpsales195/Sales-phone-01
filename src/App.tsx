import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from './data/products.ts';
import { Product, CartItem } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { ProductModal } from './components/ProductModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { Footer } from './components/Footer.tsx';
import {
  Sparkles,
  ArrowUpDown,
  Filter,
  ShieldCheck,
  Zap,
  CheckCircle,
  Wrench,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [featuredProduct, setFeaturedProduct] = useState<Product>(PRODUCTS[0]);
  const [activeNavTab, setActiveNavTab] = useState<string>('CATÁLOGO');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sales_phone_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sales_phone_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { TODOS: PRODUCTS.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'TODOS') {
        counts[cat] = PRODUCTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'TODOS' || product.category === selectedCategory;

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
      if (sortBy === 'name') return a.description.localeCompare(b.description);
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    setToastMessage(`"${product.description}" adicionado ao carrinho!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Installment calculation for featured product
  const featuredInstallment = (featuredProduct.priceNumeric / 12).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans text-slate-800 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Sleek Interface Header */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        categoryCounts={categoryCounts}
        activeNavTab={activeNavTab}
        onSelectNavTab={setActiveNavTab}
      />

      {/* Main App Layout: Sleek Interface 2-Column Structure */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
        {/* Layout Grid: Featured Sidebar (Left) + Catalog Grid (Right) */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left Column: Featured Product Card (Sleek Interface Sidebar) */}
          <aside className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs sticky top-28">
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full tracking-wider inline-block">
                    Destaque da Semana
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {featuredProduct.sku}
                  </span>
                </div>

                {/* Title and Category */}
                <h2 className="text-xl sm:text-2xl font-black mt-3 leading-tight text-slate-900 line-clamp-2">
                  {featuredProduct.description}
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  {featuredProduct.category} • Garantia Oficial
                </p>

                {/* Featured Product Image */}
                <div
                  onClick={() => setSelectedProduct(featuredProduct)}
                  className="my-5 h-56 rounded-2xl bg-slate-50 flex items-center justify-center p-4 cursor-pointer hover:bg-slate-100/70 transition-colors group relative overflow-hidden"
                >
                  <img
                    src={featuredProduct.imageUrl}
                    alt={featuredProduct.description}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  />
                  <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-slate-500 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    Clique para detalhes
                  </span>
                </div>

                {/* Key features bullets */}
                {featuredProduct.features && featuredProduct.features.length > 0 && (
                  <div className="space-y-1 mb-4 text-xs text-slate-600">
                    {featuredProduct.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price block */}
                <div className="pt-2">
                  <span className="text-xs text-slate-400 block font-medium">
                    Preço Especial à Vista
                  </span>
                  <span className="text-3xl font-black text-slate-900 block mt-0.5 tracking-tight">
                    {featuredProduct.priceFormatted}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    ou até 12x de <strong className="text-slate-800">R$ {featuredInstallment}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2">
                <a
                  id="btn-featured-stripe-buy"
                  href={featuredProduct.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-2xl font-bold text-xs tracking-wider shadow-sm shadow-blue-500/25 transition-all active:scale-98"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>COMPRAR NO STRIPE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                <button
                  id="btn-featured-add-cart"
                  type="button"
                  onClick={() => handleAddToCart(featuredProduct)}
                  className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-center py-2.5 rounded-2xl font-bold text-xs transition-colors active:scale-98"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-slate-600" />
                    <span>Adicionar ao Carrinho</span>
                  </div>
                </button>
              </div>

              {/* Security info note */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Stripe Verificado</span>
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pronta Entrega</span>
                </span>
              </div>
            </div>
          </aside>

          {/* Right Column: Catalog List / Grid */}
          <div className="flex-1 w-full min-w-0">
            {/* Catalog Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>Catálogo de Produtos</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'itens'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedCategory === 'TODOS'
                    ? 'Todos os aparelhos, acessórios e serviços disponíveis'
                    : `Categoria: ${selectedCategory}`}
                  {searchQuery && ` • Busca: "${searchQuery}"`}
                </p>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline font-medium">Ordenar:</span>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
                >
                  <option value="featured">Mais Relevantes</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name">Ordem Alfabética</option>
                </select>
              </div>
            </div>

            {/* Technical Assistance Highlight Banner (Sleek card banner) */}
            {selectedCategory === 'TODOS' || selectedCategory === 'CONCERTOS' ? (
              <div className="mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-white">
                    <Wrench className="w-3 h-3" />
                    <span>ASSISTÊNCIA TÉCNICA SALES PHONE</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold">
                    Conserto de Tela iPhone 17 Pro Max • R$ 3.282,00
                  </h4>
                  <p className="text-xs text-blue-100 max-w-xl">
                    Substituição de tela premium com retenção de Face ID e True Tone. Garantia de 90 dias com mão de obra certificada.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    id="btn-quick-screen-repair"
                    href="https://buy.stripe.com/test_14A5kwcY9f020Mk63h9IQ08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none text-center px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap"
                  >
                    Pagar no Stripe
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const repair = PRODUCTS.find((p) => p.sku.includes('9'));
                      if (repair) {
                        setFeaturedProduct(repair);
                        setSelectedProduct(repair);
                      }
                    }}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors whitespace-nowrap"
                  >
                    Ver Serviço
                  </button>
                </div>
              </div>
            ) : null}

            {/* Empty state or Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 p-8">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <Filter className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Nenhum produto encontrado</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Não encontramos nenhum produto com os filtros atuais. Tente buscar por outro termo ou limpar os filtros.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('TODOS');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                >
                  Ver Todos os Produtos
                </button>
              </div>
            ) : (
              <div
                id="products-grid"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onSelectProduct={(p) => {
                      setFeaturedProduct(p);
                      setSelectedProduct(p);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating toast notification */}
      {toastMessage && (
        <div
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-semibold"
        >
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="ml-2 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors"
          >
            Ver Carrinho
          </button>
        </div>
      )}
    </div>
  );
}
