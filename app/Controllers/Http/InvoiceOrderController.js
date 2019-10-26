'use strict'

const InvoiceOrder = use('App/Models/InvoiceOrder')

class InvoiceOrderController {
    
    async index({response}){
        let invoiceOrder = await InvoiceOrder.query().fetch()
        return response.json(invoiceOrder)
    }

    async store({response, request}){
        const invoiceOrder = new InvoiceOrder()
        const data = {
            invoice_order_tanggal : request.input('invoice_order_tanggal'),
            invoice_order_total : request.input('invoice_order_total'),
            progres_order_id : request.input('progres_order_id'),
            invoice_status_id : request.input('invoice_status_id')
        }

        invoiceOrder.invoice_order_tanggal = data.invoice_order_tanggal
        invoiceOrder.invoice_order_total = data.invoice_order_total
        invoiceOrder.progres_order_id = data.progres_order_id
        invoiceOrder.invoice_status_id = data.invoice_status_id

        await invoiceOrder.save()
        return response.json(invoiceOrder)   
    }

    async update({params, response, request}){
        let invoiceOrder = await InvoiceOrder.find(params.id)
        
        const data = {
          invoice_order_tanggal : request.input('invoice_order_tanggal'),
          invoice_order_total : request.input('invoice_order_total'),
          progres_order_id : request.input('progres_order_id'),
          invoice_status_id : request.input('invoice_status_id')
        }

        invoiceOrder.invoice_order_tanggal = data.invoice_order_tanggal
        invoiceOrder.invoice_order_total = data.invoice_order_total
        invoiceOrder.progres_order_id = data.progres_order_id
        invoiceOrder.invoice_status_id = data.invoice_status_id

        await invoiceOrder.save()
        return response.json(invoiceOrder)   
    }

    async destroy ({ params, request, response }) {
      await InvoiceOrder.find(params.id).delete()
      return response.json({message: 'Invoice status berhasil dihapus'})
  } 
}

module.exports = InvoiceOrderController
