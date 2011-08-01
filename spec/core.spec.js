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