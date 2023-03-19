"use strict"

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
}
class Clock {
    constructor(hours, minutes, seconds) {
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
    }

    async start() {

        while (true) {
            await delay(1000)
            this.seconds += 1
            if (this.seconds > 59) {
                this.minutes += 1
                this.seconds -= 60
                if (this.minutes > 59) {
                    this.minutes -= 60
                    this.hour += 1
                    if (this.hour > 23) {
                        this.hour -= 24
                    }
                }
            }
            console.clear()
            console.log(this.hours + ":" + this.minutes.toString().padStart(2, "0") + ":" + this.seconds.toString().padStart(2, "0"));
        }
    }
    getTimeInMs(hour, minute, seconds) {
        if (!seconds) {
            seconds = 0
        }
        if (!minute) {
            minute = 0
        };
        return (hour * 60 * 60 * 1000) + (minute * 60 * 1000) + (seconds * 1000)
    }
    async setAlert(hours, minutes, second) {
        let timer;
        const alertTimeInMs = this.getTimeInMs(hours, minutes, second);
        const clockTimeInMs = this.getTimeInMs(this.hours, this.minutes, this.seconds);
        if (alertTimeInMs > clockTimeInMs) {
            timer = alertTimeInMs - clockTimeInMs
            await delay(timer)
        } else {
            let difference = clockTimeInMs - alertTimeInMs
            timer = this.getTimeInMs(24) - difference
            await delay(timer)
        }
    }
}


let clock = new Clock(23, 40, 55)
clock.start()
clock.setAlert(9, 0).then(() => console.log("Wake up"))

