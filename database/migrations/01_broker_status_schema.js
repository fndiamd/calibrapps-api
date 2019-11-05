'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BrokerStatusSchema extends Schema {
  up () {
    this.create('broker_statuses', (table) => {
      table.increments('broker_status_id')
      table.text('broker_status_keterangan', 'mediumtext').notNullable().unique()
      table.string('broker_status_warna', 50).unique()
      //table.timestamps()
    })
  }

  down () {
    this.drop('broker_statuses')
  }
}

module.exports = BrokerStatusSchema
