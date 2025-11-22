import { useState, useEffect } from "react";

const CitySearch = () => {
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("cities.json")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      })
      .catch((err) => console.error("Error loading cities:", err));
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }

    const results = cities.filter((city) =>
      city.toLowerCase().startsWith(query.toLowerCase())
    );

    setFiltered(results.slice(0, 10));
  }, [query, cities]);

  return (
    <>
      <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl border">
        <h1 className="text-2xl font-bold text-center mb-5 text-gray-800">
          City Search
        </h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {filtered.length > 0 && (
          <ul className="mt-2 border rounded-lg bg-white shadow max-h-60 overflow-y-auto">
            {filtered.map((city, index) => (
              <li
                key={index}
                onClick={() => setQuery(city)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
              >
                {city}
              </li>
            ))}
          </ul>
        )}

        {query && filtered.length === 0 && (
          <p className="mt-3 text-gray-600 text-sm">
            No matching cities found.
          </p>
        )}
      </div>

      <div className="mt-2 flex justify-center">
        <img
          src="./src/images/city.png"
          alt="City"
          className="w-120 opacity-80"
        />
      </div>
    </>
  );
};

export default CitySearch;
