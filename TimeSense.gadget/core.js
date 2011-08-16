
/**
 * Simple configuration manager -- load + save
 */
function Configurator() {
    var defaults =  {
        'what': 'Some default thing'
    };
    this.values = defaults;
}

Configurator.prototype = {
    load: function() {
        if (!System.Gadget.Settings.read('customized')) return;
        
        if (System.Gadget.Settings.readString('what')) {
            this.values['what'] = System.Gadget.Settings.readString('what');
        }
    },
    
    save: function() {
        if (typeof this.values['what'] !== 'undefined') {
            System.Gadget.Settings.writeString('what', this.values['what']);
        }
        
        System.Gadget.Settings.write('customized', true);
    }
}

var config = new Configurator;