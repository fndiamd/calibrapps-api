'use strict'

const CustomerRole = use('App/Models/CustomerRole')

class CustomerRoleController {
    
    async index({response}){
        let customerRole = await CustomerRole.query().fetch()
        return response.json(customerRole)
    }

    async store({response, request}){
        const customerRole = new CustomerRole()
        const data = {
            customer_role_keterangan : request.input('customer_role_keterangan')
        }

        customerRole.customer_role_keterangan = data.customer_role_keterangan

        await customerRole.save()
        return response.json(customerRole)   
    }

    async update({params, response, request}){
        let customerRole = await CustomerRole.find(params.id)
        
        const data = {
          customer_role_keterangan : request.input('customer_role_keterangan')
        }

        customerRole.customer_role_keterangan = data.customer_role_keterangan

        await customerRole.save()
        return response.json(customerRole) 
    }

    async delete ({ params, response }) {
      const customerRole = await CustomerRole.find(params.id)
      customerRole.delete()
      return response.json({message: 'Customer role berhasil dihapus'})
  } 
}

module.exports = CustomerRoleController
