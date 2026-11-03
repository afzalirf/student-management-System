import {Component} from '@angular/core';import {WorkspacePageComponent} from './workspace-page.component';
@Component({selector:'app-500',standalone:true,imports:[WorkspacePageComponent],template:`<app-workspace-page page="serverError"></app-workspace-page>`})
export class ServerErrorComponent{}
