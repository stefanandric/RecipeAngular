import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { DatabaseDataService } from '../shared/database-data.service';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeService {

      constructor(private slService: ShoppingListService,
                  private dataProvider: DatabaseDataService) {}

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //       new Recipe('Tasty Schnitzle', 'A super lazy-tasty Schnitzle - just awesome!' ,
  //       'https://pngimg.com/uploads/schnitzel/schnitzel_PNG9.png',
  //       [
  //           new Ingredient('Meat', 1),
  //           new Ingredient('French Fries', 20)
  //       ]),
  //       new Recipe('Big Fat Burger', 'What else you need to say?',
  //       'http://static.businessinsider.com/image/53601a026bb3f7e3512eb8a7-750.jpg',
  //        [
  //            new Ingredient('Buns', 2),
  //            new Ingredient('Meat', 1)
  //        ])
  //     ];

  private recipes: Recipe[] = [];
  private deleted: boolean;
      private itemIdForDelete: number;

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          // return this.recipes.slice();
          this.recipes = this.dataProvider.getRecipes();
          this.recipesChanged.next(this.recipes);
          return this.recipes;
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngrediantsToShoppingList(ingrediants: Ingredient[]) {
        this.slService.addIngredients(ingrediants);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      async storeRecipe() {
        await this.dataProvider.storeRecipes(this.recipes);
      }

      async deleteRecipe(index: number) {
        this.itemIdForDelete = this.getRecipe(index).id;

        this.deleted = await this.dataProvider.deleteRecipe(this.itemIdForDelete);
        if (this.deleted) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
        }
      }


}
