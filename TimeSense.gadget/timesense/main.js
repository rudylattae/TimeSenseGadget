function $(id) {
    if (id.length <= 1) { return; }
    
    var id = id.substr(1, id.lenght);
    return document.getElementById(id);
}

