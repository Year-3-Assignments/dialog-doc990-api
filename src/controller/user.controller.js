import User from '../model/User';
import enums from '../enums';
import responseHandler from '../response/response.handler';
import Log from '../log';

const USER_PICTURE = {
  MALE: 'https://firebasestorage.googleapis.com/v0/b/shopping-storage-22f5f.appspot.com/o/male.jpg?alt=media&token=36491e78-57c7-4869-81bc-f1d3480e6b39',
  FEMALE:
    'https://firebasestorage.googleapis.com/v0/b/shopping-storage-22f5f.appspot.com/o/female.jpg?alt=media&token=d07684cb-d4b4-41bb-bd7a-5080d01394c9',
};

export async function createUser(req, res) {
  if (req.body && req.body.phoneNumber) {
    let phoneNumber = req.body.phoneNumber;
    let user = await User.findOne({ phoneNumber: phoneNumber });

    if (user) {
      return res.status(400).json('User already exists');
    }

    const userData = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      password: req.body.password,
      imageUrl:
        req.body.gender === 'Male' ? USER_PICTURE.MALE : USER_PICTURE.FEMALE,
      country: req.body.country,
      nic: req.body.nic,
    };

    user = new User(userData);
    await user
      .save()
      .then((data) => {
        let responseData = {
          user_id: data._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        };
        res.status(200).json(responseData);
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  }
}

export async function getUserProfile(req, res) {
  await User.findOne(
    { phoneNumber: req.body.phoneNumber },
    function (error, docs) {
      if (error) {
        Log.error(error.message);
        return res.status(500).json(error.message);
      } else {
        Log.info('User account fetched successfully');
        return res.status(200).json(docs);
      }
    }
  );
}

export async function loginUser(req, res) {
  if (req.body && req.body.phoneNumber && req.body.password) {
    let { phoneNumber, password } = req.body;

    let user = await User.findByPhoneNoPassword(phoneNumber, password);

    if (!user) {
      return res.status(404).json(enums.user.NOT_FOUND);
    }

    let responseData = {
      user_id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
    return res.status(200).json(responseData);
  } else {
    return responseHandler.handleError(res, enums.user.CREDENTIAL_REQUIRED);
  }
}
