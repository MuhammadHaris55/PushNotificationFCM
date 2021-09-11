const functions = require("firebase-functions");

const admin = require('firebase-admin');
// const { snapshotConstructor } = require("firebase-functions/lib/providers/firestore");


admin.initializeApp(functions.config().firebase);

var msgData;


// exports.offerTrigger=functions.firestore.document(
    exports.dogtrigger=functions.firestore.document(
    // 'offers/{offerId}'
    'missingDogs/{missingDogId}'
    ).onCreate((snapshot, context)=>{
        msgData=snapshot.data();

        // admin.firestore().collection('pushtokens').get().then((snapshot)=>{
            admin.firestore().collection('users').get().then((snapshot)=>{
            var tokens=[];
            if(snapshot.empty){
                console.log('No Devices');
            }
            else
            {
                for(var token of snapshot.docs)
                {
                    // tokens.push(token.data().devtoken);
                    if(token.data().token){
                        tokens.push(token.data().token);

                    }
                }
                var payload ={
                    "notification":{
                        // "title":"From" +msgData.businessName,
                        // "body":"From" +msgData.offerValue,
                        "title":"Unfortunately,another dog lost",
                        "body":"Check it may be you can help in finding him/her",
                        "sound":"default",
                    },
                    "data":{
                        // "sendername":msgData.businessName,
                        // "message":msgData.offerValue,
                        "sendername":"sendername",
                        "message": "message",
                    }
                }
                return admin.messaging().sendToDevice(tokens,payload).then((response)=>{
                    console.log('Pushed them all');
                }).catch((err)=>{
                    console.log(err);
                })
            }
        })
    })