import { Product } from '../types.ts';

export const PRODUCTS: Product[] = [
  {
    id: 'sp01',
    name: 'CELULARES',
    priceFormatted: 'R$ 11.299,00',
    priceNumeric: 11299.00,
    sku: 'SP01',
    description: 'IPHONE 17 PRO MAX  256GB',
    imageUrl: 'https://a-static.mlcdn.com.br/420x420/apple-iphone-17-pro-max-256gb-laranja-cosmico-69-48mp-ios-5g/magazineluiza/240585900/e9f0cbfda261a9f56c93d5645021b3e2.jpg',
    category: 'CELULARES',
    paymentUrl: 'https://buy.stripe.com/test_4gM28kaQ16tw9iQ2R59IQ00',
    badge: 'Lançamento',
    features: [
      'Tela Super Retina XDR 6.9"',
      'Câmera 48MP Pro de alta precisão',
      'Processador Apple A19 Pro',
      '256 GB de Armazenamento',
      'Conectividade 5G ultrarrápida'
    ]
  },
  {
    id: 'sp02',
    name: 'CARREGADOR',
    priceFormatted: 'R$ 364,99',
    priceNumeric: 364.99,
    sku: 'SP02',
    description: 'CARREGADOR APPLE USB-C',
    imageUrl: 'https://m.magazineluiza.com.br/a-static/420x420/carregador-apple-usb-c-20w-original-cabo-apple-para-recarga-de-60w-com-conector-usb-c-1m/magazineluiza/239231800/ea047e4deeea7a9b4dcfe533636d2349.jpg',
    category: 'CARREGADOR',
    paymentUrl: 'https://buy.stripe.com/test_14A00ccY90589iQ63h9IQ01',
    features: [
      'Adaptador de energia 20W USB-C',
      'Carregamento rápido original Apple',
      'Cabo USB-C de 1 metro incluso',
      'Proteção contra sobretensão e aquecimento'
    ]
  },
  {
    id: 'sp03',
    name: 'FONES DE OUVIDO',
    priceFormatted: 'R$ 2.665,56',
    priceNumeric: 2665.56,
    sku: 'SP03',
    description: 'APPLE AIRPODS PRO3',
    imageUrl: 'https://a-static.mlcdn.com.br/420x420/apple-airpods-pro-3/magazineluiza/240593200/21ec8eb52373126e56a61745f9e8bec9.jpg',
    category: 'FONES DE OUVIDO',
    paymentUrl: 'https://buy.stripe.com/test_14A14gf6h19cgLifDR9IQ02',
    badge: 'Cancelamento Ativo',
    features: [
      'Cancelamento Ativo de Ruído inteligente',
      'Modo Ambiente Adaptativo',
      'Áudio Espacial personalizado com rastreamento',
      'Estojo de recarga MagSafe com conector USB-C'
    ]
  },
  {
    id: 'sp04',
    name: 'CAPINHAS',
    priceFormatted: 'R$ 512,10',
    priceNumeric: 512.10,
    sku: 'SP04',
    description: 'CAPINHA IPHONE 17 PRO MAX',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_960871-MLB98109645059_112025-F-case-silicone-magsafe-capa-iphone-17-pro-max--laranja.webp',
    category: 'ACESSÓRIOS',
    paymentUrl: 'https://buy.stripe.com/test_7sYaEQ4rDaJMbqY1N19IQ03',
    features: [
      'Silicone líquido premium com toque aveludado',
      'Ímãs integrados MagSafe para recarga rápida',
      'Forro interno em microfibra macia',
      'Proteção anti-impacto reforçada nas bordas'
    ]
  },
  {
    id: 'sp05',
    name: 'PELÍCULAS',
    priceFormatted: 'R$ 179,00',
    priceNumeric: 179.00,
    sku: 'SP05',
    description: 'PELÍCULA IPHONE 17 PRO MAX',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_637976-MLA95962343039_102025-F.webp',
    category: 'ACESSÓRIOS',
    paymentUrl: 'https://buy.stripe.com/test_cNicMYgal7xAbqYdvJ9IQ04',
    features: [
      'Vidro temperado japonês 9H ultra resistente',
      'Revestimento oleofóbico anti-marcas e digitais',
      'Alta transparência cristalina HD',
      'Kit de alinhamento e aplicação sem bolhas'
    ]
  },
  {
    id: 'sp06',
    name: 'POWER BANKS',
    priceFormatted: 'R$ 79,90',
    priceNumeric: 79.90,
    sku: 'SP06',
    description: 'BATERIA PORTÁTIL MAGNÉTICA',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_926188-MLB112773983094_062026-F.webp',
    category: 'CARREGADOR',
    paymentUrl: 'https://buy.stripe.com/test_fZu9AM9LX19camU8bp9IQ05',
    badge: 'Oferta Especial',
    features: [
      'Acoplamento magnético tipo MagSafe firme',
      'Design ultra compacto e portátil',
      'Capacidade de recarga emergencial de alto rendimento',
      'Indicadores luminosos de nível de carga'
    ]
  },
  {
    id: 'sp07',
    name: 'CABOS USB-C',
    priceFormatted: 'R$ 132,05',
    priceNumeric: 132.05,
    sku: 'SP 07',
    description: 'CABO USB-C APPLE',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_877618-MLB116676508977_082026-F-cabo-para-iphone-15-16-17-promax-original-60w-usbc-nfe.webp',
    category: 'CARREGADOR',
    paymentUrl: 'https://buy.stripe.com/test_bJedR25vH3hk52AdvJ9IQ06',
    features: [
      'Suporta carregamento rápido de até 60W',
      'Revestimento de tecido trançado reforçado',
      'Compatível com iPhone 15, 16, 17 e MacBooks',
      'Transferência de dados e sincronização ágil'
    ]
  },
  {
    id: 'sp08',
    name: 'SMARTWATCHES',
    priceFormatted: 'R$ 2.555,55',
    priceNumeric: 2555.55,
    sku: 'SP 08',
    description: 'APPLE WATCH SE 3 GPS - 40MM',
    imageUrl: 'https://images.kabum.com.br/produtos/fotos/926040/apple-watch-se-3-gps-caixa-estelar-de-aluminio-de-40-mm-pulseira-esportiva-estelar-tamanho-m-g-meh54am-a_1762367516_gg.jpg',
    category: 'RELÓGIOS',
    paymentUrl: 'https://buy.stripe.com/test_5kQ5kw9LX9FIcv263h9IQ07',
    badge: 'Destaque',
    features: [
      'Caixa de alumínio 40mm cor Estelar',
      'GPS integrado e sensor cardíaco óptico',
      'Resistente à água até 50 metros',
      'Pulseira esportiva estelar macia e ajustável'
    ]
  },
  {
    id: 'sp09',
    name: 'CONCERTO PARA CELULARES',
    priceFormatted: 'R$ 3.282,00',
    priceNumeric: 3282.00,
    sku: 'SP 9',
    description: 'CONSERTO DE TELA IPHONE 17 PRO MAX',
    imageUrl: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fmy-first-iphone-17-pro-screen-repair-v0-ba3a6i2gk8dg1.jpg%3Fwidth%3D640%26crop%3Dsmart%26auto%3Dwebp%26s%3D75089c6d39348d411203a7ee212861cf4d6525fd',
    category: 'CONCERTOS',
    paymentUrl: 'https://buy.stripe.com/test_14A5kwcY9f020Mk63h9IQ08',
    badge: 'Assistência Técnica',
    features: [
      'Substituição de display completo OLED',
      'Calibração e preservação do Face ID e True Tone',
      'Mão de obra especializada com garantia de 90 dias',
      'Vedação original contra poeira e respingos'
    ]
  },
  {
    id: 'sp10',
    name: 'PELÍCULAS PARA A CÂMERA',
    priceFormatted: 'R$ 112,90',
    priceNumeric: 112.90,
    sku: 'SP10',
    description: 'PELÍCULAS CâMERA IPHONE 17 PRO MAX',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_853493-MLA99923228509_112025-F.webp',
    category: 'ACESSÓRIOS',
    paymentUrl: 'https://buy.stripe.com/test_3cI8wI9LX19ceDa1N19IQ09',
    features: [
      'Protetores de lente individuais com aro metálico',
      'Vidro temperado 9H com anti-reflexo',
      'Preserva 100% da nitidez das fotos e vídeos em 4K',
      'Fixação adesiva firme sem deixar resíduos'
    ]
  }
];

export const CATEGORIES = [
  'TODOS',
  'CELULARES',
  'CARREGADOR',
  'FONES DE OUVIDO',
  'ACESSÓRIOS',
  'RELÓGIOS',
  'CONCERTOS'
] as const;
