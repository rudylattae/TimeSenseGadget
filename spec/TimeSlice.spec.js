describe('TimeSlice', function() {
    describe('when created', function() {
        it('initializes with the reference and focus times', function() {
            var expectedReference = new Date(2011, 11, 1);
            var expectedFocus = new Date(2012, 0, 1);
            
            var slice = new TimeSlice({
                reference: expectedReference,
                focus: expectedFocus
            });
            
            expect(slice.reference).toEqual(expectedReference);
            expect(slice.focus).toEqual(expectedFocus);
        });
    });

    describe('#span', function() {
        it('returns the number of milliseconds difference between the reference and focus times', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 26));
                        
            var slice = new TimeSlice({
                reference: new Date(2011, 11, 1),
                focus: new Date(2012, 0, 1)
            });
            
            expect(slice.span()).toEqual(2678400000);
        });
    });

    describe('#elapsed', function() {        
        it('returns the number of milliseconds elapsed since the reference time', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 26));
                        
            var slice = new TimeSlice({
                reference: new Date(2011, 11, 1),
                focus: new Date(2012, 0, 1)
            });
            
            expect(slice.elapsed()).toEqual(2160000000);
        });
    });

    describe('#remaining', function() {        
        it('returns the number of milliseconds remaining to the focus time', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 26));
                        
            var slice = new TimeSlice({
                reference: new Date(2011, 11, 1),
                focus: new Date(2012, 0, 1)
            });
            
            expect(slice.remaining()).toEqual(518400000);
        });
    });

    describe('#toJSON', function() {        
        it('returns a snapshot JSON representation', function() {
            spyOn(Date, 'now').andReturn(new Date(2011, 11, 26));
            
            var expectedReference = new Date(2011, 11, 1);
            var expectedFocus = new Date(2012, 0, 1);
            var slice = new TimeSlice({
                reference: expectedReference,
                focus: expectedFocus
            });
            
            expect(slice.toJSON()).toEqual({
                reference: expectedReference,
                focus: expectedFocus,
                span: 2678400000,
                elapsed: 2160000000,
                remaining: 518400000
            });
        });
    });
});