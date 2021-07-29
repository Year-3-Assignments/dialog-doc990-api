import Doctor from '../model/Doctor';
import enums from '../enums';
import LOG from './controller.log';
import responseHandler from '../response/response.handler';

export function addDoctor(req, res) {
  new Promise(async (resolve, reject) => {
    let doctorDetails = {
      name: req.body.name,
      specialization: req.body.specialization,
      availableDetails: req.body.availableDetails,
      notes: req.body.notes,
    };

    let doctor = new Doctor(doctorDetails);
    await doctor.save();
    return resolve({ doctor });
  })
    .then((data) => {
      LOG.info(enums.doctor.CREATE_SUCCESS);
      responseHandler.respond(res, data);
    })
    .catch((error) => {
      LOG.error(enums.doctor.CREATE_ERROR);
      responseHandler.handleError(res, error.message);
    });
}

export function searchDoctors(req, res) {
  new Promise(async (resolve, reject) => {
    const { name, specialization, date, hospital } = req.body;
    const doctors = await Doctor.find({
      $or: [
        { name: { $regex: name } },
        { specialization: { $regex: specialization } },
        { 'availableDetails.dateTime': date },
        { 'availableDetails.hospitalName': hospital },
      ],
    });

    if (doctors && doctors.length > 0) {
      return resolve({ doctors });
    } else {
      return resolve(enums.doctor.NOT_FOUND);
    }
  })
    .then((data) => {
      LOG.info(enums.doctor.SEARCH_SUCCESS);
      responseHandler.respond(res, data);
    })
    .catch((error) => {
      LOG.error(enums.doctor.SEARCH_ERROR);
      responseHandler.handleError(res, error.message);
    });
}
