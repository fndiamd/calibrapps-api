'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SatuanSensor extends Model {
    static get primaryKey(){
        return 'satuan_sensor_id'
    }

    sensor(){
        return this.hasMany('App/Models/Sensor')
    }
}

module.exports = SatuanSensor
