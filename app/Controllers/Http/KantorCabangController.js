'use strict'

const KantorCabang = use('App/Models/KantorCabang')

class KantorCabangController {

    async index({ auth, response }) {
        let kantorCabang = await KantorCabang.query().fetch()
        return response.json(kantorCabang)
    }

    async view({params, response }){
        let kantorCabang = await KantorCabang.query().where('kantor_cabang_id', params.id).first()
        return userCabang
    }

    async store({ response, request }) {
        const kantorCabang = new KantorCabang()
        const data = {
            kantor_cabang_nama: request.input('kantor_cabang_nama'),
            kantor_cabang_alamat: request.input('kantor_cabang_alamat'),
            kantor_cabang_telepon: request.input('kantor_cabang_telepon'),
            kantor_cabang_fax: request.input('kantor_cabang_fax'),
            kantor_cabang_email: request.input('kantor_cabang_email'),
            kantor_status_id: request.input('kantor_status_id')
        }

        kantorCabang.kantor_cabang_nama = data.kantor_cabang_nama
        kantorCabang.kantor_cabang_alamat = data.kantor_cabang_alamat
        kantorCabang.kantor_cabang_telepon = data.kantor_cabang_telepon
        kantorCabang.kantor_cabang_fax = data.kantor_cabang_fax
        kantorCabang.kantor_cabang_email = data.kantor_cabang_email
        kantorCabang.kantor_status_id = data.kantor_status_id

        await kantorCabang.save()
        return response.json(kantorCabang)
    }

    async update({ params, response, request }) {
        let kantorCabang = await KantorCabang.find(params.id)

        const data = {
            kantor_cabang_nama: request.input('kantor_cabang_nama'),
            kantor_cabang_alamat: request.input('kantor_cabang_alamat'),
            kantor_cabang_telepon: request.input('kantor_cabang_telepon'),
            kantor_cabang_fax: request.input('kantor_cabang_fax'),
            kantor_cabang_email: request.input('kantor_cabang_email'),
            kantor_status_id: request.input('kantor_status_id')
        }

        kantorCabang.kantor_cabang_nama = data.kantor_cabang_nama
        kantorCabang.kantor_cabang_alamat = data.kantor_cabang_alamat
        kantorCabang.kantor_cabang_telepon = data.kantor_cabang_telepon
        kantorCabang.kantor_cabang_fax = data.kantor_cabang_fax
        kantorCabang.kantor_cabang_email = data.kantor_cabang_email
        kantorCabang.kantor_status_id = data.kantor_status_id

        await kantorCabang.save()
        return response.json(kantorCabang)
    }

    async delete({ params, response }) {
        const kantorCabang = await KantorCabang.find(params.id)
        kantorCabang.delete()
        return response.json({ message: 'Kantor cabang berhasil dihapus' })
    }
}

module.exports = KantorCabangController
