'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BrokerStatusSchema extends Schema {
  up () {
    this.create('broker_statuses', (table) => {
      table.increments('broker_status_id')
      table.string('broker_status_keterangan', 100).notNullable().unique()
      table.string('broker_status_warna', 50).notNullable().unique()
    })
  }

  down () {
    this.drop('broker_statuses')
  }
}

module.exports = BrokerStatusSchema
