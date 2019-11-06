'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusPengamatanSchema extends Schema {
  up () {
    this.create('status_pengamatans', (table) => {
      table.increments('pengamatan_status_id')
      table.string('pengamatan_status_keterangan', 100).notNullable().unique()
      table.string('pengamatan_status_warna', 50).unique()
      //table.timestamps()
    })
  }

  down () {
    this.drop('status_pengamatans')
  }
}

module.exports = StatusPengamatanSchema
