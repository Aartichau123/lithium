let axios = require("axios");

//86e3d297f8fa57fa8a6c68252d1d1672

const gettemprature = async function (req, res) {
    try {
      let cityobj = [];
      let cities = [
        "Bengaluru",
        "Mumbai",
        "Delhi",
        "Kolkata",
        "Chennai",
        "London",
        "Moscow",
      ];
      for (let i = 0; i < cities.length; i++) {
        const element = cities[i];
        let obj = { city: cities[i] };
        let result = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=86e3d297f8fa57fa8a6c68252d1d1672`
        );
        obj.temp = result.data.main.temp;
        cityobj.push(obj);
      }
      let sorted = cityobj.sort((a, b) => a.temp - b.temp);
      // console.log(sorted)
      res.status(200).send({ data: sorted });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  module.exports.gettemprature = gettemprature;