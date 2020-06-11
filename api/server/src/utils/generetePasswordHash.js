import CryptoJS from 'crypto-js';

const generatePasswordHash = (password) => {
  return new Promise((resolve, reject) => {
    const cipherPassword = CryptoJS.AES.encrypt(password, 'password').toString();
    if (!cipherPassword) {
      return reject
    }
    return resolve(cipherPassword)
  })
};

export default generatePasswordHash;
