const express = require('express');
const router = express.Router();
const multer = require('multer');
const projectsController = require('../controllers/projects.controller')
const usersController = require('../controllers/users.controller')
const sessionMiddleware = require('../middlewares/session.middleware')
const uploads = multer({ dest: './public/uploads' });

router.get('/', (req, res) => { res.redirect('/projects') })

router.get('/login', sessionMiddleware.isNotAuthenticated, usersController.login);
router.post('/login', sessionMiddleware.isNotAuthenticated, usersController.doLogin);
router.get('/signup', sessionMiddleware.isNotAuthenticated, usersController.signup);
router.post('/users', sessionMiddleware.isNotAuthenticated, uploads.single('avatar'), usersController.createUser);
router.get('/activate/:token', sessionMiddleware.isNotAuthenticated, usersController.activateUser);
router.post('/logout', sessionMiddleware.isAuthenticated, usersController.logout);
router.get('/projects', sessionMiddleware.isAuthenticated, projectsController.list);
router.get('/projects/:id', sessionMiddleware.isAuthenticated, projectsController.detail);
router.post('/projects/:id/like', sessionMiddleware.isAuthenticated, projectsController.like)
module.exports = router;
