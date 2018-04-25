const _ = require('lodash');

const sort = (obj) => {
    if (_.isPlainObject(obj))
        return _(obj).keys().sortBy().reduce((o, i) => {
            o[i] = sort(obj[i]);
            return o;
        }, {});

    if (_.isArray(obj))
        return _(obj).sortBy().map(o => sort(o)).value();


    return obj;
};


module.exports = sort;