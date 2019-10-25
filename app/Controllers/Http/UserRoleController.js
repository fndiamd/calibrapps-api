'use strict'

const UserRole = use('App/Models/UserRole')

class UserRoleController {
    async index({response}){
        let userRole = await UserRole.query().fetch()
        return response.json(userRole)
    }

    async getById({params, response}){
        const userRole = await UserRole.findBy('user_role_id', params.id)
        return userRole
    }

    async store({request, response}){
        const userRole = new UserRole()
        userRole.user_role_keterangan = request.input('user_role_keterangan')
        await userRole.save()
        return response.json(userRole)
    }

    async update({params, request, response}){
        const userRole = await UserRole.find(params.id)
        userRole.user_role_keterangan = request.input('user_role_keterangan')
        await userRole.save()
        return response.json(userRole)
    }

    async delete({params, response}){
        const userRole = await UserRole.find(params.id)
        userRole.delete()
        return response.json({message : 'Role user berhasil dihapus'})
    }

}

module.exports = UserRoleController
