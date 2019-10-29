'use strict'

const DataUkur = use('App/Models/DataUkur')

class DataUkurController {
    
    async index({response}){
        let dataUkur = await DataUkur.query().fetch()
        return response.json(dataUkur)
    }

    async store({response, request}){
        const dataUkur = new DataUkur()
        const data = {
            data_ukur_setting_point : request.input('data_ukur_setting_point'),
            data_pengamatan_id : request.input('data_pengamatan_id'),
            barang_kalibrasi_id : request.input('barang_kalibrasi_id')
        }

        dataUkur.data_ukur_setting_point = data.data_ukur_setting_point
        dataUkur.data_pengamatan_id = data.data_pengamatan_id
        dataUkur.barang_kalibrasi_id = data.barang_kalibrasi_id

        await dataUkur.save()
        return response.json(dataUkur)   
    }

    async update({params, response, request}){
        let dataUkur = await DataUkur.find(params.id)
        
        const data = {
          data_ukur_setting_point : request.input('data_ukur_setting_point'),
          data_pengamatan_id : request.input('data_pengamatan_id'),
          barang_kalibrasi_id : request.input('barang_kalibrasi_id')
        }

        dataUkur.data_ukur_setting_point = data.data_ukur_setting_point
        dataUkur.data_pengamatan_id = data.data_pengamatan_id
        dataUkur.barang_kalibrasi_id = data.barang_kalibrasi_id

        await dataUkur.save()
        return response.json(dataUkur)
    }

    async delete ({ params, response }) {
      const dataUkur = await DataUkur.find(params.id)
      dataUkur.delete()
      return response.json({message: 'Data ukur berhasil dihapus'})
  } 
}

module.exports = DataUkurController
