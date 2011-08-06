/**
 * Functions to attach to a list of nodes that make life easier
 */
var NodeHelpers = {
    text: function(text) {
        if (this.length === 0) return;
        
        if (typeof text !== 'undefined') {
            for (var i=0; i<this.length; i++) {
                this[i].textContent = text;
            }
        } else {
            var all = '';
            for (var i=0; i<this.length; i++) {
                all += this[i].textContent;
            }
            return all;
        }
    },
    
    html: function(html) {
        if (this.length === 0) return;
        
        if (typeof html !== 'undefined') {
            for (var i=0; i<this.length; i++) {
                this[i].innerHTML = html;
            }
        } else {
            var all = '';
            for (var i=0; i<this.length; i++) {
                all += this[i].innerHTML;
            }
            return all;
        }
    },
    
    bind: function(type, listener, capture) {
        if (this.length === 0) return;
        
        if (typeof type !== 'undefined' && typeof listener !== 'undefined') {
            for (var i=0; i<this.length; i++) {
                this[i].addEventListener(type, listener, capture);
            }
        }
    },
    
    val: function(val) {
        if (this.length === 0) return;
        
        if (typeof val !== 'undefined') {
            for (var i=0; i<this.length; i++) {
                this[i].value = val;
            }
        } else {
            var all = '';
            for (var i=0; i<this.length; i++) {
                all += this[i].value;
            }
            return all;
        }
    }
};


/**
 * Builds and returns a selector engine which augments the found node list with the given helpers
 * - https://gist.github.com/991057
 */
var q = function(doc, helpers) {
    var sel = doc.querySelectorAll ? 
        function(a,b) { return doc.querySelectorAll(a,b); } : 
        function(a,b){a=a.match(/^(\W)?(.*)/);return(b||document)["getElement"+(b=a[1]?b=="#"?"ById":"sByClassName":"sByTagName")](a[2])}
    
    return function(selector, context) {
        var nodes = sel(selector, context);
        if (typeof helpers !== 'undefined') {
            for (helper in helpers) {
                nodes[helper] = helpers[helper];
            }
        }
        return nodes;
    };
}

/**
 * Your friendly neighborhood "$" selector, with just the right amount of "super"
 */
var $ = $ || q(document, NodeHelpers);


/**
 * https://gist.github.com/1075080
 */
function tofu(a,c){return a.replace(/{ *([^} ]+) *}/g,function(b,a){b=c;a.replace(/[^.]+/g,function(a){b=b[a]});return b})};