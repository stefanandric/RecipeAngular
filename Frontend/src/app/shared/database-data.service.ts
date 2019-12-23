import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../recipes/recipe';
import { Observable } from 'rxjs';

@Injectable()
export class DatabaseDataService {

  constructor(private http: HttpClient) {}

  public HttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  };

public url = 'http://localhost:5000/api/recipe';
private recipe: Recipe[];
private isDeleted: boolean;

storeRecipes(recipe: Recipe[]) {
  this.http.post(this.url + '/postRecipe', recipe, this.HttpOptions)
  .subscribe((response: Response) =>
      console.log(response)
      );
}

getRecipes(): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(this.url + '/recipes', this.HttpOptions);
}

deleteRecipe(index: number): Observable<boolean> {
  return this.http.delete<boolean>(this.url + '/delete/' + index, this.HttpOptions);
}

}
