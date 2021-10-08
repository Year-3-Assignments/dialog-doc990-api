import Doctor from '../model/Doctor';
import enums from '../enums';
import LOG from './controller.log';
import responseHandler from '../response/response.handler';

export function searchDoctors(req, res) {
  new Promise(async (resolve, reject) => {
    const { name, specialization, date, hospital } = req.body;
    const doctors = await Doctor.find({
      $or: [
        { name: { $regex: `${name}` } },
        { specialization: { $regex: `${specialization}` } },
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

export function addDoctor(req, res) {
  new Promise(async (resolve, reject) => {
    let doctorDetails = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      specialization: req.body.specialization,
      availableDetails: req.body.availableDetails,
      notes: req.body.notes,
      appointments: req.body.appointments,
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

export function updateDoctor(req, res) {
  if (req.params) {
    new Promise(async (resolve, reject) => {
      let doctorDetails = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        specialization: req.body.specialization,
        availableDetails: req.body.availableDetails,
        notes: req.body.notes,
      };

      let doctor = await Doctor.findById(req.params.id);

      if (!doctor) {
        return resolve(enums.doctor.NOT_FOUND);
      }

      doctor = await Doctor.findByIdAndUpdate(req.params.id, doctorDetails);
      return resolve({ doctor });
    })
      .then((data) => {
        LOG.info(enums.doctor.UPDATE_SUCCESS);
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        LOG.error(enums.doctor.UPDATE_ERROR);
        responseHandler.handleError(res, error.message);
      });
  } else {
    LOG.error(enums.request.PARAMETER_MISSING);
    responseHandler.handleError(res, enums.request.PARAMETER_MISSING);
  }
}

export function deleteDoctor(req, res) {
  if (req.params) {
    new Promise(async (resolve, reject) => {
      let doctor = await Doctor.findById(req.params.id);

      if (!doctor) {
        return resolve(enums.doctor.NOT_FOUND);
      }

      doctor = await Doctor.findByIdAndDelete(req.params.id);
      return resolve({ doctor });
    })
      .then((data) => {
        LOG.info(enums.doctor.DELETE_SUCCESS);
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        LOG.error(enums.doctor.DELETE_ERROR);
        responseHandler.handleError(res, error.message);
      });
  } else {
    LOG.error(enums.request.PARAMETER_MISSING);
    responseHandler.handleError(res, enums.request.PARAMETER_MISSING);
  }
}
