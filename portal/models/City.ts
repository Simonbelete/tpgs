import AbstractBaseModel from "./AbstractBaseModel";

export default interface City extends AbstractBaseModel {
  country: string;
  region: string;
  subregion: string;
  geoname_id: string;
  latitude: string;
  longitude: string;
  population: string;
}
