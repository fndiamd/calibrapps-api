'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SeqDataUkur extends Model {
    static get primaryKey(){
        return 'seq_data_ukur_id'
    }

    dataUkur(){
        return this.hasMany('App/Models/DataUkur')
    }

    posisiUkur(){
        return this.hasMany('App/Models/PosisiUkur')
    }
}

module.exports = SeqDataUkur
