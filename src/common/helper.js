import moment from 'moment';

export const timeDiffFromNow = time => {
    const now = Date.now();
    const prevTime = moment(new Date(time)).valueOf();
    const diff = moment.duration(now - prevTime);

    if (diff.years() > 0) return diff.years() + 'y';
    if (diff.months() < 12 && diff.months() > 0) return diff.months() + 'm';
    if (diff.weeks() < 4 && diff.weeks() > 0) return diff.weeks() + 'w';
    if (diff.days() < 30 && diff.days() > 0) return diff.days() + 'd';
    if (diff.hours() < 24 && diff.hours() > 0) return diff.hours() + 'h';
    if (diff.minutes() < 60 && diff.minutes() > 0) return diff.minutes() + 'm';
    if (diff.seconds() < 60 && diff.seconds() > 0) return diff.seconds() + 's';
};

export const getDateTime = time => {
    return moment(time).format('h:mm a, Do MMMM');
};
