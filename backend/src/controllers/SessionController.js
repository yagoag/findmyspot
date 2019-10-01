const User = require('../models/User');
// index => listagem, show => mostrar entrada unica, store => criar, update => alterar, destroy => deletar

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  },
};
