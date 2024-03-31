import PropTypes from "prop-types";
import { useModalStore } from "./../../store/modalStore/";

const FilmCard = ({ film }) => {
  const {
    name,
    year,
    duration,
    director,
    rate,
    flag,
    url,
    description,
    genres,
    topics,
    stream,
  } = film;

  const {setValues, openModal } = useModalStore((state) => state);
  const image = url.split("/").slice(-1) + ".png";
  const s1 = new Array(parseInt(rate, 10)).fill(true);
  const s2 = new Array(10 - parseInt(rate, 10)).fill(true);

  const handleClickURL = () => {
    window.open(url);
  };

  const handleOpenModal = () => {
    setValues({title: name, description});
    openModal();
  }

  return (
    <div className="flex max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 min-h-72">
      <div
        className="w-1/3 bg-cover m-3 cursor-pointer"
        style={{ backgroundImage: "url(images/" + image + ")" }}
        onClick={handleClickURL}
      ></div>

      <div className="w-2/3 p-4 md:p-4 relative">
        <div className="flex gap-2">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {name}
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ({year})
          </p>
        </div>
        <div className="flex gap-2">{director}</div>
        <div className="flex gap-4 items-baseline mb-1">
          <p>{duration}</p>
          <img className="h-4" src={`https://www.filmaffinity.com/${flag}`} loading="lazy"/>
        </div>
        <div>
          {genres.map((g) => (
            <span className="text-xs mr-1.5" key={g}>
              {g}
            </span>
          ))}
        </div>
        <div>
          {topics.map((g) => (
            <span className="text-xs mr-1.5" key={g}>
              {g}
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-2 min-h-8">
          {stream.map((s) => (
            <img
              src={`images/${s.toUpperCase()}.jpeg`}
              loading="lazy"
              key={s}
              className="h-8"
            />
          ))}
        </div>
        <div className="flex gap-4 items-baseline mt-1 item-center">
          <div className="flex mt-2 item-center">
            {s1.map((v, index) => (
              <svg
                className="w-5 h-5 text-gray-700 fill-current dark:text-gray-300"
                viewBox="0 0 24 24"
                key={index}
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            ))}
            {s2.map((v, index) => (
              <svg
                className="w-5 h-5 text-gray-500 fill-current"
                viewBox="0 0 24 24"
                key={index}
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            ))}
          </div>
          <h1 className="text-6xl font-bold text-gray-700 dark:text-gray-200 md:text-xl">
            {rate}
          </h1>
        </div>
        <div className="flex gap-4 justify-end mt-3 item-center absolute bottom-8">
          <button
            onClick={handleClickURL}
            className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
          >
            Visit URL
          </button>
          <button
            onClick={handleOpenModal}
            className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
          >
            Sinopsis
          </button>
        </div>
      </div>
    </div>
  );
};

FilmCard.propTypes = {
  film: PropTypes.object,
};

export default FilmCard;
