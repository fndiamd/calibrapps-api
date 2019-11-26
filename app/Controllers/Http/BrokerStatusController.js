'use strict'

const BrokerStatus = use('App/Models/BrokerStatus')

class BrokerStatusController {

    async index({ response }) {
        let brokerStatus = await BrokerStatus.query().fetch()
        return response.json(brokerStatus)
    }

    async view({ params }) {
        let brokerStatus = await BrokerStatus.query().where('broker_status_id', params.id).first()
        return brokerStatus
    }

    async store({ response, request }) {
        const brokerStatus = new BrokerStatus()
        const data = {
            broker_status_keterangan: request.input('broker_status_keterangan'),
            broker_status_warna: request.input('broker_status_warna')
        }

        brokerStatus.broker_status_keterangan = data.broker_status_keterangan
        brokerStatus.broker_status_warna = data.broker_status_warna

        await brokerStatus.save()
        return response.json(brokerStatus)
    }

    async update({ params, response, request }) {
        let brokerStatus = await BrokerStatus.find(params.id)

        const data = {
            broker_status_keterangan: request.input('broker_status_keterangan'),
            broker_status_warna: request.input('broker_status_warna')
        }

        brokerStatus.broker_status_keterangan = data.broker_status_keterangan
        brokerStatus.broker_status_warna = data.broker_status_warna

        await brokerStatus.save()
        return response.json(brokerStatus)
    }

    async delete({ params, response }) {
        const brokerStatus = await BrokerStatus.find(params.id)
        brokerStatus.delete()
        return response.json({ message: 'Broker status berhasil dihapus' })
    }

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const brokerStatus = await BrokerStatus.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(brokerStatus)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let brokerStatus = await BrokerStatus.query()
        .whereRaw(`LOWER(${search.column}) LIKE '%${search.value.toLowerCase()}%'`)
        .fetch()
        return response.json(brokerStatus)
    }
}

module.exports = BrokerStatusController
