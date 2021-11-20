
function newr() {
    document.getElementById("main").style.display = "block";
    document.getElementById("res").style.display = "none";
}
function check() {
    document.getElementById("res").style.display = "block";
    document.getElementById("main").style.display = "none";
    list = Object.values(manufacturer)[2]; // Extract actual list  from file
    manufacturersValues = Object.values(list); // extract values
    manufacturersKeys = Object.keys(list); // extract keys
    // To find the name of the manufacturer: manufacturersValues[manufacturersKeys.indexOf(<field 'ma'>)].display

    list = Object.values(product)[2]; // Extract actual list  from file
    productsValues = Object.values(list); // extract values
    productsKeys = Object.keys(list); // extract keys
    // To find the name of the manufacturer: productsValues[productsKeys.indexOf(<field 'mp'>)].display

    list = Object.values(prophylaxis)[2]; // Extract actual list  from file
    prophylaxisValues = Object.values(list); // extract values
    prophylaxisKeys = Object.keys(list); // extract keys
    // To find the name of the manufacturer: prophylaxisValues[prophylaxisKeys.indexOf(<field 'vp'>)].display

    list = Object.values(diseases)[2]; // Extract actual list  from file
    diseasesValues = Object.values(list); // extract values
    diseasesKeys = Object.keys(list); // extract keys
    // To find the name of the manufacturer: diseasesValues[diseasesKeys.indexOf(<field 'tg'>)].display

    list = Object.values(testManufObj)[2]; // Extract actual list  from file
    testDeviceValues = Object.values(list); // extract values
    testDeviceKeys = Object.keys(list); // extract keys
    // To find the name of the manufacturer: testDeviceValues[testDeviceKeys.indexOf(<field 'ma'>)].display

    list = Object.values(testTypeObj)[2]; // Extract actual list  from file
    testTypeValues = Object.values(list); // extract values
    testTypeKeys = Object.keys(list); // extract keys
    // To find the name of the manufacturer: testTypeValues[testTypeKeys.indexOf(<field 'tt'>)].display

    list = Object.values(testResultObj)[2]; // Extract actual list  from file
    testResultValues = Object.values(list); // extract values
    testResultKeys = Object.keys(list); // extract keys
    // To find the name of the manufacturer: testResultValues[testResultKeys.indexOf(<field 'tr'>)].display



    // Process:
    // QR Image --> HC1 string --> BASE45 string --> ZIP array --> COSE array --> CBOR array --> json object

    BASE45 = window["raw"].replace("HC1:", "");
    //console.log("BASE45=",BASE45);

    // Decode BASE45:
    COMPRESSED = decode(BASE45).raw;

    // Unzip the COMPRESSED:
    COSEbin = pako.inflate(COMPRESSED);
    //console.log("UNZ:",COSEbin);

    COSE = buf2hex(COSEbin);
    console.log("UNZ:", COSE);

    //console.log("Input:", raw.innerHTML.length);
    //console.log("Test:", testData.COSE.length);
    var typedArray = new Uint8Array(COSE.match(/[\da-f]{2}/gi).map(function (h) {
        return parseInt(h, 16)
    })) // https://stackoverflow.com/questions/43131242/how-to-convert-a-hexadecimal-string-of-data-to-an-arraybuffer-in-javascript
    var unzipped = typedArray.buffer;
    //console.log("unzipped=",unzipped) ;

    [headers1, headers2, cbor_data, signature] = CBOR.decode(unzipped);
    //console.log("cbor_data=",cbor_data) ;

    //cbor_dataStr =  buf2hex(cbor_data);
    //console.log("decodedStr=",decodedStr);
    //cbor_dataArr=hexStringToArrayBuffer(cbor_dataStr);
    cbor_dataArr = typedArrayToBuffer(cbor_data);
    //console.log("cbor_dataArr=",cbor_dataArr);

    greenpassData = CBOR.decode(cbor_dataArr);
    qrdays = ((greenpassData[4] * 1000 - greenpassData[6] * 1000) / 86400000).toFixed(0);
    qrmonths = ((greenpassData[4] * 1000 - greenpassData[6] * 1000) / 2592000000).toFixed(0);
    qrCreation = new Date(greenpassData[6] * 1000).toLocaleString();
    qrExpiration = new Date(greenpassData[4] * 1000).toLocaleString();
    console.log("greenpassData =", greenpassData);

    //rawjson.innerHTML = JSON.stringify(greenpassData, null, "\t");;

    firstname.innerHTML = "-";
    surname.innerHTML = "-";
    birth.innerHTML = "-";

    covidend.innerHTML = "-";
    tested.innerHTML = "-";
    vaccin.innerHTML = "-";

    /// VACCINATO
    targetV.innerHTML = "-";
    proph.innerHTML = "-";
    vaccid.innerHTML = "-";
    manuf.innerHTML = "-";
    receivedDoses.innerHTML = "-";
    neededDoses.innerHTML = "-";
    vaccinDate.innerHTML = "-";
    nation.innerHTML = "-";
    issuerV.innerHTML = "-";
    idV.innerHTML = "-";

    /// TESTATO
    testDate.innerHTML = "-"; //sc
    testDevice.innerHTML = "-"; //ma
    testType.innerHTML = "-"; //tt
    testName.innerHTML = "-"; //nm
    testCountryTestato.innerHTML = "-"; //co
    testCenter.innerHTML = "-"; //tc
    testCertId.innerHTML = "-"; //ci
    issuerT.innerHTML = "-"; //is
    testDisease.innerHTML = "-"; //tg
    testResult.innerHTML = "-"; //tr

    /// GUARITO
    covidend.innerHTML = "-";
    targetR.innerHTML = "-";
    firstPositive.innerHTML = "-";
    testCountryGuarito.innerHTML = "-";
    issuerR.innerHTML = "-";
    validFromR.innerHTML = "-";
    validToR.innerHTML = "-";
    validForDaysR.innerHTML = "-";
    certIdR.innerHTML = "-";


    validFromR.innerHTML = "-";
    validToR.innerHTML = "-";
    validForDaysR.innerHTML = "-";

    try {
        console.log("First name:", greenpassData[-260][1].nam.gn);
        firstname.innerHTML = greenpassData[-260][1].nam.gn;

        console.log("Surname:", greenpassData[-260][1].nam.fn);
        surname.innerHTML = greenpassData[-260][1].nam.fn;

        console.log("Born:", greenpassData[-260][1].dob);
        birth.innerHTML = greenpassData[-260][1].dob;

        ////////////// VACCINATO
        if (greenpassData[-260][1].v != null) {
            console.log("Vaccinato");
            vaccin.innerHTML = "Yes";
            targetV.innerHTML = diseasesValues[diseasesKeys.indexOf(greenpassData[-260][1].v[0].tg)].display;
            proph.innerHTML = prophylaxisValues[prophylaxisKeys.indexOf(greenpassData[-260][1].v[0].vp)].display;
            vaccid.innerHTML = productsValues[productsKeys.indexOf(greenpassData[-260][1].v[0].mp)].display;
            manuf.innerHTML = manufacturersValues[manufacturersKeys.indexOf(greenpassData[-260][1].v[0].ma)].display;

            console.log("Vaccine doses:", greenpassData[-260][1].v[0].dn);
            receivedDoses.innerHTML = greenpassData[-260][1].v[0].dn;

            console.log("Vaccine doses needed:", greenpassData[-260][1].v[0].sd);
            neededDoses.innerHTML = greenpassData[-260][1].v[0].sd;

            console.log("Vaccin date:", greenpassData[-260][1].v[0].dt);
            vaccinDate.innerHTML = greenpassData[-260][1].v[0].dt;

            nation.innerHTML = greenpassData[-260][1].v[0].co;

            issuerV.innerHTML = greenpassData[-260][1].v[0].is;
            idV.innerHTML = greenpassData[-260][1].v[0].ci;

        } else {
            vaccin.innerHTML = "No";
        }

        ////////// TESTATO
        if (greenpassData[-260][1].t != null) {
            console.log("Testato");
            tested.innerHTML = "Yes";
            testDisease.innerHTML = diseasesValues[diseasesKeys.indexOf(greenpassData[-260][1].t[0].tg)].display;
            testType.innerHTML = testTypeValues[testTypeKeys.indexOf(greenpassData[-260][1].t[0].tt)].display;
            testName.innerHTML = greenpassData[-260][1].t[0].nm;
            testDevice.innerHTML = testDeviceValues[testDeviceKeys.indexOf(greenpassData[-260][1].t[0].ma)].display;;
            testDate.innerHTML = greenpassData[-260][1].t[0].sc;
            testResult.innerHTML = greenpassData[-260][1].t[0].tr;
            testCenter.innerHTML = greenpassData[-260][1].t[0].tc;
            //dr.innerHTML =    greenpassData[-260][1].t[0].dr; ???
            testCountryTestato.innerHTML = greenpassData[-260][1].t[0].co;
            issuerT.innerHTML = greenpassData[-260][1].t[0].is;
            testCertId.innerHTML = greenpassData[-260][1].t[0].ci;
        } else {
            tested.innerHTML = "No";
        }


        ///////// GUARITO
        if (greenpassData[-260][1].r != null) {
            console.log("Guarito");
            covidend.innerHTML = "Yes";
            targetR.innerHTML = diseasesValues[diseasesKeys.indexOf(greenpassData[-260][1].r[0].tg)].display;;
            console.log("1");
            firstPositive.innerHTML = greenpassData[-260][1].r[0].fr;
            testCountryGuarito.innerHTML = greenpassData[-260][1].r[0].co;
            console.log("2");
            issuerR.innerHTML = greenpassData[-260][1].r[0].is;
            validFromR.innerHTML = greenpassData[-260][1].r[0].df;
            validToR.innerHTML = greenpassData[-260][1].r[0].du;

            fromDate = new Date(greenpassData[-260][1].r[0].df);
            toDate = new Date(greenpassData[-260][1].r[0].du);
            diffDays = (toDate.getTime() - fromDate.getTime()) / 86400000;
            validForDaysR.innerHTML = diffDays.toFixed(0);
            certIdR.innerHTML = greenpassData[-260][1].r[0].ci;

        } else {
            covidend.innerHTML = "No";
        }


    } catch (e) {
        console.log("ops");
    }
    console.log("QR code creation date:", qrCreation);
    console.log("QR code expiration date:", qrExpiration);
    console.log("QR code duration (days):", qrdays);
    console.log("QR code duration (months):", qrmonths);

    qrdate1.innerHTML = qrCreation;
    qrdate2.innerHTML = qrExpiration;
    days.innerHTML = qrdays;
    months.innerHTML = qrmonths;

    today = new Date();
    todayDays = today.getDate();

    diff = (new Date(greenpassData[4] * 1000).getTime() - (new Date()).getTime()) / 86400000;
    daysleft.innerHTML = diff.toFixed(0);
    monthsleft.innerHTML = (diff / 30).toFixed(2);

}
