'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class UserCabang extends Model {
    static boot(){
        super.boot();
        this.addHook('beforeSave', async (userInstance) => {
            userInstance.user_cabang_password = await Hash.make(userInstance.user_cabang_password)
        })
    }

    roleUser(){
        return this.hashOne('App/Models/UserRole')
    }

    kantorCabang(){
        return this.hashOne('App/Models/KantorCabang')
    }
}

module.exports = UserCabang
