import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private communityTag= new BehaviorSubject<string>("Essay");

  currentCommunityTag= this.communityTag.asObservable();

  constructor() { }

  updateCommunityTag(tag:string){
    this.communityTag.next(tag);
  }
}
