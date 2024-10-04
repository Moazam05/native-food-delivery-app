import {
  Burger,
  CoolDrink,
  Pizza,
  Product1,
  Product2,
  Product3,
  Product4,
  Taco,
  Taco1,
  Taco2,
  Taco3,
  Taco4,
} from '../assets/images';

export const onboarding = [
  {
    id: 1,
    title: 'We serve incomparable delicacies',
    description:
      'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!',
  },
  {
    id: 2,
    title: 'We deliver your order in no time',
    description:
      'We deliver your order in no time, we are the fastest delivery service in the city.',
  },
  {
    id: 3,
    title: 'We serve incomparable delicacies',
    description:
      'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!',
  },
];

export const ProductsData = [
  {
    id: 1,
    name: 'Ordinary Burger',
    image: Product1,
    rating: 4.5,
    price: 499,
    distance: '5-10',
    type: 'Burger',
  },
  {
    id: 2,
    name: 'Burger With Meat',
    image: Product2,
    rating: 4.3,
    price: 650,
    distance: '15-120',
    type: 'Burger',
  },
  {
    id: 3,
    name: 'Burger Witt Fries',
    image: Product3,
    rating: 4.8,
    price: 799,
    distance: '20-25',
    type: 'Burger',
  },
  {
    id: 4,
    name: 'Tower Burger',
    image: Product4,
    rating: 4.7,
    price: 999,
    distance: '10-15',
    type: 'Burger',
  },
  // Taco
  {
    id: 5,
    name: 'Beef Taco',
    image: Taco1,
    rating: 4.7,
    price: 299,
    distance: '10-15',
    type: 'Taco',
  },
  {
    id: 6,
    name: 'Chicken Taco',
    image: Taco2,
    rating: 4.3,
    price: 450,
    distance: '15-20',
    type: 'Taco',
  },
  {
    id: 7,
    name: 'Fish Taco',
    image: Taco3,
    rating: 4.8,
    price: 699,
    distance: '10-15',
    type: 'Taco',
  },
  {
    id: 8,
    name: 'Veggie Taco',
    image: Taco4,
    rating: 4.1,
    price: 199,
    distance: '10-15',
    type: 'Taco',
  },
];

export const categoriesData = [
  {
    id: 1,
    name: 'Burger',
    image: Burger,
  },
  {
    id: 2,
    name: 'Taco',
    image: Taco,
  },
  {
    id: 3,
    name: 'Drink',
    image: CoolDrink,
  },
  {
    id: 4,
    name: 'Pizza',
    image: Pizza,
  },
];
