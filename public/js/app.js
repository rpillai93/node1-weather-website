console.log('Client side javascript file is loaded');



       const weatherForm = document.querySelector('form') //form, index and p link to the html 'index.hbs' file
       const search = document.querySelector('input')
       const messageOne = document.querySelector('#message-1')//# is used when trying to target by id name
       const messageTwo = document.querySelector('#message-2')

       weatherForm.addEventListener('submit',(e) =>{
              e.preventDefault()       //prevents refreshing of page by default (in chrome -> more tools -> dev tools)
              const location = search.value;
                messageOne.textContent = 'Loading...';
                messageTwo.textContent = ''
              fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {

              response.json().then((data)  => {
                               if(data.errorMessage){
                                  messageOne.textContent = data.errorMessage

                               }
                               else{
                                  messageOne.textContent = `Location: ${data.temp.results.address}`
                                  messageTwo.textContent =  `Current Temperature is ${data.temp.tempC} Celsius and ${data.temp.condition} `
                              
                               }
              })


              })


       })
