import React, { useEffect, useState } from "react";
import "./Search.scss";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

interface Props {
  onChange: (value: string) => void;
}

const Search: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="search-input shadow">
      <input
        type="text"
        value={value}
        onInput={(e: any) => setValue(e.target.value)}
        className="search-input__input"
      />
      <SearchIcon className="search-input__icon" />
    </div>
  );
};

export default Search;
