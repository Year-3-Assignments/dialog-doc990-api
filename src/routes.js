import { addDoctor } from './controller/doctor.controller';
import { createUser, loginUser } from './controller/user.controller';

export default function (app) {
  // User API endpoints
  app.post('/user/create', createUser);
  app.post('/user/login', loginUser);

  //Doctor API endpoints
  app.post('/doctor/create', addDoctor);
}
