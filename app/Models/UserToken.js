'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserToken extends Model {
    static get primaryKey(){
        return 'user_token_id'
    }
}

module.exports = UserToken
