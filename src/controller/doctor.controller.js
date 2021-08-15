import Doctor from '../model/Doctor';
import enums from '../enums';
import responseHandler from '../response/response.handler';

export async function addDoctor(req, res) {
  let doctorData = new Doctor(req.body);
  const doctor = new Doctor(doctorData);
  await doctor
    .save()
    .then((data) => {
      responseHandler.respond(res, data);
    })
    .catch((error) => {
      responseHandler.handleError(res, error.message);
    });
}

export async function getAllDoctors() {
  await Doctor.find({})
    .then((doctors) => {
      responseHandler.respond(res, data);
    })
    .catch((error) => {
      response.handleError(res, error.message);
    });
}
