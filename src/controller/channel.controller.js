import Channel from '../model/Channel';
import Doctor from '../model/Doctor';
import enums from '../enums';
import LOG from './controller.log';

export function addChannel(req, res) {
  new Promise(async (resolve, reject) => {
    let channelDetails = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      nic: req.body.nic,
      channelDoctor: req.body.channelDoctor,
      hospital: req.body.hospital,
      city: req.body.city,
      province: req.body.province,
      address: req.body.address,
      isChargeChecked: req.body.isChargeChecked,
      isPDFCheck: req.body.isPDFCheck,
    };

    let doctor = await Doctor.findById(req.body.channelDoctor);
    let channel = new Channel(channelDetails);
    let totalAppointments = doctor.appointments;

    if (doctor) {
      await channel.save();
      await Doctor.findByIdAndUpdate(req.body.channelDoctor, {
        appointments: totalAppointments + 1,
      });
      LOG.info(enums.channel.APPOINMENT_UPDATE);
      return resolve({ channel });
    } else {
      return resolve(enums.doctor.NOT_FOUND);
    }
  })
    .then((data) => {
      LOG.info(enums.channel.CREATE_SUCCESS);
      responseHandler.respond(res, data);
    })
    .catch((error) => {
      LOG.error(enums.channel.CREATE_ERROR);
      responseHandler.handleError(res, error.message);
    });
}

export function getUserChannels(req, res) {
  new Promise(async (resolve, reject) => {
    let channels = await Channel.find({ phoneNumber: req.params.id });

    if (channels) {
      return resolve({ channels });
    } else {
      return resolve(enums.channel.NOT_FOUND);
    }
  })
    .then((data) => {
      if (data === enums.channel.NOT_FOUND) {
        LOG.warn(enums.channel.NOT_FOUND);
      } else {
        LOG.info(enums.channel.FETCHE_SUCCESS);
      }
      responseHandler.respond(res, data);
    })
    .catch((error) => {
      LOG.error(enums.channel.FETCHE_ERROR);
      responseHandler.handleError(res, error.message);
    });
}

export function removeChannel(req, res) {
  new Promise(async (resovle, reject) => {
    let channel = await Channel.findById(req.params.id);

    if (channel) {
      await Channel.findByIdAndDelete(req.params.id);
      return resolve({ channel });
    } else {
      return resolve(enums.channel.NOT_FOUND);
    }
  })
    .then((data) => {
      if (data === enums.channel.NOT_FOUND) {
        LOG.warn(enums.channel.NOT_FOUND);
      } else {
        LOG.info(enums.channel.DELETE_SUCCESS);
      }
      responseHandler.respond(res, data);
    })
    .catch((error) => {
      LOG.error(enums.channel.DELETE_ERROR);
      responseHandler.handleError(res, error.message);
    });
}
