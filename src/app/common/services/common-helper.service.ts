import { Injectable } from '@angular/core';
import { v7 as uuidv7 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CommonHelperService {

  constructor() { }


  // For generating a unique correlation id
  generateCorrelationId(): string {
    return uuidv7();
  }

}
