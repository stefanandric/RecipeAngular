import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../recipes/recipe';

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

async storeRecipes(recipe: Recipe[]) {
  await this.http.post(this.url + '/postRecipe', recipe, this.HttpOptions)
  .toPromise()
      .then((response: Response) =>
      console.log(response)
      );
}

getRecipes() {
  this.http.get<Recipe[]>(this.url + '/recipes', this.HttpOptions)
  .subscribe((recipes: Recipe[]) =>
    this.recipe = recipes
  );
  return this.recipe;
}

async deleteRecipe(index: number) {
  this.isDeleted = await this.http.delete<boolean>(this.url + '/delete/' + index, this.HttpOptions).toPromise();
      // .toPromise()
      //   .then((deleted: boolean) =>
      //     this.isDeleted = deleted
      //   );

  return this.isDeleted;
}
 
}
