
var fortune = [
    "Bon Voyage",
    "Good Luck!",
    "Baie Geluk",
    "Carpe Diem",
    ];

    exports.getFortune = function(){
        var FortuneIndex = Math.floor(Math.random() * fortune.length);
        return fortune[FortuneIndex];
    };

