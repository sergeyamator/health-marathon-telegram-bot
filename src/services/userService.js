const User = require("../db/user");

const TIME_PERIOD = {
  short: 0,
  long: 1
};

module.exports = {
  save(data) {
    User.findOne({
        telegramId: data.telegramId
    }).then(user => {
        if (!user) {
            new User(data).save();
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
  }
};
