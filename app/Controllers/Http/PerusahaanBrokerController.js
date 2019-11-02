'use strict'

const PerusahaanBroker = use('App/Models/PerusahaanBroker')

class PerusahaanBrokerController {
    
    async index({response}){
        let perusahaanBroker = await PerusahaanBroker.query()
        .with('brokerStatus')
        .fetch()
        return response.json(perusahaanBroker)
    }

    async view({params, response }){
        let perusahaanBroker = await PerusahaanBroker.query().where('perusahaan_broker_id', params.id)
        .with('brokerStatus')
        .first()
        return perusahaanBroker
    }

    async store({response, request}){
        const perusahaanBroker = new PerusahaanBroker()
        const data = {
            broker_nama : request.input('perusahaan_broker_nama'),
            broker_alamat : request.input('perusahaan_broker_alamat'),
            broker_telepon : request.input('perusahaan_broker_telepon'),
            broker_fax : request.input('perusahaan_broker_fax'),
            broker_email : request.input('perusahaan_broker_email'),
            broker_status : request.input('broker_status_id')
        }

        perusahaanBroker.perusahaan_broker_nama = data.broker_nama
        perusahaanBroker.perusahaan_broker_alamat = data.broker_alamat
        perusahaanBroker.perusahaan_broker_telepon = data.broker_telepon
        perusahaanBroker.perusahaan_broker_fax = data.broker_fax
        perusahaanBroker.perusahaan_broker_email = data.broker_email
        perusahaanBroker.broker_status_id = data.broker_status

        await perusahaanBroker.save()
        return response.json(perusahaanBroker)   
    }

    async update({params, response, request}){
        let perusahaanBroker = await PerusahaanBroker.find(params.id)
        
        const data = {
          broker_nama : request.input('perusahaan_broker_nama'),
          broker_alamat : request.input('perusahaan_broker_alamat'),
          broker_telepon : request.input('perusahaan_broker_telepon'),
          broker_fax : request.input('perusahaan_broker_fax'),
          broker_email : request.input('perusahaan_broker_email'),
          broker_status : request.input('broker_status_id')
        }

        perusahaanBroker.perusahaan_broker_nama = data.broker_nama
        perusahaanBroker.perusahaan_broker_alamat = data.broker_alamat
        perusahaanBroker.perusahaan_broker_telepon = data.broker_telepon
        perusahaanBroker.perusahaan_broker_fax = data.broker_fax
        perusahaanBroker.perusahaan_broker_email = data.broker_email
        perusahaanBroker.broker_status_id = data.broker_status

        await perusahaanBroker.save()
        return response.json(perusahaanBroker)   
    }

    async delete ({ params, response }) {
      const perusahaanBroker = await PerusahaanBroker.find(params.id)
      perusahaanBroker.delete()
      return response.json({message: 'Perusahaan broker berhasil dihapus'})
    }
    
    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const perusahaanBroker = await PerusahaanBroker.query()
        .with('brokerStatus')
        .paginate(page, limit)
        return response.json(perusahaanBroker)
    }
}

module.exports = PerusahaanBrokerController
