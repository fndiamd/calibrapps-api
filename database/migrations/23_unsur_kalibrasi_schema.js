'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnsurKalibrasiSchema extends Schema {
  up () {
    this.create('unsur_kalibrasis', (table) => {
      table.increments('unsur_kalibrasi_id')
      table.string('unsur_kalibrasi_nama', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('unsur_kalibrasis')
  }
}

module.exports = UnsurKalibrasiSchema
