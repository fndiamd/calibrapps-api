'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DataPengamatan extends Model {
    static get primaryKey(){
        return 'data_pengamatan_id'
    }

    sensor(){
        return this.hasOne('App/Models/Sensor')
    }

    userCabang(){
        return this.hasMany('App/Models/UserCabang')
    }

    statusPengamatan(){
        return this.hasOne('App/Models/StatusPengamatan')
    }

    dataUkur(){
        return this.hasOne('App/Models/DataUkur')
    }
}

module.exports = DataPengamatan