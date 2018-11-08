module.exports = ({
  getNow() {
    return new Date();
  },

  getTimeToDay(day) {
    const now = this.getNow();
    const timeToDay = day - now;
    return timeToDay > 0 ? timeToDay : null;
  },

  scheduleJobForEveryDay({timeStart, job, stop, bot, chatId}) {
    const timeTodDay = this.getTimeToDay(timeStart);
    const dayMs = 24 * 60 * 60 * 1000;
    let start = 1;

    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      const intervalId = setInterval(() => {
        if (start < stop) {
          job[start] && job[start](bot, chatId).run();
          start++;
        } else {
          clearInterval(intervalId);
        }
      }, 10000);
    }, timeTodDay);
  },
});
