'use strict'

const ProgresOrder = use('App/Models/ProgresOrder')

class ProgresOrderController {

  async index({ response }) {
    try {
      let progresOrder = await ProgresOrder.query()
        .with('customerPerusahaan')
        .with('kantorCabang')
        .with('orderStatus')
        .fetch()
      return response.json(progresOrder)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async view({ params, response }) {
    try {
      let order = await ProgresOrder.findOrFail(params.id)
      let progresOrder = await ProgresOrder
        .query()
        .where('progres_order_id', params.id)
        .with('customerPerusahaan')
        .with('kantorCabang')
        .with('orderStatus')
        .first()

      return progresOrder
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({
          message: 'Progress order tidak ditemukan'
        })
      }

      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async store({ response, request }) {
    try {
      const progresOrder = new ProgresOrder()
      const data = {
        progres_order_nomor: request.input('progres_order_nomor'),
        progres_order_nomor_onf: request.input('progres_order_nomor_onf'),
        progres_order_tanggal_order: request.input('progres_order_tanggal_order'),
        progres_order_estimasi: request.input('progres_order_estimasi'),
        customer_perusahaan_id: request.input('customer_perusahaan_id'),
        kantor_cabang_id: request.input('kantor_cabang_id'),
        order_status_id: request.input('order_status_id')
      }

      progresOrder.progres_order_nomor = data.progres_order_nomor
      progresOrder.progres_order_nomor_onf = data.progres_order_nomor_onf
      progresOrder.progres_order_tanggal_order = data.progres_order_tanggal_order
      progresOrder.progres_order_estimasi = data.progres_order_estimasi
      progresOrder.customer_perusahaan_id = data.customer_perusahaan_id
      progresOrder.kantor_cabang_id = data.kantor_cabang_id
      progresOrder.order_status_id = data.order_status_id

      await progresOrder.save()
      return response.json(progresOrder)
    } catch (error) {
      return response.status(400).send({
        message: error.message //'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async update({ params, response, request }) {
    try {
      let progresOrder = await ProgresOrder.findOrFail(params.id)

      const data = {
        progres_order_nomor: request.input('progres_order_nomor'),
        progres_order_nomor_onf: request.input('progres_order_nomor_onf'),
        progres_order_tanggal_order: request.input('progres_order_tanggal_order'),
        progres_order_estimasi: request.input('progres_order_estimasi'),
        progres_order_verif: request.input('progres_order_verif'),
        customer_perusahaan_id: request.input('customer_perusahaan_id'),
        kantor_cabang_id: request.input('kantor_cabang_id'),
        order_status_id: request.input('order_status_id')
      }

      progresOrder.progres_order_nomor = data.progres_order_nomor
      progresOrder.progres_order_nomor_onf = data.progres_order_nomor_onf
      progresOrder.progres_order_tanggal_order = data.progres_order_tanggal_order
      progresOrder.progres_order_estimasi = data.progres_order_estimasi
      progresOrder.progres_order_verif = data.progres_order_verif
      progresOrder.customer_perusahaan_id = data.customer_perusahaan_id
      progresOrder.kantor_cabang_id = data.kantor_cabang_id
      progresOrder.order_status_id = data.order_status_id

      await progresOrder.save()
      return response.json(progresOrder)
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({
          message: 'Progress order tidak ditemukan'
        })
      }

      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async delete({ params, response }) {
    try {
      const progresOrder = await ProgresOrder.findOrFail(params.id)
      progresOrder.delete()

      return response.json({ message: 'Progres Order berhasil dihapus' })
    } catch (error) {
      if (error.name === 'ModelNotFoundException') {
        return response.status(404).send({
          message: 'Progress order tidak ditemukan'
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
      let column = pagination.column || 'progres_order_id';
      let sort = pagination.sort || 'desc';

      const progresOrder = await ProgresOrder.query()
        .with('customerPerusahaan')
        .with('kantorCabang')
        .with('orderStatus')
        .orderBy(`${column}`, `${sort}`)
        .paginate(page, limit)

      return response.json(progresOrder)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async search({ request, response }) {
    try {
      let search = request.only(['column', 'value'])
      let column = search.column || 'progres_order_nomor';
      let value = search.value.toLowerCase()

      let progresOrder = await ProgresOrder.query()
        .with('customerPerusahaan')
        .with('kantorCabang')
        .with('orderStatus')
        .whereRaw(`LOWER(${column}) LIKE '%${value}%'`)
        .fetch()

      if (progresOrder.rows.length == 0) {
        return response.status(404).send({
          message: 'Pencarian untuk ' + value + ' tidak ditemukan'
        })
      }

      return response.json(progresOrder)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

  async notify({ request, response }) {
    try {
      const progresOrder = await ProgresOrder.query().where('progres_order_verif', false).fetch()
      const count = await ProgresOrder.query().where('progres_order_verif', false).count('* as total')
      const data = {
        progresOrder: progresOrder,
        total: count[0]['total']
      }

      return response.json(data)
    } catch (error) {
      return response.status(400).send({
        message: 'Ops, sepertinya ada yang tidak beres!'
      })
    }
  }

}

module.exports = ProgresOrderController
