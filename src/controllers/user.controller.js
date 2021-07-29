import User from '../model/User';
import enums from '../enums';
import responseHandler from '../response/response.handler';
import LOG from './controller.log';

export async function createUser(req, res) {
  if (req.body && req.body.phoneNumber) {
    new Promise(async (resolve, reject) => {
      let phoneNumber = req.body.phoneNumber;
      let user = await User.findOne({ phoneNumber: phoneNumber });

      if (user) {
        return resolve(enums.user.ALREADY_EXIST);
      }

      user = new User(req.body);
      await user.save();
      const TOKEN = await user.generateAuthToken();
      let responseData = {
        user_id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        nic: user.nic,
        password: user.password,
        token: TOKEN,
        role: user.role,
      };
      return resolve({ responseData, TOKEN });
    })
      .then((data) => {
        if (data === enums.user.ALREADY_EXIST) {
          LOG.warn(enums.user.ALREADY_EXIST);
        } else {
          LOG.info(enums.user.CREATE_SUCCESS);
        }

        responseHandler.respond(res, data);
      })
      .catch((error) => {
        LOG.info(enums.user.CREATE_ERROR);
        responseHandler.handleError(res, error.message);
      });
  }
}

export async function loginUser(req, res) {
  if (req.body && req.body.phoneNumber && req.body.password) {
    let { phoneNumber, password } = req.body;

    new Promise(async (resolve, reject) => {
      try {
        let user = await User.findByPhoneNoPassword(phoneNumber, password);

        if (!user) {
          return resolve(enums.user.NOT_FOUND);
        }

        const TOKEN = await user.generateAuthToken();
        let responseData = {
          user_id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        nic: user.nic,
        password: user.password,
        token: TOKEN,
        role: user.role,
        };
        return resolve({ responseData });
      } catch (error) {
        return resolve(error.message);
      }
    })
      .then((data) => {
        if (data === enums.user.NOT_FOUND) {
          LOG.warn(enums.user.NOT_FOUND);
        } else if (data === enums.user.PASSWORD_NOT_MATCH) {
          LOG.warn(enums.user.PASSWORD_NOT_MATCH);
        } else {
          LOG.info(enums.user.LOGIN_SUCCESS);
        }
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        LOG.info(enums.user.LOGIN_ERROR);
        responseHandler.handleError(res, error.message);
      });
  } else {
    return responseHandler.handleError(res, enums.user.CREDENTIAL_REQUIRED);
  }
}
