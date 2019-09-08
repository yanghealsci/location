import express, {Router} from 'express'
import { errorHandler, logger, asyncHandler } from './middleware'
import cors from 'cors'
import createMiddleware from 'swagger-express-middleware'
import DriverController from './controller/driver'
import TripController from './controller/trip'
const app = express()
const port = 3000

app.use(cors({
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'OPTION']
}))
const router = Router()
router.use(logger)

router.get('/drivers', asyncHandler(DriverController.getDriversByName))
router.get('/trips/driver', asyncHandler(TripController.getTripsByDriver))
router.get('/trips/vehicle', asyncHandler(TripController.getTripsByVehicle))

router.use(errorHandler)


app.use('/loc/api/v1', router)

// createMiddleware('loc.yaml', app, (err, middleware) => {
//   middleware.metadata(),
//   middleware.CORS(),
//   middleware.files(),
//   middleware.parseRequest(),
//   middleware.validateRequest(),
//   middleware.mock()
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
