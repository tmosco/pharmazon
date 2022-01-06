import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Userone',
      email: 'userone@example.com',
      password: bcrypt.hashSync('userone'),
      isAdmin: true,
    },
    {
      name: 'Usertwo',
      email: 'usertwo@example.com',
      password: bcrypt.hashSync('usertwo'),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: 'Zolat',
      slug: 'zolat',
      category: 'Deworming',
      image: '/images/zolat.jpg',
      price: 300,
      brand: 'emzor',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A drug used to de worm the stomach',
    },
    {
      name: 'Clorec',
      slug: 'clorec',
      category: 'Anti-malaria',
      image: '/images/clorec.jpg',
      price: 700,
      brand: 'p&g',
      rating: 2.5,
      numReviews: 10,
      countInStock: 50,
      description: 'An anti malaria drug',
    },
    {
      name: 'Bunto',
      slug: 'bunto',
      category: 'Blood-Tonic',
      image: '/images/bunto.jpg',
      price: 1300,
      brand: 'm&b',
      rating: 2.5,
      numReviews: 8,
      countInStock: 48,
      description: 'A blood nourisher',
    },
    {
      name: 'Vitamin C',
      slug: 'vitamin-c',
      category: 'Vitamins',
      image: '/images/vitamin-c.jpg',
      price: 250,
      brand: 'collar',
      rating: 3.5,
      numReviews: 5,
      countInStock: 5,
      description: 'A vitamin drug',
    },
    {
      name: 'Loxagyl',
      slug: 'loxagyl',
      category: 'Pain reliever',
      image: '/images/loxagyl.jpg',
      price: 100,
      brand: 'palaz',
      rating: 4.5,
      numReviews: 10,
      countInStock: 250,
      description: 'A sex enhancer for men',
    },
  ],
};

export default data;
