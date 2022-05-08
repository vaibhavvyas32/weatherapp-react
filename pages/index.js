import { useState } from "react";
import Head from "next/head";

const api = {
  key: "ff939a393fd1717f027d96418df05c15",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <>
      <Head>
        <title>Know Your 🌡️Weather | By Vaibhav Vyas</title>
      </Head>
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "Home warm"
              : "Home"
            : "Home"
        }
      >
        <main className=" min-h-screen p-10">
          <div className="search-box flex justify-center items-center">
            <input
              type="text"
              className="search-bar flex w-[50%] appearance-none bg-none border-none outline-none rounded-lg text-[20px] justify-center items-center font-Montserrat font-medium flex-wrap"
              placeholder="Enter City / Country"
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div className="pt-3">
              <div className="location-box">
                <div className="location font-Montserrat text-[32px] font-medium text-white text-center ">
                  {weather.name},{weather.sys.country}
                </div>
                <div className="date font-Montserrat text-white text-center font-[20px] italic font-light ">
                  {dateBuilder(new Date())}
                </div>
              </div>
              <div className="weather-box font-Montserrat text-center">
                <div className="temp relative inline-block m-7 rounded-2xl text-center text-[102px] font-black text-white">
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="weather font-semibold font-Montserrat text-[48px] text-white">
                  {weather.weather[0].main}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
