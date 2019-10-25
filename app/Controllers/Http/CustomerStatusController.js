'use strict'

const CustomerStatus = use('App/Models/CustomerStatus')

class CustomerStatusController {
    
    async index({response}){
        let customerStatus = await CustomerStatus.query().fetch()
        return response.json(customerStatus)
    }

    async store({response, request}){
        const customerStatus = new CustomerStatus()
        const data = {
            customer_status_keterangan : request.input('customer_status_keterangan')
        }

        customerStatus.customer_status_keterangan = data.customer_status_keterangan

        await customerStatus.save()
        return response.json(customerStatus)   
    }

    async update({params, response, request}){
        let customerStatus = await CustomerStatus.find(params.id)
        
        const data = {
          customer_status_keterangan : request.input('customer_status_keterangan')
        }

        customerStatus.customer_status_keterangan = data.customer_status_keterangan

        await customerStatus.save()
        return response.json(customerStatus)    
    }

    async destroy ({ params, request, response }) {
      await CustomerStatus.find(params.id).delete()
      return response.json({message: 'Customer status berhasil dihapus'})
  } 
}

module.exports = CustomerStatusController
