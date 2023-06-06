import React from "react";
export const contextname = React.createContext();
const MyContext = (props) => {
  const [weather, setWeather] = React.useState([]);
  React.useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${weather}`;
        const response = await fetch(url);
        const resjson = response.json();
        resjson.then((result) => {
          setWeather(result);
        });
      } catch (e) {
        alert("Not found");
      }
    };
    fetchApi();
  });
  return (
    <contextname.Provider value={[weather, setWeather]}>
      {props.children}
    </contextname.Provider>
  );
};

export default MyContext;
