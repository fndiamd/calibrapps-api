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

// Routes Barang Kalibrasi
Route.put('/api/barang-kalibrasi/:id', 'BarangKalibrasiController.update')
Route.delete('/api/barang-kalibrasi/;id', 'BarangKalibrasiController.delete')
Route.post('/api/barang-kalibrasi', 'BarangKalibrasiController.store')
Route.get('/api/barang-kalibrasi', 'BarangKalibrasiController.index') 

// Routes Barang Status
Route.put('/api/barang-status/:id', 'BarangStatusController.update')
Route.delete('/api/barang-status/:id', 'BarangStatusController.delete')
Route.post('/api/barang-status', 'BarangStatusController.store')
Route.get('/api/barang-status', 'BarangStatusController.index') 

// Routes Broker Status
Route.put('/api/broker-status/:id', 'BrokerStatusController.update')
Route.delete('/api/broker-status/:id', 'BrokerStatusController.delete')
Route.post('/api/broker-status', 'BrokerStatusController.store')
Route.get('/api/broker-status', 'BrokerStatusController.index') 

// Routes Customer Perusahaan
Route.put('/api/customer-perusahaan/:id', 'CustomerPerusahaanController.update')
Route.delete('/api/customer-perusahaan/:id', 'CustomerPerusahaanController.delete')
Route.post('/api/customer-perusahaan', 'CustomerPerusahaanController.store')
Route.get('/api/customer-perusahaan', 'CustomerPerusahaanController.index') 

// Routes Customer Role
Route.put('/api/customer-role/:id', 'CustomerRoleController.update')
Route.delete('/api/customer-role/:id', 'CustomerRoleController.delete')
Route.post('/api/customer-role', 'CustomerRoleController.store')
Route.get('/api/customer-role', 'CustomerRoleController.index') 

// Routes Customer Status
Route.put('/api/customer-status/:id', 'CustomerStatusController.update')
Route.delete('/api/customer-status/:id', 'CustomerStatusController.delete')
Route.post('/api/customer-status', 'CustomerStatusController.store')
Route.get('/api/customer-status', 'CustomerStatusController.index') 

// Routes Data Pengamatan
Route.put('/api/data-pengamatan/:id', 'DataPengamatanController.update')
Route.delete('/api/data-pengamatan/:id', 'DataPengamatanController.delete')
Route.post('/api/data-pengamatan', 'DataPengamatanController.store')
Route.get('/api/data-pengamatan', 'DataPengamatanController.index') 

// Routes Data Ukur
Route.put('/api/data-ukur/:id', 'DataUkurController.update')
Route.delete('/api/data-ukur/:id', 'DataUkurController.delete')
Route.post('/api/data-ukur', 'DataUkurController.store')
Route.get('/api/data-ukur', 'DataUkurController.index') 

// Routes Invoice Order
Route.put('/api/invoice-order/:id', 'InvoiceOrderController.update')
Route.delete('/api/invoice-order/:id', 'InvoiceOrderController.delete')
Route.post('/api/invoice-order', 'InvoiceOrderController.store')
Route.get('/api/invoice-order', 'InvoiceOrderController.index') 

// Routes Invoice Status
Route.put('/api/invoice-status/:id', 'InvoiceStatusController.update')
Route.delete('/api/invoice-status/:id', 'InvoiceStatusController.delete')
Route.post('/api/invoice-status', 'InvoiceStatusController.store')
Route.get('/api/invoice-status', 'InvoiceStatusController.index') 

// Routes Kantor Cabang
Route.put('/api/kantor-cabang/:id', 'KantorCabangController.update')
Route.delete('/api/kantor-cabang/:id', 'KantorCabangController.delete')
Route.post('/api/kantor-cabang', 'KantorCabangController.store')
Route.get('/api/kantor-cabang', 'KantorCabangController.index')

// Routes Kantor Status
Route.put('/api/kantor-status/:id', 'KantorStatusController.update')
Route.delete('/api/kantor-status/:id', 'KantorStatusController.delete')
Route.post('/api/kantor-status', 'KantorStatusController.store')
Route.get('/api/kantor-status', 'KantorStatusController.index') 

