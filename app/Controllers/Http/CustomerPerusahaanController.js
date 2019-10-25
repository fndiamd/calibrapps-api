'use strict'

const CustomerPerusahaan = use('App/Models/CustomerPerusahaan')

class CustomerPerusahaanController {
    
    async index({response}){
        let customerPerusahaan = await CustomerPerusahaan.query().fetch()
        return response.json(customerPerusahaan)
    }

    async store({response, request}){
        const customerPerusahaan = new CustomerPerusahaan()
        const data = {
            customer_perusahaan_pkal : request.input('customer_perusahaan_pkal'),
            customer_perusahaan_nama : request.input('customer_perusahaan_nama'),
            customer_perusahaan_alamat : request.input('customer_perusahaan_alamat'),
            customer_perusahaan_telepon : request.input('customer_perusahaan_telepon'),
            customer_perusahaan_fax : request.input('customer_perusahaan_fax'),
            customer_status_id : request.input('customer_status_id')
        }

        customerPerusahaan.customer_perusahaan_pkal = data.customer_perusahaan_pkal
        customerPerusahaan.customer_perusahaan_nama = data.customer_perusahaan_nama
        customerPerusahaan.customer_perusahaan_alamat = data.customer_perusahaan_alamat
        customerPerusahaan.customer_perusahaan_telepon = data.customer_perusahaan_telepon
        customerPerusahaan.customer_perusahaan_fax = data.customer_perusahaan_fax
        customerPerusahaan.customer_status_id = data.customer_status_id

        await customerPerusahaan.save()
        return response.json(customerPerusahaan)   
    }

    async update({params, response, request}){
        let customerPerusahaan = await CustomerPerusahaan.find(params.id)
        
        const data = {
          customer_perusahaan_pkal : request.input('customer_perusahaan_pkal'),
          customer_perusahaan_nama : request.input('customer_perusahaan_nama'),
          customer_perusahaan_alamat : request.input('customer_perusahaan_alamat'),
          customer_perusahaan_telepon : request.input('customer_perusahaan_telepon'),
          customer_perusahaan_fax : request.input('customer_perusahaan_fax'),
          customer_status_id : request.input('customer_status_id')
        }

        customerPerusahaan.customer_perusahaan_pkal = data.customer_perusahaan_pkal
        customerPerusahaan.customer_perusahaan_nama = data.customer_perusahaan_nama
        customerPerusahaan.customer_perusahaan_alamat = data.customer_perusahaan_alamat
        customerPerusahaan.customer_perusahaan_telepon = data.customer_perusahaan_telepon
        customerPerusahaan.customer_perusahaan_fax = data.customer_perusahaan_fax
        customerPerusahaan.customer_status_id = data.customer_status_id

        await customerPerusahaan.save()
        return response.json(customerPerusahaan)   
    }

    async destroy ({ params, request, response }) {
      await CustomerPerusahaan.find(params.id).delete()
      return response.json({message: 'Customer perusahaan berhasil dihapus'})
  } 
}

module.exports = CustomerPerusahaanController
