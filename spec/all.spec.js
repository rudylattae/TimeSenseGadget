describe('DateTime', function() {

    describe('#now', function() {
        it('creates a new Date object to get the current time', function() {
            var dt = new DateTime;
            var expectedNow = new Date(2011, 6, 20);
            var tardis = function(dateTime) {
                return dateTime;
            };
            spyOn(window, 'Date').andReturn(tardis(expectedNow));
            
            expect(dt.now()).toEqual(expectedNow);
        });
    });
    
    describe('#daysUntil', function() {
        var dt = new DateTime;
        
        beforeEach(function() {
            spyOn(dt, 'now').andReturn(new Date(2011, 6, 20));
        });
        
        it('returns 2, given an end date 2 days away', function() {
            var days = dt.daysUntil(2011, 6, 22);
            
            expect(days).toEqual(2);
        });

        it('returns 5, given an end date 5 days away', function() {
            var days = dt.daysUntil(2011, 6, 25);
            
            expect(days).toEqual(5);
        });

        it('returns -7, given an end date 7 days earlier', function() {
            var days = dt.daysUntil(2011, 6, 13);
            
            expect(days).toEqual(-7);
        });
    });
});

describe('ProgressTracker', function() {

    describe('when created', function() {
        it('initializes with sensible defaults given no options', function() {
            var tracker = new ProgressTracker();
            
            expect(tracker.max).toEqual(100);
            expect(tracker.min).toEqual(0);
            expect(tracker.value()).toEqual(0);
        });
    });
    
    describe('#value', function() {
        var tracker;
        
        beforeEach(function() {
            tracker = new ProgressTracker({
                max: 10
            });
        });
        
        it('sets the value to 4 given the parameter 4', function() {
            tracker.value(4);
            
            expect(tracker.value()).toEqual(4);
        });
        
        it('sets the value to 9 given the parameter 9', function() {
            tracker.value(9);
            
            expect(tracker.value()).toEqual(9);
        });
        
        it('sets the value to 10 (max) given a parameter 45 that is above the max', function() {
            tracker.value(45);
            
            expect(tracker.value()).toEqual(10);
        });
        
        it('sets the value to 0 (min) given a parameter -5 that is below the min', function() {
            tracker.value(-5);
            
            expect(tracker.value()).toEqual(0);
        });
    });
    
    describe('#percent', function() {
        var tracker;
        
        describe('given a max of 10', function() {
            beforeEach(function() {
                tracker = new ProgressTracker({
                    max: 10
                });
            });
            
            it('when percentage is 30, then it sets the value to 3', function() {
                tracker.percent(30);
                
                expect(tracker.value()).toEqual(3);
            });

            it('when value is 3, then it returns 30%', function() {
                tracker.value(3);
                
                expect(tracker.percent()).toEqual(30);
            });
        });
        
        describe('given a max of 100', function() {
            beforeEach(function() {
                tracker = new ProgressTracker({
                    max: 100
                });
            });
            
            it('when percentage is 25, then it sets the value to 25', function() {
                tracker.percent(25);
                
                expect(tracker.value()).toEqual(25);
            });
            
            it('when the value is 25, then it returns 25%', function() {
                tracker.value(25);
                
                expect(tracker.percent()).toEqual(25);
            });
        });
        
        describe('given a max of 540', function() {
            beforeEach(function() {
                tracker = new ProgressTracker({
                    max: 540
                });
            });
            
            it('when percentage is 80', function() {
                tracker.percent(80);
                
                expect(tracker.value()).toEqual(432);
            });
            
            it('when the value is 159, then it returns 30%, ', function() {
                tracker.value(159);
                
                expect(tracker.percent()).toEqual(30);
            });
        });
    });
        
    describe('#toJSON', function() {        
        it('returns a JSON representation of the tracker', function() {
            var tracker = new ProgressTracker({
                max: 100
            });
            tracker.percent(25);
            
            expect(tracker.toJSON()).toEqual({
                min: 0,
                max: 100,
                percent: 25,
                value: 25
            });
        });
    });
        
    describe('#render', function() {
        var tracker;
        
        beforeEach(function() {
            tracker = new ProgressTracker({
                max: 30
            });
        });
        
        it('renders the view for the tracker given a template', function() {
            tracker.percent(30);
            
            var output = tracker.render('I am at {percent}% of {max} which is {value}');
            
            expect(output).toBe('I am at 30% of 30 which is 9');
        });
    });
});

describe('TextyTimeSensor', function() {
    describe('when created', function() {
        it('initializes with the given values for the sensor', function() {
            var expectedReferenceDate = new Date(2011, 1, 30);
            var expectedFocusDate = new Date(2011, 1, 30);
            var expectedIndicator = 'custom';
            var expectedTitle = 'New year!';
            var expectedUnits = 'hours';
            
            var sensor = new TextyTimeSensor({
                indicator: expectedIndicator,
                title: expectedTitle,
                reference: expectedReferenceDate,
                focus: expectedFocusDate,
                units: expectedUnits
            });
            
            expect(sensor.indicator).toEqual(expectedIndicator);
            expect(sensor.title).toEqual(expectedTitle);
            expect(sensor.reference).toEqual(expectedReferenceDate);
            expect(sensor.focus).toEqual(expectedFocusDate);
            expect(sensor.units).toEqual(expectedUnits);
        });
        
        it('initializes with sensible defaults for indicator, reference and units', function() {
            var expectedReferenceDate = new Date(2011, 6, 20);
            var tardis = new DateTime;
            spyOn(tardis, 'now').andReturn(expectedReferenceDate);
            
            var sensor = new TextyTimeSensor({}, tardis);
            
            
            expect(sensor.indicator).toEqual('texty');
            expect(sensor.title).toBeNull('');
            expect(sensor.reference).toEqual(expectedReferenceDate);
            expect(sensor.focus).toBeNull();
            expect(sensor.units).toEqual('days');
            
            expect(sensor.tracker).not.toBe(undefined);
            expect(sensor.tracker).not.toBeNull();
        });

        it('initializes the tracker "max" based on specified units, reference and focus', function() {
            //var tardis = new DateTime;
            //spyOn(tardis, 'now').andReturn(stasis);
            
            var sensor = new TextyTimeSensor({
                reference: new Date(2011, 1, 1),
                focus: new Date(2011, 1, 30),
                units: 'days'
            });
            
            expect(sensor.tracker.max).toEqual(29);
        });
    });

    describe('#flow', function() {        
        it('advances the tracker by 1', function() {
            var sensor = new TextyTimeSensor();
            var tracker = sensor.tracker;
            spyOn(tracker, 'value');
            
            sensor.flow();
            
            expect(tracker.value).toHaveBeenCalledWith(1);
        });
    });
});