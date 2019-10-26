'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BarangStatus extends Model {
    static get primaryKey(){
        return 'barang_status_id'
    }

    barangKalibrasi(){
        return this.hasMany('App/Models/BarangKalibrasi')
    }
}

module.exports = BarangStatus
