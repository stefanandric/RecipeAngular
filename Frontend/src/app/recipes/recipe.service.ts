import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { DatabaseDataService } from '../shared/database-data.service';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class RecipeService implements OnDestroy {

  constructor(private slService: ShoppingListService,
              private dataProvider: DatabaseDataService) {}

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  private deleted: boolean;
  private itemIdForDelete: number;
  private subscription: Subscription;

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    this.subscription = this.dataProvider.getRecipes()
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

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

  storeRecipe() {
    this.dataProvider.storeRecipes(this.recipes);
  }

  deleteRecipe(index: number) {
    this.itemIdForDelete = this.getRecipe(index).id;

    this.dataProvider.deleteRecipe(this.itemIdForDelete)
      .subscribe((del: boolean) => {
        this.deleted = del;
      });

    if (this.deleted) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
