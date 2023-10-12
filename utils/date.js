// Formats date and time using dayjs
const dayjs = require('dayjs');

const formatDate = () => {
    return dayjs().format('YYYY-MM-DD T: HH:mm:ss A');
}
// Exports date format
module.exports = formatDate;