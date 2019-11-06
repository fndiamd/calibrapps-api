'use strict'

const PosisiUkur = use('App/Models/PosisiUkur')

class PosisiUkurController {
    
    async index({response}){
        let posisiUkur = await PosisiUkur.query().fetch()
        return response.json(posisiUkur)
    }

    async view({params, response }){
        let posisiUkur = await PosisiUkur.query().where('posisi_ukur_id', params.id).first()
        return posisiUkur
    }

    async store({response, request}){
        const posisiUkur = new PosisiUkur()
        const data = {
            posisi_ukur_posisi : request.input('posisi_ukur_posisi')
        }

        posisiUkur.posisi_ukur_posisi = data.posisi_ukur_posisi

        await posisiUkur.save()
        return response.json(posisiUkur)   
    }

    async update({params, response, request}){
        let posisiUkur = await PosisiUkur.find(params.id)
        
        const data = {
          posisi_ukur_posisi : request.input('posisi_ukur_posisi')
        }

        posisiUkur.posisi_ukur_posisi = data.posisi_ukur_posisi

        await posisiUkur.save()
        return response.json(posisiUkur)   
    }

    async delete ({ params, response }) {
      const posisiUkur = await PosisiUkur.find(params.id)
      posisiUkur.delete()
      return response.json({message: 'Posisi ukur berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const posisiUkur = await PosisiUkur.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(posisiUkur)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let posisiUkur = await PosisiUkur.query()
        .whereRaw(`${search.column} LIKE %${search.value}%`)
        .fetch()
        return response.json(posisiUkur)
    }
}

module.exports = PosisiUkurController
