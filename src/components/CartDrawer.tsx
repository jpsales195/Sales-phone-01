import React from 'react';
import { CartItem } from '../types.ts';
import { X, Trash2, Plus, Minus, ExternalLink, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.priceNumeric * item.quantity, 0);

  const formattedTotal = totalPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        id="cart-drawer"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Seu Carrinho</h3>
              <p className="text-xs text-slate-500 font-medium">
                {totalItems} {totalItems === 1 ? 'item selecionado' : 'itens selecionados'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                id="btn-clear-cart"
                type="button"
                onClick={onClearCart}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                title="Esvaziar carrinho"
              >
                Limpar
              </button>
            )}
            <button
              id="btn-close-cart"
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Carrinho Vazio</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Explore o catálogo da SALES PHONE e adicione itens ou compre diretamente via Stripe.
              </p>
            </div>
          ) : (
            cart.map((item) => {
              const itemTotal = (item.product.priceNumeric * item.quantity).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });

              return (
                <div
                  key={item.product.id}
                  id={`cart-item-${item.product.id}`}
                  className="pt-4 first:pt-0 flex gap-3"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200/80 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.description}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-semibold text-slate-900 truncate">
                        {item.product.description}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 p-0.5 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {item.product.sku}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {item.product.priceFormatted} cada
                      </span>
                    </div>

                    {/* Quantity and Line Total */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-600 text-xs transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-slate-800 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-600 text-xs transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 block">
                          {itemTotal}
                        </span>
                      </div>
                    </div>

                    {/* Direct Stripe checkout button for this item */}
                    <div className="mt-2 pt-2">
                      <a
                        href={item.product.paymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 px-2.5 py-1 rounded-md transition-colors w-full justify-center"
                      >
                        <span>Pagar {item.product.sku} no Stripe</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with totals and instructions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItems} itens)</span>
                <span className="font-semibold text-slate-900">{formattedTotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Processamento Stripe</span>
                <span className="font-semibold text-emerald-600">Direto & Criptografado</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Estimado</span>
                <span className="text-base text-blue-600">{formattedTotal}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200/90 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Checkout Direto via Stripe:</span>
              </div>
              <p>
                Cada item possui seu link de pagamento verificado. Clique em <strong>"Pagar no Stripe"</strong> acima para concluir o pedido do produto com cartão ou parcelamento.
              </p>
            </div>

            {/* Quick checkout first item if present */}
            <a
              id="btn-cart-primary-checkout"
              href={cart[0].product.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              <span>Prosseguir para Checkout ({cart[0].product.sku})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
