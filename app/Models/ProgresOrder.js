'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProgresOrder extends Model {
    static get primaryKey() {
        return 'progres_order_id'
    }

    static get dates() {
        return super.dates.concat(['progres_order_tanggal_order', 'progres_order_estimasi'])
    }

    orderStatus() {
        return this.belongsTo('App/Models/OrderStatus')
    }

    penawaranOrder() {
        return this.belongsTo('App/Models/PenawaranOrder')
    }

    invoiceOrder() {
        return this.hasOne('App/Models/InvoiceOrder')
    }

    unsurKajiUlang() {
        return this.hasMany('App/Models/UnsurKajiUlang')
    }

    kantorCabang() {
        return this.belongsTo('App/Models/KantorCabang')
    }

    customerPerusahaan() {
        return this.belongsTo('App/Models/CustomerPerusahaan')
    }

    orderDetail() {
        return this.hasMany('App/Models/OrderDetail')
    }


}

module.exports = ProgresOrder
