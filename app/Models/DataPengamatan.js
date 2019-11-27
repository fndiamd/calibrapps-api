'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DataPengamatan extends Model {
    static get primaryKey(){
        return 'data_pengamatan_id'
    }

    sensor(){
        return this.belongsTo('App/Models/Sensor')
    }

    userCabang(){
        return this.belongsTo('App/Models/UserCabang')
    }

    statusPengamatan(){
        return this.belongsTo('App/Models/StatusPengamatan')
    }

    dataUkur(){
        return this.belongsTo('App/Models/DataUkur')
    }
}

module.exports = DataPengamatan
