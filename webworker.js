/*  
AUTHORS: Müslüm Atas & Mathias Knoll
DESCRIPTION: The implementation of webworker. 
LAST CHANGE: 17.10.2023
*/

self.addEventListener("message", function(messageEvent) {
  
  if (messageEvent.data === "init") {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        self.postMessage(data)
    })
    .catch(error => console.error('Error:', error))
  }

});
