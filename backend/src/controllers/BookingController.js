const Booking = require('../models/Booking');
const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    if (!(await User.findById(user_id))) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    if (!(await Spot.findById(spot_id))) {
      return res.status(400).json({ error: 'Spot does not exist' });
    }

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking
      .populate('spot')
      .populate('user')
      .execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('booking_request', booking);
    }

    return res.json(booking);
  },
};
