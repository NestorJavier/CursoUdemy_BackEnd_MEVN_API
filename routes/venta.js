//En este archivo se especifican las rutas que dan acceso a cada una de las funciones de los metodods del controlador
import routerx from 'express-promise-router';
import ventaController from '../controllers/VentaController';
import auth from '../middlewares/auth' 

const router = routerx();//Para poder usar como un objeto el modulo npm i express-promise-router --save
router.post('/add', auth.verifyVendedor, ventaController.add);//Esta ruta nos dara acceso al metodo add que establecimos y exportamos en controllers/CategoriaController
//el vervo post es un metodo de petición http
router.get('/query', auth.verifyVendedor, ventaController.query);
router.get('/list', auth.verifyVendedor, ventaController.list);
router.get('/grafico12meses', auth.verifyUsuario, ventaController.grafico12Meses);
router.get('/consultaFechas', auth.verifyUsuario, ventaController.consultaFechas);
/*
router.put('/update', auth.verifyAmacenero, ventaController.update);
router.delete('/remove', auth.verifyAmacenero, ventaController.remove);
*/
router.put('/activate', auth.verifyVendedor, ventaController.activate);
router.put('/deactivate', auth.verifyVendedor, ventaController.deactivate);

export default router;