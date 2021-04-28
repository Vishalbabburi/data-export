const https = require('https');

for ( i =1; i<=4; i ++) {
    let stateCode = "0";
    if (i > 0 && i < 10){
        stateCode = stateCode+i;
    }else {stateCode= i;}

    console.log("stateCode");
    console.log(stateCode);
    console.log("stateCode");

// task 1 set state dynamically
    //task 2 whenever you dont have data for a particular state you will get error handle it

    // task 3 async await
    https.get("https://api.census.gov/data/2018/pep/charagegroups?get=GEONAME&for=county:*&in=state:"+stateCode+"", (resp) => {

        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log("start");

            console.log(data);
            console.log("end");

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });


}