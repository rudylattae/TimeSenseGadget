function DateTime() {}

/**
 * Wrapper function to return current date+time
 */
DateTime.prototype.now = function() {
    return new Date;
}

/**
 * Calculates the number of days from now to the given date
 */
DateTime.prototype.daysUntil = function(y, m, d) {
    var start = this.now();
    var end = new Date(y, m, d);
    var day = 1000 * 60 * 60 * 24;
    var diff = Math.ceil((end.getTime() - start.getTime()) / day);
    return diff;
}


/**
 * A basic progress tracker. Accepts progres as either absolute value or percentage.
 */
function ProgressTracker(options) {
    var options = options || {};
    
    this.max = options.max ? options.max : 100;
    this.min = options.min ? options.min : 0;
    this._value = 0;
}
ProgressTracker.prototype.value = function(value) {
    if (value) {
        if (value > this.max) {
            this._value = this.max;
        } else if (value < this.min) {
            this._value = this.min;
        } else {
            this._value = value;
        }
    } else {
        return this._value;
    }
}
ProgressTracker.prototype.percent = function(percentage) {
    if (percentage) {
        var value = (percentage/100) * this.max;
        this.value(value);
    } else {
        return Math.ceil((this.value()/this.max) * 100);
    }
}
ProgressTracker.prototype.render = function(template) {
    return t(template, this.toJSON());
}
ProgressTracker.prototype.toJSON = function() {
    return {
        min: this.min,
        max: this.max,
        percent: this.percent(),
        value: this.value()
    };
}


/**
 * A textual time sense provider. It tracks the passage of time and displays the
 * flow away from or towards the focus (date time) as a text bar.
 */
function TextyTimeSensor(options, dt) {
    var options = options || {};
    var dt = dt || new DateTime;
    
    this.indicator = options.indicator ? options.indicator : 'texty';
    this.title = options.title ? options.title : null;
    this.reference = options.reference ? options.reference : dt.now();
    this.focus = options.focus ? options.focus : null;
    this.units = options.units ? options.units : 'days';
    
    if (this.focus) {
        var day = 1000 * 60 * 60 * 24;
        var diff = Math.ceil((this.focus.getTime() - this.reference.getTime()) / day);
        var trackerOptions = {
            max: diff
        };
    } else {
        var trackerOptions = {};
    }
    this.tracker = new ProgressTracker(trackerOptions);
}
TextyTimeSensor.prototype.tick = function() {
    this.tracker.value(1);
}
TextyTimeSensor.prototype.toJSON = function() {
    return {};
}
TextyTimeSensor.prototype.render = function(template) {
    return t(template, this.toJSON());
}


// util
// ======

// http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
function t(s,d){
    for(var p in d)
        s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
    return s;
}
