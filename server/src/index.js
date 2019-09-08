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
router.get('/trips', asyncHandler(TripController.getTrips))

router.use(errorHandler)

app.use('/loc/api/v1', router)
app.use('/loc/health', (req, res) => {
  res.status(200).json({
    result: 'ok'
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
