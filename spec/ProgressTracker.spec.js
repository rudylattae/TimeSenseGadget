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
        
        it('sets the value to 0 given a parameter 0', function() {
            tracker.value(5);
            tracker.value(0);
            
            expect(tracker.value()).toEqual(0);
        });
        
        it('sets the value to 10 (max) given a parameter 45 that is above the max', function() {
            tracker.value(45);
            
            expect(tracker.value()).toEqual(10);
        });
        
        it('sets the value to 0 (min) given a parameter -5 that is below the min', function() {
            tracker.value(5);
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
});