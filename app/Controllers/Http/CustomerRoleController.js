'use strict'

const CustomerRole = use('App/Model/CustomerRole')

class CustomerRoleController {

  async index ({response}) {
    let customerRole = CustomerRole.query().fetch()
    return response.json(customerRole)
  }

  async store ({ request, response}) {
    const customerRole = new CustomerRole()
    customerRole.customer_role_keterangan = request.input('customer_role_keterangan')
    await customerRole.save()
    return response.json(customerRole)
  }

  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
    const customerRole = await CustomerRole.find(params.id)
    await CustomerRole.delete()
    return response.json({message : 'Role berhasil dihapus'})
  }
}

module.exports = CustomerRoleController
