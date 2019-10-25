'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Routes Auth User Cabang
Route.post('/api/auth/user-login', 'AuthUserController.login')
Route.post('/api/auth/user-register', 'AuthUserController.register')

// Routes Kantor Cabang
Route.get('api/kantor-cabang', 'KantorCabangController.index')
Route.get('api/kantor-cabang/:id', 'KantorCabangController.getById')
Route.post('api/kantor-cabang', 'KantorCabangController.store')
Route.put('api/kantor-cabang/:id', 'KantorCabangController.update')
Route.delete('api/kantor-cabang/:id', 'KantorCabangController.delete')

// Routes Kantor Status
Route.get('api/kantor-status', 'KantorStatusController.index')
Route.get('api/kantor-status/:id', 'KantorStatusController.getById')
Route.post('api/kantor-status', 'KantorStatusController.store')
Route.put('api/kantor-status/:id', 'KantorStatusController.update')
Route.delete('api/kantor-status/:id', 'KantorStatusController.delete')

// Routes User Cabang
Route.get('api/user-cabang', 'UserCabangController.index')
Route.get('api/user-cabang/:id', 'UserCabangController.getById')
Route.post('api/user-cabang', 'UserCabangController.store')
Route.put('api/user-cabang/:id', 'UserCabangController.update')
Route.delete('api/user-cabang/:id', 'UserCabangController.delete')

// Routes User Cabang Role
Route.get('api/user-cabang-role', 'UserRoleController.index')
Route.get('api/user-cabang-role/:id', 'UserRoleController.getById')
Route.post('api/user-cabang-role', 'UserRoleController.store')
Route.put('api/user-cabang-role/:id', 'UserRoleController.update')
Route.delete('api/user-cabang-role/:id', 'UserRoleController.delete')

// Route Customer Status
Route.get('api/customer-perusahaan-status', 'CustomerStatusController.index')
Route.get('api/customer-perusahaan-status/:id', 'CustomerStatusController.getById')
Route.post('api/customer-perusahaan-status', 'CustomerStatusController.store')
Route.put('api/customer-perusahaan-status/:id', 'CustomerStatusController.update')
Route.delete('api/customer-perusahaan-status/:id', 'CustomerStatusController.delete')

// Route Perusahaan Customer
Route.get('api/customer-perusahaan', 'CustomerPerusahaanController.index')
Route.get('api/customer-perusahaan/:id', 'CustomerPerusahaanController.getById')
Route.post('api/customer-perusahaan', 'CustomerPerusahaanController.store')
Route.put('api/customer-perusahaan/:id', 'CustomerPerusahaanController.update')
Route.delete('api/customer-perusahaan/:id', 'CustomerPerusahaanController.delete')

// Route Customer Role
Route.get('api/customer-role', 'CustomerRoleController.index')
Route.get('api/customer-role/:id', 'CustomerRoleController.getById')
Route.post('api/customer-role', 'CustomerRoleController.store')
Route.put('api/customer-role/:id', 'CustomerRoleController.update')
Route.delete('api/customer-role/:id', 'CustomerRoleController.delete')