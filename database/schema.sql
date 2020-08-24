DROP DATABASE IF EXISTS items;

CREATE DATABASE items;
\c items;

CREATE TABLE iteminfo (
  id SERIAL NOT NULL PRIMARY KEY,
  itemName VARCHAR(150) NOT NULL,
  cost INT NOT NULL
);

\copy iteminfo from 'items.txt' delimiter ',' csv header;