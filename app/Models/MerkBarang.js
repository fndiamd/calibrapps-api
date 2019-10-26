'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MerkBarang extends Model {
    static get primaryKey(){
        return 'merk_barang_id'
    }

    barangKalibrasi(){
        return this.hasMany('App/Models/BarangKalibrasi')
    }
}

module.exports = MerkBarang
