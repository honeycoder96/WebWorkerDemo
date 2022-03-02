let sharedWorker = new SharedWorker('sharedWorker.js');
const button=document.getElementById("loop");
const result = document.getElementById("result");

function longTaskPromise() {
    let promise=new Promise(function(resolve,reject){
        let result=longTask();
        if(result>0)
            resolve(result);
        else
            reject("error");
    });
    promise.then(function(result){
        console.log(result);
    }).catch(function(error){
        console.log(error);
    });
};

function longTask(){
    console.time('doSomething')
    let result=0;
    for(let i=0;i<100000;i++){
        console.log(i);
        result+=i;
    }
    console.timeEnd('doSomething')
    return result;    
}

function usingWorker() {    
    // 1.Feature Detection
    if (window.Worker) {
            // 2. Create worker object
            let myWorker = new Worker('worker.js');
            // 3. Send data to worker using post message 
            myWorker.postMessage(100000);
            
            // 6. Listen to result in main thread
            myWorker.onmessage = function(e) {
                console.log('Message received from worker:', e.data);
                result.innerText = e.data;
                // myWorker.terminate();
            }
    }
}

function usingSharedWorker() {
    console.log("Using shared worker");
    // 1.Feature Detection
    if (window.SharedWorker) {
        console.log("Using shared worker");
          sharedWorker.port.postMessage(100000);
            
    }
}

sharedWorker.port.onmessage = function(e) {
    console.log('Message received from worker:', e.data);
    result.innerText = e.data;
}

// 1. Feature Detection
if ('serviceWorker' in navigator) {
  
    // 2. Wait till window is loaded to register an event
    window.addEventListener('load', function() {
      // 3. Register using promises or await
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
