const Filter = ({onChange, searchText}) =>( 
  <div>
    filter shown with <input value={searchText} onChange={onChange} />
  </div>
);

export default Filter;
