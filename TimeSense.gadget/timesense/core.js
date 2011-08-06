
/**
 * ECMAScript 5 polyfill for Date.now method
 * https://gist.github.com/1035932
 */
Date.now = Date.now || function(){ return+new Date }


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
    
    this.title = options.title ? options.title : null;
    this.type = options.type ? options.type : null;
    this.interval = options.interval ? options.interval : null;
    this.onTick = options.onTick ? options.onTick : null;
    this.viewModel = options.viewModel ? options.viewModel : null;
    
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
Timekeeper.prototype.tick = function() {
    this.tracker.value(this.slice.remaining());
    if (this.onTick) {
        this.onTick.call(this);
    }
}
Timekeeper.prototype.start = function() {
    var self = this;
    this._timer = setInterval(function() {
        self.tick();
    }, this.interval);
}
Timekeeper.prototype.toJSON = function() {
    return {
        title: this.title,
        type: this.type,
        slice: this.slice.toJSON(),
        tracker: this.tracker.toJSON()
    };
}
Timekeeper.prototype.render = function(template) {
    var json = {};
    
    if (this.viewModel) {
        json = this.viewModel.call(this);
    } else {
        json = this.toJSON();
    }
    return tofu(template, json);
}