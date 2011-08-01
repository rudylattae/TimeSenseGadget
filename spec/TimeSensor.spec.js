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

    xdescribe('#tick', function() {        
        it('advances the tracker by 1', function() {
            var sensor = new TextyTimeSensor();
            var tracker = sensor.tracker;
            spyOn(tracker, 'value');
            
            sensor.tick();
            
            expect(tracker.value).toHaveBeenCalledWith(1);
        });
    });

    xdescribe('#render', function() {        
        it('renders the view for the sensor given a template', function() {
            var sensor = new TextyTimeSensor();
            
            var output = sensor.render('{}');
            
            expect(output).toBe('');
        });
    });
});