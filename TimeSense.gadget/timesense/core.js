var dateTime = {

    /**
     * Calculates the number of days from now to the given date
     */
    daysUntil: function(y, m, d) {
        var start = dateTime.now();
        var end = new Date(y, m, d);
        var day = 1000 * 60 * 60 * 24;
        var diff = Math.ceil((end.getTime() - start.getTime()) / day);
        return diff;
    },

    /**
     * Wrapper function to return current date+time
     */
    now: function() {
        return new Date();
    }
};


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
 * A simple indicator. It tracks the passage of time and displays the progress
 * toward a target event as a text bar.
 */
function TextyIndicator(options) {
    var options = options || {};
    
    this.type = options.type ? options.type : 'texty';
    this.units = options.units ? options.units : 'days';
    this.target = options.target ? options.target : 'An event';
    this.tracker = options.tracker ? new ProgressTracker(options.tracker) : new ProgressTracker;
}
TextyIndicator.prototype.tick = function() {
    this.tracker.percent(1);
}


// utiil
// ======

// http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
function t(s,d){
    for(var p in d)
        s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
    return s;
}
