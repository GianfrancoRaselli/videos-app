import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { GeneralAttributes } from './models';

interface UserAttributes {
  username: string;
  password: string;
  fullname: string;
}

export interface UserModel extends GeneralAttributes, UserAttributes {}

export default sequelize.define<UserModel>(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
  },
  {
    tableName: 'users',
  },
);
