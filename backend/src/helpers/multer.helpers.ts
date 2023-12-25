import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { httpStatusCodes, httpErrorCodes, throwHttpError } from '../helpers/errors.helpers';

export function getDiskStorageInstance(folder: string, fileExt: 'png' | 'mp4') {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDirectory = `uploads/${folder}`;
      const folderPath = path.resolve(__dirname, '../..', uploadDirectory);
      if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
      cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
      cb(null, `${req['filename']}.${fileExt}`);
    },
  });
}

export function getMulterInstance(storage: multer.StorageEngine, fileType: 'image' | 'video') {
  return multer({
    storage,
    fileFilter: (req, file, next) => {
      try {
        if (file.mimetype.startsWith(`${fileType}/`)) next(null, true);
        else throwHttpError(httpStatusCodes.BAD_REQUEST, httpErrorCodes.INVALID_INPUT_DATA);
      } catch (err) {
        next(err, false);
      }
    },
  });
}
