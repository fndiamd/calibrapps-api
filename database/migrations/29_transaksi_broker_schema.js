'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransaksiBrokerSchema extends Schema {
  up () {
    this.create('transaksi_brokers', (table) => {
      table.increments('transaksi_broker_id')
      table.date('transaksi_broker_tanggal_penyerahan')
      table.integer('perusahaan_broker_id').unsigned().references('perusahaan_broker_id').inTable('perusahaan_brokers')
      table.integer('barang_kalibrasi_id').unsigned().references('barang_kalibrasi_id').inTable('barang_kalibrasis')
      table.integer('transaksi_broker_status_id').unsigned().references('transaksi_broker_status_id').inTable('transaksi_broker_statuses')
      table.timestamps()
    })
  }

  down () {
    this.drop('transaksi_brokers')
  }
}

module.exports = TransaksiBrokerSchema