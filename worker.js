// In worker.js
// 4. Implement onmessage
onmessage = function (e) {
  console.log("Message received from main script:", e.data);

  // 5. Return result to main thread
  const data=+e.data;
  let result=0;
  let progress=0;
  for(let i=0;i<data;i++){
        console.log("From worker:", i);
        if(i%1000==0){
            progress++;
            postMessage(progress);
        }
        result+=i;
  }
  postMessage(result);
};
