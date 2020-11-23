    //Samling med querySelectors från html dokumentet
    let description = document.querySelector('.description');
    let icon = document.querySelector('.icon');
    let temperatur = document.querySelector('.temperatur');
    let windSpeed = document.querySelector('.windSpeed');
    let humidity = document.querySelector('.humidity');
    let errorMessage = document.querySelector('.error')
    let input = document.querySelector('.input');
    let info = document.querySelector('.info')
    let city = document.querySelector('.city')

    input.value = 'Enter a city'; //Text inuti inputfältet som berättar för användaren att skriva in en stad

input.addEventListener('click', function(e){  //Eventlistener med click function på input fältet
    input.value = ''    //När man klickar ska fältet bli tomt
    errorMessage.style.display = 'none' //Error meddelandet försvinner när man klickar i inputfältet
})
    

    let img = document.createElement('img') //Skapade ett image element i den globala scopet

input.addEventListener('keypress', function(e){ //Eventlistener med keypress function på input fältet
    if(e.key == 'Enter'){ //if-statement som utförs när användaren trycker på Enter-knappen
        const apiKey = '8d4aefb39b70b225bda17c16cfefec3b' //API-nyckel variabel
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}` //url variabel med använding av temperal literal för att använda input.value för att få ut vad användaren skrev för land/stad + api nyckel variabeln även satt units?metric för att få ut informationen i metric standard ex. °C
        fetch(url).then( //fetch metod som tar url variabeln som skapades tidigare
            function(r){ //function i fetch som returnerar json information som jag valt att döpa till 'r'
                return r.json();
            }
        ).then(
            function(data){ //informationen som vi fick i json format används här som vi valt att döpa till 'data'
                weatherPresentation(data); //funktion som används när en stad/land har valts av användaren där informationen från 'data' används
            }
        ).catch( 
            function(error){ //catch function som fångar upp när ett korrekt land/stad inte skrivits in av användaren, om man vill se exakt vad felet är kan man använda 'error'
                input.value = 'Enter a city'; //Visar texten i input fönstret igen
                errorMessage.style.display = 'flex'; //Visar ett error meddelande till användaren att en korrekt stad inet har skrivits in
                description.innerText = '' //description, icon, temperatur, windSpeed, humidity, city ska i detta fallet inte visas
                icon.innerText = ''
                temperatur.innerText = ''
                windSpeed.innerText = ''
                humidity.innerText = ''
                city.innerText = ''
            }
        )
        e.preventDefault(); //stoppar default händelsen när användaren trycker på Enter så informationen stannar kvar på sidan
    }
    
});

        function weatherPresentation(data){ //funktion som tar in data från json
                    let iconCode = data.weather[0].icon //variabel för att få ut icon koden
                        let src = `http://openweathermap.org/img/wn/${iconCode}@2x.png` //API:n för att få ut iconen med icon koden från staden som användaren skrivit in
                        img.src = src; //imgage har fått source attribut från 'src' variabeln
                        icon.appendChild(img) //icon variabeln har fått img tilldelat sig

                        city.innerText = input.value; //Visar för användaren vilken stad som valts
                        description.innerText = data.weather[0].description; //Visar för användaren vilket väder det är i text
                        temperatur.innerText = Math.round(data.main.temp) + '°C' //Visar för användaren vilken temperatur den valda staden har i Celsius, svaret kommer ut i decimalform har därför valt att använda math.round funktionen för att få ut svaret i närmsta heltal
                            if(Math.round(data.main.temp)<=10){ //if-sats som get temperatur variabeln en färg om numret är under eller lika med 10
                                temperatur.style.color = 'rgb(108, 110, 202)'
                            }
                            if(Math.round(data.main.temp)>10){ //if-sats som get temperatur variabeln en färg om numret är över 10
                                temperatur.style.color = 'rgb(177, 60, 31)'
                            }
                        windSpeed.innerText = `Its blowing ${data.wind.speed} m/s` //Visar för användaren vindhastigheten
                        humidity.innerText = `Humidity is ${data.main.humidity}%` //Visar för användaren luftfuktigheten 
        }

    
        
            
            
            
        
        
        
    



    