import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { GeneralAttributes } from './models';

interface VideoAttributes {
  filename: string;
  originalFilename: string;
  title: string;
  size: number;
  datetime: Date;
}

export interface VideoModel extends GeneralAttributes, VideoAttributes {}

export default sequelize.define<VideoModel>(
  'Video',
  {
    filename: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    originalFilename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'videos',
  },
);
