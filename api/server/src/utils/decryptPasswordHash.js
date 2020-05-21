import CryptoJS from 'crypto-js';

function decryptPasswordHash(cipherPassword) {
  console.info('In decryptPasswordHas!!!', cipherPassword);
  const bytes  = CryptoJS.AES.decrypt(cipherPassword, 'password');
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword;
}

export default decryptPasswordHash;
