import {
  addDoctor,
  searchDoctors,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
} from './controller/doctor.controller';

import {
  createUser,
  loginUser,
  getUserProfile,
} from './controller/user.controller';
import {
  createAppointment,
  getAppointmentForUser,
  cancelAppointment,
} from './controller/appointment.controller';
import {
  createRefund,
  getRefundsForUser,
} from './controller/refund.controller';

export default function (app) {
  app.post('/doctor/add', addDoctor);
  app.post('/doctor/search', searchDoctors);
  app.put('/doctor/update/:id', updateDoctor);
  app.delete('/doctor/delete/:id', deleteDoctor);
  // User API endpoints - @Tested
  app.post('/user/create', createUser);
  app.post('/user/login', loginUser);
  app.get('/user/', getUserProfile);
  //Appointment API endpoints - @Tested
  app.post('/appointment/create', createAppointment);
  app.get('/appointment/', getAppointmentForUser);
  app.put('/appointment/cancel/', cancelAppointment);
  //Appointment API endpoints
  app.post('/refund/create', createRefund);
  app.get('/refund', getRefundsForUser);
}
