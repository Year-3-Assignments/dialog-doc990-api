import {
  addDoctor,
  searchDoctors,
  updateDoctor,
  deleteDoctor,
} from './controller/doctor.controller';

export default function (app) {
  app.post('/doctor/add', addDoctor);
  app.get('/doctor/search', searchDoctors);
  app.put('/doctor/update/:id', updateDoctor);
  app.delete('/doctor/delete/:id', deleteDoctor);
}
