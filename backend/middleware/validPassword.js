const bcrypt = require('bcryptjs');

function validPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return { salt, hash };
}

module.exports = {validPassword};