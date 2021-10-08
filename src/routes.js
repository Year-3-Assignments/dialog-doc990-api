import {
  addDoctor,
  searchDoctors,
  updateDoctor,
  deleteDoctor,
} from './controller/doctor.controller';
import {
  addChannel,
  getUserChannels,
  removeChannel,
} from './controller/channel.controller';

export default function (app) {
  app.post('/doctor/add', addDoctor);
  app.post('/doctor/search', searchDoctors);
  app.put('/doctor/update/:id', updateDoctor);
  app.delete('/doctor/delete/:id', deleteDoctor);
  app.post('/channel/add', addChannel);
  app.get('/channel/get', getUserChannels);
  app.delete('/channel/remove', removeChannel);
}
