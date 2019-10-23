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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Routes Kantor Cabang
Route.get('kantor-cabang/get_all_cabang', 'KantorCabangController.index')
Route.get('kantor-cabang/get_cabang/:id', 'KantorCabangController.getById')
Route.post('kantor-cabang/create_cabang', 'KantorCabangController.store')
Route.put('kantor-cabang/update_cabang/:id', 'KantorCabangController.update')
Route.delete('kantor-cabang/delete_cabang/:id', 'KantorCabangController.delete')

// Routes Kantor Status
Route.get('kantor-status/get_all_status', 'KantorStatusController.index')
Route.get('kantor-status/get_status/:id', 'KantorStatusController.getById')
Route.post('kantor-status/create_kantor_status', 'KantorStatusController.store')
Route.put('kantor-status/update_kantor_status/:id', 'KantorStatusController.update')
Route.delete('kantor-status/delete_kantor_status/:id', 'KantorStatusController.delete')
