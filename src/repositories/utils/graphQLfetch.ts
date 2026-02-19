//todo consider having this as a typed generic
import {HandleErrors} from "./utilities";

export const node_env = process.env.NODE_ENV;

//temp override while I work out why env variables dont work
export const developmentSpace = "dev" //todo set to development when i work out whats going on with that...

export const APP_CONTENTFUL_ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN ?? "f0565dcceef2eae29b1536d3d6157a";
export const APP_CONTENTFUL_ENVIRONMENT = process.env.REACT_APP_CONTENTFUL_ENVIRONMENT ?? node_env === "development" ? developmentSpace : "main";

const TOKEN = APP_CONTENTFUL_ACCESS_TOKEN;
export const CONTENT_URL = 'https://graphql.datocms.com/'; //`https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`;

export const fetchDataDato = <TType>(query: string) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({query}),
    };

    
    return fetchData<TType>(CONTENT_URL, query, options);
}

const fetchData = async <TType>(
    url: string,
    query: string,
    options: RequestInit
): Promise<TType> => {

    return await fetch(url, options).then((res) => {
        const result = res.json();
        HandleErrors(result)
        return result
    });
};

// Function to read JSON from the public/data directory
interface Result<T> {
    success: boolean;
    data?: T;
    error?: Error;
}


export async function getStaticOrFetch<T>(
    fileNamePrefix: string,
    apiPromise: Promise<T>,
    locale: string,
    slug: string
): Promise<T> {


    return apiPromise;
}
