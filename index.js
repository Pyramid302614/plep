module.exports = {}
for(const item of require("fs").readdirSync(`${__dirname}/modules`)) module.exports[item.slice(0,-(".js".length))] = require(`${__dirname}/modules/${item}`);