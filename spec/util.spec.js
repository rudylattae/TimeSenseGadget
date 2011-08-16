describe('util', function() {
    describe('#hintForValue', function() {        
        it('returns the hint "full" for input of 100', function() {
            expect(util.hintForValue(100)).toBe('full');
        });
        
        it('returns the hint "high" for input between 60 and 99 inclusive', function() {
            expect(util.hintForValue(60)).toBe('high');
            expect(util.hintForValue(99)).toBe('high');
            expect(util.hintForValue(68)).toBe('high');
            expect(util.hintForValue(85)).toBe('high');
        });
        
        it('returns the hint "mid" for input between 30 and 59 inclusive', function() {
            expect(util.hintForValue(30)).toBe('mid');
            expect(util.hintForValue(59)).toBe('mid');
            expect(util.hintForValue(38)).toBe('mid');
            expect(util.hintForValue(45)).toBe('mid');
        });
        
        it('returns the hint "low" for input between 1 and 29 inclusive', function() {
            expect(util.hintForValue(1)).toBe('low');
            expect(util.hintForValue(29)).toBe('low');
            expect(util.hintForValue(5)).toBe('low');
            expect(util.hintForValue(25)).toBe('low');
        });
        
        it('returns the hint "empty" for input of 0', function() {
            expect(util.hintForValue(0)).toBe('empty');
        });
    });
    
    describe('#visualizeProgress', function() {
        describe('given marker value "*" and limit 30', function() {
            it('returns 6 "*"s for input of 20', function() {
                
            });
        });
    });
});