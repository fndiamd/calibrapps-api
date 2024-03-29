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
    
    static get primaryKey(){
        return 'user_cabang_id'
    }

    userRole(){
        return this.belongsTo('App/Models/UserRole')
    }

    kantorCabang(){
        return this.belongsTo('App/Models/KantorCabang')
    }

    tokens () {
        return this.hasMany('App/Models/UserToken')
    }
}

module.exports = UserCabang
