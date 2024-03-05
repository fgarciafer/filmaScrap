import { useState, useEffect } from "react";
import { useFilmStore } from "./../../store/filmStore";

export const Filter = () => {
  const films = useFilmStore((state) => state.baseFilms);
  const filterByName = useFilmStore((state) => state.filterByName);
  const filterByYear = useFilmStore((state) => state.filterByYear);
  const filterByRate = useFilmStore((state) => state.filterByRate);
  const {order, setOrder } = useFilmStore(state => state);
  const [years, setYears] = useState([]);
  const [yearValue, setYearValue] = useState('');
  const [rateValue, setRateValue] = useState(0);
  const [nameValue, setNameValue] = useState("");


  useEffect(() => {
    setYears([
      ...new Set(
        films
          .map((film) => film.year)
          .sort()
          .reverse()
      ),
    ]);
  }, [films]);


  const change = (event) => {
    switch (event.target.name) {
      case "range":
        setRateValue(event.target.value);        
        break;
      case "yearSelect":
        setYearValue(event.target.value);
        filterByYear(event.target.value);
        break;

      case "nameValue":
        setNameValue(event.target.value);
        filterByName(event.target.value);

        break;
    }
  };

  const handleRate = (event) => {
    filterByRate(event.target.value);
  }

  const clearFilters = () => {
    setRateValue(0);
    setYearValue('');
    setNameValue('');

    filterByYear('');
    filterByName('');
    filterByRate(0);
  }

  return (
    <form className="flex gap-8 p-4 max-w-5xl mx-auto">
      <div className="relative z-0 mb-5 min-w-32 group">
        <input
          type="text"
          name="nameValue"
          id="nameValue"
          value={nameValue}
          onChange={change}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="nameValue"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Nombre
        </label>
      </div>
      <div className="w-72"></div>

      <div className="relative z-0 mb-5 min-w-56 group">
        <label
          htmlFor="customRange2"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        >
          {`Nota Mínima (${rateValue})`}
        </label>
        <input
          type="range"
          name="range"
          className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
          min="0"
          max="10"
          onChange={change}
          onMouseUp={handleRate}
          value={rateValue}
          id="customRange2"
        />
      </div>

      <div className="relative z-0 mb-5 group">
        <select
          name="yearSelect"
          value={yearValue}
          onChange={change}
          className="pt-3 pb-2  block min-w-28 px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-300"
        >
          <option value=""></option>
          {years.map((y) => (
            <option value={y} key={y}>
              {y}
            </option>
          ))}
        </select>

        <label
          htmlFor="yearSelect"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Año
        </label>
      </div>
      <div className="flex">
        <div className="flex items-center mr-4">
          <input checked={order === 'name'} onChange={() => setOrder('name')} id="default-radio-1" type="radio" value="name" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="default-radio-1" className="ms-2 text-xs text-neutral-700 dark:text-neutral-200">Nombre</label>
        </div>
        <div className="flex items-center mr-4">
            <input checked={order === 'duration'} onChange={() => setOrder('duration')} id="default-radio-2" type="radio" value="duration" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="default-radio-2" className="ms-2 text-xs text-neutral-700 dark:text-neutral-200">Duracíon</label>
        </div>
        <div className="flex items-center mr-4">
            <input checked={order === 'rate'} onChange={() => setOrder('rate')} id="default-radio-2" type="radio" value="rate" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="default-radio-2" className="ms-2 text-xs text-neutral-700 dark:text-neutral-200">Nota</label>
        </div>
      </div>
      <button
        type="button"
        onClick={clearFilters}
        className="min-w-40 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Limpiar Filtros
      </button>
    </form>
  );
};
