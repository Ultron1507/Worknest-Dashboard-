const mongoose = require("mongoose");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function isValidEmail(email) {
  return emailPattern.test(normalizeEmail(email));
}

function cleanString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim();
  return maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  cleanString,
  isValidEmail,
  isValidObjectId,
  normalizeEmail,
};
