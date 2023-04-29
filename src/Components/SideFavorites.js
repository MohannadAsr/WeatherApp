import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FavoriteCity from "./FavoriteCity";
import { Button } from "react-bootstrap";

export default function SideFavorites({
  ShowFavorites,
  setShowFavorites,
  favorites,
  tempunit,
  setCity,
  favsave,
  favreset,
}) {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  function saveupdate() {
    favsave();
    forceUpdate();
  }

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    React.useEffect(() => {
      /**
       *Close if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowFavorites(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div
      className={ShowFavorites ? "side-favorites px-4" : "side-favorites hide"}
      ref={wrapperRef}
    >
      <span
        className="side-button d-flex justify-content-center align-items-center"
        onClick={() => {
          setShowFavorites((prevstate) => !prevstate);
        }}
      >
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: "red", fontSize: "20px" }}
          className={ShowFavorites ? "beat" : ""}
        />
      </span>

      <div className="text-light text-center my-3">
        <h2>Favorites</h2>
        <hr />
      </div>

      <div className="favorites-list">
        {favorites &&
          favorites.map((item) => {
            return (
              <FavoriteCity
                fav={item}
                tempunit={tempunit}
                setCity={setCity}
                setShowFavorites={setShowFavorites}
                key={Math.random()}
              />
            );
          })}

        {favorites.length !== 0 && (
          <div className="text-center my-3">
            <Button
              className="px-3 mx-2"
              disabled={
                JSON.stringify(favorites) === localStorage.getItem("fav")
                  ? true
                  : false
              }
              onClick={saveupdate}
            >
              Save
            </Button>
            <Button className="px-3 mx-2" onClick={favreset}>
              Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
