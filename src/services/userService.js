const User = require("../db/user");

const TIME_PERIOD = {
  short: 0,
  long: 1
};

module.exports = {
  save(data) {
    return User.findOne({
        telegramId: data.telegramId
    }).then(user => {
        if (!user) {
            return new User(data).save();
        }
    }).catch(console.error);
  },

  setTimePeriod(telegramId, days) {
    User.findOneAndUpdate(
      { telegramId },
      { period: days }
    ).catch(console.log);
  },

  saveAgreement(telegramId) {
    User.findOneAndUpdate(
      { telegramId },
      { agreement: true }
    ).catch(console.error);
  },

  switchForNextDay(telegramId) {
    return User.findOneAndUpdate(
      { telegramId },
      { $inc: { current_day: 1 } })
      .catch(console.error)
  }
};
