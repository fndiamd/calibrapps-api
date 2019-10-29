'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StatusPengamatan extends Model {
    static get primaryKey(){
        return 'status_pengamatan_id'
    }

    static get createdAtColumn(){
        return null
    }

    static get updatedAtColumn(){
        return null
    }

    dataPengamatan(){
        return this.hasMany('App/Models/DataPengamatan')
    }
}

module.exports = StatusPengamatan
