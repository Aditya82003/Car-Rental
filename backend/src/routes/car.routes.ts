import express from 'express'
import { addCarController, assignDriverToCarController, deleteCarController, getAllCarsController, getCarByIdController, updateCarController } from '../controllers/car.controller'

const router=express.Router()

router.post('/create/add',addCarController)
router.put('/update/:id',updateCarController)
router.delete('/delete/:id',deleteCarController)

router.post('/:id/assign-driver/:driverId',assignDriverToCarController)

router.get('/all',getAllCarsController)

router.get('/:id',getCarByIdController)


export default router