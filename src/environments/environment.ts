export const environment = {

    //<________________________________*****************DEV SETTINGS***************________________________________>
    production: false,
    Version:'2.0.2',
    base_version: 'test',  //local,test,prodcution
    timeZone: "Asia/Kolkata",
    base_url: "http://192.168.1.2:8080/", //LOCAL DEV
    // base_url:"https://catrams.com/catrams-api-test/", //TEST DEV
    //base_url: "https://catrams.com/catrams-api/",  //PROD DEV

    SOCKET_ENDPOINT: "https://mychatserver-production.up.railway.app/", // TEST&LIVE DEV
    //SOCKET_ENDPOINT: "http://localhost:3000/", //LOCAL DEV

    //base_img_url: "http://localhost:8080/",  //LOCAL DEV
    base_img_url: "https://catrams.com/catrams-api-test/public/", //TEST DEV
    //base_img_url: "https://catrams.com/catrams-api/public/", //LIVE DEV


    //<________________________________________________________________________________________________________________>

    //<________________________________*****************ADMIN SETTINGS***************________________________________>
    us_phone: "9995110189",
    us_name: "Rams_Admin",
    us_email: "admin.rams@candourautotech.com",
    us_pro_info: "Payment For Expert",
    us_company_name: "Candour AutoTech",
    us_company_address: "Candour AutoTech",
    reload_time: 30000, // 20000 milliseconds = 20 seconds
    us_currency:'₹', // ₹ , AED 
    us_country:'IND', // IND , UAE
    us_phone_code:'10', //
    //defaultLanguage: 'ae', //en //ae

    //<_______________________________________________________________________________________________________________>
    
    

    //<________________________________*****************THIRDPARTY SETTINGS***************________________________________>
    firebaseConfig: {
        apiKey: "AIzaSyDmzctUwIAlURfsavhPtafkcDc-EYZLSMg",
        authDomain: "rams-v2-34582.firebaseapp.com",
        projectId: "rams-v2-34582",
        storageBucket: "rams-v2-34582.appspot.com",
        messagingSenderId: "145063430644",
        appId: "1:145063430644:web:2e9e4b8c18aa07dfd551a1",
        measurementId: "G-96V7784J9F",
        vapidKey: 'BFjftDhPHdakQM5ZHm6ufhAM5Ui3zaPYSYFAxdKp2QBQa-cksHditr8BakNqRT2-zU8s1R-hM1tL08p1Sg4HCyc'
    }
    //<_______________________________________________________________________________________________________________>


};

 //<________________________________*****************BUILD SETTINGS***************____________________________
 
// build code live:ng build --configuration=production --deploy-url=/catrams/ --base-href=/catrams/
// build code test:ng build --configuration=production --deploy-url=/catrams_test/ --base-href=/catrams_test/

//<_______________________________________________________________________________________________________________>

