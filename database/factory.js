'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

const Factory = use('Factory')

Factory.blueprint('App/Models/BarangStatus', (faker) => {
  return [
    {
        barang_status_id : 1, 
        barang_status_keterangan : 'diambil'
    }
    // {barang_status_keterangan : 'dikerjakan'},
    // {barang_status_keterangan : 'dalam antrian'},
    // {barang_status_keterangan : 'selesai'},
    // {barang_status_keterangan : 'serahkan ke broker'}
]
})

