'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BarangKalibrasi extends Model {
    static get primaryKey(){
        return 'barang_kalibrasi_id'
    }

    merkBarang(){
        return this.belongsTo('App/Models/MerkBarang')
    }

    orderDetail(){
        return this.hasMany('App/Models/OrderDetail')
    }

    barangStatus(){
        return this.belongsTo('App/Models/BarangStatus')
    }

    transaksiBroker(){
        return this.belongsTo('App/Models/TransaksiBroker')
    }

    dataUkur(){
        return this.belongsTo('App/Models/DataUkur')
    }

    listKalibrasi(){
        return this.belongsTo('App/Models/ListKalibrasi')
    }
}

module.exports = BarangKalibrasi
