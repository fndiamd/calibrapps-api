'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class KantorCabang extends Model {
    
    static get primaryKey(){
        return 'kantor_cabang_id'
    }

    userCabang(){
        return this.hasMany('App/Models/UserCabang')
    }

    kantorStatus(){
        return this.belongsTo('App/Models/KantorStatus')
    }

    progresOrder(){
        return this.hasMany('App/Models/ProgresOrder')
    }
}

module.exports = KantorCabang
