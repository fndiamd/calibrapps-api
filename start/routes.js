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
Route.post('api/auth/user-cabang-login', 'Auth/UserCabangController.login')
Route.post('api/auth/user-cabang-logout', 'Auth/UserCabangController.logout').middleware(['auth:user'])

// Route Auth User Customer
Route.post('api/auth/customer-login', 'Auth/UserCustomerController.login')
Route.post('api/auth/customer-logout', 'Auth/UserCustomerController.logout').middleware(['auth:customer'])
// Route.post('/api/auth/user-login', 'AuthUserController.login')
// Route.post('/api/auth/user-register', 'AuthUserController.register')

// Routes Broker Status
Route.put('/api/broker-status/:id', 'BrokerStatusController.update')
Route.delete('/api/broker-status/id', 'BrokerStatusController.destroy')
Route.post('/api/broker-status', 'BrokerStatusController.store')
Route.get('/api/broker-status', 'BrokerStatusController.index') 

// Routes Customer Perusahaan
Route.put('/api/customer-perusahaan/:id', 'CustomerPerusahaanController.update')
Route.delete('/api/customer-perusahaan/id', 'CustomerPerusahaanController.destroy')
Route.post('/api/customer-perusahaan', 'CustomerPerusahaanController.store')
Route.get('/api/customer-perusahaan', 'CustomerPerusahaanController.index') 

// Routes Customer Role
Route.put('/api/customer-role/:id', 'CustomerRoleController.update')
Route.delete('/api/customer-role/id', 'CustomerRoleController.destroy')
Route.post('/api/customer-role', 'CustomerRoleController.store')
Route.get('/api/customer-role', 'CustomerRoleController.index') 

// Routes Customer Status
Route.put('/api/customer-status/:id', 'CustomerStatusController.update')
Route.delete('/api/customer-status/id', 'CustomerStatusController.destroy')
Route.post('/api/customer-status', 'CustomerStatusController.store')
Route.get('/api/customer-status', 'CustomerStatusController.index') 

// Routes Kantor Cabang
Route.put('/api/kantor-cabang/:id', 'KantorCabangController.update')
Route.delete('/api/kantor-cabang/id', 'KantorCabangController.destroy')
Route.post('/api/kantor-cabang', 'KantorCabangController.store')
Route.get('/api/kantor-cabang', 'KantorCabangController.index')

// Routes Kantor Status
Route.put('/api/kantor-status/:id', 'KantorStatusController.update')
Route.delete('/api/kantor-status/id', 'KantorStatusController.destroy')
Route.post('/api/kantor-status', 'KantorStatusController.store')
Route.get('/api/kantor-status', 'KantorStatusController.index') 

// Routes List Kalibrasi
Route.put('/api/list-kalibrasi/:id', 'ListKalibrasiController.update')
Route.delete('/api/list-kalibrasi/id', 'ListKalibrasiController.destroy')
Route.post('/api/list-kalibrasi', 'ListKalibrasiController.store')
Route.get('/api/list-kalibrasi', 'ListKalibrasiController.index') 

// Routes Penawaran Order
Route.put('/api/penawaran-order/:id', 'PenawaranOrderController.update')
Route.delete('/api/penawaran-order/id', 'PenawaranOrderController.destroy')
Route.post('/api/penawaran-order', 'PenawaranOrderController.store')
Route.get('/api/penawaran-order', 'PenawaranOrderController.index') 

// Routes Penawaran status
Route.put('/api/penawaran-status/:id', 'PenawaranStatusController.update')
Route.delete('/api/penawaran-status/id', 'PenawaranStatusController.destroy')
Route.post('/api/penawaran-status', 'PenawaranStatusController.store')
Route.get('/api/penawaran-status', 'PenawaranStatusController.index') 

// Routes Perusahaan Broker
Route.put('/api/perusahaan-broker/:id', 'PerusahaanBrokerController.update')
Route.delete('/api/perusahaan-broker/id', 'PerusahaanBrokerController.destroy')
Route.post('/api/perusahaan-broker', 'PerusahaanBrokerController.store')
Route.get('/api/perusahaan-broker', 'PerusahaanBrokerController.index') 

// Routes Ruang Lingkup
Route.put('/api/ruang-lingkup/:id', 'RuangLingkupController.update')
Route.delete('/api/ruang-lingkup/id', 'RuangLingkupController.destroy')
Route.post('/api/ruang-lingkup', 'RuangLingkupController.store')
Route.get('/api/ruang-lingkup', 'RuangLingkupController.index') 

// Routes Standar Kalibrasi
Route.put('/api/standar-kalibrasi/:id', 'StandarKalibrasiController.update')
Route.delete('/api/standar-kalibrasi/id', 'StandarKalibrasiController.destroy')
Route.post('/api/standar-kalibrasi', 'StandarKalibrasiController.store')
Route.get('/api/standar-kalibrasi', 'StandarKalibrasiController.index') 

// Routes Tipe Pengerjaan
Route.put('/api/tipe-pengerjaan/:id', 'TipePengerjaanController.update')
Route.delete('/api/tipe-pengerjaan/id', 'TipePengerjaanController.destroy')
Route.post('/api/tipe-pengerjaan', 'TipePengerjaanController.store')
Route.get('/api/tipe-pengerjaan', 'TipePengerjaanController.index') 

// Routes User Cabang
Route.put('/api/user-cabang/:id', 'UserCabangController.update')
Route.delete('/api/user-cabang/id', 'UserCabangController.destroy')
Route.post('/api/user-cabang', 'UserCabangController.store')
Route.get('/api/user-cabang', 'UserCabangController.index') 

// Routes User Customer
Route.put('/api/user-customer/:id', 'UserCustomerController.update')
Route.delete('/api/user-customer/id', 'UserCustomerController.destroy')
Route.post('/api/user-customer', 'UserCustomerController.store')
Route.get('/api/user-customer', 'UserCustomerController.index') 

// Routes User Role
Route.put('/api/user-role/:id', 'UserRoleController.update')
Route.delete('/api/user-role/id', 'UserRoleController.destroy')
Route.post('/api/user-role', 'UserRoleController.store')
Route.get('/api/user-role', 'UserRoleController.index') 
