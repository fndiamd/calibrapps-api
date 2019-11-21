'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusPengamatanSchema extends Schema {
  up () {
    this.create('pengamatan_statuses', (table) => {
      table.increments('pengamatan_status_id')
      table.string('pengamatan_status_keterangan', 100).notNullable().unique()
      table.string('pengamatan_status_warna', 50).notNullable().unique()
    })
  }

  down () {
    this.drop('pengamatan_statuses')
  }
}

module.exports = StatusPengamatanSchema
