import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 현재 날씨 정보가 보인다.
//2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨
//3. 5개의 버튼(현재 도시 1개, 다른 도시 4개)
//4. 도시 버튼 클릭 시 도시별 날씨 정보 보인다.
//5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨 정보 보인다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const cities = ["Tokyo", "Paris", "New York", "Seoul"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cf3b4d9161603587bcf87d31e77b1117&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf3b4d9161603587bcf87d31e77b1117&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city === "") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      <div className="container">
        {loading ? (
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        ) : !apiError ? (
          <div className="container">
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              setCity={setCity}
              getCurrentLocation={getCurrentLocation}
            />
          </div>
        ) : (
          apiError
        )}
      </div>
    </div>
  );
}

export default App;
