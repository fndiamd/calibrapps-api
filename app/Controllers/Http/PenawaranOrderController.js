'use strict'

const PenawaranOrder = use('App/Models/PenawaranOrder')

class PenawaranOrderController {
    
    async index({response}){
        let penawaranOrder = await PenawaranOrder.query().fetch()
        return response.json(penawaranOrder)
    }

    async store({response, request}){
        const penawaranOrder = new PenawaranOrder()
        const data = {
            penawaran_order_nomor : request.input('penawaran_order_nomor'),
            penawaran_order_perusahaan : request.input('penawaran_order_perusahaan'),
            penawaran_order_tanggal_penawaran : request.input('penawaran_order_tanggal_penawaran'),
            penawaran_order_order_file : request.input('penawaran_order_order_file'),
            penawaran_status_id : request.input('penawaran_status_id')
        }

        penawaranOrder.penawaran_order_nomor = data.penawaran_order_nomor
        penawaranOrder.penawaran_order_perusahaan = data.penawaran_order_perusahaan
        penawaranOrder.penawaran_order_tanggal_penawaran = data.penawaran_order_tanggal_penawaran
        penawaranOrder.penawaran_order_order_file = data.penawaran_order_order_file
        penawaranOrder.penawaran_status_id = data.penawaran_status_id

        await penawaranOrder.save()
        return response.json(penawaranOrder)   
    }

    async update({params, response, request}){
        let penawaranOrder = await PenawaranOrder.find(params.id)
        
        const data = {
          penawaran_order_nomor : request.input('penawaran_order_nomor'),
          penawaran_order_perusahaan : request.input('penawaran_order_perusahaan'),
          penawaran_order_tanggal_penawaran : request.input('penawaran_order_tanggal_penawaran'),
          penawaran_order_order_file : request.input('penawaran_order_order_file'),
          penawaran_status_id : request.input('penawaran_status_id')
        }

        penawaranOrder.penawaran_order_nomor = data.penawaran_order_nomor
        penawaranOrder.penawaran_order_perusahaan = data.penawaran_order_perusahaan
        penawaranOrder.penawaran_order_tanggal_penawaran = data.penawaran_order_tanggal_penawaran
        penawaranOrder.penawaran_order_order_file = data.penawaran_order_order_file
        penawaranOrder.penawaran_status_id = data.penawaran_status_id

        await penawaranOrder.save()
        return response.json(penawaranOrder)  
    }

    async delete ({ params, response }) {
      const penawaranOrder = await PenawaranOrder.find(params.id)
      penawaranOrder.delete()
      return response.json({message: 'Penawaran oder berhasil dihapus'})
  } 
}

module.exports = PenawaranOrderController
