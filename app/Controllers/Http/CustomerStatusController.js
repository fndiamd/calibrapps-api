'use strict'

const CustomerStatus = use('App/Models/CustomerStatus')

class CustomerStatusController {

    async index({ response }) {
        let customerStatus = await CustomerStatus.query().fetch()
        return response.json(customerStatus)
    }

    async view({ params }) {
        let customerStatus = await CustomerStatus.query().where('customer_status_id', params.id).first()
        return customerStatus
    }

    async store({ response, request }) {
        const customerStatus = new CustomerStatus()
        const data = {
            customer_status_keterangan: request.input('customer_status_keterangan'),
            customer_status_warna: request.input('customer_status_warna')
        }

        customerStatus.customer_status_keterangan = data.customer_status_keterangan
        customerStatus.customer_status_warna = data.customer_status_warna

        await customerStatus.save()
        return response.json(customerStatus)
    }

    async update({ params, response, request }) {
        let customerStatus = await CustomerStatus.find(params.id)

        const data = {
            customer_status_keterangan: request.input('customer_status_keterangan'),
            customer_status_warna: request.input('customer_status_warna')
        }

        customerStatus.customer_status_keterangan = data.customer_status_keterangan
        customerStatus.customer_status_warna = data.customer_status_warna

        await customerStatus.save()
        return response.json(customerStatus)
    }

    async delete({ params, response }) {
        const customerStatus = await CustomerStatus.find(params.id)
        customerStatus.delete()
        return response.json({ message: 'Customer status berhasil dihapus' })
    }

    async pagination({ request, response }) {
        let pagination = request.only(['page', 'limit', 'column', 'sort'])
        let page = pagination.page || 1;
        let limit = pagination.limit || 10;
        const customerStatus = await CustomerStatus.query()
        .orderBy(`${pagination.column}`, `${pagination.sort}`)
        .paginate(page, limit)
        return response.json(customerStatus)
    }

    async search({request, response}){
        let search = request.only(['column', 'value'])
        let customerStatus = await CustomerStatus.query()
        .whereRaw(`${search.column} LIKE %${search.value}%`)
        .fetch()
        return response.json(customerStatus)
    }
}

module.exports = CustomerStatusController
