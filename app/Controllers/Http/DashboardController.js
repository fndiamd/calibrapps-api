'use strict'
const UserCustomer = use('App/Models/UserCustomer')
const ProgresOrder = use('App/Models/ProgresOrder')
const InvoiceOrder = use('App/Models/InvoiceOrder')

class DashboardController {
    async jumlahPelanggan({response}){
        const count = await UserCustomer.query()
        .where('user_customer_status', 1)
        .fetch()

        const total = count.rows.length
        return response.json(total)
    }

    async jumlahPemesanan({response}){
        const count = await ProgresOrder.query()
        .select('progres_order_nomor')
        .fetch()

        const total = count.rows.length
        return response.json(total)
    }

    async jumlahPendapatan({response}) {
        const count = await InvoiceOrder.query()
        .getSum('invoice_order_total')

        return response.json(count)
    }

    async jumlahAlatTerkalibrasi({}) {
        
    }
}

module.exports = DashboardController
