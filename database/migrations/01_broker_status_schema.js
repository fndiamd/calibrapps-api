'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BrokerStatusSchema extends Schema {
  up () {
    this.create('broker_statuses', (table) => {
      table.increments('broker_status_id')
      table.text('broker_status_keterangan', 'mediumtext')
      table.timestamps()
    })
  }

  down () {
    this.drop('broker_statuses')
  }
}

module.exports = BrokerStatusSchema
