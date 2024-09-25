import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { LocationsComponent } from './locations/locations.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonComponent } from './pokemon/pokemon.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
      },    {
        path: 'checklist',
        component: ChecklistComponent,
        title: 'Checklist',
      },
      {
        path: 'locations',
        component: LocationsComponent,
        title: 'Locations',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details',
      },
      {
        path: 'pokemon',
        component: PokemonsComponent,
        title: 'Pokemon List',
      },
      {
        path: 'pokemon/:id',
        component: PokemonComponent,
        title: 'Pokemon',
      },
];
export default routes;