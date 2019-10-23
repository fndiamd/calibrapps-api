'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserRole extends Model {
    userRole(){
        return this.hashMany('App/Models/UserCabang')
    }
}

module.exports = UserRole
