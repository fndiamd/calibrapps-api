'use strict'

const StandarKalibrasi = use('App/Models/StandarKalibrasi')

class StandarKalibrasiController {
    
    async index({response}){
        let standarKalibrasi = await StandarKalibrasi.query().fetch()
        return response.json(standarKalibrasi)
    }

    async store({response, request}){
        const standarKalibrasi = new StandarKalibrasi()
        const data = {
            standar_kalibrasi_keterangan : request.input('standar_kalibrasi_keterangan')
        }

        standarKalibrasi.standar_kalibrasi_keterangan = data.standar_kalibrasi_keterangan

        await standarKalibrasi.save()
        return response.json(standarKalibrasi)   
    }

    async update({params, response, request}){
        let standarKalibrasi = await StandarKalibrasi.find(params.id)
        
        const data = {
          standar_kalibrasi_keterangan : request.input('standar_kalibrasi_keterangan')
        }

        standarKalibrasi.standar_kalibrasi_keterangan = data.standar_kalibrasi_keterangan

        await standarKalibrasi.save()
        return response.json(standarKalibrasi)   
    }

    async delete ({ params, response }) {
      const standarKalibrasi = await StandarKalibrasi.find(params.id)
      standarKalibrasi.delete()
      return response.json({message: 'Standar Kalibrasi berhasil dihapus'})
  } 
}

module.exports = StandarKalibrasiController
