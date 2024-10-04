import {
  Burger,
  CoolDrink,
  Drink1,
  Drink2,
  Drink3,
  Drink4,
  Pizza,
  Pizza1,
  Pizza2,
  Pizza3,
  Pizza4,
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
    linkId: 1,
    description:
      'Savor our classic beef patty burger, topped with lettuce, tomato, and cheese.',
  },
  {
    id: 2,
    name: 'Burger With Meat',
    image: Product2,
    rating: 4.3,
    price: 650,
    distance: '15-120',
    type: 'Burger',
    linkId: 2,
    description:
      'Indulge in our juicy beef burger with extra meat, bacon, and cheddar cheese.',
  },
  {
    id: 3,
    name: 'Burger With Fries',
    image: Product3,
    rating: 4.8,
    price: 799,
    distance: '20-25',
    type: 'Burger',
    linkId: 3,
    description:
      'Enjoy our signature burger paired with crispy fries and a side of ketchup.',
  },
  {
    id: 4,
    name: 'Tower Burger',
    image: Product4,
    rating: 4.7,
    price: 999,
    distance: '10-15',
    type: 'Burger',
    linkId: 4,
    description:
      'Stacked high with two beef patties, bacon, and cheese, this burger is a must-try.',
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
    linkId: 5,
    description:
      'Soft shell taco filled with seasoned beef, lettuce, and tomatoes.',
  },
  {
    id: 6,
    name: 'Chicken Taco',
    image: Taco2,
    rating: 4.3,
    price: 450,
    distance: '15-20',
    type: 'Taco',
    linkId: 6,
    description:
      'Grilled chicken, salsa, and avocado come together in this flavorful taco.',
  },
  {
    id: 7,
    name: 'Fish Taco',
    image: Taco3,
    rating: 4.8,
    price: 699,
    distance: '10-15',
    type: 'Taco',
    linkId: 7,
    description:
      "Crispy fish, cabbage, and tartar sauce make this taco a seafood lover's dream.",
  },
  {
    id: 8,
    name: 'Veggie Taco',
    image: Taco4,
    rating: 4.1,
    price: 199,
    distance: '10-15',
    type: 'Taco',
    linkId: 8,
    description:
      'A vegetarian delight with sautéed veggies, guacamole, and salsa.',
  },
  // Drink
  {
    id: 9,
    name: 'Fanta',
    image: Drink1,
    rating: 4.7,
    price: 99,
    distance: '10-15',
    type: 'Drink',
    linkId: 9,
    description:
      'Refresh with a cold Fanta, available in various fruity flavors.',
  },
  {
    id: 10,
    name: '7up',
    image: Drink2,
    rating: 4.3,
    price: 99,
    distance: '10-15',
    type: 'Drink',
    linkId: 10,
    description: 'Clean and crisp, 7up is the perfect companion to your meal.',
  },
  {
    id: 11,
    name: 'Pepsi',
    image: Drink3,
    rating: 4.8,
    price: 99,
    distance: '10-15',
    type: 'Drink',
    linkId: 11,
    description: 'The classic cola taste of Pepsi, perfect for any occasion.',
  },
  {
    id: 12,
    name: 'Coca Cola',
    image: Drink4,
    rating: 4.1,
    price: 99,
    distance: '10-15',
    type: 'Drink',
    linkId: 12,
    description: 'Enjoy the iconic taste of Coca Cola, a timeless favorite.',
  },
  // Pizza
  {
    id: 13,
    name: 'Cheese Pizza',
    image: Pizza1,
    rating: 4.7,
    price: 1299,
    distance: '10-15',
    type: 'Pizza',
    linkId: 13,
    description:
      'Melted mozzarella and parmesan cheese on a crispy crust, perfect for cheese lovers.',
  },
  {
    id: 14,
    name: 'Bar BQ Pizza',
    image: Pizza2,
    rating: 4.3,
    price: 1499,
    distance: '10-15',
    type: 'Pizza',
    linkId: 14,
    description:
      'Tangy BBQ sauce, grilled chicken, and red onion create a flavorful combination.',
  },
  {
    id: 15,
    name: 'Veggie Pizza',
    image: Pizza3,
    rating: 4.8,
    price: 1199,
    distance: '10-15',
    type: 'Pizza',
    linkId: 15,
    description:
      'A colorful mix of vegetables, including bell peppers, onions, and mushrooms.',
  },
  {
    id: 16,
    name: 'Chicken Pizza',
    image: Pizza4,
    rating: 4.1,
    price: 1599,
    distance: '10-15',
    type: 'Pizza',
    linkId: 16,
    description:
      'Grilled chicken, tomato sauce, and mozzarella cheese make for a satisfying pizza.',
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

export const imagesData = [
  {
    id: 1,
    linkId: 1,
    images: [Product1, Product1],
  },
  {
    id: 2,
    linkId: 2,
    images: [Product2, Product2],
  },
  {
    id: 3,
    linkId: 3,
    images: [Product3, Product3],
  },
  {
    id: 4,
    linkId: 4,
    images: [Product4, Product4],
  },
  {
    id: 5,
    linkId: 5,
    images: [Taco1, Taco1],
  },
  {
    id: 6,
    linkId: 6,
    images: [Taco2, Taco2],
  },
  {
    id: 7,
    linkId: 7,
    images: [Taco3, Taco3],
  },
  {
    id: 8,
    linkId: 8,
    images: [Taco4, Taco4],
  },
  {
    id: 9,
    linkId: 9,
    images: [Drink1, Drink1],
  },
  {
    id: 10,
    linkId: 10,
    images: [Drink2, Drink2],
  },
  {
    id: 11,
    linkId: 11,
    images: [Drink3, Drink3],
  },
  {
    id: 12,
    linkId: 12,
    images: [Drink4, Drink4],
  },
  {
    id: 13,
    linkId: 13,
    images: [Pizza1, Pizza1],
  },
  {
    id: 14,
    linkId: 14,
    images: [Pizza2, Pizza2],
  },
  {
    id: 15,
    linkId: 15,
    images: [Pizza3, Pizza3],
  },
  {
    id: 16,
    linkId: 16,
    images: [Pizza4, Pizza4],
  },
];
