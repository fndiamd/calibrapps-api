'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusPengamatanSchema extends Schema {
  up () {
    this.create('status_pengamatans', (table) => {
      table.increments('status_pengamatan_id')
      table.string('status_pengamatan_keterangan', 100).notNullable()
      //table.timestamps()
    })
  }

  down () {
    this.drop('status_pengamatans')
  }
}

module.exports = StatusPengamatanSchema
