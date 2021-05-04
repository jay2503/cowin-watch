const axios = require('axios');
const moment = require('moment');
const notifier = require('node-notifier');


const watcher = {};

watcher.checkSlot = async (pin, free) => {
    const today = moment().format('DD-MM-YYYY');
    const result = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${today}`);
    console.log(result.data);

    const availableDates = {};
    if (result.data && result.data.centers) {
        result.data.centers.forEach((center) => {
            if (center.sessions) {
                center.sessions.forEach((session) => {
                    if (session.available_capacity > 0 && session.min_age_limit === 45) {
                        if (!availableDates[center.center_id]) {
                            availableDates[`c_${center.center_id}`] = {
                                name: center.name,
                                address: center.address,
                                dates: []
                            }
                        }

                        availableDates[`c_${center.center_id}`].dates.push(session.date);
                    }
                })
            }
        })
    }

    const msgs = [];

    if (availableDates) {
        const keys = Object.keys(availableDates);
        keys.forEach((key) => {
            const center = availableDates[key];
            const dt = center.dates.join(",");
            msgs.push(`${center.name} - ${dt}`)
        })
        console.log(availableDates);
    }

    notifier.notify({
        title: `Vaccination available - ${pin}`,
        message: `${msgs.join(" // ")}`
    });
}

module.exports = watcher;