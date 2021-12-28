// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //BACK_END_HOST: 'https://supportsystemtis.azurewebsites.net/api/',
  BACK_END_HOST: 'https://localhost:44341/api/',
  ACCES_KEY_ID: 'PLWIAX4TEUVTUP43VQRG',
  SECRET_ACCESS_KEY: 'rKK0JTmHIx9jZtBBYPvoeWmUqvpcfiI82ZwyfVfF7uc',
  REGION: 'nyc3',
  S3_ENDPOINT: 'nyc3.digitaloceanspaces.com',
  BUCKET_NAME: 'docforsis-client',
  ROLES: 'Admin,Student',
  LOGO_URL: '../assets/images/logo-in-black.png',  
  SERVERLESS_DEPLOY: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
