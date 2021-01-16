import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './model/user.js';
import Product from './model/product.js';
import Order from './model/order.js';
import connectDb from './config/db.js';

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => ({ user: adminUser, ...product }));
    await Product.insertMany(sampleProducts);

    console.log('data imported'.green.inverse);
    process.exit();

  } catch (error) {
    console.error(`ERROR: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log('data destroyed'.red.inverse);
    process.exit();

  } catch (error) {
    console.error(`ERROR: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}