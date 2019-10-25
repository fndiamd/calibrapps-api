'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserRole extends Model {
    static get primaryKey(){
        return 'user_role_id'
    }

    userCabang(){
        return this.hasMany('App/Models/UserCabang')
    }
}

module.exports = UserRole
