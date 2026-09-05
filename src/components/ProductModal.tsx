import React, { useState } from 'react';
import { Product } from '../types.ts';
import {
  X,
  ExternalLink,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Truck,
  RotateCcw,
  Zap,
  CreditCard,
  Lock
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const installmentValue = (product.priceNumeric / 12).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      id="product-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id={`product-modal-${product.id}`}
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left side: Image */}
        <div className="w-full md:w-1/2 bg-[#F4F7FA] flex flex-col items-center justify-center p-8 relative border-b md:border-b-0 md:border-r border-slate-200">
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
              {product.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white text-slate-700 border border-slate-200">
              {product.sku}
            </span>
          </div>

          <div className="w-full max-w-[280px] h-[280px] flex items-center justify-center">
            {!imgError ? (
              <img
                src={product.imageUrl}
                alt={product.description}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400">
                <ShoppingBag className="w-16 h-16 text-slate-300 mb-2" />
                <span className="text-sm font-medium">{product.name}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            Checkout direto oficial no Stripe
          </div>
        </div>

        {/* Right side: Info and Purchase */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              SALES PHONE • {product.name}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              {product.description}
            </h2>

            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-mono">
              <span>Código do Produto:</span>
              <strong className="text-slate-900">{product.sku}</strong>
            </div>

            {/* Price Box */}
            <div className="mt-5 p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="text-xs text-slate-500 font-medium">Valor Total</div>
              <div className="text-3xl font-black text-slate-900 mt-0.5">
                {product.priceFormatted}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                em até 12x de <strong className="text-slate-900">R$ {installmentValue}</strong>
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Destaques e Especificações:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Envio rápido e seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garantia de procedência</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span>Pagamento via Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>Suporte técnico dedicado</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
            <a
              id={`modal-buy-stripe-${product.id}`}
              href={product.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Finalizar Compra no Stripe</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>

            <button
              id={`modal-add-cart-${product.id}`}
              type="button"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-slate-600" />
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
