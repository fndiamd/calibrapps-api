'use strict'

const TransaksiBrokerStatus = use('App/Models/TransaksiBrokerStatus')

class TransaksiBrokerStatusController {
    
    async index({response}){
        let transaksiBrokerStatus = await TransaksiBrokerStatus.query().fetch()
        return response.json(transaksiBrokerStatus)
    }

    async store({response, request}){
        const transaksiBrokerStatus = new TransaksiBrokerStatus()
        const data = {
            transaksi_broker_status_keterangan : request.input('transaksi_broker_status_keterangan')
        }

        transaksiBrokerStatus.transaksi_broker_status_keterangan = data.transaksi_broker_status_keterangan

        await transaksiBrokerStatus.save()
        return response.json(transaksiBrokerStatus)   
    }

    async update({params, response, request}){
        let transaksiBrokerStatus = await TransaksiBrokerStatus.find(params.id)
        
        const data = {
          transaksi_broker_status_keterangan : request.input('transaksi_broker_status_keterangan')
        }

        transaksiBrokerStatus.transaksi_broker_status_keterangan = data.transaksi_broker_status_keterangan

        await transaksiBrokerStatus.save()
        return response.json(transaksiBrokerStatus) 
    }

    async destroy ({ params, request, response }) {
      await TransaksiBrokerStatus.find(params.id).delete()
      return response.json({message: 'Transaksi broker status berhasil dihapus'})
  } 
}

module.exports = TransaksiBrokerStatusController
