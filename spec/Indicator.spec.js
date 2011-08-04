describe('Indicator', function() {
    describe('when created', function() {
        it('initializes with type and sensor', function() {
            var indicator = new Indicator({
                type: 'texty',
                sensor: new TimeSensor()
            });
            
            expect(indicator.type).toEqual('texty');
            expect(indicator.sensor).not.toBeNull();
        });
    });
    
    describe('#render', function() {
        it('renders text/html representation for the indicator given a template', function() {
            var indicator = new Indicator({
                type: 'texty',
                sensor: new TimeSensor()
            });
            
            var repr = indicator.render('I am here');
            
            expect(repr).toEqual('I am here');
        });
    });
});