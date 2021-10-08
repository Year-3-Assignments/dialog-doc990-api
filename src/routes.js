import { addDoctor, getAllDoctors } from './controller/doctor.controller';
import { createUser, loginUser } from './controller/user.controller';
import { createAppoinment, getAppoinments } from './controller/appoinment.controller';
import { createRefund, getRefund } from './controller/refund.controller';

export default function (app) {
  // User API endpoints
  app.post('/user/create', createUser);
  app.post('/user/login', loginUser);

  //Doctor API endpoints
  app.post('/doctor/create', addDoctor);
  app.get('/doctors', getAllDoctors);

    //Appoinment API endpoints
    app.post('/doctor/create', addDoctor);
    app.get('/doctors', getAllDoctors);

    //Appoinment API endpoints
    app.post('/appoinment/create', createAppoinment);
    app.get('/appoinment', getAppoinments);

    //Appoinment API endpoints
    app.post('/refund/create', createRefund);
    app.get('/refund', getRefund);

}
