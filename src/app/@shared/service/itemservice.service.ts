import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {
  formData: Item;
  public partsList: Item[];

  readonly URL = 'https://tcxi8qf38d.execute-api.us-east-1.amazonaws.com/dev/api';
  constructor(private http: HttpClient) {}

  getItemsList() {
    return this.http.get<Item[]>(this.URL + '/items');
  }

  //todo 
  getItem(id:number)
  {
    return this.http.get<Item[]>(this.URL + '/items');
  }
  
  postItem(formData:Item)
  {
    const a = this.http.post(this.URL + '/items', formData);
    return a; 
  }
  editItem(formData: Item) {
    return this.http.put(this.URL + '/items', formData);
  }
  
  deleteItem(id:number)
  {
    return this.http.delete(this.URL + '/items/'+id);
  }
}
