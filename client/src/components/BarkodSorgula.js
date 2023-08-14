import React, { useState } from "react";

const Barkodsorgulaekran = ({ setAuth }) => {
  const [barcodealan, Setbarcodealan] = useState([]);

  const fetchBarcodeInfo = async (barcode) => {
    try {
      const response = await fetch(
        `http://localhost:5000/barcode/barkodproducts/?searchbarkod=${barcode}`
      );

      const parseResponse = await response.json();
      Setbarcodealan(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const barcodesorgu = e.target.barcode.value;
    fetchBarcodeInfo(barcodesorgu);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-light vh-100">
      <div className="container py-5">
        <h1 className="text-center text-primary mb-5">
          BARKOD SORGULAMA EKRANI
        </h1>
        <div className="d-flex justify-content-end">
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </div>
        <form onSubmit={handleSubmit} className="d-flex mt-3">
          <input
            type="text"
            placeholder="ara"
            className="form-control me-2"
            name="barcode" // Added name attribute
          />
          <button type="submit" className="btn btn-primary">
            Ara
          </button>
        </form>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">Barkod</th>
              <th scope="col">Ürün</th>
              <th scope="col">Ürün Adı</th>
              <th scope="col">Miktar</th>
              <th scope="col">Tarih</th>
              <th scope="col">Birim</th>
            </tr>
          </thead>
          <tbody>
            {barcodealan.map((barcodeget) => (
              <tr key={barcodeget.barcode}>
                <td>{barcodeget.barcode}</td>
                <td>{barcodeget.product_id}</td>
                <td>{barcodeget.product_name}</td>
                <td>{barcodeget.amount}</td>
                <td>{barcodeget.production_date}</td>
                <td>{barcodeget.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Barkodsorgulaekran;
