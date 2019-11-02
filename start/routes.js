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


Route.group(() => {
    // Auth User Cabang
    Route.post('user-cabang-login', 'Auth/UserCabangController.login')
    Route.post('user-cabang-logout', 'Auth/UserCabangController.logout').middleware(['auth:user'])
    
    // Auth User Customer
    Route.post('customer-login', 'Auth/UserCustomerController.login')
    Route.post('customer-logout', 'Auth/UserCustomerController.logout').middleware(['auth:customer'])
    Route.post('customer-register', 'Auth/UserCustomerController.register')
    Route.post('customer-sendmail', 'Auth/UserCustomerController.sendingEmail')
    Route.get('account-verification/:token', 'Auth/UserCustomerController.accountVerification')
}).prefix('api/auth')

Route.group(() => {
    // Routes Barang Kalibrasi
    Route.get('barang-kalibrasi', 'BarangKalibrasiController.index')
    Route.get('barang-kalibrasi/:id', 'BarangKalibrasiController.view')
    Route.get('barang-kalibrasi-pagination', 'BarangKalibrasiController.pagination')
    
    // Routes Barang Status
    Route.get('barang-status', 'BarangStatusController.index')
    Route.get('barang-status/:id', 'BarangStatusController.show')
    Route.get('barang-status-pagination', 'BarangStatusController.pagination')
    
    // Routes Broker Status
    Route.get('broker-status', 'BrokerStatusController.index')
    Route.get('broker-status/:id', 'BrokerStatusController.view')
    
    // Routes Customer Perusahaan
    Route.get('customer-perusahaan', 'CustomerPerusahaanController.index')
    Route.get('customer-perusahaan/:id', 'CustomerPerusahaanController.view')
    Route.get('customer-perusahaan-pagination', 'CustomerPerusahaanController.pagination')
    
    // Routes Customer Role
    Route.get('customer-role', 'CustomerRoleController.index')
    Route.get('customer-role/:id', 'CustomerRoleController.view')
    
    // Routes Customer Status
    Route.get('customer-status', 'CustomerStatusController.index')
    Route.get('customer-status/:id', 'CustomerStatusController.view')
    
    // Routes Data Pengamatan
    Route.get('data-pengamatan', 'DataPengamatanController.index')
    Route.get('data-pengamatan/:id', 'DataPengamatanController.view')
    Route.get('data-pengamatan-pagination', 'DataPengamatanController.pagination')
    
    // Routes Data Ukur
    Route.get('data-ukur', 'DataUkurController.index')
    Route.get('data-ukur/:id', 'DataUkurController.view')
    Route.get('data-ukur-pagination', 'DataUkurController.pagination')
    
    // Routes Invoice Order
    Route.get('invoice-order', 'InvoiceOrderController.index')
    Route.get('invoice-order/:id', 'InvoiceOrderController.view')
    Route.get('invoice-order-pagination', 'InvoiceOrderController.pagination')

    // Routes Invoice Status
    Route.get('invoice-status', 'InvoiceStatusController.index')
    Route.get('invoice-status/:id', 'InvoiceStatusController.view')
    
    // Routes Kantor Cabang
    Route.get('kantor-cabang', 'KantorCabangController.index')
    Route.get('kantor-cabang/:id', 'KantorCabangController.view')
    Route.get('kantor-cabang-pagination', 'KantorCabangController.pagination')
    
    // Routes Kantor Status
    Route.get('kantor-status', 'KantorStatusController.index')
    Route.get('kantor-status/:id', 'KantorStatusController.view')
    
    // Route List Kalibrasi
    Route.get('list-kalibrasi', 'ListKalibrasiController.index')
    Route.get('list-kalibrasi/:id', 'ListKalibrasiController.view')
    
    // Routes Merk Barang
    Route.get('merk-barang', 'MerkBarangController.index')
    Route.get('merk-barang/:id', 'MerkBarangController.view')
    
    // Routes Order Detail
    Route.get('order-detail', 'OrderDetailController.index')
    Route.get('order-detail/:id', 'OrderDetailController.view')
    
    // Routes Order Status
    Route.get('order-status', 'OrderStatusController.index')
    Route.get('order-status/:id', 'OrderStatusController.view')
    
    // Routes Penawaran Order
    Route.get('penawaran-order', 'PenawaranOrderController.index')
    
    // Routes Penawaran status
    Route.get('penawaran-status', 'PenawaranStatusController.index')
    
    // Routes Perusahaan Broker
    Route.get('perusahaan-broker', 'PerusahaanBrokerController.index')
    
    // Routes Posisi Ukur
    Route.get('posisi-ukur', 'PosisiUkurController.index')
    
    // Routes Progres Order
    Route.get('progres-order', 'ProgresOrderController.index')
    
    // Routes Ruang Lingkup
    Route.get('ruang-lingkup', 'RuangLingkupController.index')
    
    // Routes Satuan Sensor
    Route.get('satuan-sensor', 'SatuanSensorController.index')
    
    // Routes Sensor
    Route.get('sensor', 'SensorController.index')
    
    // Routes Seq Data Ukur
    Route.get('seq-data-ukur', 'SeqDataUkurController.index')
    
    // Routes Standar Kalibrasi
    Route.get('standar-kalibrasi', 'StandarKalibrasiController.index')
    
    // Routes Status Pengamatan
    Route.get('status-pengamatan', 'StatusPengamatanController.index')
    
    // Routes Tipe Pengerjaan
    Route.get('tipe-pengerjaan', 'TipePengerjaanController.index')
    
    // Routes Transaksi Broker
    Route.get('transaksi-broker', 'TransaksiBrokerController.index')
    
    // Routes Transaksi Broker Status
    Route.get('transaksi-broker-status', 'TransaksiBrokerStatusController.index')
    // Routes Unsur Kaji Ulang
    Route.get('unsur-kajiulang', 'UnsurKajiUlangController.index')
    // Routes Unsur Kalibrasi
    Route.get('unsur-kalibrasi', 'UnsurKalibrasiController.index')
    // Routes User Cabang
    Route.get('user-cabang', 'UserCabangController.index')
    Route.get('user-cabang/:id', 'UserCabangController.view')
    Route.get('user-cabang-pagination', 'UserCabangController.pagination')
    // Routes User Customer
    Route.get('user-customer', 'UserCustomerController.index')
    Route.get('user-customer/:id', 'UserCustomerController.view')
    Route.get('user-customer-pagination', 'UserCustomerController.pagination')
    // Routes User Role
    Route.get('user-role', 'UserRoleController.index')


    Route.post('user-cabang', 'UserCabangController.store')
    Route.post('kantor-cabang', 'KantorCabangController.store')
    Route.post('user-role', 'UserRoleController.store')
    Route.post('kantor-status', 'KantorStatusController.store')
    
}).prefix('api')

