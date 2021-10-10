import Refund from '../model/Refund';
import Log from '../log';

export async function createRefund(req, res) {
  const refundObj = {
    referenceNo: req.body.referenceNo,
    isBankRefund: req.body.isBankRefund,
    isMobileRefund: req.body.isMobileRefund,
    bankHolderName: req.body.bankHolderName,
    bankName: req.body.bankName,
    branchName: req.body.branchName,
    refundRemarks: req.body.refundRemarks,
    phoneNumber: req.body.phoneNumber,
    amount: req.body.amount,
    status: 'PENDING',
  };

  const refund = new Refund(refundObj);
  refund
    .save()
    .then((data) => {
      Log.info('Refund Created Successfully');
      return res.status(200).json(data);
    })
    .catch((error) => {
      Log.error(error.message);
      return res.status(500).json(error.message);
    });
}

export async function getRefundsForUser(req, res) {
  await Refund.find(
    { phoneNumber: req.body.phoneNumber },
    function (error, docs) {
      if (error) {
        Log.error(error.message);
        return res.status(500).json(error.message);
      } else {
        Log.info('Refunds Fetched Successfully');
        return res.status(200).json(docs);
      }
    }
  );
}
