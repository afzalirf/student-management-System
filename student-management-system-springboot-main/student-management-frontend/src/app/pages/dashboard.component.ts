import {Component} from '@angular/core';import {WorkspacePageComponent} from './workspace-page.component';
@Component({selector:'app-dashboard',standalone:true,imports:[WorkspacePageComponent],template:`<app-workspace-page page="dashboard"></app-workspace-page>`})
export class DashboardComponent{}
