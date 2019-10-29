'use strict'

const UserRole = use('App/Models/UserRole')

class UserRoleController {

    async index({ response }) {
        let userRole = await UserRole.query().fetch()
        return response.json(userRole)
    }

    async store({ response, request }) {
        const userRole = new UserRole()
        const data = {
            user_role_keterangan: request.input('user_role_keterangan')
        }

        userRole.user_role_keterangan = data.user_role_keterangan

        await userRole.save()
        return response.json(userRole)
    }

    async update({ params, response, request }) {
        let userRole = await UserRole.find(params.id)

        const data = {
            user_role_keterangan: request.input('user_role_keterangan')
        }

        userRole.user_role_keterangan = data.user_role_keterangan

        await userRole.save()
        return response.json(userRole)
    }

    async delete({ params, response }) {
        const unsurRole = await UserRole.find(params.id)
        unsurRole.delete()
        return response.json({ message: 'User Role berhasil dihapus' })
    }
}

module.exports = UserRoleController
