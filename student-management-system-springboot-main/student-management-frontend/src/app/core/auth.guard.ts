import {inject} from '@angular/core';import {CanActivateFn,Router} from '@angular/router';import {catchError,map,of} from 'rxjs';import {ApiService} from './api.service';
export const authGuard:CanActivateFn=()=>{const api=inject(ApiService),router=inject(Router);return api.me().pipe(map(()=>true),catchError(()=>of(router.parseUrl('/login'))));};
