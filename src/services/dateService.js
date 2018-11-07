module.exports = ({
    getNow() {
        return new Date();
    },

    getTimeToDay(day) {
        const now = this.getNow();
        const timeToDay = day - now;
        return timeToDay > 0 ? timeToDay : null;
    }
})