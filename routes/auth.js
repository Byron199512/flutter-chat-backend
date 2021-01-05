const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { ValidarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
	'/new',
	[
		check('nombre', 'El nombre es obligaotrio').not().isEmpty(),
		check('email', 'El email es obligaotrio').isEmail(),
		check('password', 'El password es obligaotrio').not().isEmpty(),

		ValidarCampos
	],
	crearUsuario
);

router.post(
	'/',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password es obligaotrio').not().isEmpty(),
		ValidarCampos
	],
	login
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;
