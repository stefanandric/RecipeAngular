import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from './../recipe';
import { RecipeService } from './../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  ids = 'id';

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
   this.route.params
     .subscribe(
       (params: Params) => {
        this.id = +params[this.ids];
        this.recipe = this.recipeService.getRecipe(this.id);
       }
     );
  }

  onAddToShoppingList() {
    this.recipeService.addIngrediantsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
