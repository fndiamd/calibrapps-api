'use strict'

const InvoiceStatus = use('App/Models/InvoiceStatus')
const { validate } = use('Validator')

let rules = {
    invoice_status_keterangan: 'required|unique:invoice_statuses,invoice_status_keterangan',
    invoice_status_warna: 'required|unique:invoice_statuses,invoice_status_warna'
}

const vmessage = {
    'invoice_status_keterangan.required': 'Status tidak boleh kosong',
    'invoice_status_keterangan.unique': 'Status sudah ada, tidak boleh duplikat',
    'invoice_status_warna.required': 'Warna status tidak boleh kosong',
    'invoice_status_warna.unique': 'Warna sudah dipakai, tidak boleh duplikat'
}

class InvoiceStatusController {

    async index({ response }) {
        try {
            let invoiceStatus = await InvoiceStatus.query().fetch()
            return response.json(invoiceStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params }) {
        try {
            let invoiceStatus = await InvoiceStatus.findOrFail(params.id)

            return invoiceStatus
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status invoice tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const invoiceStatus = new InvoiceStatus()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                invoice_status_keterangan: request.input('invoice_status_keterangan'),
                invoice_status_warna: request.input('invoice_status_warna')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            invoiceStatus.invoice_status_keterangan = data.invoice_status_keterangan
            invoiceStatus.invoice_status_warna = data.invoice_status_warna

            await invoiceStatus.save()
            return response.json(invoiceStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let invoiceStatus = await InvoiceStatus.findOrFail(params.id)

            const data = {
                invoice_status_keterangan: request.input('invoice_status_keterangan'),
                invoice_status_warna: request.input('invoice_status_warna')
            }

            if (invoiceStatus.invoice_status_keterangan === data.invoice_status_keterangan ||
                invoiceStatus.invoice_status_warna === data.invoice_status_warna) {
                rules = {
                    invoice_status_keterangan: 'required',
                    invoice_status_warna: 'required'
                }
            }

            const validation = await validate(request.all(), rules, vmessage)
            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            invoiceStatus.invoice_status_keterangan = data.invoice_status_keterangan
            invoiceStatus.invoice_status_warna = data.invoice_status_warna

            await invoiceStatus.save()
            return response.json(invoiceStatus)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status invoice tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const invoiceStatus = await InvoiceStatus.findOrFail(params.id)
            invoiceStatus.delete()

            return response.json({ message: 'Invoice status berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Status invoice tidak ditemukan'
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
            let column = pagination.column || 'invoice_status_id';
            let sort = pagination.sort || 'desc';

            const invoiceStatus = await InvoiceStatus.query()
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(invoiceStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'invoice_status_keterangan';
            let value = search.value.toLowerCase();

            let invoiceStatus = await InvoiceStatus.query()
                .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
                .fetch()

            if(invoiceStatus.rows.length == 0){
                return response.status(404).send({
                    message : 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(invoiceStatus)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = InvoiceStatusController
