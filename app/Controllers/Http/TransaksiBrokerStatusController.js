'use strict'

const TransaksiBrokerStatus = use('App/Models/TransaksiBrokerStatus')
const { validate } = use('Validator')

let rules = {
    transaksi_broker_status_keterangan: 'required|unique:transaksi_broker_statuses,transaksi_broker_status_keterangan',
    transaksi_broker_status_warna: 'required|unique:transaksi_broker_statuses,transaksi_broker_status_warna'
}

const vmessage = {
    'transaksi_broker_status_keterangan.required': 'Status tidak boleh kosong',
    'transaksi_broker_status_keterangan.unique': 'Status sudah ada, tidak boleh duplikat',
    'transaksi_broker_status_warna.required': 'Warna status tidak boleh kosong',
    'transaksi_broker_status_warna.unique': 'Warna sudah dipakai, tidak boleh duplikat'
}

class TransaksiBrokerStatusController {

    async index({ response }) {
        try {
            let transaksiBrokerStatus = await TransaksiBrokerStatus.query().fetch()
            return response.json(transaksiBrokerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params, response }) {
        try {

        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
        let transaksiBrokerStatus = await TransaksiBrokerStatus.query().where('transaksi_broker_status_id', params.id).first()
        return transaksiBrokerStatus
    }

    async store({ response, request }) {
        try {

        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
        const transaksiBrokerStatus = new TransaksiBrokerStatus()
        const data = {
            transaksi_broker_status_keterangan: request.input('transaksi_broker_status_keterangan'),
            transaksi_broker_status_warna: request.input('transaksi_broker_status_warna')
        }

        transaksiBrokerStatus.transaksi_broker_status_keterangan = data.transaksi_broker_status_keterangan
        transaksiBrokerStatus.transaksi_broker_status_warna = data.transaksi_broker_status_warna

        await transaksiBrokerStatus.save()
        return response.json(transaksiBrokerStatus)
    }

    async update({ params, response, request }) {
        try {

        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
        let transaksiBrokerStatus = await TransaksiBrokerStatus.find(params.id)

        const data = {
            transaksi_broker_status_keterangan: request.input('transaksi_broker_status_keterangan'),
            transaksi_broker_status_warna: request.input('transaksi_broker_status_warna')
        }

        transaksiBrokerStatus.transaksi_broker_status_keterangan = data.transaksi_broker_status_keterangan
        transaksiBrokerStatus.transaksi_broker_status_warna = data.transaksi_broker_status_warna

        await transaksiBrokerStatus.save()
        return response.json(transaksiBrokerStatus)
    }

    async delete({ params, response }) {
        try {

        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
        const transaksiBrokerStatus = await TransaksiBrokerStatus.find(params.id)
        transaksiBrokerStatus.delete()
        return response.json({ message: 'Transaksi broker status berhasil dihapus' })
    }

    async pagination({ request, response }) {
        try {

        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const transaksiBrokerStatus = await TransaksiBrokerStatus.query()
            .orderBy(`${pagination.column}`, `${pagination.sort}`)
            .paginate(page, limit)
        return response.json(transaksiBrokerStatus)
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'transaksi_broker_status_keterangan';
            let value = search.value.toLowerCase();

            let transaksiBrokerStatus = await TransaksiBrokerStatus.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(transaksiBrokerStatus.rows.length == 0){
                return response.status(404).send({
                    message : 'Pencarian untuk ' + value + ' tidak ditemukannsa'
                })
            }

            return response.json(transaksiBrokerStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = TransaksiBrokerStatusController
