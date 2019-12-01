'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DataPengamatan extends Model {
    static get primaryKey(){
        return 'data_pengamatan_id'
    }

    static get dates(){
        return super.dates.concat(['data_pengamatan_tanggal_kalibrasi'])
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
        return this.hasOne('App/Models/DataUkur')
    }
}

module.exports = DataPengamatan
