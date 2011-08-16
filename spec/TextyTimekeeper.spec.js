describe('TextyTimekeeper', function() {
    describe('when created', function() {
        it('initializes with predefined type, onTick handler and viewModel processor', function() {
            var clock = new TextyTimekeeper;
            
            expect(clock.type).toBe('texty');
            expect(clock.onTick).not.toBeNull();
            expect(clock.viewModel).not.toBeNull();
        });
    });    
    
    describe('#getHint', function() {
        var clock;
        
        beforeEach(function() {
            clock = new TextyTimekeeper;
        });
        
        it('returns the hint "full" for a tracker at 100%', function() {
            expect(clock.getHint()).toBe('full');
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