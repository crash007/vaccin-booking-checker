const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );


function parse(data,clinique) {
    $(data).each(function (i, d) {
        $(d.slots).each(function (i, da) {
            if (da.available == true) {
                console.log("Found a time at: "+ clinique.name+" "+new Date().toLocaleTimeString());
                console.log(da.when);
                console.log(d.date)
                console.log("Boka här: "+ 'https://bokning.mittvaccin.se/klinik/'+clinique.cliniqueId+'/bokning');
            }
        });
    });
}

let baseUrl = 'https://booking-api.mittvaccin.se/clinique/'
let clinique1 = {'name': 'Nacksta', 'cliniqueId': '1291', 'appointmentType': '8853'};
let clinique2 = {'name': 'Timrå', 'cliniqueId': '1311', 'appointmentType': '10620'};
let clinique3 = {'name': 'Härnösand', 'cliniqueId': '1309', 'appointmentType': '12044'};
let clinique4 = {'name': 'kramfors', 'cliniqueId': '1323', 'appointmentType': '9132'};

let cliniques = [clinique1,clinique2,clinique3,clinique4];
 var periods = ['210607-210613', '210614-210620', '210621-210627']
//cliniques.set('Nacksta', [baseUrl+'1291/appointments/8853/slots/210607-210613','https://booking-api.mittvaccin.se/clinique/1291/appointments/8853/slots/210614-210620','https://booking-api.mittvaccin.se/clinique/1291/appointments/8853/slots/210621-210627']);
//cliniques.set('Timra', ['https://booking-api.mittvaccin.se/clinique/1311/appointments/10620/slots/210607-210613', 'https://booking-api.mittvaccin.se/clinique/1311/appointments/10620/slots/210614-210620','https://booking-api.mittvaccin.se/clinique/1311/appointments/10620/slots/210621-210627']);
//cliniques.set('Harnosand', ['https://booking-api.mittvaccin.se/clinique/1309/appointments/12044/slots/210607-210613', 'https://booking-api.mittvaccin.se/clinique/1309/appointments/12044/slots/210614-210620', 'https://booking-api.mittvaccin.se/clinique/1309/appointments/12044/slots/210621-210627']);
//cliniques.set('kramfors', ['https://booking-api.mittvaccin.se/clinique/1323/appointments/9132/slots/210607-210613','https://booking-api.mittvaccin.se/clinique/1323/appointments/9132/slots/210614-210620', 'https://booking-api.mittvaccin.se/clinique/1323/appointments/9132/slots/210621-210627']);

function execute() {
    cliniques.forEach(function (clinique, i) {
        periods.forEach(function (p, i) {
            let url = baseUrl+clinique.cliniqueId+'/appointments/'+clinique.appointmentType+'/slots/'+p;

            $.get(url, function (data, textStatus, jqXHR) {  // success callback
                parse(data, clinique);
            });
        });
    });

}

setInterval(function() {
    execute();

}, 30 * 1000); // 60 * 1000 milsec

//RUN first
execute();

console.log("Running..");
