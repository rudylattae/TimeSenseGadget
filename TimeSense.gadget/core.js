
/**
 * Simple configuration manager -- load + save
 */
function Configurator() {
    var defaults =  {
        'event': 'New Year 2012!',
        'focus': 'Jan 1 2012',
        'reference': _date(Date.now()).format('MMM D YYYY hh:mm:ss a'),
        'interval': '3000',
        'toggleDateEvent': 'event'
    };
    this.values = defaults;
}

Configurator.prototype = {
    load: function() {
        if (!System.Gadget.Settings.read('customized')) return;
        
        if (System.Gadget.Settings.readString('event')) {
            this.values['event'] = System.Gadget.Settings.readString('event');
        }
        if (System.Gadget.Settings.readString('focus')) {
            this.values['focus'] = System.Gadget.Settings.readString('focus');
        }
        if (System.Gadget.Settings.readString('reference')) {
            this.values['reference'] = System.Gadget.Settings.readString('reference');
        }
        if (System.Gadget.Settings.readString('toggleDateEvent')) {
            this.values['toggleDateEvent'] = System.Gadget.Settings.readString('toggleDateEvent');
        }
    },
    
    save: function() {
        if (typeof this.values['event'] !== 'undefined') {
            System.Gadget.Settings.writeString('event', this.values['event']);
        }
        if (typeof this.values['focus'] !== 'undefined') {
            System.Gadget.Settings.writeString('focus', this.values['focus']);
        }
        if (typeof this.values['reference'] !== 'undefined') {
            System.Gadget.Settings.writeString('reference', this.values['reference']);
        }
        if (typeof this.values['toggleDateEvent'] !== 'undefined') {
            System.Gadget.Settings.writeString('toggleDateEvent', this.values['toggleDateEvent']);
        }
        
        System.Gadget.Settings.write('customized', true);
    }
}

var config = new Configurator;