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
    if (typeof value !== 'undefined') {
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
ProgressTracker.prototype.toJSON = function() {
    return {
        min: this.min,
        max: this.max,
        percent: this.percent(),
        value: this.value()
    };
}


/**
 * A TimeSlice defines two bounds (reference and focus) for a finite period.
 */
function TimeSlice(options) {
    var options = options || {};
    
    this.reference = options.reference ? options.reference : null;
    this.focus = options.focus ? options.focus : null;
}
TimeSlice.prototype.span = function() {
    return this.focus - this.reference;
}
TimeSlice.prototype.elapsed = function() {
    return Date.now() - this.reference;
}
TimeSlice.prototype.remaining = function() {
    return this.focus - Date.now();
}
TimeSlice.prototype.toJSON = function() {
    return {
        reference: this.reference,
        focus: this.focus,
        span: this.span(),
        elapsed: this.elapsed(),
        remaining: this.remaining()
    };
}


/**
 * Keeps track of and provides feedback on the passage of time.
 */
function Timekeeper(options) {
    var options = options || {};
    
    this.event = options.event ? options.event : null;
    this.type = options.type ? options.type : null;
    this.interval = options.interval ? options.interval : null;
    
    if (options.reference && options.focus) {
        this.slice = new TimeSlice({
            reference: options.reference,
            focus: options.focus
        });
        
        this.tracker = new ProgressTracker({
            max: this.slice.span()
        });
        this.tracker.percent(100);
    }
}

Timekeeper.prototype.onTick = function() {}

Timekeeper.prototype.tick = function() {
    this.tracker.value(this.slice.remaining());
    this.onTick.call(this);
}

Timekeeper.prototype.start = function() {
    var self = this;
    this._timer = setInterval(function() {
        self.tick();
    }, this.interval);
}

Timekeeper.prototype.stop = function() {
    if (this._timer) {
        clearInterval(this._timer);
    }
}

Timekeeper.prototype.toJSON = function() {
    return {
        event: this.event,
        type: this.type,
        slice: this.slice.toJSON(),
        tracker: this.tracker.toJSON()
    };
}

Timekeeper.prototype.viewModel = function() { return this.toJSON(); }

Timekeeper.prototype.render = function(template) {
    var json = this.viewModel.call(this);
    return tofu(template, json);
}


/**
 * Pure text implementation of a timekeeper.
 */
function TextyTimekeeper(options) {
    var options = options || {};
    
    options.type = options.type || "texty";
    
    Timekeeper.call(this, options);
}

TextyTimekeeper.prototype = new Timekeeper;

TextyTimekeeper.prototype.constructor = TextyTimekeeper;

TextyTimekeeper.prototype.onTick = function() {

}

TextyTimekeeper.prototype.viewModel = function() {
    var model = this.toJSON();
    var progress = this.progressIndicator();
    model.progress = progress == '' ? '&nbsp;' : progress;
    model.hint = this.hint();
    model.counter = this.counter();
    model.friendlyDate = this.friendlyDate(); 
    model.scale = this.progressIndicatorScale();
    return model;
}

TextyTimekeeper.prototype.hint = function() {
    return util.hintForValue(this.tracker.percent());
}

TextyTimekeeper.prototype.counter = function() {
    _date.relativeTime.future = "%s to";
    _date.relativeTime.past = "%s since";
    return _date(this.slice.focus).from(Date.now());;
}

TextyTimekeeper.prototype.friendlyDate = function() {
    return _date(this.slice.focus).format('ddd, MMM Do YYYY h:mm:ss a');
}

TextyTimekeeper.prototype.progressIndicator = function() {
    var marker = '|';
    var maxMarkers = 36;

    var limit = (this.tracker.percent() / 100) * maxMarkers;
    var progress = '';
    for (i=1; i<=limit; i++) {
        progress += marker;
    }
    
    return progress;
}

TextyTimekeeper.prototype.progressIndicatorScale = function() {
    return {
        empty: 0,
        max: _date(this.slice.focus).from(_date(this.slice.reference), true)
    };
}


/**
 * Timekeeper related utils
 */
var util = {
    hintForValue: function(percent) {
        if (percent === 100) { return 'full'; }
        if (percent >= 60 && percent <= 99) { return 'high'; }
        if (percent >= 30 && percent <= 59) { return 'mid'; }
        if (percent >= 1 && percent <= 29) { return 'low'; }
        if (percent === 0) { return 'empty'; }
    }
};