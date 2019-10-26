'use strict'

const TransaksiBroker = use('App/Models/TransaksiBroker')

class TransaksiBrokerController {
    
    async index({response}){
        let transaksiBroker = await TransaksiBroker.query().fetch()
        return response.json(transaksiBroker)
    }

    async store({response, request}){
        const transaksiBroker = new TransaksiBroker()
        const data = {
            transaksi_broker_tanggal_penyerahan : request.input('transaksi_broker_tanggal_penyerahan'),
            perusahaan_broker_id : request.input('perusahaan_broker_id'),
            barang_kalibrasi_id : request.input('barang_kalibrasi_id'),
            transaksi_broker_status_id : request.input('transaksi_broker_status_id')
        }

        transaksiBroker.transaksi_broker_tanggal_penyerahan = data.transaksi_broker_tanggal_penyerahan
        transaksiBroker.perusahaan_broker_id = data.perusahaan_broker_id
        transaksiBroker.barang_kalibrasi_id = data.barang_kalibrasi_id
        transaksiBroker.transaksi_broker_status_id = data.transaksi_broker_status_id

        await transaksiBroker.save()
        return response.json(transaksiBroker)   
    }

    async update({params, response, request}){
        let transaksiBroker = await TransaksiBroker.find(params.id)
        
        const data = {
          transaksi_broker_tanggal_penyerahan : request.input('transaksi_broker_tanggal_penyerahan'),
          perusahaan_broker_id : request.input('perusahaan_broker_id'),
          barang_kalibrasi_id : request.input('barang_kalibrasi_id'),
          transaksi_broker_status_id : request.input('transaksi_broker_status_id')
        }

        transaksiBroker.transaksi_broker_tanggal_penyerahan = data.transaksi_broker_tanggal_penyerahan
        transaksiBroker.perusahaan_broker_id = data.perusahaan_broker_id
        transaksiBroker.barang_kalibrasi_id = data.barang_kalibrasi_id
        transaksiBroker.transaksi_broker_status_id = data.transaksi_broker_status_id

        await transaksiBroker.save()
        return response.json(transaksiBroker)  
    }

    async destroy ({ params, request, response }) {
      await TransaksiBroker.find(params.id).delete()
      return response.json({message: 'Transaksi broker berhasil dihapus'})
  } 
}

module.exports = TransaksiBrokerController
