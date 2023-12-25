import express, { Request, Response, Router } from 'express';
import path from 'path';
import { verifyAccess } from '../helpers/authentication.helpers';
import { validateInputs, idParamValidation } from '../validations/validations';
import { httpStatusCodes, httpErrorCodes, throwHttpError } from '../helpers/errors.helpers';
import { getDiskStorageInstance, getMulterInstance } from '../helpers/multer.helpers';
import { getRandomString } from '../helpers/random.helpers';
import { createVideoBodyValidation } from '../validations/video.validations';
import { getvideos, getVideo, createVideo, uploadPreview } from '../controllers/video.controller';
import { Video } from '../models/models';

const router = Router();

// routes
router.get(
  '',
  async (req: Request, res: Response, next) => {
    try {
      // verify access
      await verifyAccess(req['currentUser']);
      // go ahead
      next();
    } catch (err) {
      next(err);
    }
  },
  getvideos,
);
router.get(
  '/:filename',
  async (req: Request, res: Response, next) => {
    try {
      // verify access
      await verifyAccess(req['currentUser']);
      // go ahead
      next();
    } catch (err) {
      next(err);
    }
  },
  getVideo,
);
router.post(
  '',
  async (req: Request, res: Response, next) => {
    try {
      // verify access
      await verifyAccess(req['currentUser']);
      // set filename
      req['filename'] = getRandomString(30);
      // go ahead
      next();
    } catch (err) {
      next(err);
    }
  },
  getMulterInstance(getDiskStorageInstance('videos', 'mp4'), 'video').single('video'),
  async (req: Request, res: Response, next) => {
    try {
      // validate inputs
      if (!req.file) throwHttpError(httpStatusCodes.BAD_REQUEST, httpErrorCodes.INVALID_INPUT_DATA);
      req.body = validateInputs(createVideoBodyValidation, req.body);
      // go ahead
      next();
    } catch (err) {
      next(err);
    }
  },
  createVideo,
);
router.use(
  '/display',
  async (req: Request, res: Response, next) => {
    try {
      // verify access
      // await verifyAccess(req['currentUser']);
      // go ahead
      next();
    } catch (err) {
      next(err);
    }
  },
  express.static(path.join(__dirname, '../../uploads/videos')),
);
router.post(
  '/:id',
  async (req: Request, res: Response, next) => {
    try {
      // verify access
      await verifyAccess(req['currentUser']);
      // validate inputs
      validateInputs(idParamValidation, { id: req.params.id });
      // set filename
      const video = await Video.findByPk(req.params.id);
      if (!video) throwHttpError(httpStatusCodes.NOT_FOUND, httpErrorCodes.ENTITY_NOT_FOUND);
      req['filename'] = video.filename;
      // go ahead
      next();
    } catch (err) {
      next(err);
    }
  },
  getMulterInstance(getDiskStorageInstance('images', 'png'), 'image').single('image'),
  async (req: Request, res: Response, next) => {
    try {
      // validate inputs
      if (!req.file) throwHttpError(httpStatusCodes.BAD_REQUEST, httpErrorCodes.INVALID_INPUT_DATA);
      // go ahead
      next();
    } catch (err) {
      next(err);
    }
  },
  uploadPreview,
);
router.use(
  '/preview',
  async (req: Request, res: Response, next) => {
    try {
      // verify access
      // await verifyAccess(req['currentUser']);
      // go ahead
      next();
    } catch (err) {
      next(err);
    }
  },
  express.static(path.join(__dirname, '../../uploads/images')),
);

export default router;
