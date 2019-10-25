'use strict'

const CustomerPerusahaan = use('App/Models/CustomerPerusahaan')

class CustomerPerusahaanController {
    
    async index({response}){
        let customerPerusahaan =  await CustomerPerusahaan.query().fetch()
        return response.json(customerPerusahaan)
    }

    async getById({params, response}){
        const customerPerusahaan = CustomerPerusahaan.findBy('customer_perusahaan_id', params.id)
        return customerPerusahaan
    }

    async store({params, request, response}){
        const customerPerusahaan = new CustomerPerusahaan()
        const data = {
            perusahaan_pkal : input.request('customer_perusahaan_pkal'),
            perusahaan_nama : input.request('customer_perusahaan_nama'),
            perusahaan_alamat : input.request('customer_perusahaan_alamat'),
            perusahaan_telepon : input.request('customer_perusahaan_telepon'),
            perusahaan_fax : input.request('customer_perusahaan_fax'),
            perusahaan_status : input.request('customer_status_id')
        }

        customerPerusahaan.customer_perusahaan_pkal = data.perusahaan_pkal
        customerPerusahaan.customer_perusahaan_nama = data.perusahaan_nama
        customerPerusahaan.customer_perusahaan_alamat = data.perusahaan_alamat
        customerPerusahaan.customer_perusahaan_telepon = data.perusahaan_telepon
        customerPerusahaan.customer_perusahaan_fax = data.perusahaan_fax
        customerPerusahaan.customer_status_id = data.perusahaan_status

        await customerPerusahaan.save()
        return response.json(customerPerusahaan)
    }

    async update({params, request, response}){
        const customerPerusahaan = await CustomerPerusahaan.find(params.id)
        const data = {
            perusahaan_pkal : input.request('customer_perusahaan_pkal'),
            perusahaan_nama : input.request('customer_perusahaan_nama'),
            perusahaan_alamat : input.request('customer_perusahaan_alamat'),
            perusahaan_telepon : input.request('customer_perusahaan_telepon'),
            perusahaan_fax : input.request('customer_perusahaan_fax'),
            perusahaan_status : input.request('customer_status_id')
        }

        customerPerusahaan.customer_perusahaan_pkal = data.perusahaan_pkal
        customerPerusahaan.customer_perusahaan_nama = data.perusahaan_nama
        customerPerusahaan.customer_perusahaan_alamat = data.perusahaan_alamat
        customerPerusahaan.customer_perusahaan_telepon = data.perusahaan_telepon
        customerPerusahaan.customer_perusahaan_fax = data.perusahaan_fax
        customerPerusahaan.customer_status_id = data.perusahaan_status

        await customerPerusahaan.save()
        return response.json(customerPerusahaan)
    }

    async delete({params, response}){
        const customerPerusahaan = await CustomerPerusahaan.find(params.id)
        await customerPerusahaan.delete()
        return response.json({message : "Perusahaan customer berhasil dihapus"})
    }

}

module.exports = CustomerPerusahaanController
