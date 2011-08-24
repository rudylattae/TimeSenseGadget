describe('TextyTimekeeper', function() {
    describe('when created', function() {
        it('initializes with predefined type, onTick handler and viewModel processor', function() {
            var clock = new TextyTimekeeper;
            
            expect(clock.type).toBe('texty');
            expect(clock.onTick).not.toBeNull();
            expect(clock.viewModel).not.toBeNull();
        });
    });    
    
    describe('#hint', function() {
        
        var clock;
        
        beforeEach(function() {
            clock = new TextyTimekeeper({
                reference: new Date(2011, 11, 1),
                focus: new Date(2012, 0, 1)
            });
        });
        
        it('returns the hint "full" for a tracker at 100%', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 1));
            
            clock.tick();
            
            expect(clock.tracker.percent()).toEqual(100);
            expect(clock.hint()).toBe('full');
        });
        
        it('returns the hint "high" for a tracker at 71%', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 10));
            
            clock.tick();
            
            expect(clock.tracker.percent()).toEqual(71);
            expect(clock.hint()).toBe('high');
        });
        
        it('returns the hint "mid" for a tracker at 55%', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 15));
            
            clock.tick();
            
            expect(clock.tracker.percent()).toEqual(55);
            expect(clock.hint()).toBe('mid');
        });
        
        it('returns the hint "low" for a tracker at 4%', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 31));
            
            clock.tick();
            
            expect(clock.tracker.percent()).toEqual(4);
            expect(clock.hint()).toBe('low');
        });
        
        it('returns the hint "empty" for a tracker at 0%', function() {
            spyOn(Date, 'now').andReturn(new Date(2012, 0, 1));
            
            clock.tick();
            
            expect(clock.tracker.percent()).toEqual(0);
            expect(clock.hint()).toBe('empty');
        });
    });
    
    describe('#counter', function() {
        
        var clock;
        
        beforeEach(function() {
            clock = new TextyTimekeeper({
                reference: new Date(2010, 8, 1),
                focus: new Date(2012, 0, 1)
            });
        });
        
        describe('when focus is months away', function() {
            it('returns "a month to" given a focus that is 30 days away', function() {
                spyOn(Date, 'now').andReturn(new Date(2011, 11, 1));
                                
                expect(clock.counter()).toBe('a month to');
            });
            
            it('returns "a month to" given a focus that is 25 days away', function() {
                spyOn(Date, 'now').andReturn(new Date(2011, 11, 7));
                                
                expect(clock.counter()).toBe('a month to');
            });
            
            it('returns "2 months to" given a focus that is 2 months away', function() {
                spyOn(Date, 'now').andReturn(new Date(2011, 10, 5));
                
                expect(clock.counter()).toBe('2 months to');
            });
            
            it('returns "1 months to" given a focus that is 11 months away', function() {
                spyOn(Date, 'now').andReturn(new Date(2011, 1, 1));
                
                expect(clock.counter()).toBe('11 months to');
            });
        });
        
        describe('when focus is days away', function() {
            it('returns a readable description: "22 days to" given a focus that is 22 days away', function() {
                spyOn(Date, 'now').andReturn(new Date(2011, 11, 10));
                
                expect(clock.counter()).toBe('22 days to');
            });
            
            it('returns a readable description: "5 days to" given a focus that is 5 days away', function() {
                spyOn(Date, 'now').andReturn(new Date(2011, 11, 27));
                
                expect(clock.counter()).toBe('5 days to');
            });
            
            it('returns a readable description: "a days to" given a focus that is 1 day away', function() {
                spyOn(Date, 'now').andReturn(new Date(2011, 11, 31));
                
                expect(clock.counter()).toBe('a day to');
            });
        });
    });
    
    describe('#friendlyDate', function() {
        it('returns a human readable format of the focus date', function() {
            var clock = new TextyTimekeeper({
                reference: new Date(2010, 8, 1),
                focus: new Date(2012, 0, 1)
            });
            
            expect(clock.friendlyDate()).toEqual('Sun, Jan 1st 2012 12:00:00 am');
        });
    });
    
    describe('#progressIndicator', function() {
        it('returns text-based progress bars based on tracker percentage', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 1));
            
            var clock = new TextyTimekeeper({
                reference: new Date(2011, 11, 1),
                focus: new Date(2012, 0, 1)
            });
            
            var progressIndicator = clock.progressIndicator();
            
            expect(progressIndicator.length).toEqual(36);
        });
    });
    
    describe('#progressIndicatorScale', function() {
        it('returns min and max values for the scale used to draw the progress indicator', function() {
            var clock = new TextyTimekeeper({
                reference: new Date(2011, 11, 1),
                focus: new Date(2012, 0, 1)
            });
            
            var progressIndicatorScale = clock.progressIndicatorScale();
            
            expect(progressIndicatorScale).toEqual({empty:0, max: 'a month'});
        });
    });
    
    xdescribe('#viewModel', function() {
        it('generates a viewModel', function() {
            
        });
    });
    
    xdescribe('#visualizeProgress', function() {
        describe('given marker value "*" and limit 30', function() {
            it('returns 6 "*"s for input of 20', function() {
                var clock = new TextyTimekeeper;
                
            });
        });
    });
});