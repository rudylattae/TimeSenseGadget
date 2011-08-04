describe('Timekeeper', function() {
    describe('when created', function() {
        it('initializes with the given title, type and onTick handler', function() {
            var expectedTitle = 'New Year!';
            var expectedType = 'texty';
            var expectedTickHandler = function () {};
            
            var clock = new Timekeeper({
                title: expectedTitle,
                type: expectedType,
                onTick: expectedTickHandler
            });
            
            expect(clock.title).toEqual(expectedTitle);
            expect(clock.type).toEqual(expectedType);
            expect(clock.onTick).toBe(expectedTickHandler);
        });
        
        it('initializes a TimeSlice with the reference and focus times', function() {
            var expectedReference = new Date(2011, 11, 1);
            var expectedFocus = new Date(2012, 0, 1);
            
            var clock = new Timekeeper({
                reference: expectedReference,
                focus: expectedFocus
            });
            
            var slice = clock.slice;
            expect(slice).not.toBeNull();
            expect(slice.reference).toEqual(expectedReference);
            expect(slice.focus).toEqual(expectedFocus);
        });

        it('initializes a ProgressTracker with "max" and "value" based on the span of the TimeSlice', function() {
            var clock = new Timekeeper({
                reference: new Date(2011, 11, 1),
                focus: new Date(2012, 0, 1)
            });
            
            var tracker = clock.tracker;
            expect(tracker).not.toBeNull();
            expect(tracker.max).toEqual(2678400000);
            expect(tracker.value()).toEqual(2678400000);
        });
    });

    describe('#tick', function() {
        
        it('sets the tracker value to the milliseconds remianing', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 26));
            
            var clock = new Timekeeper({
                reference: new Date(2011, 11, 1),
                focus: new Date(2012, 0, 1)
            });
            
            var tracker = clock.tracker;
            spyOn(tracker, 'value');
            
            clock.tick();
            
            expect(tracker.value).toHaveBeenCalledWith(518400000);
        });
        
        describe('given an onTick handler', function() {
            it('calls the onTick handler', function() {
                var tickHandler = jasmine.createSpy();
                
                var clock = new Timekeeper({
                    reference: new Date(2011, 11, 1),
                    focus: new Date(2012, 0, 1),
                    onTick: tickHandler
                });
                
                clock.tick();
                
                expect(tickHandler).toHaveBeenCalledWith(clock);
            });
        });
    });

    describe('#toJSON', function() {        
        it('returns a JSON representation of the clock and its sub-components', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 26));
            
            var expectedTitle = 'New Year!';
            var expectedType = 'texty';
            var expectedReference = new Date(2011, 11, 1);
            var expectedFocus = new Date(2012, 0, 1);

            var clock = new Timekeeper({
                title: expectedTitle,
                type: expectedType,
                reference: expectedReference,
                focus: expectedFocus
            });
            
            expect(clock.toJSON()).toEqual({
                title: expectedTitle,
                type: expectedType,
                slice: {
                    reference: expectedReference,
                    focus: expectedFocus,
                    span: 2678400000,
                    elapsed: 2160000000,
                    remaining: 518400000
                },
                tracker: {
                    min: 0,
                    max: 2678400000,
                    percent: 100,
                    value: 2678400000
                }
            });
        });
    });
});