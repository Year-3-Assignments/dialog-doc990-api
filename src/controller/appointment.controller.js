import Appointment from '../model/Appointment';
import Payment from '../model/Payment';
import Log from '../log';

export async function createAppointment(req, res) {
  const appointmentObj = {
    time: req.body.time,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    nic: req.body.nic,
    city: req.body.city,
    province: req.body.province,
    isChargeChecked: req.body.isChargeChecked,
    isPDFChecked: req.body.isPDFChecked,
    referenceNo: req.body.referenceNo,
    hospitalName: req.body.hospitalName,
    date: req.body.date,
    totalAmount: req.body.totalAmount,
    isAppointmentCancelled: false,
    doctorName: req.body.doctorName,
    specialization: req.body.specialization,
  };

  const paymentObj = {
    phoneNumber: req.body.phoneNumber,
    totalAmount: req.body.totalAmount,
    lastFourDigits: req.body.cardNumber.slice(req.body.cardNumber.length - 4),
    cardExpireDate: req.body.cardExpireDate,
  };

  // Create objects
  const appointment = new Appointment(appointmentObj);
  const payment = new Payment(paymentObj);

  payment
    .save() // Create the payment
    .then((data) => {
      Log.info('Payment Created Successfully');
      appointment
        .save() // Create the appointment
        .then(async (data) => {
          Log.info('Appointment Created Successfully');
          return res.status(200).json(data);
        })
        .catch((error) => {
          return res.status(500).json(error.message);
        });
    })
    .catch((error) => {
      Log.error(error.message);
      return res.status(500).json(error.message);
    });
}

export async function getAppointmentForUser(req, res) {
  await Appointment.find(
    { phoneNumber: req.headers.phonenumber, isAppointmentCancelled: false },
    function (error, docs) {
      if (error) {
        Log.error(error.message);
        return res.status(500).json(error.message);
      } else {
        Log.info('Appointment Fetched Successfully');
        return res.status(200).json(docs);
      }
    }
  );
}

export async function cancelAppointment(req, res) {
  await Appointment.findOneAndUpdate(
    { phoneNumber: req.body.phoneNumber },
    { isAppointmentCancelled: true },
    function (error, docs) {
      if (error) {
        Log.error(error.message);
        return res.status(500).json(error.message);
      } else {
        Log.info('User Appointment Cancelled Successfully');
        return res.status(200).json(docs);
      }
    }
  );
}
