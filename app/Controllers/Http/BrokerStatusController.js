'use strict'

const BrokerStatus = use('App/Models/BrokerStatus')

class BrokerStatusController {

    async index({ response }) {
        let brokerStatus = await BrokerStatus.query().fetch()
        return response.json(brokerStatus)
    }

    async store({ response, request }) {
        const brokerStatus = new BrokerStatus()
        const data = {
            broker_status_keterangan: request.input('broker_status_keterangan')
        }

        brokerStatus.broker_status_keterangan = data.broker_status_keterangan

        await brokerStatus.save()
        return response.json(brokerStatus)
    }

    async update({ params, response, request }) {
        let brokerStatus = await BrokerStatus.find(params.id)

        const data = {
            broker_status_keterangan: request.input('broker_status_keterangan')
        }

        brokerStatus.broker_status_keterangan = data.broker_status_keterangan

        await brokerStatus.save()
        return response.json(brokerStatus)
    }

    async destroy({ params, request, response }) {
        await BrokerStatus.find(params.id).delete()
        return response.json({ message: 'Broker status berhasil dihapus' })
    }
}

module.exports = BrokerStatusController
