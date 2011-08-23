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