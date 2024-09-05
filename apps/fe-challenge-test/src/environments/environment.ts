import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const process: any; // This allows us to use process.env without TypeScript errors

export const environment = {
  get API_URL(): string {
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
      // Client-side
      return (
        (window as any)['env']?.['ROOT_API_URL'] || 'http://localhost:3000'
      );
    } else {
      // Server-side
      const renderExternalHostname =
        process.env['RENDER_EXTERNAL_HOSTNAME'] || 'localhost:3000';
      return `https://${renderExternalHostname}-backend.onrender.com`;
    }
  },
};
