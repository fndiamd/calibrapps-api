'use strict'

const UserRole = use('App/Models/UserRole')
const { validate } = use('Validator')

let rules = {
    user_role_keterangan: 'required|unique:user_roles,user_role_keterangan',
    user_role_warna: 'required|unique:user_roles,user_role_warna'
}

const vmessage = {
    'user_role_keterangan.required': 'Role user tidak boleh kosong!',
    'user_role_keterangan.unique': 'Role user sudah ada, tidak boleh duplikat!',
    'user_role_warna.required': 'Warna role tidak boleh kosong!',
    'user_role_warna.unique': 'Warna role sudah ada, tidak boleh duplikat!'
}

class UserRoleController {

    async index({ response }) {
        try {
            let userRole = await UserRole.query().fetch()

            return response.json(userRole)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let userRole = await UserRole.findOrFail(params.id)

            return userRole
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'User role tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const userRole = new UserRole()
            const validation = await validate(request.all(), rules, vmessage)

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            userRole.user_role_keterangan = request.input('user_role_keterangan')
            userRole.user_role_warna = request.input('user_role_warna')

            await userRole.save()
            return response.json(userRole)
        } catch (error) {
            return response.status(400).send({
                message: error.message//'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            const userRole = await UserRole.findOrFail(params.id)
            const data = {
                user_role_keterangan: request.input('user_role_keterangan'),
                user_role_warna: request.input('user_role_warna')
            }

            if (userRole.user_role_keterangan === data.user_role_keterangan) {
                rules = {
                    user_role_keterangan: 'required',
                    user_role_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            userRole.user_role_keterangan = data.user_role_keterangan
            userRole.user_role_warna = data.user_role_warna

            await userRole.save()
            return response.json(userRole)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'User role tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: "Ops, kelihatannya ada yang tidak beres!"
            })
        }
    }

    async delete({ params, response }) {
        try {
            const userRole = await UserRole.findOrFail(params.id)
            userRole.delete()

            return response.json({ message: 'User Role berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'User role tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async pagination({ request, response }) {
        try {
            let pagination = request.only(['page', 'limit', 'column', 'sort'])
            let page = pagination.page || 1;
            let limit = pagination.limit || 10;
            let column = pagination.column || 'user_role_id';
            let sort = pagination.sort || 'desc';

            const userRole = await UserRole
                .query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(userRole)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'user_role_keterangan';
            let value = search.value.toLowerCase();

            let userRole = await UserRole
                .query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (userRole.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(userRole)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }
}

module.exports = UserRoleController
