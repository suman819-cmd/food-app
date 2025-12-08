import { Coupon } from '@/types';

export const coupons: Coupon[] = [
  {
    id: '1',
    code: 'FIRSTORDER',
    title: '10.0% OFF',
    discount: 'On all restaurant!',
    minPurchase: 500,
    validFrom: '23 Mar 2025',
    validTo: '31 Dec 2025',
  },
  {
    id: '2',
    code: 'AGAINORDER5',
    title: '5.0% OFF',
    discount: 'On all restaurant!',
    minPurchase: 400,
    validFrom: '13 Nov 2025',
    validTo: '30 Nov 2025',
  },
  {
    id: '3',
    code: 'MISSEDYOU10',
    title: '10.0% OFF',
    discount: 'On all restaurant!',
    minPurchase: 1500,
    validFrom: '13 Nov 2025',
    validTo: '30 Nov 2025',
  },
  {
    id: '4',
    code: 'NIGHTOWL5',
    title: '5.0% OFF',
    discount: 'On all restaurant!',
    minPurchase: 1000,
    validFrom: '13 Nov 2025',
    validTo: '30 Nov 2025',
  },
  {
    id: '5',
    code: 'NPL10',
    title: '10.0% OFF',
    discount: 'On all restaurant!',
    minPurchase: 600,
    validFrom: '17 Nov 2025',
    validTo: '13 Dec 2025',
  },
];
