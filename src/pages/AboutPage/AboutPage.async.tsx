import {lazy} from "react";


export const AboutPageAsync= lazy(() =>
    new Promise<typeof import("./AboutPage")>(resolve => {
    setTimeout(() => resolve(import('./AboutPage')),1500)
}))