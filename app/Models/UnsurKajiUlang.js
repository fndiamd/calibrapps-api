'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UnsurKajiUlang extends Model {
    unsurKalibrasi(){
        return this.hasOne('App/Models/UnsurKalibrasi')
    }

    progresOrder(){
        return this.hasOne('App/Models/ProgresOrder')
    }
}

module.exports = UnsurKajiUlang
