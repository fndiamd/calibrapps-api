'use strict'


const Route = use('Route')

Route.get('/', (response) => {
    return "Welcome to API Calibrapps lab"
})

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

    // masukkan email untuk lupa password
    Route.post('customer-forgot-password', 'Auth/UserCustomerController.forgotPassword')
    Route.post('customer-reset-password/:token', 'Auth/UserCustomerController.changePassword')
}).prefix('api/auth')

Route.group(() => {

    Route.post('customer-perusahaan', 'CustomerPerusahaanController.store')
    Route.post('user-customer', 'UserCustomerController.store')
    Route.get('sertifikat-check/:sertifikat_nomor', 'SertifikatController.readSertifikat')

    // Routes Dashboard
    Route.get('pelanggan', 'DashboardController.jumlahPelanggan')
    Route.get('pemesanan', 'DashboardController.jumlahPemesanan')
    Route.get('pendapatan', 'DashboardController.jumlahPendapatan')

    // Routes Barang Kalibrasi
    Route.get('barang-kalibrasi-notif', 'BarangKalibrasiController.needCalibration')
    Route.get('barang-kalibrasi', 'BarangKalibrasiController.index')
    Route.get('barang-kalibrasi/:id', 'BarangKalibrasiController.view')
    Route.get('barang-kalibrasi-pagination', 'BarangKalibrasiController.pagination')
    Route.get('barang-kalibrasi-search', 'BarangKalibrasiController.search')

    // Routes Barang Status
    Route.get('barang-status', 'BarangStatusController.index')
    Route.get('barang-status/:id', 'BarangStatusController.view')
    Route.get('barang-status-pagination', 'BarangStatusController.pagination')
    Route.get('barang-status-search', 'BarangStatusController.search')

    // Routes Broker Status
    Route.get('broker-status', 'BrokerStatusController.index')
    Route.get('broker-status/:id', 'BrokerStatusController.view')
    Route.get('broker-status-pagination', 'BrokerStatusController.pagination')
    Route.get('broker-status-search', 'BrokerStatusController.search')

    // Routes Customer Perusahaan
    Route.get('customer-perusahaan-notif', 'CustomerPerusahaanController.notify')
    Route.get('customer-perusahaan', 'CustomerPerusahaanController.index')
    Route.get('customer-perusahaan/:id', 'CustomerPerusahaanController.view')
    Route.get('customer-perusahaan-pagination', 'CustomerPerusahaanController.pagination')
    Route.get('customer-perusahaan-search', 'CustomerPerusahaanController.search')

    // Routes Customer Role
    Route.get('customer-role', 'CustomerRoleController.index')
    Route.get('customer-role/:id', 'CustomerRoleController.view')
    Route.get('customer-role-pagination', 'CustomerRoleController.pagination')
    Route.get('customer-role-search', 'CustomerRoleController.search')

    // Routes Customer Status
    Route.get('customer-status', 'CustomerStatusController.index')
    Route.get('customer-status/:id', 'CustomerStatusController.view')
    Route.get('customer-status-pagination', 'CustomerStatusController.pagination')
    Route.get('customer-status-search', 'CustomerStatusController.search')

    // Routes Data Pengamatan
    Route.get('data-pengamatan', 'DataPengamatanController.index')
    Route.get('data-pengamatan/:id', 'DataPengamatanController.view')
    Route.get('data-pengamatan-pagination', 'DataPengamatanController.pagination')
    Route.get('data-pengamatan-search', 'DataPengamatanController.search')

    // Routes Data Ukur
    Route.get('data-ukur', 'DataUkurController.index')
    Route.get('data-ukur/:id', 'DataUkurController.view')
    Route.get('data-ukur-pagination', 'DataUkurController.pagination')
    Route.get('data-ukur-search', 'DataUkurController.search')

    // Routes Invoice Order
    Route.get('invoice-order', 'InvoiceOrderController.index')
    Route.get('invoice-order/:id', 'InvoiceOrderController.view')
    Route.get('invoice-order-pagination', 'InvoiceOrderController.pagination')
    Route.get('invoice-order-search', 'InvoiceOrderController.search')

    // Routes Invoice Status
    Route.get('invoice-status', 'InvoiceStatusController.index')
    Route.get('invoice-status/:id', 'InvoiceStatusController.view')
    Route.get('invoice-status-pagination', 'InvoiceStatusController.pagination')
    Route.get('invoice-status-search', 'InvoiceStatusController.search')

    // Routes Kantor Cabang
    Route.get('kantor-cabang', 'KantorCabangController.index')
    Route.get('kantor-cabang/:id', 'KantorCabangController.view')
    Route.get('kantor-cabang-pagination', 'KantorCabangController.pagination')
    Route.get('kantor-cabang-search', 'KantorCabangController.search')

    // Routes Kantor Status
    Route.get('kantor-status', 'KantorStatusController.index')
    Route.get('kantor-status/:id', 'KantorStatusController.view')
    Route.get('kantor-status-pagination', 'KantorStatusController.pagination')
    Route.get('kantor-status-search', 'KantorStatusController.search')

    // Route List Kalibrasi
    Route.get('list-kalibrasi', 'ListKalibrasiController.index')
    Route.get('list-kalibrasi/:id', 'ListKalibrasiController.view')
    Route.get('list-kalibrasi-pagination', 'ListKalibrasiController.pagination')
    Route.get('list-kalibrasi-search', 'ListKalibrasiController.search')

    // Routes Merk Barang
    Route.get('merk-barang', 'MerkBarangController.index')
    Route.get('merk-barang/:id', 'MerkBarangController.view')
    Route.get('merk-barang-pagination', 'MerkBarangController.pagination')
    Route.get('merk-barang-search', 'MerkBarangController.search')

    // Routes Order Detail
    Route.get('order-detail', 'OrderDetailController.index')
    Route.get('order-detail/:id', 'OrderDetailController.view')
    Route.get('order-detail-pagination', 'OrderDetailController.pagination')
    Route.post('order-detail-search', 'OrderDetailController.search')
    Route.post('order-detail-normal-search', 'OrderDetailController.normalSearch')

    // Routes Order Status
    Route.get('order-status', 'OrderStatusController.index')
    Route.get('order-status/:id', 'OrderStatusController.view')
    Route.get('order-status-pagination', 'OrderStatusController.pagination')
    Route.get('order-status-search', 'OrderStatusController.search')

    // Routes Penawaran Order
    Route.get('penawaran-order', 'PenawaranOrderController.index')
    Route.get('penawaran-order/:id', 'PenawaranOrderController.view')
    Route.get('penawaran-order-pagination', 'PenawaranOrderController.pagination')
    Route.get('penawaran-order-search', 'PenawaranOrderController.search')

    // Routes Penawaran status
    Route.get('penawaran-status', 'PenawaranStatusController.index')
    Route.get('penawaran-status/:id', 'PenawaranStatusController.view')
    Route.get('penawaran-status-pagination', 'PenawaranStatusController.pagination')
    Route.get('penawaran-status-search', 'PenawaranStatusController.search')

    // Routes Perusahaan Broker
    Route.get('perusahaan-broker', 'PerusahaanBrokerController.index')
    Route.get('perusahaan-broker/:id', 'PerusahaanBrokerController.view')
    Route.get('perusahaan-broker-pagination', 'PerusahaanBrokerController.pagination')
    Route.get('perusahaan-broker-search', 'PerusahaanBrokerController.search')

    // Routes Progres Order
    Route.get('progres-order', 'ProgresOrderController.index')
    Route.get('progres-order/:id', 'ProgresOrderController.view')
    Route.get('progres-order-pagination', 'ProgresOrderController.pagination')
    Route.get('progres-order-search', 'ProgresOrderController.search')

    // Routes Ruang Lingkup
    Route.get('ruang-lingkup', 'RuangLingkupController.index')
    Route.get('ruang-lingkup/:id', 'RuangLingkupController.view')
    Route.get('ruang-lingkup-pagination', 'RuangLingkupController.pagination')
    Route.get('ruang-lingkup-search', 'RuangLingkupController.search')

    // Routes Satuan Sensor
    Route.get('satuan-sensor', 'SatuanSensorController.index')
    Route.get('satuan-sensor/:id', 'SatuanSensorController.view')
    Route.get('satuan-sensor-pagination', 'SatuanSensorController.pagination')
    Route.get('satuan-sensor-search', 'SatuanSensorController.search')

    // Routes Sensor
    Route.get('sensor', 'SensorController.index')
    Route.get('sensor/:id', 'SensorController.view')
    Route.get('sensor-pagination', 'SensorController.pagination')
    Route.get('sensor-search', 'SensorController.search')

    // Routes sertifikat
    Route.get('sertifikat', 'SertifikatController.index')
    Route.get('sertifikat/:id', 'SertifikatController.view')
    Route.get('sertifikat-pagination', 'SertifikatController.pagination')
    Route.get('sertifikat-search', 'SertifikatController.search')

    // Routes Standar Kalibrasi
    Route.get('standar-kalibrasi', 'StandarKalibrasiController.index')
    Route.get('standar-kalibrasi/:id', 'StandarKalibrasiController.view')
    Route.get('standar-kalibrasi-pagination', 'StandarKalibrasiController.pagination')
    Route.get('standar-kalibrasi-search', 'StandarKalibrasiController.search')

    // Routes Pengamatan Status
    Route.get('pengamatan-status', 'StatusPengamatanController.index')
    Route.get('pengamatan-status/:id', 'StatusPengamatanController.view')
    Route.get('pengamatan-status-pagination', 'StatusPengamatanController.pagination')
    Route.get('pengamatan-status-search', 'StatusPengamatanController.search')

    // Routes Tipe Pengerjaan
    Route.get('tipe-pengerjaan', 'TipePengerjaanController.index')
    Route.get('tipe-pengerjaan/:id', 'TipePengerjaanController.view')
    Route.get('tipe-pengerjaan-pagination', 'TipePengerjaanController.pagination')
    Route.get('tipe-pengerjaan-search', 'TipePengerjaanController.search')

    // Routes Transaksi Broker
    Route.get('transaksi-broker', 'TransaksiBrokerController.index')
    Route.get('transaksi-broker/:id', 'TransaksiBrokerController.view')
    Route.get('transaksi-broker-pagination', 'TransaksiBrokerController.pagination')
    Route.get('transaksi-broker-search', 'TransaksiBrokerController.search')

    // Routes Transaksi Penawaran
    Route.get('transaksi-penawaran', 'TransaksiPenawaranController.index')
    Route.get('transaksi-penawaran/:id', 'TransaksiPenawaranController.view')
    Route.get('transaksi-penawaran-pagination', 'TransaksiPenawaranController.pagination')
    Route.get('transaksi-penawaran-search', 'TransaksiPenawaranController.search')

    // Routes Transaksi Broker Status
    Route.get('transaksi-broker-status', 'TransaksiBrokerStatusController.index')
    Route.get('transaksi-broker-status/:id', 'TransaksiBrokerStatusController.view')
    Route.get('transaksi-broker-status-pagination', 'TransaksiBrokerStatusController.pagination')
    Route.get('transaksi-broker-status-search', 'TransaksiBrokerStatusController.search')

    // Routes Unsur Kaji Ulang
    Route.get('unsur-kajiulang', 'UnsurKajiUlangController.index')
    Route.get('unsur-kajiulang/:id', 'UnsurKajiUlangController.view')
    Route.get('unsur-kajiulang-pagination', 'UnsurKajiUlangController.pagination')
    Route.get('unsur-kajiulang-search', 'UnsurKajiUlangController.search')

    // Routes Unsur Kalibrasi
    Route.get('unsur-kalibrasi', 'UnsurKalibrasiController.index')
    Route.get('unsur-kalibrasi/:id', 'UnsurKalibrasiController.view')
    Route.get('unsur-kalibrasi-pagination', 'UnsurKalibrasiController.pagination')
    Route.get('unsur-kalibrasi-search', 'UnsurKalibrasiController.search')

    // Routes User Cabang
    Route.get('user-cabang', 'UserCabangController.index')
    Route.get('user-cabang/:id', 'UserCabangController.view')
    Route.get('user-cabang-pagination', 'UserCabangController.pagination')
    Route.get('user-cabang-search', 'UserCabangController.search')

    // Routes User Customer
    Route.get('user-customer', 'UserCustomerController.index')
    Route.get('user-customer/:id', 'UserCustomerController.view')
    Route.get('user-customer-pagination', 'UserCustomerController.pagination')
    Route.get('user-customer-search', 'UserCustomerController.search')

    // Routes User Role
    Route.get('user-role', 'UserRoleController.index')
    Route.get('user-role/:id', 'UserRoleController.view')
    Route.get('user-role-pagination', 'UserRoleController.pagination')
    Route.get('user-role-search', 'UserRoleController.search')


    Route.post('user-cabang', 'UserCabangController.store')
    Route.post('kantor-cabang', 'KantorCabangController.store')
    Route.post('user-role', 'UserRoleController.store')
    Route.post('kantor-status', 'KantorStatusController.store')

}).prefix('api')

