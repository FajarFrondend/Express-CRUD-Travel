const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  alamatJemput: {
    type: String,
    required: true
  },
  alamatTujuan: {
    type: String,
    required: true
  },
  data: {
    type: String
  },
  tipe: {
    type: String
  },
  agen: {
    type: String
  },
  tiket: {
    type: String
  },
  st: {
    type: String
  },
  fee: {
    type: Number
  },
  waPesan: {
    type: String
  },
  pesanKonfirmAwal: {
    type: String
  },
  konfirm: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Booking = mongoose.model('booking', BookingSchema);
