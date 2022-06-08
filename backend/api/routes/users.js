import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

// This creates the route for URL and call the controller when specific command is found

router.route('/users')
    .get(userController.indexUser)
    .post(userController.saveUser)


router.route('/users/login').post(userController.authUser);

router.route('/users/verify/:id').get(userController.verifyUser);

router.route('/users/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.removeUser);

router.route('/party')
    .get(userController.indexParty)
    .post(userController.saveParty)

router.route('/party/:id')
    .get(userController.getPartyById)
    .put(userController.updateParty)
router.route('/ticket').post(userController.bookTickets)
router.route('/ticket').get(userController.getTickets)

export default router;