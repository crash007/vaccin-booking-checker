const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

//Parametrar för scriptet
let cliniques = [
    {'name': 'Nacksta', 'cliniqueId': '1291', 'appointmentType': '8853'},
    {'name': 'Timrå', 'cliniqueId': '1311', 'appointmentType': '10620'}];

//let clinique3 = {'name': 'Härnösand', 'cliniqueId': '1309', 'appointmentType': '12044'};
//let clinique4 = {'name': 'kramfors', 'cliniqueId': '1323', 'appointmentType': '9132'};


const daysIntervall = 30; //Dagar framåt att söka

/*------------------------*/
function toFormattedDateString(date){
    return date.toISOString().substring(2, 10).replace(/[^0-9\.]+/g, "");
}
function addDays(date, days) {
    const calculatedDate = date;
    calculatedDate.setDate(date.getDate() + days);
    return calculatedDate;
}


function parse(data,clinique) {
    $(data).each(function (i, d) {
        $(d.slots).each(function (i, da) {

            if (da.available == true) {
                console.log(new Date().toLocaleTimeString()+": Found a time at: "+ clinique.name);
                //console.log(da.when);
                console.log(d.date+' '+da.when)
                console.log("Boka här: "+ 'https://bokning.mittvaccin.se/klinik/'+clinique.cliniqueId+'/bokning');
                console.log("");
		        console.log("\007");
            }
        });
    });
}

let baseUrl = 'https://booking-api.mittvaccin.se/clinique/'



const dateFrom = toFormattedDateString(new Date());
const dateTo = toFormattedDateString(addDays(new Date(), daysIntervall));
const period = dateFrom+'-'+dateTo;

function execute() {
    cliniques.forEach(function (clinique, i) {
        let url = baseUrl+clinique.cliniqueId+'/appointments/'+clinique.appointmentType+'/slots/'+period;

        $.get(url, function (data, textStatus, jqXHR) {  // success callback
            parse(data, clinique);
        });
    });

}

setInterval(function() {
    execute();

}, 3 * 1000); // 60 * 1000 milsec

//RUN first
execute();

console.log("Running..");