// Routes List Kalibrasi
Route.put('/api/list-kalibrasi/:id', 'ListKalibrasiController.update')
Route.delete('/api/list-kalibrasi/:id', 'ListKalibrasiController.delete')
Route.post('/api/list-kalibrasi', 'ListKalibrasiController.store')
Route.get('/api/list-kalibrasi', 'ListKalibrasiController.index') 

// Routes Merk Barang
Route.put('/api/merk-barang/:id', 'MerkBarangController.update')
Route.delete('/api/merk-barang/:id', 'MerkBarangController.delete')
Route.post('/api/merk-barang', 'MerkBarangController.store')
Route.get('/api/merk-barang', 'MerkBarangController.index') 

// Routes Order Detail
Route.put('/api/order-detail/:id', 'OrderDetailController.update')
Route.delete('/api/order-detail/:id', 'OrderDetailController.delete')
Route.post('/api/order-detail', 'OrderDetailController.store')
Route.get('/api/order-detail', 'OrderDetailController.index') 

// Routes Order Status
Route.put('/api/order-status/:id', 'OrderStatusController.update')
Route.delete('/api/order-status/:id', 'OrderStatusController.delete')
Route.post('/api/order-status', 'OrderStatusController.store')
Route.get('/api/order-status', 'OrderStatusController.index') 

// Routes Penawaran Order
Route.put('/api/penawaran-order/:id', 'PenawaranOrderController.update')
Route.delete('/api/penawaran-order/:id', 'PenawaranOrderController.delete')
Route.post('/api/penawaran-order', 'PenawaranOrderController.store')
Route.get('/api/penawaran-order', 'PenawaranOrderController.index') 

// Routes Penawaran status
Route.put('/api/penawaran-status/:id', 'PenawaranStatusController.update')
Route.delete('/api/penawaran-status/:id', 'PenawaranStatusController.delete')
Route.post('/api/penawaran-status', 'PenawaranStatusController.store')
Route.get('/api/penawaran-status', 'PenawaranStatusController.index') 

// Routes Perusahaan Broker
Route.put('/api/perusahaan-broker/:id', 'PerusahaanBrokerController.update')
Route.delete('/api/perusahaan-broker/:id', 'PerusahaanBrokerController.delete')
Route.post('/api/perusahaan-broker', 'PerusahaanBrokerController.store')
Route.get('/api/perusahaan-broker', 'PerusahaanBrokerController.index') 

// Routes Posisi Ukur
Route.put('/api/posisi-ukur/:id', 'PosisiUkurController.update')
Route.delete('/api/posisi-ukur/:id', 'PosisiUkurController.delete')
Route.post('/api/posisi-ukur', 'PosisiUkurController.store')
Route.get('/api/posisi-ukur', 'PosisiUkurController.index') 

// Routes Progres Order
Route.put('/api/progres-order/:id', 'ProgresOrderController.update')
Route.delete('/api/progres-order/:id', 'ProgresOrderController.delete')
Route.post('/api/progres-order', 'ProgresOrderController.store')
Route.get('/api/progres-order', 'ProgresOrderController.index') 

// Routes Ruang Lingkup
Route.put('/api/ruang-lingkup/:id', 'RuangLingkupController.update')
Route.delete('/api/ruang-lingkup/:id', 'RuangLingkupController.delete')
Route.post('/api/ruang-lingkup', 'RuangLingkupController.store')
Route.get('/api/ruang-lingkup', 'RuangLingkupController.index') 

// Routes Satuan Sensor
Route.put('/api/satuan-sensor/:id', 'SatuanSensorController.update')
Route.delete('/api/satuan-sensor/:id', 'SatuanSensorController.delete')
Route.post('/api/satuan-sensor', 'SatuanSensorController.store')
Route.get('/api/satuan-sensor', 'SatuanSensorController.index') 

// Routes Sensor
Route.put('/api/sensor/:id', 'SensorController.update')
Route.delete('/api/sensor/:id', 'SensorController.delete')
Route.post('/api/sensor', 'SensorController.store')
Route.get('/api/sensor', 'SensorController.index') 

