const dayjs = require('dayjs');

const formatDate = () => {
    return dayjs().format('YYYY-MM-DD T: HH:mm:ss A');
}

module.exports = formatDate;