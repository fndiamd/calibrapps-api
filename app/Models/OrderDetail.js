'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderDetail extends Model {
    static get primaryKey(){
        return 'order_detail_id'
    }

    progresOrder(){
        return this.hasOne('App/Models/ProgresOrder')
    }

    barangKalibrasi(){
        return this.hasOne('App/Models/BarangKalibrasi')
    }
}

module.exports = OrderDetail
