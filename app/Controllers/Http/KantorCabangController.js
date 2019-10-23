'use strict'

const KantorCabang = use('App/Models/KantorCabang')

class KantorCabangController {
    
    async index({response}){
        let kantorCabang = await KantorCabang.query().fetch()
        return response.json(kantorCabang)
    }

    async getById({params, response}){
        const kantorCabang = KantorCabang.findBy('kantor_cabang_id', params.id)
        return kantorCabang
    }

    async store({response, request}){
        const kantorCabang = new KantorCabang()
        const data = {
            kantor_nama : request.input('kantor_cabang_nama'),
            kantor_alamat : request.input('kantor_cabang_alamat'),
            kantor_telepon : request.input('kantor_cabang_telepon'),
            kantor_fax : request.input('kantor_cabang_fax'),
            kantor_email : request.input('kantor_cabang_email'),
            kantor_status : request.input('kantor_status_id')
        }

        kantorCabang.kantor_cabang_nama = data.kantor_nama
        kantorCabang.kantor_cabang_alamat = data.kantor_alamat
        kantorCabang.kantor_cabang_telepon = data.kantor_telepon
        kantorCabang.kantor_cabang_fax = data.kantor_fax
        kantorCabang.kantor_cabang_email = data.kantor_email
        kantorCabang.kantor_status_id = data.kantor_status

        await kantorCabang.save()
        return response.json(kantorCabang)   
    }

    async update({params, response, request}){
        const kantorCabang = await KantorCabang.find(params.id)
        const data = {
            kantor_nama : request.input('kantor_cabang_nama'),
            kantor_alamat : request.input('kantor_cabang_alamat'),
            kantor_telepon : request.input('kantor_cabang_telepon'),
            kantor_fax : request.input('kantor_cabang_fax'),
            kantor_email : request.input('kantor_cabang_email'),
            kantor_status : request.input('kantor_status_id')
        }

        kantorCabang.kantor_cabang_nama = data.kantor_nama
        kantorCabang.kantor_cabang_alamat = data.kantor_alamat
        kantorCabang.kantor_cabang_telepon = data.kantor_telepon
        kantorCabang.kantor_cabang_fax = data.kantor_fax
        kantorCabang.kantor_cabang_email = data.kantor_email
        kantorCabang.kantor_status_id = data.kantor_status

        await kantorCabang.save()
        return response.json(kantorCabang)  
    }

    async delete({params, response}){
        const kantorCabang = await KantorCabang.find(params.id)
        kantorCabang.delete()
        return response.json({message : 'Kantor cabang berhasil dihapus'})
    }

}

module.exports = KantorCabangController
