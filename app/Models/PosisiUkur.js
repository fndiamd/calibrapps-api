'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PosisiUkur extends Model {
    static get primaryKey(){
        return 'posisi_ukur_id'
    }

    seqDataUkur(){
        return this.hasMany('App/Models/SeqDataUkur')
    }
}

module.exports = PosisiUkur
