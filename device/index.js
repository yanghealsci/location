import { Pool } from 'pg'
import { complexify } from 'geojson-tools'
import data from './data'

const speed = 60 / 60   // km/min
const routes = []

function getPoints(route, interval) {
  let res = []
  for (let i = 0; i < route.length - 1; i++) {
    const dist = complexify([route[i], route[i + 1]], interval)
    res = [...res, ...dist]
  }
  return res
}

async function updateLocation({driver_id, vehicle_id, trip_id, lat, lng, time}, pool) {
  try {
    const res = await pool.query({
      text: `INSERT INTO geo_point (driver_id, vehicle_id, trip_id, lat, lng, time)
             VALUES ($1, $2, $3, $4, $5, $6::timestamp)`,
      values: [driver_id, vehicle_id, trip_id, lat, lng, time ]
    })
    console.log('insert success')
    return res
  } catch(error) {
    console.error(error)
    throw error
  }
}

function run () {
  const pool = new Pool({
    user: 'postgres',
    host: '0.0.0.0',
    database: 'localzdemo',
    password: 'postgres',
    port: 5433
  })

  const createNew = Date.now()

  for (const d of data) {
    const { route } = d
    routes.push({
      ...d,
      route: getPoints(route, speed),
    })
  }

  const inservtList = []

  for (const r of routes) {
    const st = (new Date(r.start_on)).valueOf()
    for (const i in r.route) {
      const p = r.route[i]
      const timeStr = (new Date(st + i * 60 * 1000)).toISOString()
      inservtList.push({
        ...r,
        lat: p[1],
        lng: p[0],
        time: `${timeStr.slice(0, 10)} ${timeStr.slice(11, 16)}`
      })
    }
  }

  Promise.all(inservtList.map(d => updateLocation(d, pool)))
        .then(() => {
          console.log('done')
          pool.end()
        })
        .catch(e => {
          process.exit(2)
        })
}

run()