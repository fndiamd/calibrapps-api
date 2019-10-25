'use strict'

const UserCabang = use('App/Models/UserCabang')

class UserCabangController {

    async index({response}){
        let userCabang = await UserCabang.query().with('kantor_cabang').with('role').fetch()
        return response.json(userCabang)
    }

    async getById({params, response}){
        const userCabang = await UserCabang.findBy('user_cabang_id', params.id)
        return userCabang
    }

    async store({params, request, response}){
        const userCabang = new UserCabang()
        const data = {
            user_nama : request.input('user_cabang_nama'),
            user_email : request.input('user_cabang_email'),
            user_password : request.input('user_cabang_password'),
            user_telepon : request.input('user_cabang_telepon'),
            user_alamat : request.input('user_cabang_alamat'),
            kantor_cabang : request.input('kantor_cabang_id'),
            user_role : request.input('user_role_id')
        }

        userCabang.user_cabang_nama = data.user_nama
        userCabang.user_cabang_email = data.user_email
        userCabang.user_cabang_password = data.user_password
        userCabang.user_cabang_telepon = data.user_telepon
        userCabang.user_cabang_alamat = data.user_alamat
        userCabang.kantor_cabang_id = data.kantor_cabang
        userCabang.user_role_id = data.user_role

        await userCabang.save()
        return response.json(userCabang)

    }

    async update({params, request, response}){
        const userCabang = await UserCabang.find(params.id)
        const data = {
            user_nama : request.input('user_cabang_nama'),
            user_email : request.input('user_cabang_email'),
            user_password : request.input('user_cabang_password'),
            user_telepon : request.input('user_cabang_telepon'),
            user_alamat : request.input('user_cabang_alamat'),
            kantor_cabang : request.input('kantor_cabang_id'),
            user_role : request.input('user_role_id')
        }

        userCabang.user_cabang_nama = data.user_nama
        userCabang.user_cabang_email = data.user_email
        userCabang.user_cabang_password = data.user_password
        userCabang.user_cabang_telepon = data.user_telepon
        userCabang.user_cabang_alamat = data.user_alamat
        userCabang.kantor_cabang_id = data.kantor_cabang
        userCabang.user_role_id = data.user_role

        await userCabang.save()
        return response.json(userCabang)
    }

    async delete({params, response}){
        const userCabang = await UserCabang.find(params.id)
        userCabang.delete()
        return response.json({message : "User berhasil dihapus"})
    }

}

module.exports = UserCabangController
