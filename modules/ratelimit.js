const sources = {};

var tolerance = 1;

module.exports = {

    // Max signals per second = The max amount of signals someone can do per second
    // Tolerance = If someone goes over the limit, how many times they can do that before it flags it as bad
    init(maxSignalsPerSecond,tolerance_) {

        tolerance = tolerance_;
        setInterval(Object.keys(sources).forEach(require("./ratelimit.js").tick),1/maxSignalsPerSecond*tolerance_);

    },

    // The cool down
    tick(source) {

        if(sources[source] > 0) sources[source]--;

    },

    // Processes a signal, then returns if the source is over the limit
    signal(source) {

        if(!sources[source]) sources[source]++;
        return require("./ratelimit.js").bad(source);

    },

    // Returns if the source is over the limit
    bad(source) {

        return sources[source] > tolerance;

    }

    
}