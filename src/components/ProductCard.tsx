import React, { useState } from 'react';
import { Product } from '../types.ts';
import { ShoppingBag, ExternalLink, Sparkles, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isRepairService?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
}) => {
  const [imgError, setImgError] = useState(false);

  // Calculate simulated 12x installment
  const installmentValue = (product.priceNumeric / 12).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl p-4 border border-slate-200/90 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div>
        {/* Card Header: Category & SKU */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5">
            {product.badge && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                {product.badge}
              </span>
            )}
            <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
              {product.sku}
            </span>
          </div>
        </div>

        {/* Image Container */}
        <div
          onClick={() => onSelectProduct(product)}
          className="relative h-40 rounded-xl bg-slate-50/80 mb-3 flex items-center justify-center p-3 cursor-pointer group-hover:bg-slate-100/70 transition-colors overflow-hidden"
        >
          {!imgError ? (
            <img
              src={product.imageUrl}
              alt={product.description}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              loading="lazy"
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <ShoppingBag className="w-7 h-7 mb-1" />
              <span className="text-[11px] font-medium">SALES PHONE</span>
            </div>
          )}

          {/* Quick inspect eye button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-slate-600 shadow-2xs border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-600"
            title="Ver detalhes"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Details */}
        <h3
          onClick={() => onSelectProduct(product)}
          className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer"
          title={product.description}
        >
          {product.description}
        </h3>

        <div className="text-base font-bold text-slate-900 mt-1">
          {product.priceFormatted}
        </div>
        <p className="text-[10px] text-slate-400">
          ou 12x de R$ {installmentValue}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          id={`btn-cart-${product.id}`}
          type="button"
          onClick={() => onAddToCart(product)}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-xl py-2 flex items-center justify-center gap-1 transition-colors active:scale-98"
        >
          <ShoppingBag className="w-3 h-3 text-slate-600" />
          <span>ADICIONAR</span>
        </button>

        <a
          id={`btn-buy-${product.id}`}
          href={product.paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-xl py-2 flex items-center justify-center gap-1 shadow-xs transition-all active:scale-98"
        >
          <span>COMPRAR</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
