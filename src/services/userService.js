const User = require("../db/user");

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

  setTimePeriod(telegramId, period) {
    console.log(period)
    User.findOneAndUpdate(
      { telegramId },
      { period: period }
    ).then(console.log).catch(console.error);
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
