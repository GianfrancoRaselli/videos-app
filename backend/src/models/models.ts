import { Model } from 'sequelize';

export interface GeneralAttributes extends Model {
  id: number;
}

// import all models
import User from './user.model';
import Video from './video.model';

export { User, Video };
