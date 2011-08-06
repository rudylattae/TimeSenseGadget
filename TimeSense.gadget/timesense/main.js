function $(id) {
    if (id.length <= 1) { return; }
    
    var id = id.substr(1, id.lenght);
    return document.getElementById(id);
}


var clock = new Timekeeper({
    title: "Sneaky's arrival",
    indicator: 'texty',
    reference: new Date(2011, 7, 3),
    focus: new Date(2011, 7, 20),
    interval: 1000 * 60,
    onTick: function() {
        $('#content').html(this.render());
    },
    viewModel: function() {
        var model = this.toJSON();
        model.custom = "BOOM!";
        return model;
    }
});

//clock.start();