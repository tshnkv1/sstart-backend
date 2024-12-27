const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  skills: [{ type: String }],
  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
  },
  photoUrl: { type: String },
});

const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;
