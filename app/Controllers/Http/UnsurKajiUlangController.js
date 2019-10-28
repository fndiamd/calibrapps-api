'use strict'

const UnsurKajiUlang = use('App/Models/UnsurKajiUlang')

class UnsurKajiUlangController {
    
    async index({response}){
        let unsurKajiUlang = await UnsurKajiUlang.query().fetch()
        return response.json(unsurKajiUlang)
    }

    async store({response, request}){
        const unsurKajiUlang = new UnsurKajiUlang()
        const data = {
            progres_order_id : request.input('progres_order_id')
        }

        unsurKajiUlang.progres_order_id = data.progres_order_id

        await unsurKajiUlang.save()
        return response.json(unsurKajiUlang)   
    }

    async update({params, response, request}){
        let unsurKajiUlang = await UnsurKajiUlang.find(params.id)
        
        const data = {
          progres_order_id : request.input('progres_order_id')
        }

        unsurKajiUlang.progres_order_id = data.progres_order_id

        await unsurKajiUlang.save()
        return response.json(unsurKajiUlang)
    }

    async delete ({ params, response }) {
      const unsurKajiUlang = await UnsurKajiUlang.find(params.id)
      unsurKajiUlang.delete()
      return response.json({message: 'Unsur kaji ulang berhasil dihapus'})
  } 
}

module.exports = UnsurKajiUlangController
