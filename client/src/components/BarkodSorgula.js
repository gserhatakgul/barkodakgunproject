import React, { Fragment,  } from "react";

const Barkodsorgulaekran = () => {
  //const { barcode, Setbarcode } = useState([]);

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
    </Fragment>
  );
};

export default Barkodsorgulaekran;
