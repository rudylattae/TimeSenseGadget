// Polyfills and microjs helpers
// ================================


// JS Core
// ----------
 
/**
 * ECMAScript 5 polyfill for Date.now method
 * https://gist.github.com/1035932
 */
Date.now = Date.now || function(){ return+new Date }


// Strings/Templates
// -------------------

/**
 * https://gist.github.com/1075080
 */
function tofu(a,c){return a.replace(/{ *([^} ]+) *}/g,function(b,a){b=c;a.replace(/[^.]+/g,function(a){b=b[a]});return b})};


// DOM
// -------

/**
 * NodeList polyfill for browsers without
 */
if (typeof NodeList === 'undefined') {
    function NodeList(el) {
        if (el instanceof Array) {
            for (var i=0, len=el.length; i<len; i++) {
                this[i] = el[i];
            }
            this.length = el.length;
        } else {
            this['0'] = el;
            this.length = 1;
        }
    }
    NodeList.prototype.item = function() {};
}


/**
 * Polyfill for document.getElementsByClassName
 */
document.getElementsByClassName = document.getElementsByClassName || function (searchClass,node,tag) {
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}


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
                if (this[i].addEventListener) {
                    this[i].addEventListener(type, listener, capture);
                } else if (this[i].attachEvent) {
                    this[i].attachEvent('on' + type, listener);
                }
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
    },
    
    hide: function() {
        if (this.length === 0) return;
        for (var i=0; i<this.length; i++) {
            this[i].style.display = 'none';
        }
    },
    
    show: function() {
        if (this.length === 0) return;
        for (var i=0; i<this.length; i++) {
            this[i].style.display = 'block';
        }
    }
};

/**
 * Builds and returns a selector engine using either document.querySelectorAll or 
 * cssSelect https://gist.github.com/991057
 * If a helpers module is provided, the selector engine augments the matching NodeList
 * with the functions in the helper module
 */
var q = function(document, helpers) {
    var sel = document.querySelectorAll ? 
        function(a,b) { return document.querySelectorAll(a,b); } : 
        function(a,b){a=a.match(/^(\W)?(.*)/);return(b||document)["getElement"+(a[1]?a[1]=="#"?"ById":"sByClassName":"sByTagName")](a[2])};
    
    function isNodeList(el) {
        if (typeof el.length === 'number' && typeof el.item !== 'undefined')
        {
            return true;
        } 
        return false;
    }
    
    return function(selector, context) {
        var nodes = sel(selector, context);
        if (!isNodeList(nodes)) { nodes = new NodeList(nodes); }
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
