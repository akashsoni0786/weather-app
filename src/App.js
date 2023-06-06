import "./App.css";
import React, { useEffect } from "react";
import "./Final.css";

function App() {
  const conditions = [
    "Sunny",
    "Clear",
    "Light rain shower",
    "Mist",
    "Patchy rain possible",
    "Partly cloudy",
  ];
  const [weather, setWeather] = React.useState([]);
  const [search, setSearch] = React.useState("lucknow");
  const [theme, setTheme] = React.useState("sunny");

  const fetchApi = async () => {
    const url = `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${search}`;
    const response = await fetch(url);
    const resjson = response.json();
    resjson
      .then((result) => {
        debugger;
        if (result.error) {
          throw new Error(result.error.message);
        }
        setWeather(result);
      })
      .catch((e) => {
        alert(e.toString());
      });
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${search}`;
        const response = await fetch(url);
        const resjson = response.json();
        resjson.then((result) => {
          setWeather(result);
          backtheme();
          console.log(result);
        });
      } catch (e) {
        alert("Not found");
      }
    };
    fetchApi();
  }, []);

  const show = (event) => {
    event.preventDefault();
    if (search == "") {
      console.log("Field is empty");
    } else {
      console.log(weather);

      fetchApi();
      backtheme();
    }
  };

  const backtheme = () => {
    if (weather.current.condition.text.includes("rain")) {
      setTheme("rain")
    }
    if (weather.current.condition.text.includes("sunny")) {
      setTheme("sunny")
    }
    if (weather.current.condition.text.includes("overcast")) {
      setTheme("overcast")
    }
    if (weather.current.condition.text.includes("cloud")) {
      setTheme("cloud")
    }
    if (weather.current.condition.text.includes("mist")) {
      setTheme("mist")
    }
    if (weather.current.condition.text.includes("fog")) {
      setTheme("fog")
    }
  };

  return (
    <div className="body" style={{ backgroundImage: "url(https://source.unsplash.com/1600x900/?" + theme + ")" }}>
      <div className="card">
        <form onSubmit={show}>
          <div className="search">
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="searchbar"
              placeholder="Search"
            />
            <button id="showbtn">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
            </button>
          </div>
        </form>

        {Object.keys(weather).length > 0 && (
          <div className="weather">
            <h2 className="city">Weather in {weather.location.name}</h2>
            <h1 className="temp">{weather.current.temp_c}&#8451;</h1>
            <div className="flex">
              <img
                alt=""
                src={weather.current.condition.icon}
                className="icon"
              ></img>
              <div className="description">
                {weather.current.condition.text}
              </div>
            </div>
            <div className="humidity">
              Humidity: {weather.current.humidity}%
            </div>
            <div className="wind">
              Wind speed: {weather.current.wind_kph} km/h
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
