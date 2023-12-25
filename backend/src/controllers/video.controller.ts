import { Request, Response } from 'express';
import { getMetadata } from 'video-metadata-thumbnails';
import { getSuccessResponse } from '../routes/routes';
import { Video } from '../models/models';

export async function getvideos(req: Request, res: Response, next) {
  try {
    const videos = await Video.findAll();
    res.json(getSuccessResponse(videos, 'GET_VIDEOS'));
  } catch (err) {
    next(err);
  }
}

export async function getVideo(req: Request, res: Response, next) {
  try {
    const video = await Video.findOne({ where: { filename: req.params.filename } });
    res.json(getSuccessResponse(video, 'GET_VIDEO'));
  } catch (err) {
    next(err);
  }
}

export async function createVideo(req: Request, res: Response, next) {
  try {
    const video = await Video.create({
      ...req.body,
      filename: req['filename'],
      originalFilename: req.file.originalname.split('.').slice(0, -1).join('.'),
      size: req.file.size,
      datetime: new Date(),
    });
    res.json(getSuccessResponse(video, 'CREATE_VIDEO'));
  } catch (err) {
    next(err);
  }
}

export async function uploadPreview(req: Request, res: Response, next) {
  try {
    const video = await Video.findByPk(req.params.id);
    res.json(getSuccessResponse(video, 'UPLOAD_PREVIEW'));
  } catch (err) {
    next(err);
  }
}
