import React from "react";
import axios from "axios";
import Search from "./Components/Search";
import ForeCast from "./Components/ForeCast";
import SideSettings from "./Components/SideSettings";
import SideFavorites from "./Components/SideFavorites";
import Recent from "./Components/Recent";
import { Container } from "react-bootstrap";

function App() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [background, setBackground] = React.useState("bg.jfif");
  const [ShowSettings, setShowSettings] = React.useState(false);
  const [ShowFavorites, setShowFavorites] = React.useState(false);
  const [tempunit, setTempUnit] = React.useState(false); // true Kelvin .. False Celicus
  const [showRecent, setShowRecent] = React.useState(false); // true show .. False hide
  const [favorites, setFavorites] = React.useState(() => {
    const saved = localStorage.getItem("fav");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [recent, setRecent] = React.useState([]);

  // Get The Information from the API

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings"));

    if (saved) {
      if (saved[0]) {
        setTempUnit(saved[0]);
      }
      if (saved[1]) {
        setShowRecent(saved[1]);
      }
    }
  }, []);

  React.useEffect(() => {
    setError(null);
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ca60b4ea8bce1fdcd4829718903a1bd`
        )
        .then((res) => setData(res.data))
        .catch((err) => setError(err.response.status));
    }
  }, [city]);

  React.useEffect(() => {
    localStorage.setItem("settings", JSON.stringify([tempunit, showRecent]));
  }, [tempunit, showRecent]);

  // Updating the Background Image Depending on the Weather State
  React.useEffect(() => {
    if (data) {
      switch (data.weather[0].main) {
        case "Clear":
          setBackground("clear.jpg");
          break;
        case "Clouds":
          setBackground("cloudy.jpg");
          break;
        case "Rain":
          setBackground("rainy.jpg");
          break;
        case "Drizzle":
          setBackground("drizzle.jfif");
          break;
        case "Mist":
          setBackground("mist.jfif");
          break;
        case "Snow":
          setBackground("snow.jpg");
          break;
        default:
          setBackground("bg.jfif");
      }
    } else {
      setBackground("bg.jfif");
    }
  }, [data]);

  // Control the Recent Search List

  React.useEffect(() => {
    if (data) {
      if (
        !recent.includes(data.name.split(" ")[0]) &&
        !recent.includes(data.name.split(" ")[0].toUpperCase())
      ) {
        let array = recent;

        if (array.length >= 4) {
          array.shift();
          array.push(data.name.split(" ")[0]);
        } else {
          array.push(data.name.split(" ")[0]);
        }
        setRecent(array);
      }
    }
  }, [data]);

  // Add city to Favorites
  function addtofavorites(id) {
    if (favorites.length <= 6) {
      if (!favorites.includes(id)) {
        setFavorites((item) => [...item, id]);
      }
    }
  }

  // Delete City from Favorites
  function deletefavorties(id) {
    let array = [];
    favorites.forEach((item) => {
      item !== id && array.push(item);
    });

    setFavorites(array);
  }

  // Save Favorites List to Local Storage

  function favsave() {
    localStorage.setItem("fav", JSON.stringify(favorites));
  }

  // reset the favorites list and save it

  function favreset() {
    setFavorites([]);
    localStorage.setItem("fav", JSON.stringify([]));
  }

  return (
    <section
      className="app"
      style={{ backgroundImage: `url(${require(`./Images/${background}`)})` }}
    >
      <Container>
        <Search setCity={setCity} />
        <ForeCast
          data={data}
          error={error}
          tempunit={tempunit}
          handleadd={addtofavorites}
          favorites={favorites}
          handledel={deletefavorties}
        />
        <SideSettings
          ShowSettings={ShowSettings}
          setShowSettings={setShowSettings}
          tempunit={tempunit}
          setTempUnit={setTempUnit}
          showRecent={showRecent}
          setShowRecent={setShowRecent}
        />
        <SideFavorites
          ShowFavorites={ShowFavorites}
          setShowFavorites={setShowFavorites}
          favorites={favorites}
          tempunit={tempunit}
          setCity={setCity}
          favsave={favsave}
          favreset={favreset}
        />
        {showRecent && <Recent recent={recent} setCity={setCity} />}
      </Container>
    </section>
  );
}

export default App;
