//En este archivo se especifican las rutas que dan acceso a cada una de las funciones de los metodods del controlador
import routerx from 'express-promise-router';
import ingresoController from '../controllers/IngresoController';
import auth from '../middlewares/auth' 

const router = routerx();//Para poder usar como un objeto el modulo npm i express-promise-router --save
router.post('/add', auth.verifyAmacenero, ingresoController.add);//Esta ruta nos dara acceso al metodo add que establecimos y exportamos en controllers/CategoriaController
//el vervo post es un metodo de petición http
router.get('/query', auth.verifyAmacenero, ingresoController.query);
router.get('/list', auth.verifyAmacenero, ingresoController.list);
router.get('/grafico12meses', auth.verifyUsuario, ingresoController.grafico12Meses);
router.get('/consultaFechas', auth.verifyUsuario, ingresoController.consultaFechas);
/*
router.put('/update', auth.verifyAmacenero, ingresoController.update);
router.delete('/remove', auth.verifyAmacenero, ingresoController.remove);
*/
router.put('/activate', auth.verifyAmacenero, ingresoController.activate);
router.put('/deactivate', auth.verifyAmacenero, ingresoController.deactivate);

export default router;