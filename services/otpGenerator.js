const otpGenerator = require("otp-generator");

const generateOtp = (num = 6) => {
  const otp = otpGenerator.generate(num, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
};

const generateInvitationToken = (num = 6) => {
  const token = otpGenerator.generate(num, {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: false,
  });
  return token;
};

module.exports = {
  generateOtp,
  generateInvitationToken,
};