Route.group(() => {
    // Routes with Middleware
    // Routes barang kalibrasi
    Route.put('barang-kalibrasi/:id', 'BarangKalibrasiController.update')
    Route.delete('barang-kalibrasi/:id', 'BarangKalibrasiController.delete')
    Route.post('barang-kalibrasi', 'BarangKalibrasiController.store')

    // Routes customer role
    Route.put('customer-role/:id', 'CustomerRoleController.update')
    Route.delete('customer-role/:id', 'CustomerRoleController.delete')
    Route.post('customer-role', 'CustomerRoleController.store')

    // Routes user role
    Route.put('user-role/:id', 'UserRoleController.update')
    Route.delete('user-role/:id', 'UserRoleController.delete')

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

    // Routes sertifikat
    Route.put('sertifikat/:id', 'SertifikatController.update')
    Route.delete('sertifikat/:id', 'SertifikatController.delete')
    Route.post('sertifikat', 'SertifikatController.store')

    // Routes standar kalibrasi
    Route.put('standar-kalibrasi/:id', 'StandarKalibrasiController.update')
    Route.delete('standar-kalibrasi/:id', 'StandarKalibrasiController.delete')
    Route.post('standar-kalibrasi', 'StandarKalibrasiController.store')

    // Routes pengamatan status
    Route.put('pengamatan-status/:id', 'StatusPengamatanController.update')
    Route.delete('pengamatan-status/:id', 'StatusPengamatanController.delete')
    Route.post('pengamatan-status', 'StatusPengamatanController.store')

    // Routes tipe pengerjaan
    Route.put('tipe-pengerjaan/:id', 'TipePengerjaanController.update')
    Route.delete('tipe-pengerjaan/:id', 'TipePengerjaanController.delete')
    Route.post('tipe-pengerjaan', 'TipePengerjaanController.store')

    // Routes transaksi penawaran
    Route.put('transaksi-penawaran/:id', 'TransaksiPenawaranController.update')
    Route.delete('transaksi-penawaran/:id', 'TransaksiPenawaranController.delete')
    Route.post('transaksi-penawaran', 'TransaksiPenawaranController.store')

    //Routes barang status
    Route.put('barang-status/:id', 'BarangStatusController.update')
    Route.delete('barang-status/:id', 'BarangStatusController.delete')
    Route.post('barang-status', 'BarangStatusController.store')

    // Routes broker status
    Route.put('broker-status/:id', 'BrokerStatusController.update')
    Route.delete('broker-status/:id', 'BrokerStatusController.delete')
    Route.post('broker-status', 'BrokerStatusController.store')

}).prefix('api').middleware(['auth:user'])


Route.group(() => {
    // Routes customer perusahaan
    Route.put('customer-perusahaan/:id', 'CustomerPerusahaanController.update')
    Route.delete('customer-perusahaan/:id', 'CustomerPerusahaanController.delete')
    

    // Routes progres order
    Route.put('progres-order/:id', 'ProgresOrderController.update')
    Route.delete('progres-order/:id', 'ProgresOrderController.delete')
    Route.post('progres-order', 'ProgresOrderController.store')

    // Routes user customer 
    Route.put('user-customer/:id', 'UserCustomerController.update')
    Route.delete('user-customer/:id', 'UserCustomerController.delete')

}).prefix('api').middleware(['auth:user,customer'])
