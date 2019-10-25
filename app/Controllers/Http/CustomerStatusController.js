'use strict'

const CustomerStatus = use('App/Models/CustomerStatus')

class CustomerStatusController {

    async index({response}){
        let customerStatus = await CustomerStatus.query().fetch()
        return response.json(customerStatus)
    }

    async getById({params, response}){
        const customerStatus = CustomerStatus.findBy('customer_status_id', params.id)
        return customerStatus
    }

    async store({params, request, response}){
        const customerStatus = new CustomerStatus()
        customerStatus.customer_status_keterangan = request.input('customer_status_keterangan')
        await customerStatus.save()
        return response.json(customerStatus)
    }

    async update({params, request, response}){
        const customerStatus = await CustomerStatus.find(params.id)
        customerStatus.customer_status_keterangan = request.input('customer_status_keterangan')
        await customerStatus.save()
        return response.json(customerStatus)
    }

    async delete({params, response}){
        const customerStatus = await CustomerStatus.find(params.id)
        await customerStatus.delete()
        return response.json({message : "Status customer berhasil dihapus"})
    }

}

module.exports = CustomerStatusController
