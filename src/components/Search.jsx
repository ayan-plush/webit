import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCityOptions, setSelectedCity } from '../store/Reducers/geoReducer';

function Search({ onSearchChange }) {
  // Custom styles for AsyncPaginate (React Select)
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      width: '200px',
      borderRadius: '9999px',
      border: '1px solid #312c2325',
      padding: '4px 8px',
      fontSize: '0.875rem',
      boxShadow: state.isFocused ? '0 0 0 1px #706550' : 'none',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#706550',
    }),
    input: (provided) => ({
      ...provided,
      color: '#706550',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f0e8db' : 'transparent',
      color: '#312c23',
    }),
  };

  const dispatch = useDispatch();

  // Default selected city: Delhi
  const [search, setSearch] = useState({
    value: '28.666666666 77.216666666',
    label: 'Delhi, IN',
  });

  // Set initial search data on mount
  useEffect(() => {
    setSearch(search);
    dispatch(setSelectedCity(search));
    onSearchChange(search);
  }, []);

  // Handle city selection from dropdown
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    dispatch(setSelectedCity(searchData));
    onSearchChange(searchData);
  };

  // Fetch city options based on user input (uses Redux async thunk)
  const loadOptions = async (inputValue) => {
    const resultAction = await dispatch(fetchCityOptions(inputValue));

    if (fetchCityOptions.fulfilled.match(resultAction)) {
      return {
        options: resultAction.payload.options,
      };
    } else {
      console.error("Error fetching cities:", resultAction.payload?.message);
      return { options: [] };
    }
  };

  return (
    <div className='searchbar'>
      <div className='flex items-center w-full'>
        <AsyncPaginate
          styles={customStyles}
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          placeholder='search'
        />
        {/* Optional icon (disabled): <CiSearch onClick={() => loadOptions(search)} /> */}
      </div>
    </div>
  );
}

export default Search;
