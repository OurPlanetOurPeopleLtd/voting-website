import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {defaultLanguage, getSupportedLocales} from "./repositories/utils/languages";


export interface IRouteListener
{
    onSetLocale: (locale:string) => void;
}
export const RouteChangeListener = ({onSetLocale}: IRouteListener) => {


    const [allLocales, setAllLocales] = useState<string[]>([]);
    const location = useLocation();
    
    const SetLocale = (locale: string) => {
        onSetLocale(locale);
    }

    const getLocale = async (path: string) => {
        const extractLocale = path.substring(1, 3);
        return allLocales.includes(extractLocale) ? extractLocale : defaultLanguage;
    }

    useEffect(() => {
        if(allLocales.length)
            getLocale(location.pathname).then(newLocale => SetLocale(newLocale));
      
    }, [location.pathname,allLocales]);
    useEffect(() => {
        getSupportedLocales().then(loc => setAllLocales(loc))
    }, []);

    return (<></>)

}