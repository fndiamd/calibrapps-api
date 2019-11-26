'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sensor extends Model {
    static get primaryKey(){
        return 'sensor_id'
    }

    dataPengamatan(){
        return this.hasMany('App/Models/DataPengamatan')
    }

    satuanSensor(){
        return this.belongsTo('App/Models/SatuanSensor')
    }
}

module.exports = Sensor
