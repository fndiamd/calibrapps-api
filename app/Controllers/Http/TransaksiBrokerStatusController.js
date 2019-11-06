'use strict'

const TransaksiBrokerStatus = use('App/Models/TransaksiBrokerStatus')

class TransaksiBrokerStatusController {
    
    async index({response}){
        let transaksiBrokerStatus = await TransaksiBrokerStatus.query().fetch()
        return response.json(transaksiBrokerStatus)
    }

    async view({params, response }){
        let transaksiBrokerStatus = await TransaksiBrokerStatus.query().where('transaksi_broker_status_id', params.id).first()
        return transaksiBrokerStatus
    }
  
    async store({response, request}){
        const transaksiBrokerStatus = new TransaksiBrokerStatus()
        const data = {
            transaksi_broker_status_keterangan : request.input('transaksi_broker_status_keterangan'),
            transaksi_broker_status_warna: request.input('transaksi_broker_status_warna')
        }

        transaksiBrokerStatus.transaksi_broker_status_keterangan = data.transaksi_broker_status_keterangan
        transaksiBrokerStatus.transaksi_broker_status_warna = data.transaksi_broker_status_warna

        await transaksiBrokerStatus.save()
        return response.json(transaksiBrokerStatus)   
    }

    async update({params, response, request}){
        let transaksiBrokerStatus = await TransaksiBrokerStatus.find(params.id)
        
        const data = {
          transaksi_broker_status_keterangan : request.input('transaksi_broker_status_keterangan'),
          transaksi_broker_status_warna: request.input('transaksi_broker_status_warna')
        }

        transaksiBrokerStatus.transaksi_broker_status_keterangan = data.transaksi_broker_status_keterangan
        transaksiBrokerStatus.transaksi_broker_status_warna = data.transaksi_broker_status_warna

        await transaksiBrokerStatus.save()
        return response.json(transaksiBrokerStatus) 
    }

    async delete ({ params, response }) {
      const transaksiBrokerStatus = await TransaksiBrokerStatus.find(params.id)
      transaksiBrokerStatus.delete()
      return response.json({message: 'Transaksi broker status berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const transaksiBrokerStatus = await TransaksiBrokerStatus.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(transaksiBrokerStatus)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])

        let transaksiBrokerStatus = await TransaksiBrokerStatus.query()
        .whereRaw(`${search.column} LIKE '%${search.value.toLowerCase()}%'`)
        .fetch()
        return response.json(transaksiBrokerStatus)
    }
}

module.exports = TransaksiBrokerStatusController
