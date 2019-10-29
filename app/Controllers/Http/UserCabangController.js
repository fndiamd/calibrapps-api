'use strict'

const UserCabang = use('App/Models/UserCabang')

class UserCabangController {

    async index({ response }) {
        let userCabang = await UserCabang.query().fetch()
        return response.json(userCabang)
    }

    async store({ response, request }) {
        const userCabang = new UserCabang()
        const data = {
            user_cabang_nama: request.input('user_cabang_nama'),
            user_cabang_email: request.input('user_cabang_email'),
            user_cabang_password: request.input('user_cabang_password'),
            user_cabang_telepon: request.input('user_cabang_telepon'),
            user_cabang_alamat: request.input('user_cabang_alamat'),
            kantor_cabang_id: request.input('kantor_cabang_id'),
            user_role_id: request.input('user_role_id')
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

    async update({ params, response, request }) {
        let userCabang = await UserCabang.find(params.id)

        const data = {
            user_cabang_nama: request.input('user_cabang_nama'),
            user_cabang_email: request.input('user_cabang_email'),
            user_cabang_password: request.input('user_cabang_password'),
            user_cabang_telepon: request.input('user_cabang_telepon'),
            user_cabang_alamat: request.input('user_cabang_alamat'),
            kantor_cabang_id: request.input('kantor_cabang_id'),
            user_role_id: request.input('user_role_id')
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
        const unsurCabang = await UserCabang.find(params.id)
        unsurCabang.delete()
        return response.json({ message: 'User cabang berhasil dihapus' })
    }
}

module.exports = UserCabangController
