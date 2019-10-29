'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PenawaranOrder extends Model {
    static get primaryKey(){
        return 'penawaran_order_id'
    }

    penawaranStatus(){
        return this.hasOne('App/Models/PenawaranStatus')
    }

    progresOrder(){
        return this.hasOne('App/Models/ProgresOrder')
    }
}

module.exports = PenawaranOrder
