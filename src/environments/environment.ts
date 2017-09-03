// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    recaptchaSiteKey: '6LfbEi8UAAAAANfMgkHlUtLSz6tBbITyxFmGE8QH',
    production: false,
    firebase: {
        appName: 'bs-store',
        config: {
            apiKey: 'AIzaSyDQPVTPnSzoINmjbeIc8KgzSPK1clk7xME',
            authDomain: 'bs-store-18092.firebaseapp.com',
            databaseURL: 'https://bs-store-18092.firebaseio.com',
            projectId: 'bs-store-18092',
            // storageBucket: 'bs-store-18092.appspot.com',
        }
    },
};
