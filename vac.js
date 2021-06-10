const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );


function parse(data,clinique) {
    $(data).each(function (i, d) {
        $(d.slots).each(function (i, da) {

            if (da.available == true) {
                console.log("Found a time at: "+ clinique+" "+new Date().toLocaleTimeString());
                console.log(da.when);
                console.log(d.date)
            }
        });
    });
}

var cliniques = new Map;
cliniques.set('Nacksta', ['https://booking-api.mittvaccin.se/clinique/1291/appointments/8853/slots/210607-210613','https://booking-api.mittvaccin.se/clinique/1291/appointments/8853/slots/210614-210620','https://booking-api.mittvaccin.se/clinique/1291/appointments/8853/slots/210621-210627']);
cliniques.set('Timra', ['https://booking-api.mittvaccin.se/clinique/1311/appointments/10620/slots/210607-210613', 'https://booking-api.mittvaccin.se/clinique/1311/appointments/10620/slots/210614-210620','https://booking-api.mittvaccin.se/clinique/1311/appointments/10620/slots/210621-210627']);
cliniques.set('Harnosand', ['https://booking-api.mittvaccin.se/clinique/1309/appointments/12044/slots/210607-210613', 'https://booking-api.mittvaccin.se/clinique/1309/appointments/12044/slots/210614-210620', 'https://booking-api.mittvaccin.se/clinique/1309/appointments/12044/slots/210621-210627']);
cliniques.set('kramfors', ['https://booking-api.mittvaccin.se/clinique/1323/appointments/9132/slots/210607-210613','https://booking-api.mittvaccin.se/clinique/1323/appointments/9132/slots/210614-210620', 'https://booking-api.mittvaccin.se/clinique/1323/appointments/9132/slots/210621-210627']);

function execute() {
    cliniques.forEach(function (values, cliniquename) {

        values.forEach(function (url, i) {
            //console.log(url);
            $.get(url,
                function (data, textStatus, jqXHR) {  // success callback
                    parse(data, cliniquename);
                });
        });
    });
}

setInterval(function() {
    execute();

}, 30 * 1000); // 60 * 1000 milsec

//RUN first
execute();

console.log("Started");
