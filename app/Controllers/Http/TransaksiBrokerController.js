'use strict'

const TransaksiBroker = use('App/Models/TransaksiBroker')

class TransaksiBrokerController {
    
    async index({response}){
        let transaksiBroker = await TransaksiBroker.query()
        .with('perusahaanBroker')
        .with('barangKalibrasi')
        .with('transaksiBrokerStatus')
        .fetch()
        return response.json(transaksiBroker)
    }

    async view({params, response }){
        let transaksiBroker = await TransaksiBroker.query().where('transaksi_broker_id', params.id)
        .with('perusahaanBroker')
        .with('barangKalibrasi')
        .with('transaksiBrokerStatus')
        .first()
        return transaksiBroker
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

    async delete ({ params, response }) {
      const transaksiBroker = await TransaksiBroker.find(params.id)
      transaksiBroker.delete()
      return response.json({message: 'Transaksi broker berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const transaksiBroker = await TransaksiBroker.query()
        .with('perusahaanBroker')
        .with('barangKalibrasi')
        .with('transaksiBrokerStatus')
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(transaksiBroker)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])

        let transaksiBroker = await TransaksiBroker.query()
        .with('perusahaanBroker')
        .with('barangKalibrasi')
        .with('transaksiBrokerStatus')
        .whereRaw(`LOWER(${search.column}) LIKE '%${search.value.toLowerCase()}%'`)
        .fetch()
        return response.json(transaksiBroker)
    }
}

module.exports = TransaksiBrokerController
