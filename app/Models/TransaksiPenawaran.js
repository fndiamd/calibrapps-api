'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TransaksiPenawaran extends Model {
    static get primaryKey(){
        return null
    }

    penawaranOrder(){
        return this.belongsTo('App/Models/PenawaranOrder')
    }

    progresOrder(){
        return this.belongsTo('App/Models/ProgresOrder')
    }

}

module.exports = TransaksiPenawaran
