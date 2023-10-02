const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Action' },
    { name: 'Kids' },
    { name: 'Thriller' },
    { name: 'Romance' },
    { name: 'Scifi' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Speed',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'action_speed.png',
      category: categories[0]._id,
      price: 2.99,
      quantity: 500
    },
    {
      name: 'Shangai Knights',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'action_shangaiknights.png',
      category: categories[0]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Shangai Noon',
      category: categories[0]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'action_shangainoon.png',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'who am i',
      category: categories[0]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'action_whoami.png',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Angry Birds',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'kids_angrybirds.png',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Cars',
      category: categories[1]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'kids_cars.png',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Frozen 1',
      category: categories[1]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'kids_frozen1.png',
      price: 199.99,
      quantity: 30
    },
    {
      name: 'Frozen 2',
      category: categories[1]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'kids_frozen2.png',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Ice Age',
      category: categories[1]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'kids_iceage.png',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Rob-b-hood',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'kids_robhood.png',
      price: 2.99,
      quantity: 1000
    },
    {
      name: 'Breaking Bad',
      category: categories[2]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'thriller_breakingbad.png',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Johnwick4',
      category: categories[2]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'thriller_johnwick4.png',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Titanic',
      category: categories[3]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'romance_titanic.png',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Terminator',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'scifi_terminator.png',
      price: 7.99,
      quantity: 100
    },
    {
      name: 'Jurassic Park',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'scifi_jurassicpark.png',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Transformers',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'scifi_transformers.png',
      price: 7.99,
      quantity: 100
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'divya',
    lastName: 'krish',
    email: 'divya@gmail.com',
    password: 'divya123',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'alekhya',
    lastName: 'vinni',
    email: 'alekhya@gmail.com',
    password: 'alekhya123'
  });

  console.log('users seeded');

  process.exit();
});
