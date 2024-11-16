const {t} = require('./another-module')
//@ts-expect-error
const {he} = require('./yet-another-module')

exports.the = t + he
