exports.init = function(Handlebars, Chance) {

    Handlebars.registerHelper('times', function(n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i) accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper('toUpperCase', function(str, options) {
        return str.toUpperCase();
    });

    Handlebars.registerHelper('chance', function(func) {
		var chance = new Chance((new Date()).getMilliseconds()); // initializing the seed
		return eval("chance."+func+"()");
    });

    Handlebars.registerHelper('age', function(_type, options) {
        if (options) {
            var chance = new Chance((new Date()).getMilliseconds()); // initializing the seed
            return chance.age({
                type: _type
            })
        } else {
            var chance = new Chance((new Date()).getMilliseconds()); // initializing the seed
            return chance.age()
        }
    });

    Handlebars.registerHelper('integer', function(_min, _max, options) {
        if (!options) {
            var chance = new Chance((new Date()).getMilliseconds()); // initializing the seed
            return chance.integer({
                min: _min,
                max: _max
            })
        } else {
            var chance = new Chance((new Date()).getMilliseconds()); // initializing the seed
            return chance.integer()
        }
    });

    Handlebars.registerHelper('float', function(_min, _max, options) {
        if (!options) {
            var chance = new Chance((new Date()).getMilliseconds()); // initializing the seed
            return chance.floating({
                min: _min,
                max: _max
            })
        } else {
            var chance = new Chance((new Date()).getMilliseconds()); // initializing the seed
            return chance.floating()
        }
    });    

}
