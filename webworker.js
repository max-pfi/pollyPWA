/*  
AUTHORS: Müslüm Atas & Mathias Knoll
DESCRIPTION: The implementation of webworker. 
LAST CHANGE: 17.10.2023
*/

self.addEventListener("message", function (messageEvent) {
  if (messageEvent.data === "init") {
    getData()
  }
});


async function getData() {
  let returnData = {
    polls: [],
    user: null,
  }
  await fetch('data_polls.json')
    .then(response => response.json())
    .then(data => {
      returnData.polls = data
    })
    .catch(error => console.error('Error:', error))
  await fetch('user.json')
    .then(response => response.json())
    .then(data => {
      returnData.user = data
    })
    .catch(error => console.error('Error:', error))
  self.postMessage(returnData)
}
