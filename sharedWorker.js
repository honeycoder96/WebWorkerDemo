let browserInstances = [];
onconnect = function(e) {
    console.log("Connected to browser");
    var port = e.ports[0];
    browserInstances.push(port);

    port.onmessage = function(e) {
        const data=+e.data;
        let result=1000;
        console.log("From browser:", port);
        let progress=0;
        for(let i=0;i<data;i++){
              console.log("From sharedworker:", i);
              if(i%1000==0){
                  progress++;
                //   postMessage(progress);
                browserInstances.map(instance =>{
                    instance.postMessage(result);
                })
              }
              result+=i;
        }

        browserInstances.map(instance =>{
            instance.postMessage(result);
        })
        // port.postMessage(result);
    }
  }