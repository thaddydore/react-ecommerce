import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Bliss More',
    email: 'blissmore@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Kiki More',
    email: 'kiki@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users;