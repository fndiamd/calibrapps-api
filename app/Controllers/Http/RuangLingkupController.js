'use strict'

const RuangLingkup = use('App/Models/RuangLingkup')

class RuangLingkupController {
    
    async index({response}){
        let ruangLingkup = await RuangLingkup.query().fetch()
        return response.json(ruangLingkup)
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

    async destroy ({ params, request, response }) {
      await RuangLingkup.find(params.id).delete()
      return response.json({message: 'Ruang lingkup berhasil dihapus'})
  } 
}

module.exports = RuangLingkupController
