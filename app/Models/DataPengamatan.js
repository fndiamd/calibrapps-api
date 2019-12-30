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

    barangKalibrasi(){
        return this.belongsTo('App/Models/BarangKalibrasi')
    }

    statusPengamatan(){
        return this.belongsTo('App/Models/StatusPengamatan')
    }

    userCabang(){
        return this.belongsTo('App/Models/UserCabang')
    }

}

module.exports = DataPengamatan
