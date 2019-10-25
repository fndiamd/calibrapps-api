'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RuangLingkup extends Model {
    static get primaryKey(){
        return 'ruang_lingkup_id'
    }

    list_kalibrasi(){
        return this.hasMany('App/Models/ListKalibrasi')
    }
}

module.exports = RuangLingkup
