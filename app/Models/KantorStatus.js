'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class KantorStatus extends Model {
    static get primaryKey(){
        return 'kantor_status_id'
    }

    static get createdAtColumn(){
        return null
    }

    static get updatedAtColumn(){
        return null
    }
    
    kantorCabang(){
        return this.hasMany('App/Models/KantorCabang')
    }
}

module.exports = KantorStatus
