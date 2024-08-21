export const environment = {


    // defaultLanguage: 'ae', //en //ae
    production: false,
    // base_url: "http://192.168.1.6:8081/",
    base_url:"https://catrams.com/catrams-api-test/",
    //    base_url: "https://catrams.com/catrams-api/",

    SOCKET_ENDPOINT: "https://mychatserver-production.up.railway.app/",
    //  SOCKET_ENDPOINT: "http://localhost:3000/",
    timeZone: "Asia/Kolkata",

    // base_img_url: "http://localhost:8080/",
    base_img_url: "https://catrams.com/catrams-api-test/public/",
    //    base_img_url: "https://catrams.com/catrams-api/public/",
    us_phone: "9995110189",
    us_name: "Rams_Admin",
    us_email: "admin.rams@candourautotech.com",
    us_pro_info: "Payment For Expert",
    us_company_name: "Candour AutoTech",
    us_company_address: "Candour AutoTech",

    reload_time: 30000, // 20000 milliseconds = 20 seconds

    base_version: 'test', //local,test,prodcution


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


};


// build code live:ng build --configuration=production --deploy-url=/catrams/ --base-href=/catrams/
// build code test:ng build --configuration=production --deploy-url=/catrams_test/ --base-href=/catrams_test/
