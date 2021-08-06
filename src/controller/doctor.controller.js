import Doctor from '../model/Doctor';
import enums from '../enums';

export async function addDoctor(req, res) {
  if (req.body) {
    const doctor = new Doctor(req.body);
    doctor
      .save()
      .then((data) => {
        LOG.info(enums.doctor.CREATE_SUCCESS);
      })
      .catch((error) => {
        LOG.info(enums.doctor.CREATE_ERROR);
        responseHandler.handleError(res, error.message);
      });
  }
}

export async function getAllDoctors() {}
