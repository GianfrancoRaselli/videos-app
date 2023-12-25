import { Model } from './models';

export interface Video extends Model {
  filename: string;
  originalFilename: string;
  title: string;
  size: number;
  datetime: string;
}
