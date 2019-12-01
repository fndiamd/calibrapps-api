'use strict'

const OrderDetail = use('App/Models/OrderDetail')
const BarangKalibrasi = use('App/Models/BarangKalibrasi')

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
        order_detail_harga: request.input('order_detail_harga'),
        order_detail_keterangan: request.input('order_detail_keterangan'),
        progres_order_id: request.input('progres_order_id'),
        barang_kalibrasi_id: request.input('barang_kalibrasi_id')
      }

      orderDetail.order_detail_harga = data.order_detail_harga
      orderDetail.order_detail_keterangan = data.order_detail_keterangan
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
        order_detail_harga: request.input('order_detail_harga'),
        order_detail_keterangan: request.input('order_detail_keterangan'),
        progres_order_id: request.input('progres_order_id'),
        barang_kalibrasi_id: request.input('barang_kalibrasi_id')
      }

      orderDetail.order_detail_harga = data.order_detail_harga
      orderDetail.order_detail_keterangan = data.order_detail_keterangan
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
        .whereRaw(`${column} = '${value}'`)
        .fetch()

      let barang = [];

      for(let i in orderDetail.rows){
        let detailBarang = await BarangKalibrasi
        .query()
        .where('barang_kalibrasi_id', orderDetail.rows[i].barang_kalibrasi_id)
        .with('merkBarang')
        .with('listKalibrasi')
        .with('barangStatus')
        .first()
        barang.push(detailBarang)
      }

      let detail = {
        detail_order : orderDetail,
        detail_barang : barang
      }

      if(orderDetail.rows.length == 0){
        return response.status(404).send({
          message: 'Pencarian untuk ' + value + ' tidak ditemukan'
        })
      }

      return response.json(detail)
    } catch (error) {
      return response.status(400).send({
        message: error.message//'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }
}

module.exports = OrderDetailController
