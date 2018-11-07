const User = require("../db/user");

const TIME_PERIOD = {
    short: 0,
    long: 1,
}

module.exports = ({
  save(data) {
    const createdUser = new User({
      first_name: data.first_name,
      second_name: data.second_name,
      chat_id: data.chat_id,
      username: data.username,
    });

    return createdUser.save()
  },

  setOption(username, options) {
      return User.findOneAndUpdate({
            username
        }, 
        {
            period: options.period
        }, 
        {
            new: true
        })
  }
});
