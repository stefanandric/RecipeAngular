import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from './../auth/auth.service';
import { HttpResponse } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // constructor(private dataStorageService: DataStorageService,
  constructor(private recipeService: RecipeService,
              public authService: AuthService) {}

  // onSaveData() {
  //   this.dataStorageService.storeRecipes()
  //     .subscribe(
  //       (response: Response) => {
  //         console.log(response);
  //       }
  //     );
  // }

  // onSaveData() {
  //   this.dataStorageService.storeRecipes()
  //   .subscribe(
  //     (response: HttpResponse<object>) => {
  //       console.log(response);
  //     }
  //   )
  // }

  onSaveData() {
    this.recipeService.storeRecipe();
  }

  onFetchData() {
    this.recipeService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

}
