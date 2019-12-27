'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SatuanSensorSchema extends Schema {
  up() {
    this.create('satuan_sensors', (table) => {
      table.increments('satuan_sensor_id')
      table.string('satuan_sensor_satuan', 50).notNullable()
      table.decimal('satuan_sensor_rentang_min', 8, 3)
      table.decimal('satuan_sensor_rentang_max', 8, 3)
      table.timestamps()
    })
  }

  down() {
    this.drop('satuan_sensors')
  }
}

module.exports = SatuanSensorSchema