// Routes Seq Data Ukur
Route.put('/api/seq-data-ukur/:id', 'SeqDataUkurController.update')
Route.delete('/api/seq-data-ukur/:id', 'SeqDataUkurController.delete')
Route.post('/api/seq-data-ukur', 'SeqDataUkurController.store')
Route.get('/api/seq-data-ukur', 'SeqDataUkurController.index') 

// Routes Standar Kalibrasi
Route.put('/api/standar-kalibrasi/:id', 'StandarKalibrasiController.update')
Route.delete('/api/standar-kalibrasi/:id', 'StandarKalibrasiController.delete')
Route.post('/api/standar-kalibrasi', 'StandarKalibrasiController.store')
Route.get('/api/standar-kalibrasi', 'StandarKalibrasiController.index') 

// Routes Status Pengamatan
Route.put('/api/status-pengamatan/:id', 'StatusPengamatanController.update')
Route.delete('/api/status-pengamatan/:id', 'StatusPengamatanController.delete')
Route.post('/api/status-pengamatan', 'StatusPengamatanController.store')
Route.get('/api/status-pengamatan', 'StatusPengamatanController.index') 

// Routes Tipe Pengerjaan
Route.put('/api/tipe-pengerjaan/:id', 'TipePengerjaanController.update')
Route.delete('/api/tipe-pengerjaan/:id', 'TipePengerjaanController.delete')
Route.post('/api/tipe-pengerjaan', 'TipePengerjaanController.store')
Route.get('/api/tipe-pengerjaan', 'TipePengerjaanController.index') 

// Routes Transaksi Broker
Route.put('/api/transaksi-broker/:id', 'TransaksiBrokerController.update')
Route.delete('/api/transaksi-broker/:id', 'TransaksiBrokerController.delete')
Route.post('/api/transaksi-broker', 'TransaksiBrokerController.store')
Route.get('/api/transaksi-broker', 'TransaksiBrokerController.index') 

// Routes Transaksi Broker Status
Route.put('/api/transaksi-broker-status/:id', 'TransaksiBrokerStatusController.update')
Route.delete('/api/transaksi-broker-status/:id', 'TransaksiBrokerStatusController.delete')
Route.post('/api/transaksi-broker-status', 'TransaksiBrokerStatusController.store')
Route.get('/api/transaksi-broker-status', 'TransaksiBrokerStatusController.index') 

// Routes Unsur Kaji Ulang
Route.put('/api/unsur-kajiulang/:id', 'UnsurKajiUlangController.update')
Route.delete('/api/unsur-kajiulang/:id', 'UnsurKajiUlangController.delete')
Route.post('/api/unsur-kajiulang', 'UnsurKajiUlangController.store')
Route.get('/api/unsur-kajiulang', 'UnsurKajiUlangController.index') 

// Routes Unsur Kalibrasi
Route.put('/api/unsur-kalibrasi/:id', 'UnsurKalibrasiController.update')
Route.delete('/api/unsur-kalibrasi/:id', 'UnsurKalibrasiController.delete')
Route.post('/api/unsur-kalibrasi', 'UnsurKalibrasiController.store')
Route.get('/api/unsur-kalibrasi', 'UnsurKalibrasiController.index') 

// Routes User Cabang
Route.put('/api/user-cabang/:id', 'UserCabangController.update')
Route.delete('/api/user-cabang/:id', 'UserCabangController.delete')
Route.post('/api/user-cabang', 'UserCabangController.store')
Route.get('/api/user-cabang', 'UserCabangController.index') 

// Routes User Customer
Route.put('/api/user-customer/:id', 'UserCustomerController.update')
Route.delete('/api/user-customer/:id', 'UserCustomerController.delete')
Route.post('/api/user-customer', 'UserCustomerController.store')
Route.get('/api/user-customer', 'UserCustomerController.index') 

// Routes User Role
Route.put('/api/user-role/:id', 'UserRoleController.update')
Route.delete('/api/user-role/:id', 'UserRoleController.delete')
Route.post('/api/user-role', 'UserRoleController.store')
Route.get('/api/user-role', 'UserRoleController.index') 
