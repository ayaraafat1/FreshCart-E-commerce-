import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,
    withInMemoryScrolling({scrollPositionRestoration:'top'}),
    withHashLocation(),
    withViewTransitions()
  ), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations()
  ]
};
