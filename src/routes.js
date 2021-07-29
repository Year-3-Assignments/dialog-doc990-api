import { addDoctor, searchDoctors } from './controller/doctor.controller';

export default function (app) {
  app.post('/doctor/add', addDoctor);
  app.get('/doctor/search', searchDoctors);
}
