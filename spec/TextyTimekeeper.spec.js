describe('TextyTimekeeper', function() {
    describe('when created', function() {
        it('initializes with predefined type, onTick handler and viewModel processor', function() {
            var clock = new TextyTimekeeper;
            
            expect(clock.type).toBe('texty');
            expect(clock.onTick).not.toBeNull();
            expect(clock.viewModel).not.toBeNull();
        });
    });
});