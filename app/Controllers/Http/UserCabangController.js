'use strict'

const UserCabang = use('App/Models/UserCabang')
const { validate } = use('Validator')

let rules = {
    user_cabang_nama: 'required',
    user_cabang_email: 'required|email|unique:user_cabangs,user_cabang_email',
    user_cabang_password: 'required|min:8'
}

const vmessage = {
    'user_cabang_nama.required': 'Nama tidak boleh kosong!',
    'user_cabang_email.required': 'E-mail tidak boleh kosong!',
    'user_cabang_email.email': 'E-mail harus valid',
    'user_cabang_email.unique': 'E-mail sudah digunakan oleh user lain',
    'user_cabang_password.required': 'Password tidak boleh kosong!',
    'user_cabang_password.min': 'Password minimal berisi 8 karakter'
}

class UserCabangController {

    async index({ response }) {
        try {
            let userCabang = await UserCabang.query()
                .with('kantorCabang')
                .with('userRole')
                .fetch()

            return response.json(userCabang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let user = await UserCabang.findOrFail(params.id)
            let userCabang = await UserCabang
                .query()
                .where('user_cabang_id', params.id)
                .with('kantorCabang')
                .with('userRole')
                .first()

            return userCabang
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'User tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }

    }

    async store({ response, request }) {
        try {
            const userCabang = new UserCabang()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                user_cabang_nama: request.input('user_cabang_nama'),
                user_cabang_email: request.input('user_cabang_email'),
                user_cabang_password: request.input('user_cabang_password'),
                user_cabang_telepon: request.input('user_cabang_telepon'),
                user_cabang_alamat: request.input('user_cabang_alamat'),
                kantor_cabang_id: request.input('kantor_cabang_id'),
                user_role_id: request.input('user_role_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            userCabang.user_cabang_nama = data.user_cabang_nama
            userCabang.user_cabang_email = data.user_cabang_email
            userCabang.user_cabang_password = data.user_cabang_password
            userCabang.user_cabang_telepon = data.user_cabang_telepon
            userCabang.user_cabang_alamat = data.user_cabang_alamat
            userCabang.kantor_cabang_id = data.kantor_cabang_id
            userCabang.user_role_id = data.user_role_id

            await userCabang.save()
            return response.json(userCabang)
        } catch (error) {
            return response.status(400).send({
                message : 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        let userCabang = await UserCabang.find(params.id)

        const data = {
            user_cabang_nama: request.input('user_cabang_nama'),
            user_cabang_email: request.input('user_cabang_email'),
            user_cabang_password: userCabang.user_cabang_password,
            user_cabang_telepon: request.input('user_cabang_telepon'),
            user_cabang_alamat: request.input('user_cabang_alamat'),
            kantor_cabang_id: request.input('kantor_cabang_id'),
            user_role_id: request.input('user_role_id')
        }

        if (userCabang.user_cabang_email === data.user_cabang_email) {
            rules = {
                user_cabang_nama: 'required',
                user_cabang_email: 'required|email'
            }
        }

        const validation = await validate(request.all(), rules, vmessage)

        if (validation.fails()) {
            return response.status(400).send({
                message: validation.messages()[0].message,
                field: validation.messages()[0].field
            })
        }

        userCabang.user_cabang_nama = data.user_cabang_nama
        userCabang.user_cabang_email = data.user_cabang_email
        userCabang.user_cabang_password = data.user_cabang_password
        userCabang.user_cabang_telepon = data.user_cabang_telepon
        userCabang.user_cabang_alamat = data.user_cabang_alamat
        userCabang.kantor_cabang_id = data.kantor_cabang_id
        userCabang.user_role_id = data.user_role_id

        await userCabang.save()
        return response.json(userCabang)
    }

    async delete({ params, response }) {
        try {
            const unsurCabang = await UserCabang.findOrFail(params.id)
            unsurCabang.delete()

            return response.json({ message: 'User cabang berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'User tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async pagination({ request, response }) {
        try {
            let pagination = request.only(['page', 'limit', 'column', 'sort'])
            let page = pagination.page || 1;
            let limit = pagination.limit || 10;
            let column = pagination.column || 'user_cabang_nama';
            let sort = pagination.sort || 'desc';

            const userCabang = await UserCabang.query()
                .with('kantorCabang')
                .with('userRole')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(userCabang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'user_cabang_nama';
            let value = search.value.toLowerCase();

            let userCabang = await UserCabang.query()
                .with('kantorCabang')
                .with('userRole')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (userCabang.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(userCabang)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

}

module.exports = UserCabangController
