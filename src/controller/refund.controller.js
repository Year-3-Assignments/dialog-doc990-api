import Refund from '../model/Refund';
import responseHandler from '../response/response.handler';

export async function createRefund(req, res) {

    const refund = new Refund(req.body);
    refund
      .save()
      .then(async (data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });

}

export async function getRefund(req, res) {

    new Promise(async (resolve, reject) => {
      let refund = await Refund.find({ phoneNumber: req.body.phoneNumber });
      return resolve({ refund });
    })
      .then((data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });

}
