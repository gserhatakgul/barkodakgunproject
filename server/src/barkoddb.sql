create database barkoddb; 

CREATE TABLE kullanıcılar(


);



CREATE TABLE  barkodproducts(
    barcode SERIAL PRIMARY KEY  ,
    product_id Integer  null  ,  
    product_name VARCHAR(50) not null ,
    amount NUMERIC(10,2),
    production_date DATE,
    unit INTEGER not NULL 
);