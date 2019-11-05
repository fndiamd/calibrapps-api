'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransaksiBrokerStatusSchema extends Schema {
  up () {
    this.create('transaksi_broker_statuses', (table) => {
      table.increments('transaksi_broker_status_id')
      table.string('transaksi_broker_status_keterangan', 100).notNullable()
      table.string('transaksi_broker_status_warna', 50).unique()
      //table.timestamps()
    })
  }

  down () {
    this.drop('transaksi_broker_statuses')
  }
}

module.exports = TransaksiBrokerStatusSchema
