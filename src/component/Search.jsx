export const Search = ({ text, search, filterSearch, setSearch }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterSearch(value);
  };

  return (
    <>
      <p>{text}</p>
      <div>
        name: <input value={search} onChange={handleChange} />
      </div>
    </>
  );
};
