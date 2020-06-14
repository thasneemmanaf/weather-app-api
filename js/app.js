class AjaxWeather {
  // use constructor to declare all variables
  constructor() {
    this.apikey = "0e523f27f6b5779cb17c975719c81467";
  }
  //use method to write the functionality
  async getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apikey}&units=metric`;
    const weatherData = await fetch(url);
    const weather = await weatherData.json();
    return weather;
  }
}

class Display {
  // use constructor to declare all variables
  constructor() {
    this.results = document.querySelector(".results");
    this.cityName = document.getElementById("cityName");
    this.cityCountry = document.getElementById("cityCountry");
    this.cityIcon = document.getElementById("cityIcon");
    this.cityTemp = document.getElementById("cityTemp");
    this.cityHumidity = document.getElementById("cityHumidity");
  }

  //use method to write the functionality
  showWeather(data) {
    console.log(data);
    const {
      name,
      sys: { country },
      main: { temp, humidity },
    } = data;
    const { icon } = data.weather[0];

    this.results.classList.add("showItem");
    this.cityName.textContent = name;
    this.cityCountry.textContent = country;
    this.cityTemp.textContent = temp;
    this.cityHumidity.textContent = humidity;
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
  }
}
(function () {
  const feedback = document.querySelector(".feedback");
  const cityInput = document.getElementById("cityInput");
  const wheatherForm = document.getElementById("wheatherForm");

  // class
  const ajax = new AjaxWeather();
  const display = new Display();
  wheatherForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = cityInput.value;
    if (city.length === 0) {
      showAlert("Please enter a value");
    } else {
      ajax
        .getWeather(city)
        .then(function (data) {
          if (data.message === "city not found") {
            showAlert("city with such name cannot be found");
          } else {
            display.showWeather(data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // show alert on top of the page
    function showAlert(text) {
      feedback.classList.add("showItem");
      feedback.innerHTML = `<p>${text}</p>`;
      setTimeout(function () {
        feedback.classList.remove("showItem");
      }, 3000);
    }
  });
})();
