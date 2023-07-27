import React, { Fragment, useState } from "react";


const Barkodsorgulaekran = () => {
  const [tbarcodealan, Settbarcodealan] = useState("");
  const [barcodealan, Setbarcodealan] = useState([]);
  const submitform = async (e) => {
    e.preventDefault( );
    try {
      const response = await fetch(
        `http://localhost:5000/barkodproducts/?searchbarkod=${tbarcodealan}`
      );

      const parseResponse = await response.json();
      Setbarcodealan(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center text-primary my-5 ">
        BARKOD SORGULAMA EKRANI{" "}
      </h1>
      <form className="d-flex " onSubmit={submitform}>
        <input
          type="text"
          placeholder="barkod giriniz"
          name="myInput"
          className="form-control m-1"
          value={tbarcodealan}
          onChange={ e => Settbarcodealan(e.target.value)}
        />
        <button type="button" className="btn btn-primary m-1 ">
          SORGULA
        </button>
      </form>
      <table className="table m-5">
        <thead>
          <tr>
            <th scope="col">barcode</th>
            <th scope="col">product </th>
            <th scope="col">product name</th>
            <th scope="col">amount</th>
            <th scope="col">date</th>
            <th scope="col">unit</th>
          </tr>
        </thead>
        <tbody>
          {barcodealan.map((barcodeget) => (
            <tr>
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
    </Fragment>
  );
};

export default Barkodsorgulaekran;
