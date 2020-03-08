import routerx from 'express-promise-router';
import articuloController from '../controllers/ArticuloController';
import auth from '../middlewares/auth' 

const router = routerx();//Para poder usar como un objeto el modulo npm i express-promise-router --save
router.post('/add', auth.verifyAmacenero, articuloController.add);//Esta ruta nos dara acceso al metodo add que establecimos y exportamos en controllers/articuloController
//el vervo post es un metodo de petición http
router.get('/query', auth.verifyAmacenero, articuloController.query);
router.get('/queryCodigo', auth.verifyUsuario, articuloController.queryCodigo);
router.get('/list', auth.verifyAmacenero, articuloController.list);
router.put('/update', auth.verifyAmacenero, articuloController.update);
router.delete('/remove', auth.verifyAmacenero, articuloController.remove);
router.put('/activate', auth.verifyAmacenero, articuloController.activate);
router.put('/deactivate', auth.verifyAmacenero, articuloController.deactivate);

export default router;