Route.group(() => {
    // Routes with Middleware
    // Routes barang kalibrasi
    Route.put('barang-kalibrasi/:id', 'BarangKalibrasiController.update')
    Route.delete('barang-kalibrasi/;id', 'BarangKalibrasiController.delete')
    Route.post('barang-kalibrasi', 'BarangKalibrasiController.store')

    // Routes customer role
    Route.put('customer-role/:id', 'CustomerRoleController.update')
    Route.delete('customer-role/:id', 'CustomerRoleController.delete')
    Route.post('customer-role', 'CustomerRoleController.store')

    // Routes user role
    Route.put('user-role/:id', 'UserRoleController.update')
    Route.delete('user-role/:id', 'UserRoleController.delete')

    // Routes user customer 
    Route.put('user-customer/:id', 'UserCustomerController.update')
    Route.delete('user-customer/:id', 'UserCustomerController.delete')
    Route.post('user-customer', 'UserCustomerController.store')

    // Routes user cabang
    Route.put('user-cabang/:id', 'UserCabangController.update')
    Route.delete('user-cabang/:id', 'UserCabangController.delete')
    

    // Routes unsur kalibrasi
    Route.put('unsur-kalibrasi/:id', 'UnsurKalibrasiController.update')
    Route.delete('unsur-kalibrasi/:id', 'UnsurKalibrasiController.delete')
    Route.post('unsur-kalibrasi', 'UnsurKalibrasiController.store')

    // Routes unsur kaji ulang
    Route.put('unsur-kajiulang/:id', 'UnsurKajiUlangController.update')
    Route.delete('unsur-kajiulang/:id', 'UnsurKajiUlangController.delete')
    Route.post('unsur-kajiulang', 'UnsurKajiUlangController.store')

    // Routes transaksi broker status
    Route.put('transaksi-broker-status/:id', 'TransaksiBrokerStatusController.update')
    Route.delete('transaksi-broker-status/:id', 'TransaksiBrokerStatusController.delete')
    Route.post('transaksi-broker-status', 'TransaksiBrokerStatusController.store')

    // Routes transaksi broker
    Route.put('transaksi-broker/:id', 'TransaksiBrokerController.update')
    Route.delete('transaksi-broker/:id', 'TransaksiBrokerController.delete')
    Route.post('transaksi-broker', 'TransaksiBrokerController.store')

    // Routes customer status
    Route.put('customer-status/:id', 'CustomerStatusController.update')
    Route.delete('customer-status/:id', 'CustomerStatusController.delete')
    Route.post('customer-status', 'CustomerStatusController.store')

    // Routes data pengamatan
    Route.put('data-pengamatan/:id', 'DataPengamatanController.update')
    Route.delete('data-pengamatan/:id', 'DataPengamatanController.delete')
    Route.post('data-pengamatan', 'DataPengamatanController.store')

    //Routes data ukur
    Route.put('data-ukur/:id', 'DataUkurController.update')
    Route.delete('data-ukur/:id', 'DataUkurController.delete')
    Route.post('data-ukur', 'DataUkurController.store')

    // Routes invoice order
    Route.put('invoice-order/:id', 'InvoiceOrderController.update')
    Route.delete('invoice-order/:id', 'InvoiceOrderController.delete')
    Route.post('invoice-order', 'InvoiceOrderController.store')

    // Routes invoice order status
    Route.put('invoice-status/:id', 'InvoiceStatusController.update')
    Route.delete('invoice-status/:id', 'InvoiceStatusController.delete')
    Route.post('invoice-status', 'InvoiceStatusController.store')

    // Routes kantor cabang
    Route.put('kantor-cabang/:id', 'KantorCabangController.update')
    Route.delete('kantor-cabang/:id', 'KantorCabangController.delete')
    

    // Routes kantor status
    Route.put('kantor-status/:id', 'KantorStatusController.update')
    Route.delete('kantor-status/:id', 'KantorStatusController.delete')
    

    // Routes list kalibrasi
    Route.put('list-kalibrasi/:id', 'ListKalibrasiController.update')
    Route.delete('list-kalibrasi/:id', 'ListKalibrasiController.delete')
    Route.post('list-kalibrasi', 'ListKalibrasiController.store')

    // Routes merk barang
    Route.put('merk-barang/:id', 'MerkBarangController.update')
    Route.delete('merk-barang/:id', 'MerkBarangController.delete')
    Route.post('merk-barang', 'MerkBarangController.store')

    // Routes order detail
    Route.put('order-detail/:id', 'OrderDetailController.update')
    Route.delete('order-detail/:id', 'OrderDetailController.delete')
    Route.post('order-detail', 'OrderDetailController.store')

    // Routes order status
    Route.put('order-status/:id', 'OrderStatusController.update')
    Route.delete('order-status/:id', 'OrderStatusController.delete')
    Route.post('order-status', 'OrderStatusController.store')

    // Routes penawaran order
    Route.put('penawaran-order/:id', 'PenawaranOrderController.update')
    Route.delete('penawaran-order/:id', 'PenawaranOrderController.delete')
    Route.post('penawaran-order', 'PenawaranOrderController.store')

    // Routes penawaran status
    Route.put('penawaran-status/:id', 'PenawaranStatusController.update')
    Route.delete('penawaran-status/:id', 'PenawaranStatusController.delete')
    Route.post('penawaran-status', 'PenawaranStatusController.store')

    // Routes perusahaan broker
    Route.put('perusahaan-broker/:id', 'PerusahaanBrokerController.update')
    Route.delete('perusahaan-broker/:id', 'PerusahaanBrokerController.delete')
    Route.post('perusahaan-broker', 'PerusahaanBrokerController.store')

    // Routes posisi ukur
    Route.put('posisi-ukur/:id', 'PosisiUkurController.update')
    Route.delete('posisi-ukur/:id', 'PosisiUkurController.delete')
    Route.post('posisi-ukur', 'PosisiUkurController.store')

    // Routes progres order
    Route.put('progres-order/:id', 'ProgresOrderController.update')
    Route.delete('progres-order/:id', 'ProgresOrderController.delete')
    Route.post('progres-order', 'ProgresOrderController.store')

    // Routes ruang lingkup
    Route.put('ruang-lingkup/:id', 'RuangLingkupController.update')
    Route.delete('ruang-lingkup/:id', 'RuangLingkupController.delete')
    Route.post('ruang-lingkup', 'RuangLingkupController.store')

    // Routes satuan sensor
    Route.put('satuan-sensor/:id', 'SatuanSensorController.update')
    Route.delete('satuan-sensor/:id', 'SatuanSensorController.delete')
    Route.post('satuan-sensor', 'SatuanSensorController.store')

    // Routes sensor
    Route.put('sensor/:id', 'SensorController.update')
    Route.delete('sensor/:id', 'SensorController.delete')
    Route.post('sensor', 'SensorController.store')

    // Routes seq data ukur
    Route.put('seq-data-ukur/:id', 'SeqDataUkurController.update')
    Route.delete('seq-data-ukur/:id', 'SeqDataUkurController.delete')
    Route.post('seq-data-ukur', 'SeqDataUkurController.store')

    // Routes standar kalibrasi
    Route.put('standar-kalibrasi/:id', 'StandarKalibrasiController.update')
    Route.delete('standar-kalibrasi/:id', 'StandarKalibrasiController.delete')
    Route.post('standar-kalibrasi', 'StandarKalibrasiController.store')

    // Routes status pengamatan
    Route.put('status-pengamatan/:id', 'StatusPengamatanController.update')
    Route.delete('status-pengamatan/:id', 'StatusPengamatanController.delete')
    Route.post('status-pengamatan', 'StatusPengamatanController.store')

    // Routes tipe pengerjaan
    Route.put('tipe-pengerjaan/:id', 'TipePengerjaanController.update')
    Route.delete('tipe-pengerjaan/:id', 'TipePengerjaanController.delete')
    Route.post('tipe-pengerjaan', 'TipePengerjaanController.store')

    //Routes barang status
    Route.put('barang-status/:id', 'BarangStatusController.update')
    Route.delete('barang-status/:id', 'BarangStatusController.delete')
    Route.post('barang-status', 'BarangStatusController.store')

    // Routes broker status
    Route.put('broker-status/:id', 'BrokerStatusController.update')
    Route.delete('broker-status/:id', 'BrokerStatusController.delete')
    Route.post('broker-status', 'BrokerStatusController.store')
    
    // Routes customer perusahaan
    Route.put('customer-perusahaan/:id', 'CustomerPerusahaanController.update')
    Route.delete('customer-perusahaan/:id', 'CustomerPerusahaanController.delete')
    Route.post('customer-perusahaan', 'CustomerPerusahaanController.store')

}).prefix('api').middleware(['auth:user'])

