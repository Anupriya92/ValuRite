import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariableService {

  private overAllData = {};
  private referenceCollection: any[] = [];
  private parametersPassed: any = {};

  constructor() { }

  setValue(val) {
    this.referenceCollection.push(val);
  }

  getValue() {
    return this.referenceCollection;
  }

  setWithKey(key, value) {
    this.overAllData[key] = value;
  }

  getWithKey(key) {
    return this.overAllData[key];
  }

  clearValue() {
    this.referenceCollection = [];
  }

  setParameters(obj) {
    this.parametersPassed = obj;
  }

  getParameters() {
    return this.parametersPassed;
  }

  clearParameters() {
    this.parametersPassed = {};
  }

}
