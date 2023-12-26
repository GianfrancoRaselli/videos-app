import { Sequelize } from 'sequelize';
import { configStr } from '../config';
import { encryptPassword } from '../helpers/hashing.helpers';

export const sequelize = new Sequelize(
  configStr('DATABASE_DATABASE'),
  configStr('DATABASE_USERNAME'),
  configStr('DATABASE_PASSWORD'),
  {
    host: configStr('DATABASE_HOST'),
    dialect: 'mysql',
    pool: {
      min: 2,
      max: 10,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
    },
    logging: false,
  },
);

import { User } from '../models/models';
export async function createDB() {
  await sequelize.sync();
  createUser();
}

async function createUser() {
  if (!(await User.findOne({ where: { username: configStr('DATABASE_USER_USERNAME') } })))
    User.create({
      username: configStr('DATABASE_USER_USERNAME'),
      password: await encryptPassword(configStr('DATABASE_USER_PASSWORD')),
      fullname: 'VideoTranslatorAI',
    });
}
