import { useEffect } from "react";
import { useFilmStore } from "./../../store/filmStore";

import films from "../../../generated.json";
import FilmCard from "../FilmCard/FilmCard";
import {sortByKey} from './../../utilities/Utilities';

export const FilmContainer = () => {
  const updateFilms = useFilmStore((state) => state.setBaseFilms);
  const listData = useFilmStore((state) => state.films);

  useEffect(() => {
    updateFilms((sortByKey(films, 'name')));
  }, [updateFilms]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {listData.map((item) => (
          <FilmCard film={item} key={item.name} />
        ))}
      </div>
    </div>
  );
};
