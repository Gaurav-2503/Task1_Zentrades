import { useState } from 'react';

const File1 = () => {
  const [data, setData] = useState([]);
  const [karuka, setKaru] = useState(false);

  const getData = async () => {
    try {
      const result = await fetch(
        'https://s3.amazonaws.com/open-to-cors/assignment.json'
      );

      const response1 = await result.json();

      if (!response1 || !response1.products) {
        throw new Error('Invalid data format');
      }

      setKaru(true);
      setData(Object.values(response1.products));
    } catch (e) {
      console.log(e);
    }
  };

  const sortData = (data) => {
    return [...data].sort((a, b) => b.popularity - a.popularity);
  };

  const sortedData = sortData(data);

  return (
    <>
      <button className="btn" onClick={getData}>
        Show products in decreasing order of Popularity
      </button>
      
      <br/>

      <button className="btn" onClick={() => setKaru(false)}>
        Hide
      </button>

      {karuka && sortedData.length > 0 && (
        <div>
          <h1>Products </h1>
          <div className="product-grid">
            {sortedData.map((product, key) => (
              <div key={key} className="product-card">
                <div className="titleDiv">
                  <h3 style={{ color: 'red' }}>{product.title}</h3>
                </div>
                {/* <p>Subcategory : {product.subcategory}</p> */}

                <div className="product-card2">
                  <p>
                    <b>Price : </b>
                    {product.price}
                  </p>
                  <p>
                    <b>Popularity : </b>
                    {product.popularity}{' '}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default File1;
