
export type Service = {
  id: string;
  name: string;
  category: 'SEO' | 'Creative' | 'Lifestyle';
  description: string;
  price: number;
  image: string;
  previews: string[];
  paymentLink?: string;
  unit?: 'hr';
  whatsIncluded?: string[];
  goodToKnow?: string[];
  caseStudyIds?: string[];
};

export type CaseStudy = {
    id: string;
    title: string;
    category: string;
    image: string;
    dataAiHint: string;
    description: string;
    link: string;
    status?: 'Live' | 'Archived';
}

export type OrderItem = {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartItem = {
  service: Service;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  status: 'paid' | 'pending' | 'cancelled';
  items: OrderItem[];
  discountCode?: string;
  discountAmount?: number;
  currency?: string;
};

export type Discount = {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
};

export type Currency = 'USD' | 'JMD';

export type ExchangeRates = {
  [key in Currency]: number;
};
