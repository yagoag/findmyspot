const Bookings = require('../models/Booking');

module.exports = {
  async store(req, res) {
    const { booking_id, status } = req.params;

    const booking = await Bookings.findById(booking_id).populate('spot');

    booking.approved = status === 'approve';

    await booking.save();

    const bookerSocket = req.connectedUsers[booking.user];

    if (bookerSocket) {
      req.io.to(bookerSocket).emit('booking_response', booking);
    }

    return res.json(booking);
  },
};
