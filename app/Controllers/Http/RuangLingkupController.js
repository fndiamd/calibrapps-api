'use strict'

const RuangLingkup = use('App/Models/RuangLingkup')

class RuangLingkupController {
    
    async index({response}){
        let ruangLingkup = await RuangLingkup.query().fetch()
        return response.json(ruangLingkup)
    }

    async view({params, response }){
        let ruangLingkup = await RuangLingkup.query().where('ruang_lingkup_id', params.id).first()
        return ruangLingkup
    }
  

    async store({response, request}){
        const ruangLingkup = new RuangLingkup()
        const data = {
            ruang_lingkup_keterangan : request.input('ruang_lingkup_keterangan')
        }

        ruangLingkup.ruang_lingkup_keterangan = data.ruang_lingkup_keterangan

        await ruangLingkup.save()
        return response.json(ruangLingkup)   
    }

    async update({params, response, request}){
        let ruangLingkup = await RuangLingkup.find(params.id)
        
        const data = {
          ruang_lingkup_keterangan : request.input('ruang_lingkup_keterangan')
        }

        ruangLingkup.ruang_lingkup_keterangan = data.ruang_lingkup_keterangan

        await ruangLingkup.save()
        return response.json(ruangLingkup)   
    }

    async delete ({ params, response }) {
      const ruangLingkup = await RuangLingkup.find(params.id)
      ruangLingkup.delete()
      return response.json({message: 'Ruang lingkup berhasil dihapus'})
    } 

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const ruangLingkup = await RuangLingkup.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(ruangLingkup)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let ruangLingkup = await RuangLingkup.query()
        .whereRaw(`${search.column} LIKE %${search.value}%`)
        .fetch()
        return response.json(ruangLingkup)
      }
}

module.exports = RuangLingkupController
