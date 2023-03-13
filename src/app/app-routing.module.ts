import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListProductComponent } from './Components/list-product/list-product.component';
import { AddEditProductComponent } from './Components/add-edit-product/add-edit-product.component';

//Rutas de la app
const routes: Routes = [
    { path: '', component: ListProductComponent },
    { path: 'add', component: AddEditProductComponent },
    { path: 'edit/:id', component: AddEditProductComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } //Siempre tiene que venir de ultimo el 404
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
