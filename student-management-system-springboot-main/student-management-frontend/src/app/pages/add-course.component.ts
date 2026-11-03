import {Component} from '@angular/core';import {WorkspacePageComponent} from './workspace-page.component';
@Component({selector:'app-add-course',standalone:true,imports:[WorkspacePageComponent],template:`<app-workspace-page page="courseForm"></app-workspace-page>`})
export class AddCourseComponent{}
