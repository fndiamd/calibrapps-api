'use strict'

const InvoiceStatus = use('App/Models/InvoiceStatus')

class InvoiceStatusController {
    
    async index({response}){
        let invoiceStatus = await InvoiceStatus.query().fetch()
        return response.json(invoiceStatus)
    }

    async store({response, request}){
        const invoiceStatus = new InvoiceStatus()
        const data = {
            invoice_status_keterangan : request.input('invoice_status_keterangan')
        }

        invoiceStatus.invoice_status_keterangan = data.invoice_status_keterangan

        await invoiceStatus.save()
        return response.json(invoiceStatus)   
    }

    async update({params, response, request}){
        let invoiceStatus = await InvoiceStatus.find(params.id)
        
        const data = {
          invoice_status_keterangan : request.input('invoice_status_keterangan')
        }

        invoiceStatus.invoice_status_keterangan = data.invoice_status_keterangan

        await invoiceStatus.save()
        return response.json(invoiceStatus)   
    }

    async destroy ({ params, request, response }) {
      await InvoiceStatus.find(params.id).delete()
      return response.json({message: 'Invoice status berhasil dihapus'})
  } 
}

module.exports = InvoiceStatusController
