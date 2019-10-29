'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KantorStatusSchema extends Schema {
  up () {
    this.create('kantor_statuses', (table) => {
      table.increments('kantor_status_id')
      table.string('kantor_status_keterangan', 100).notNullable().unique()
      //table.timestamps()
    })
  }

  down () {
    this.drop('kantor_statuses')
  }
}

module.exports = KantorStatusSchema
