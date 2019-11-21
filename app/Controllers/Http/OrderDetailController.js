'use strict'

const OrderDetail = use('App/Models/OrderDetail')

class OrderDetailController {

  async index({ response }) {
    try {
      let orderDetail = await OrderDetail
        .query()
        .with('progresOrder')
        .with('barangKalibrasi')
        .fetch()

      return response.json(orderDetail)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async view({ params, response }) {
    try {
      let detail = await OrderDetail.findOrFail(params.id)
      let orderDetail = await OrderDetail
        .query()
        .where('order_detail_id', params.id)
        .with('progresOrder')
        .with('barangKalibrasi')
        .first()
      return orderDetail
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({
          message: 'Order detail tidak ditemukan'
        })
      }

      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async store({ response, request }) {
    try {
      const orderDetail = new OrderDetail()

      const data = {
        progres_order_id: request.input('progres_order_id'),
        barang_kalibrasi_id: request.input('barang_kalibrasi_id')
      }

      orderDetail.progres_order_id = data.progres_order_id
      orderDetail.barang_kalibrasi_id = data.barang_kalibrasi_id

      await orderDetail.save()
      return response.json(orderDetail)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async update({ params, response, request }) {
    try {
      let orderDetail = await OrderDetail.findOrFail(params.id)

      const data = {
        progres_order_id: request.input('progres_order_id'),
        barang_kalibrasi_id: request.input('barang_kalibrasi_id')
      }

      orderDetail.progres_order_id = data.progres_order_id
      orderDetail.barang_kalibrasi_id = data.barang_kalibrasi_id

      await orderDetail.save()
      return response.json(orderDetail)
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({
          message: 'Order detail tidak ditemukan'
        })
      }

      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async delete({ params, response }) {
    try {
      const orderDetail = await OrderDetail.findOrFail(params.id)
      orderDetail.delete()

      return response.json({ message: 'Order detail berhasil dihapus' })
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({
          message: 'Order detail tidak ditemukan'
        })
      }

      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async pagination({ request, response }) {
    try {
      let pagination = request.only(['page', 'limit', 'column', 'sort'])
      let page = pagination.page || 1;
      let limit = pagination.limit || 10;
      let column = pagination.column || 'order_detail_id';
      let sort = pagination.sort || 'desc';

      const orderDetail = await OrderDetail.query()
        .with('progresOrder')
        .with('barangKalibrasi')
        .orderBy(`${column}`, `${sort}`)
        .paginate(page, limit)

      return response.json(orderDetail)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async search({ request, response }) {
    try {
      let search = request.only(['column', 'value'])
      let column = search.column || 'progres_order_id'
      let value = search.value;

      let orderDetail = await OrderDetail.query()
        .with('progresOrder')
        .with('barangKalibrasi')
        .whereRaw(`${column} LIKE '%${value}%'`)
        .fetch()

      if(orderDetail.rows.length == 0){
        return response.status(404).send({
          message: 'Pencarian untuk ' + value + ' tidak ditemukan'
        })
      }

      return response.json(orderDetail)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }
}

module.exports = OrderDetailController
