'use strict'

const InvoiceOrder = use('App/Models/InvoiceOrder')
const { validate } = use('Validator')

let rules = {
    invoice_order_tanggal: 'required',
    invoice_order_total: 'required',
    progres_order_id: 'required',
    invoice_status_id: 'required',
}
const vmessage = {
    'invoice_order_tanggal.required': 'Tanggal invoice tidak boleh kosong',
    'invoice_order_total.required': 'Total invoice tidak boleh kosong',
    'progres_order_id.required': 'Progres order tidak boleh kosong',
    'invoice_status_id.required': 'Status invoice tidak boleh kosong',
}

class InvoiceOrderController {

    async index({ response }) {
        try {
            let invoiceOrder = await InvoiceOrder.query()
                .with('progresOrder')
                .with('invoiceStatus')
                .fetch()

            return response.json(invoiceOrder)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async view({ params }) {
        try {
            let invoice = await InvoiceOrder.findOrFail(params.id)
            let invoiceOrder = await InvoiceOrder
                .query()
                .where('invoice_order_id', params.id)
                .with('progresOrder')
                .with('invoiceStatus')
                .first()

            return invoiceOrder
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Invoice tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async store({ response, request }) {
        try {
            const invoiceOrder = new InvoiceOrder()
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                invoice_order_tanggal: request.input('invoice_order_tanggal'),
                invoice_order_total: request.input('invoice_order_total'),
                progres_order_id: request.input('progres_order_id'),
                invoice_status_id: request.input('invoice_status_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            invoiceOrder.invoice_order_tanggal = data.invoice_order_tanggal
            invoiceOrder.invoice_order_total = data.invoice_order_total
            invoiceOrder.progres_order_id = data.progres_order_id
            invoiceOrder.invoice_status_id = data.invoice_status_id

            await invoiceOrder.save()
            return response.json(invoiceOrder)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async update({ params, response, request }) {
        try {
            let invoiceOrder = await InvoiceOrder.findOrFail(params.id)
            const validation = await validate(request.all(), rules, vmessage)

            const data = {
                invoice_order_tanggal: request.input('invoice_order_tanggal'),
                invoice_order_total: request.input('invoice_order_total'),
                progres_order_id: request.input('progres_order_id'),
                invoice_status_id: request.input('invoice_status_id')
            }

            if (validation.fails()) {
                return response.status(400).send({
                    message: validation.messages()[0].message,
                    field: validation.messages()[0].field
                })
            }

            invoiceOrder.invoice_order_tanggal = data.invoice_order_tanggal
            invoiceOrder.invoice_order_total = data.invoice_order_total
            invoiceOrder.progres_order_id = data.progres_order_id
            invoiceOrder.invoice_status_id = data.invoice_status_id

            await invoiceOrder.save()
            return response.json(invoiceOrder)
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Invoice tidak ditemukan'
                })
            }

            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async delete({ params, response }) {
        try {
            const invoiceOrder = await InvoiceOrder.findOrFail(params.id)
            invoiceOrder.delete()

            return response.json({ message: 'Invoice status berhasil dihapus' })
        } catch (error) {
            if (error.name === 'ModelNotFoundException') {
                return response.status(404).send({
                    message: 'Invoice tidak ditemukan'
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
            let column = pagination.column || 'invoice_order_id';
            let sort = pagination.sort || 'desc';

            const invoiceOrder = await InvoiceOrder.query()
                .with('progresOrder')
                .with('invoiceStatus')
                .orderBy(`${column}`, `${sort}`)
                .paginate(page, limit)

            return response.json(invoiceOrder)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }

    async search({ request, response }) {
        try {
            let search = request.only(['column', 'value'])
            let column = search.column || 'progres_order_id';
            let value = search.value;

            let invoiceOrder = await InvoiceOrder.query()
                .with('progresOrder')
                .with('invoiceStatus')
                .whereRaw(`${column} LIKE '%${value}%'`)
                .fetch()

            if (invoiceOrder.rows.length == 0) {
                return response.status(404).send({
                    message: 'Pencarian untuk ' + value + ' tidak ditemukan'
                })
            }

            return response.json(invoiceOrder)
        } catch (error) {
            return response.status(400).send({
                message: 'Ops, sepertinya ada yang tidak beres!'
            })
        }
    }
}

module.exports = InvoiceOrderController
