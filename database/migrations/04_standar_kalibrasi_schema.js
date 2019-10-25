'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StandarKalibrasiSchema extends Schema {
  up () {
    this.create('standar_kalibrasis', (table) => {
      table.increments('standar_kalibrasi_id')
      table.string('standar_kalibrasi_keterangan', 100).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('standar_kalibrasis')
  }
}

module.exports = StandarKalibrasiSchema
