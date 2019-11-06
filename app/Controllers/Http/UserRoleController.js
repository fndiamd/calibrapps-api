'use strict'

const UserRole = use('App/Models/UserRole')

class UserRoleController {

    async index({ response }) {
        let userRole = await UserRole.query().fetch()
        return response.json(userRole)
    }

    async view({params, response }){
        let userRole = await UserRole.query().where('user_role_id', params.id).first()
        return userRole
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

    async pagination({request, response}){
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const userRole = await UserRole.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(userRole)
    }
}

module.exports = UserRoleController
