'use strict'

const PerusahaanBroker = use('App/Models/PerusahaanBroker')

class PerusahaanBrokerController {

    async index({ response }) {
        try {
            let perusahaanBroker = await PerusahaanBroker
                .query()
                .with('brokerStatus')
                .fetch()

            return response.json(perusahaanBroker)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {
            let broker = await PerusahaanBroker.findOrFail(params.id)
            let perusahaanBroker = await PerusahaanBroker
                .query()
                .where('perusahaan_broker_id', params.id)
                .with('brokerStatus')
                .first()

            return perusahaanBroker
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Broker tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const perusahaanBroker = new PerusahaanBroker()
            const data = {
                broker_nama: request.input('perusahaan_broker_nama'),
                broker_alamat: request.input('perusahaan_broker_alamat'),
                broker_telepon: request.input('perusahaan_broker_telepon'),
                broker_fax: request.input('perusahaan_broker_fax'),
                broker_email: request.input('perusahaan_broker_email'),
                broker_status: request.input('broker_status_id')
            }

            perusahaanBroker.perusahaan_broker_nama = data.broker_nama
            perusahaanBroker.perusahaan_broker_alamat = data.broker_alamat
            perusahaanBroker.perusahaan_broker_telepon = data.broker_telepon
            perusahaanBroker.perusahaan_broker_fax = data.broker_fax
            perusahaanBroker.perusahaan_broker_email = data.broker_email
            perusahaanBroker.broker_status_id = data.broker_status

            await perusahaanBroker.save()
            return response.json(perusahaanBroker)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let perusahaanBroker = await PerusahaanBroker.findOrFail(params.id)

            const data = {
                broker_nama: request.input('perusahaan_broker_nama'),
                broker_alamat: request.input('perusahaan_broker_alamat'),
                broker_telepon: request.input('perusahaan_broker_telepon'),
                broker_fax: request.input('perusahaan_broker_fax'),
                broker_email: request.input('perusahaan_broker_email'),
                broker_status: request.input('broker_status_id')
            }

            perusahaanBroker.perusahaan_broker_nama = data.broker_nama
            perusahaanBroker.perusahaan_broker_alamat = data.broker_alamat
            perusahaanBroker.perusahaan_broker_telepon = data.broker_telepon
            perusahaanBroker.perusahaan_broker_fax = data.broker_fax
            perusahaanBroker.perusahaan_broker_email = data.broker_email
            perusahaanBroker.broker_status_id = data.broker_status

            await perusahaanBroker.save()
            return response.json(perusahaanBroker)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Broker tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const perusahaanBroker = await PerusahaanBroker.findOrFail(params.id)
            perusahaanBroker.delete()

            return response.json({ message: 'Perusahaan broker berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Broker tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async pagination({ request, response }) {
        try {
            let pagination = request.only(['page', 'limit', 'column', 'sort'])
            let page = pagination.page || 1;
            let limit = pagination.limit || 10;
            let column = pagination.column || 'perusahaan_broker_id';
            let sort = pagination.sort || 'desc';

            const perusahaanBroker = await PerusahaanBroker.query()
                .with('brokerStatus')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(perusahaanBroker)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'perusahaan_broker_nama';
            let value = search.value.toLowerCase();

            let perusahaanBroker = await PerusahaanBroker.query()
                .with('brokerStatus')
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(perusahaanBroker.rows.length == 0){
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(perusahaanBroker)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = PerusahaanBrokerController
