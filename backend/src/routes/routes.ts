import { Request, Response } from 'express';
import authenticationRoutes from './authentication.routes';
import videoRoutes from './video.routes';
// types
import type { HttpErrorCode } from '../helpers/errors.helpers';

// creates routes
export function createRoutes(app) {
  app.get('/', (req: Request, res: Response) => {
    res.json({ data: 'Server listening...' });
  });
  app.use('/authentication', authenticationRoutes);
  app.use('/videos', videoRoutes);
}

// responses

export function getSuccessResponse(data, successCode?: string) {
  return {
    data,
    successCode,
  };
}

export function getErrorResponse(errorCode: HttpErrorCode) {
  return {
    errorCode,
  };
}
