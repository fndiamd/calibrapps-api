'use strict'

const PosisiUkur = use('App/Models/PosisiUkur')

class PosisiUkurController {
    
    async index({response}){
        let posisiUkur = await PosisiUkur.query().fetch()
        return response.json(posisiUkur)
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
}

module.exports = PosisiUkurController
