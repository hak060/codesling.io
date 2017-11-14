import express from 'express';

import {
  authUser,
  createUser,
  userUpdate,
  userDelete,
} from '../controllers/userController';
import {
  slingFetch,
  slingPost,
  slingUpdate,
  slingDelete,
  fetchNewSlingId,
} from '../controllers/slingController';
import {
  slingMsgFetch,
  slingMsgPost,
} from '../controllers/slingMsgController';
import { verifyUserWithJWT } from '../middleware/authentication';

const router = express.Router();

// Authorization route for login
router.route('/users/auth')
  .post(authUser);

// CRUD ops for users
router.route('/users')
  .post(createUser);
router.route('/users/:id')
  .put(userUpdate)
  .delete(userDelete);

// CRUD ops for slings
router.route('/slings/:slingId')
  .get(slingFetch)
  .post(verifyUserWithJWT, slingPost)
  .put(slingUpdate)
  .delete(verifyUserWithJWT, slingDelete);

router.route('/new-sling')
  .get(verifyUserWithJWT, fetchNewSlingId);

router.route('/slings/messages/:slingId')
  .get(slingMsgFetch)
  .post(slingMsgPost);

export default router;
