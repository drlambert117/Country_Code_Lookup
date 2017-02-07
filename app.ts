///===========================================================================================================================
///Country Code Lookup Application
///Calls Web service that returns Country Name, 2 digit country code, and three digit country code in a generated html table.
///Created by Dakota Lambert
///===========================================================================================================================

//========================================================
//Ready Function
//========================================================
var $;
$(document).ready(function () {
    console.log("ready function called.");

    //Button Click on Enter
    $("#countryCodeTextInput").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnCountryLookup").click();
        }
    });

    //Button Click calls callWebService() Function
    $("#btnCountryLookup").on("click", callWebService);
});

//========================================================
//callWebService function
//========================================================
function callWebService() {
    console.log("callWebService function called.");

    //Declare and display countryCode input 
    var countryCode;
    countryCode = $("#countryCodeTextInput").val();
    console.log("countryCode = " + countryCode);

    //Build URI for web service call
    var uriString = "http://services.groupkt.com/country/search?text=" + countryCode;
    console.log("uriString=" + uriString);
    $.ajax({
        url: uriString,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        datatype: "json",
        success: cb_CallWebService_Success
    });
}

//========================================================
//cb_CallWebService_Success function
//========================================================
function cb_CallWebService_Success(retrievedData) {

    //Make sure object was filled
    console.log("cb_CallWebService_Success function called");
    console.dir(retrievedData);

    //Declare Variables
    var loopCounter: number,
        numberOfElementsInArray: number,
        resultsArray: any[],
        countryName: string,
        countryCode_2Digit: string,
        countryCode_3Digit: string,
        tableString: string,
        tableRowString: string;

    //Retrieve local values
    resultsArray = retrievedData.RestResponse.result;
    console.dir(resultsArray);
    numberOfElementsInArray = resultsArray.length;
    console.log("numberOfElementsInArray = " + numberOfElementsInArray);

    ////Build and display html table
    //Begin table before loop
    tableString = "<table class='table table-striped table-bordered'>" +
        "<thead class='thead-inverse'>" +
        "<tr>" +
        "<th>Country Name</th>" +
        "<th>2 Digit <br /> Country Code</th>" +
        "<th>3 Digit <br /> Country Code</th>" +
        "</thead>" +
        "<tbody>";

    //Loop through array and build table string
    for (loopCounter = 0; loopCounter < numberOfElementsInArray; loopCounter++) {

        console.log("loopCounter = " + loopCounter);

        countryName = resultsArray[loopCounter].name;
        console.log("countryName = " + countryName);

        countryCode_2Digit = resultsArray[loopCounter].alpha2_code;
        console.log("countryCode_2Digit = " + countryCode_2Digit);

        countryCode_3Digit = resultsArray[loopCounter].alpha3_code;
        console.log("countryCode_3Digit = " + countryCode_3Digit);

        tableRowString = "<tr>" +
            "<td>" + countryName + "</td>" +
            "<td>" + countryCode_2Digit + "</td>" +
            "<td>" + countryCode_3Digit + "</td>";
        tableString = tableString + tableRowString;
    }

    //Finish the table outside of the loop
    tableString = tableString + "</tbody></table>";

    //Display Table
    $("#divDisplayTable").html(tableString);

    //Scroll to divDisplayTable
    $('html, body').animate({
        scrollTop: $("#divDisplayTable").offset().top
    }, 500);
}
