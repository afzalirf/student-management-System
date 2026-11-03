import {Component} from '@angular/core';import {WorkspacePageComponent} from './workspace-page.component';
@Component({selector:'app-404',standalone:true,imports:[WorkspacePageComponent],template:`<app-workspace-page page="notFound"></app-workspace-page>`})
export class NotFoundComponent{}
