import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { LocationsComponent } from './locations/locations.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
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
        path: 'checklist',
        component: ChecklistComponent,
        title: 'Check List',
      },
];
export default routes;