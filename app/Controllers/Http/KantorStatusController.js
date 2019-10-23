'use strict'

const KantorStatus = use('App/Models/KantorStatus')

class KantorStatusController {
    async index({response}){
        let kantorStatus = await KantorStatus.query().fetch()
        return response.json(kantorStatus)
    }

    async getById({params, response}){
        const kantorStatus = KantorStatus.findBy('kantor_status_id', params.id)
        return kantorStatus
    }

    async store({request, response}){
        const kantorStatus = new KantorStatus()
        const kantorKeterangan = request.input('kantor_status_keterangan')
        kantorStatus.kantor_status_keterangan = kantorKeterangan
        await kantorStatus.save()
        return response.json(kantorStatus)
    }

    async update({params, request, response}){
        const kantorStatus = await KantorStatus.find(params.id)
        const kantorKeterangan = request.input('kantor_status_keterangan')
        kantorStatus.kantor_status_keterangan = kantorKeterangan
        await kantorStatus.save()
        return response.json(kantorStatus)
    }

    async delete({params, response}){
        const kantorStatus = await KantorStatus.find(params.id)
        await kantorStatus.delete()
        return response.json({message : 'Status berhasil dihapus'})
    }
}

module.exports = KantorStatusController
