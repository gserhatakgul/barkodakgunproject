import React, { Fragment, useState, useEffect } from "react";

const Barkodsorgulaekran = () => {
  const { tbarcodealan, Settbarcodealan } = useState("");

  return (
    <Fragment>
      <h1 className="text-center text-primary my-5 ">
        BARKOD SORGULAMA EKRANI{" "}
      </h1>
      <form className="d-flex ">
        <input
          type="text"
          placeholder="barkod giriniz"
          name="myInput"
          className="form-control m-1"
        />
        <button type="button" class="btn btn-primary m-1 ">
          SORGULA
        </button>
        <button type="button" class="btn btn-primary m-1">
          TÜM BARKODLARI SORGULA
        </button>
      </form>
      <table class="table m-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Barkodsorgulaekran;
