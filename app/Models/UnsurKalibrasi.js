'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UnsurKalibrasi extends Model {
    static get primaryKey(){
        return 'unsur_kalibrasi_id'
    }

    unsurKajiUlang(){
        return this.hasMany('App/Models/UnsurKajiUlang')
    }

}

module.exports = UnsurKalibrasi
