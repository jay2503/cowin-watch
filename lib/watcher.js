const axios = require('axios');
const moment = require('moment');
const notifier = require('node-notifier');
const { exec } = require("child_process");

const watcher = {};

watcher.checkSlot = async (pin, free) => {
    const today = moment().format('DD-MM-YYYY');
    const result = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${today}`);

    let availableDates = null;
    if (result.data && result.data.centers) {
        result.data.centers.forEach((center) => {
            if (center.sessions) {
                center.sessions.forEach((session) => {
                    if (session.available_capacity > 0 && session.min_age_limit === 18) {
                        if (!availableDates) {
                            availableDates = {};
                        }
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

    if (availableDates) {
        const msgs = [];
        const keys = Object.keys(availableDates);
        keys.forEach((key) => {
            const center = availableDates[key];
            const dt = center.dates.join(",");
            msgs.push(`${center.name} - ${dt}`)
        })
        if (process.platform === 'darwin') {
            exec(`osascript -e 'display notification "${msgs.join(" // ")}" with title "Vaccination available - ${pin}"'`, (error, stdout, stderr) => { });
        } else {
            notifier.notify({
                title: `Vaccination available - ${pin}`,
                message: `${msgs.join(" // ")}`
            });
        }
    } else {
        console.info("No solt available at this moment, try setting up Cron to auto check after every few minutes.")
        process.exit();
    }
    process.exit();
}

watcher.testNote = () => {
    if (process.platform === 'darwin') {
        exec(`osascript -e 'display notification "Test notification to allow permission" with title "CoWin Watcher"'`, (error, stdout, stderr) => { });
    } else {
        notifier.notify({
            title: "CoWin Watcher",
            message: "Test notification to allow permission"
        });
    }
};

module.exports = watcher;