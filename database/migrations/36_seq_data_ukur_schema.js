'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeqDataUkurSchema extends Schema {
  up () {
    this.create('seq_data_ukurs', (table) => {
      table.increments('seq_data_ukur_id')
      table.decimal('seq_data_ukur_data')
      table.integer('data_ukur_id').unsigned().references('data_ukur_id').inTable('data_ukurs')
      table.integer('posisi_ukur_id').unsigned().references('posisi_ukur_id').inTable('posisi_ukurs')
      table.timestamps()
    })
  }

  down () {
    this.drop('seq_data_ukurs')
  }
}

module.exports = SeqDataUkurSchema
