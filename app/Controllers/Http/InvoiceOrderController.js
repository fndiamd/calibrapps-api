'use strict'

const InvoiceOrder = use('App/Models/InvoiceOrder')

class InvoiceOrderController {

    async index({ response }) {
        let invoiceOrder = await InvoiceOrder.query()
        .with('progresOrder')
        .with('invoiceStatus')
        .fetch()
        return response.json(invoiceOrder)
    }

    async view({ params }) { 
        let invoiceOrder = await InvoiceOrder.query().where('invoice_order_id', params.id)
        .with('progresOrder')
        .with('invoiceStatus')
        .first()
        return invoiceOrder
    }

    async store({ response, request }) {
        const invoiceOrder = new InvoiceOrder()
        const data = {
            invoice_order_tanggal: request.input('invoice_order_tanggal'),
            invoice_order_total: request.input('invoice_order_total'),
            progres_order_id: request.input('progres_order_id'),
            invoice_status_id: request.input('invoice_status_id')
        }

        invoiceOrder.invoice_order_tanggal = data.invoice_order_tanggal
        invoiceOrder.invoice_order_total = data.invoice_order_total
        invoiceOrder.progres_order_id = data.progres_order_id
        invoiceOrder.invoice_status_id = data.invoice_status_id

        await invoiceOrder.save()
        return response.json(invoiceOrder)
    }

    async update({ params, response, request }) {
        let invoiceOrder = await InvoiceOrder.find(params.id)

        const data = {
            invoice_order_tanggal: request.input('invoice_order_tanggal'),
            invoice_order_total: request.input('invoice_order_total'),
            progres_order_id: request.input('progres_order_id'),
            invoice_status_id: request.input('invoice_status_id')
        }

        invoiceOrder.invoice_order_tanggal = data.invoice_order_tanggal
        invoiceOrder.invoice_order_total = data.invoice_order_total
        invoiceOrder.progres_order_id = data.progres_order_id
        invoiceOrder.invoice_status_id = data.invoice_status_id

        await invoiceOrder.save()
        return response.json(invoiceOrder)
    }

    async delete({ params, response }) {
        const invoiceOrder = await InvoiceOrder.find(params.id)
        invoiceOrder.delete()
        return response.json({ message: 'Invoice status berhasil dihapus' })
    }

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const invoiceOrder = await InvoiceOrder.query()
        .with('progresOrder')
        .with('invoiceStatus')
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(invoiceOrder)
    }
}

module.exports = InvoiceOrderController
