import { Request, Response, Router } from 'express';
import { validateInputs } from '../validations/validations';
import { authenticationBodyValidation } from '../validations/authentication.validations';
import { userLogin, validateUserAccessToken } from '../controllers/authentication.controller';

const router = Router();

// routes
router.post(
  '/userLogin',
  async (req: Request, res: Response, next) => {
    try {
      // validate inputs
      req.body = validateInputs(authenticationBodyValidation, req.body);
      // go ahead
      next();
    } catch (err) {
      next(err);
    }
  },
  userLogin,
);
router.get('/validateUserAccessToken', validateUserAccessToken);

export default router;
