'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UnsurKajiUlang extends Model {
    static get primaryKey(){
        return null
    }
    
    unsurKalibrasi(){
        return this.belongsTo('App/Models/UnsurKalibrasi')
    }

    progresOrder(){
        return this.belongsTo('App/Models/ProgresOrder')
    }
}

module.exports = UnsurKajiUlang
