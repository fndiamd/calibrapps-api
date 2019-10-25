'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserRole extends Model {

    static get primaryKey(){
        return 'user_role_id'
    }

    static get createdAtColumn(){
        return null
    }

    static get updatedAtColumn(){
        return null
    }

    userCabang(){
        return this.hashMany('App/Models/UserCabang')
    }
}

module.exports = UserRole
