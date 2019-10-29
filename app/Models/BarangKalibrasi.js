'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BarangKalibrasi extends Model {
    static get primaryKey(){
        return 'barang_kalibrasi_id'
    }

    merkBarang(){
        return this.hasOne('App/Models/MerkBarang')
    }

    orderDetail(){
        return this.hasMany('App/Models/OrderDetail')
    }

    barangStatus(){
        return this.hasOne('App/Models/BarangStatus')
    }

    transaksiBroker(){
        return this.hasOne('App/Models/TransaksiBroker')
    }

    dataUkur(){
        return this.hasOne('App/Models/DataUkur')
    }

    listKalibrasi(){
        return this.hasOne('App/Models/ListKalibrasi')
    }
}

module.exports = BarangKalibrasi
