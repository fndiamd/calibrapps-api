'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PenawaranStatus extends Model {
    static get primaryKey(){
        return 'penawaran_status_id'
    }

    penawaranOrder(){
        return this.hasMany('App/Models/PenawaranOrder')
    }
}

module.exports = PenawaranStatus
