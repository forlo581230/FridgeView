import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { WipDashboardComponent } from './wip-dashboard/wip-dashboard.component';
import { BufferComponent } from './buffer/buffer.component';

const routes: Routes = [
    { path: '',   redirectTo: '/map', pathMatch: 'full' },
    { path: 'dashboard/:id', component: DashboardComponent },
    { path: 'WIPdashboard/:id', component: WipDashboardComponent },
    { path: 'buffer', component: BufferComponent },
    { path: 'map',        component: MapComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
