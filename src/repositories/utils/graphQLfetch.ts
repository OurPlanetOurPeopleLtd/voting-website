//todo consider having this as a typed generic
import {HandleErrors} from "./utilities";

export const node_env = process.env.NODE_ENV;

//temp override while I work out why env variables dont work
export const developmentSpace = "dev" //todo set to development when i work out whats going on with that...

export const APP_CONTENTFUL_ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN ?? "f0565dcceef2eae29b1536d3d6157a";
export const APP_CONTENTFUL_ENVIRONMENT = process.env.REACT_APP_CONTENTFUL_ENVIRONMENT ?? node_env === "development" ? developmentSpace : "main";

const TOKEN = APP_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = "";// APP_CONTENTFUL_ENVIRONMENT;
export const CONTENT_URL = 'https://graphql.datocms.com/'; //`https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`;

class InMemoryCache {
    private cache: Map<string, { value: any; expiry: number }>;
    private ttl: number; // Time-to-live in seconds

    constructor(ttl: number = 60) {
        this.cache = new Map();
        this.ttl = ttl;
    }

    get(key: string): any | null {
        const cached = this.cache.get(key);
        if (cached) {
            if (cached.expiry > Date.now()) {
                return cached.value;
            } else {
                this.cache.delete(key); // Expired, remove from cache
            }
        }
        return null;
    }

    set(key: string, value: any): void {
        this.cache.set(key, { value, expiry: Date.now() + this.ttl * 1000 });
    }


    generateKey(query: string): string {
        let hash = 0;
        for (let i = 0; i < query.length; i++) {
            const char = query.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString(36); // Convert to base-36 string
    }

}

const myCache = new InMemoryCache( 86400); // Cache entries for the day
export async function fetchDataDato<TType>(query: string): Promise<TType> {
  //  return async function(query: string, variables?: Record<string, any>): Promise<any> {
        const key = myCache.generateKey(query);
        const cachedResult = myCache.get(key);
        if (cachedResult) {
            return cachedResult;
        }

        const result = await fetchDataDatoReal<TType>(query); // Call the original GraphQL function

         myCache.set(key, result);
        return result;
 //   };
}





export const fetchDataDatoReal = <TType>(query: string) =>
    fetchData<TType>(CONTENT_URL, query);

let count = 0;
export const fetchData = async <TType>(
    url: string,
    query: string
): Promise<TType> => {
 
    console.log("Fetching data " + count++ );
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-Environment': ENVIRONMENT,
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({query}),
    };


    return await fetch(url, options).then((res) => {
        const result = res.json();
        HandleErrors(result)
        return result
    });
};
