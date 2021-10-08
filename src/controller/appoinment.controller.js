import Appoinment from '../model/Appoinment';
import responseHandler from '../response/response.handler';

export async function createAppoinment(req, res) {

    const appoinment = new Appoinment(req.body);
    appoinment
      .save()
      .then(async (data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });

}

export async function getAppoinments(req, res) {

    new Promise(async (resolve, reject) => {
      let appoinment = await Appoinment.find({ _id: req.user._id });
      return resolve({ appoinment });
    })
      .then((data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });

}
