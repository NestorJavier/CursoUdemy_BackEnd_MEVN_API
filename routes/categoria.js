//En este archivo se especifican las rutas que dan acceso a cada una de las funciones de los metodods del controlador
import routerx from 'express-promise-router';
import categoriaController from '../controllers/CategoriaController';
import auth from '../middlewares/auth' 

const router = routerx();//Para poder usar como un objeto el modulo npm i express-promise-router --save
//router.post('/add', auth.verifyAmacenero, categoriaController.add);//Esta ruta nos dara acceso al metodo add que establecimos y exportamos en controllers/CategoriaController
router.post('/add', categoriaController.add);
//el vervo post es un metodo de petición http
router.get('/query', auth.verifyAmacenero, categoriaController.query);
//router.get('/list', auth.verifyAmacenero, categoriaController.list);
router.get('/list', categoriaController.list);
//router.put('/update', auth.verifyAmacenero, categoriaController.update);
router.put('/update', categoriaController.update);
router.delete('/remove', auth.verifyAmacenero, categoriaController.remove);
//router.put('/activate', auth.verifyAmacenero, categoriaController.activate);
router.put('/activate', categoriaController.activate);
//router.put('/deactivate', auth.verifyAmacenero, categoriaController.deactivate);
router.put('/deactivate', categoriaController.deactivate);

export default router;
 