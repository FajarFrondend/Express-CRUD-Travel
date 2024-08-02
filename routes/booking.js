const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Booking = require('../models/booking');

const router = express.Router();

// Create booking
router.post(
  '/',
  [
    auth,
    [
      check('tanggal', 'Tanggal is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      // tambahkan validasi lain jika diperlukan
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tanggal, name, alamatJemput, alamatTujuan, data, tipe, agen, tiket, st, fee, waPesan, pesanKonfirmAwal, konfirm } = req.body;

    console.log('Received booking data:', req.body);

    try {
      const newBooking = new Booking({
        tanggal,
        name,
        alamatJemput,
        alamatTujuan,
        data,
        tipe,
        agen,
        tiket,
        st,
        fee,
        waPesan,
        pesanKonfirmAwal,
        konfirm,
        user: req.user.id
      });

      const booking = await newBooking.save();
      console.log('Saved booking data:', booking);

      res.json(booking);
    } catch (err) {
      console.error('Error saving booking:', err.message);
      res.status(500).send('Server error');
    }
  }
);

// Delete booking by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log(`Attempting to delete booking with id: ${req.params.id}`);
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      console.log('Booking not found');
      return res.status(404).json({ msg: 'Booking not found' });
    }

    await Booking.deleteOne({ _id: req.params.id }); // Menggunakan deleteOne

    console.log(`Booking with id: ${req.params.id} removed`);
    res.json({ msg: 'Booking removed' });
  } catch (err) {
    console.error('Error deleting booking:', err.message);
    res.status(500).send('Server error');
  }
});

// Get all bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
