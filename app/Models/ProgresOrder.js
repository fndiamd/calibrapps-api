'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProgresOrder extends Model {
    static get primaryKey(){
        return 'progres_order_id'
    }

    orderStatus(){
        return this.hasOne('App/Models/OrderStatus')
    }

    penawaranOrder(){
        return this.hasOne('App/Models/PenawaranOrder')
    }

    invoiceOrder(){
        return this.hasOne('App/Models/InvoiceOrder')
    }

    unsurKajiUlang(){
        return this.hasMany('App/Models/UnsurKajiUlang')
    }

    kantorCabang(){
        return this.hasOne('App/Models/KantorCabang')
    }

    customerPerusahaan(){
        return this.hasOne('App/Models/CustomerPerusahaan')
    }

    orderDetail(){
        return this.hasMany('App/Models/OrderDetail')
    }

    
}

module.exports = ProgresOrder
