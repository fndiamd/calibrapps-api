'use strict'

const InvoiceStatus = use('App/Models/InvoiceStatus')

class InvoiceStatusController {

    async index({ response }) {
        let invoiceStatus = await InvoiceStatus.query().fetch()
        return response.json(invoiceStatus)
    }

    async view({ params }) {
        let invoiceStatus = await InvoiceStatus.query().where('invoice_status_id', params.id).first()
        return invoiceStatus
    }

    async store({ response, request }) {
        const invoiceStatus = new InvoiceStatus()
        const data = {
            invoice_status_keterangan: request.input('invoice_status_keterangan'),
            invoice_status_warna: request.input('invoice_status_warna')
        }

        invoiceStatus.invoice_status_keterangan = data.invoice_status_keterangan
        invoiceStatus.invoice_status_warna = data.invoice_status_warna

        await invoiceStatus.save()
        return response.json(invoiceStatus)
    }

    async update({ params, response, request }) {
        let invoiceStatus = await InvoiceStatus.find(params.id)

        const data = {
            invoice_status_keterangan: request.input('invoice_status_keterangan'),
            invoice_status_warna: request.input('invoice_status_warna')
        }

        invoiceStatus.invoice_status_keterangan = data.invoice_status_keterangan
        invoiceStatus.invoice_status_warna = data.invoice_status_warna

        await invoiceStatus.save()
        return response.json(invoiceStatus)
    }

    async delete({ params, response }) {
        const invoiceStatus = await InvoiceStatus.find(params.id)
        invoiceStatus.delete()
        return response.json({ message: 'Invoice status berhasil dihapus' })
    }

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const invoiceStatus = await InvoiceStatus.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(invoiceStatus)
    }
}

module.exports = InvoiceStatusController
