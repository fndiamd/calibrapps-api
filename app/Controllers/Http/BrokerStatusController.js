'use strict'

const BrokerStatus = use('App/Models/BrokerStatus')
const { validate } = use('Validator')

let rules = {
    broker_status_keterangan: 'required|unique:broker_statuses,broker_status_keterangan',
    broker_status_warna: 'required|unique:broker_statuses,broker_status_warna'
}

const vmessage = {
    'broker_status_keterangan.required': 'Status tidak boleh kosong',
    'broker_status_keterangan.unique': 'Status sudah ada, tidak boleh duplikat',
    'broker_status_warna.required': 'Warna status tidak boleh kosong',
    'broker_status_warna.unique': 'Warna sudah dipakai, tidak boleh duplikat'
}

class BrokerStatusController {

    async index({ response }) {
        try {
            let brokerStatus = await BrokerStatus.query().fetch()

            return response.json(brokerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async view({ params }) {
        try {
            let brokerStatus = await BrokerStatus.findOrFail(params.id)
            
            return brokerStatus
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status broker tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const brokerStatus = new BrokerStatus()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                broker_status_keterangan: request.input('broker_status_keterangan'),
                broker_status_warna: request.input('broker_status_warna')
            }

            if (validation.fails()) {
                return response.status(400).message({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            brokerStatus.broker_status_keterangan = data.broker_status_keterangan
            brokerStatus.broker_status_warna = data.broker_status_warna

            await brokerStatus.save()
            return response.json(brokerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let brokerStatus = await BrokerStatus.find(params.id)

            const data = {
                broker_status_keterangan: request.input('broker_status_keterangan'),
                broker_status_warna: request.input('broker_status_warna')
            }

            if (brokerStatus.broker_status_keterangan === data.broker_status_keterangan ||
                brokerStatus.broker_status_warna === data.broker_status_warna) {
                rules = {
                    broker_status_keterangan: 'required',
                    broker_status_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).message({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            brokerStatus.broker_status_keterangan = data.broker_status_keterangan
            brokerStatus.broker_status_warna = data.broker_status_warna

            await brokerStatus.save()
            return response.json(brokerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }

    }

    async delete({ params, response }) {
        try {
            const brokerStatus = await BrokerStatus.findOrFail(params.id)
            brokerStatus.delete()

            return response.json({ message: 'Broker status berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status broker tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async pagination({ request, response }) {
        try {
            let pagination = request.only(['page', 'limit', 'column', 'sort'])
            let page = pagination.page || 1;
            let limit = pagination.limit || 10;
            let column = pagination.column || 'broker_status_id';
            let sort = pagination.sort || 'desc';

            const brokerStatus = await BrokerStatus.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(brokerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let colum = search.colum || 'broker_status_keterangan';
            let value = search.value.toLowerCase();

            let brokerStatus = await BrokerStatus.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if (brokerStatus.row.length == 0) {
                return response.status(404).send({
                    message: 'Status broker tidak ditemukan'
                })
            }

            return response.json(brokerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, kelihatannya ada yang tidak beres!'
            })
        }
    }
}

module.exports = BrokerStatusController
