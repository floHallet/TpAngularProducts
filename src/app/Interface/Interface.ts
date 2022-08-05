// To parse this data:
//
//   import { Convert, Produit } from "./file";
//
//   const produit = Convert.toProduit(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Row {
  id:    string;
  key:   string;
  value: Value;
  doc:   Product;
}

export interface Product {
  _id:                string;
  _rev:               string;
  additionalFeatures: string;
  android:            Android;
  availability:       string[];
  battery:            Battery;
  camera:             Camera;
  connectivity:       Connectivity;
  description:        string;
  display:            Display;
  hardware:           Hardware;
  images:             string[];
  name:               string;
  sizeAndWeight:      SizeAndWeight;
  storage:            Storage;
}

export interface Android {
  os: string;
  ui: string;
}

export interface Battery {
  standbyTime: string;
  talkTime:    string;
  type:        string;
}

export interface Camera {
  features: string[];
  primary:  string;
}

export interface Connectivity {
  bluetooth: string;
  cell:      string;
  gps:       boolean;
  infrared:  boolean;
  wifi:      string;
}

export interface Display {
  screenResolution: string;
  screenSize:       string;
  touchScreen:      boolean;
}

export interface Hardware {
  accelerometer:    boolean;
  audioJack:        string;
  cpu:              string;
  fmRadio:          boolean;
  physicalKeyboard: boolean;
  usb:              string;
}

export interface SizeAndWeight {
  dimensions: string[];
  weight:     string;
}

export interface Storage {
  flash: string;
  ram:   string;
}

export interface Value {
  rev: string;
}
