'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SensorSchema extends Schema {
  up () {
    this.create('sensors', (table) => {
      table.increments('sensor_id')
      table.string('sensor_nama', 150).notNullable()
      table.integer('satuan_sensor_id')
        .unsigned()
        .references('satuan_sensor_id')
        .inTable('satuan_sensors')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('sensors')
  }
}

module.exports = SensorSchema
