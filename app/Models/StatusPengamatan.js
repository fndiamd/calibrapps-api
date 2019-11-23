'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StatusPengamatan extends Model {
    static get table(){
        return 'pengamatan_statuses'
    }
    
    static get primaryKey(){
        return 'pengamatan_status_id'
    }

    static get createdAtColumn(){
        return null
    }

    static get updatedAtColumn(){
        return null
    }
}

module.exports = StatusPengamatan
