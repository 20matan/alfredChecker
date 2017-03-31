const request = require('request');
var express = require('express'),
    router = express.Router();

router.get('/:airport/:date', (req, res) => {
    const { airport, date } = req.params;

    const amadeus = {
        url: `https://api.sandbox.amadeus.com/v1.2/location/${airport}?apikey=j8GYYZ3bPY1SDG6udDhsQ7ZVqz6hBsDD`,
        headers: {
            'User-Agent': 'request'
        }
    };

    request(amadeus, (err, ans, response) => {
        let body = JSON.parse(response);
        if (!err && body.city && body.city.location) {
            let lat = body.city.location.latitude;
            let lon = body.city.location.longitude;

            const weather = {
                url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&apikey=f35b65d81306c10b17f2318a5f03c4c8`,
                headers: {
                    'User-Agent': 'request'
                }
            };
            request(weather, (err, ans, response) => {

                let body = JSON.parse(response);
                let check = new Date(date);
                let sent = false;
                if (!err) {
                    for (var i = 1; i < body.list.length; i++) {
                        var from = new Date(body.list[i - 1].dt_txt);
                        var to = new Date(body.list[i].dt_txt);
                        if ((check.getTime() <= to.getTime() && check.getTime() >= from.getTime())) {
                            res.send(getPredictByCode(body.list[i].weather[0].id));
                            sent = true;
                            break;
                        }
                    }

                    if (!sent) {
                        res.send("NO_INFO");
                    }
                }

            });
        }
    })
})



const getPredictByCode = (code) => {
    const GREEN = 0,
        YELLOW = 1,
        RED = 2;
    let result;
    switch (code) {
        case 200:
            result = GREEN; //    thunderstorm with light rain     11d
            break;
        case 201:
            result = YELLOW;
            break; //   thunderstorm with rain   11d
        case 202:
            result = RED;
            break; //   thunderstorm with heavy rain     11d
        case 210:
            result = GREEN;
            break; //   light thunderstorm   11d
        case 211:
            result = RED;
            break; //   thunderstorm     11d
        case 212:
            result = RED;
            break; //   heavy thunderstorm   11d
        case 221:
            result = RED;
            break; //   ragged thunderstorm  11d
        case 230:
            result = YELLOW;
            break; //   thunderstorm with light drizzle  11d
        case 231:
            result = YELLOW;
            break; //   thunderstorm with drizzle    11d
        case 232:
            result = YELLOW;
            break; //   thunderstorm with heavy drizzle  11d
        case 300:
            result = YELLOW;
            break; //   light intensity drizzle  09d
        case 301:
            result = YELLOW;
            break; //   drizzle  09d
        case 302:
            result = YELLOW;
            break; //   heavy intensity drizzle  09d
        case 310:
            result = YELLOW;
            break; //   light intensity drizzle rain     09d
        case 311:
            result = YELLOW;
            break; //   drizzle rain     09d
        case 312:
            result = YELLOW;
            break; //   heavy intensity drizzle rain     09d
        case 313:
            result = YELLOW;
            break; //   shower rain and drizzle  09d
        case 314:
            result = YELLOW;
            break; //   heavy shower rain and drizzle    09d
        case 321:
            result = YELLOW;
            break; //   shower drizzle
        case 500:
            result = GREEN;
            break; //   light rain   10d
        case 501:
            result = YELLOW;
            break; //   moderate rain    10d
        case 502:
            result = RED;
            break; //   heavy intensity rain     10d
        case 503:
            result = RED;
            break; //   very heavy rain  10d
        case 504:
            result = RED;
            break; //   extreme rain     10d
        case 511:
            result = RED;
            break; //   freezing rain    13d
        case 520:
            result = YELLOW;
            break; //   light intensity shower rain  09d
        case 521:
            result = YELLOW;
            break; //   shower rain  09d
        case 522:
            result = RED;
            break; //   heavy intensity shower rain  09d
        case 531:
            result = RED;
            break; //   ragged shower rain
        case 600:
            result = GREEN;
            break; //   light snow   13d
        case 601:
            result = YELLOW;
            break; //   snow     13d
        case 602:
            result = RED;
            break; //   heavy snow   13d
        case 611:
            result = YELLOW;
            break; //   sleet    13d
        case 612:
            result = RED;
            break; //   shower sleet     13d
        case 615:
            result = YELLOW;
            break; //   light rain and snow  13d
        case 616:
            result = YELLOW;
            break; //   rain and snow    13d
        case 620:
            result = YELLOW;
            break; //   light shower snow    13d
        case 621:
            result = RED;
            break; //   shower snow  13d
        case 622:
            result = RED;
            break; //   heavy shower snow
        case 701:
            result = YELLOW;
            break; //   mist     50d
        case 711:
            result = YELLOW;
            break; //   smoke    50d
        case 721:
            result = YELLOW;
            break; //   haze     50d
        case 731:
            result = YELLOW;
            break; //   sand, dust whirls    50d
        case 741:
            result = YELLOW;
            break; //   fog  50d
        case 751:
            result = YELLOW;
            break; //   sand     50d
        case 761:
            result = YELLOW;
            break; //   dust     50d
        case 762:
            result = RED;
            break; //   volcanic ash     50d
        case 771:
            result = YELLOW;
            break; //   squalls  50d
        case 781:
            result = RED;
            break; //   tornado
        case 800:
            result = GREEN;
            break; //   clear sky
        case 801:
            result = GREEN;
            break; //   few clouds   02d  02n
        case 802:
            result = GREEN;
            break; //   scattered clouds     03d  03n
        case 803:
            result = GREEN;
            break; //   broken clouds    04d  04n
        case 804:
            result = GREEN;
            break; //   overcast clouds
        case 900:
            result = RED;
            break; //   tornado
        case 901:
            result = RED;
            break; //   tropical storm
        case 902:
            result = RED;
            break; //   hurricane
        case 903:
            result = GREEN;
            break; //   cold
        case 904:
            result = GREEN;
            break; //   hot
        case 905:
            result = GREEN;
            break; //   windy
        case 906:
            result = RED;
            break; //   hail
        case 951:
            result = GREEN;
            break; //   calm
        case 952:
            result = GREEN;
            break; //   light breeze
        case 953:
            result = GREEN;
            break; //   gentle breeze
        case 954:
            result = GREEN;
            break; //   moderate breeze
        case 955:
            result = GREEN;
            break; //   fresh breeze
        case 956:
            result = GREEN;
            break; //   strong breeze
        case 957:
            result = YELLOW;
            break; //   high wind, near gale
        case 958:
            result = RED;
            break; //   gale
        case 959:
            result = RED;
            break; //   severe gale
        case 960:
            result = RED;
            break; //   storm962    hurricane
        case 961:
            result = RED;
            break; //   violent storm
        case 962:
            result = RED;
            break; //   hurricane //

    }

    if (result === RED) {
        return "RED";
    } else if (result === YELLOW) {
        return "YELLOW";
    } else {
        return "GREEN";
    }
}



module.exports = router;
