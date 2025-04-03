import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {defaultLanguage, getSupportedLocales} from "./repositories/utils/languages";


export interface IRouteListener
{
    onSetLocale: (locale:string) => void;
}
export const RouteChangeListener = ({onSetLocale}: IRouteListener) => {

    const [locale, setLocale] = useState(defaultLanguage)
    const [allLocales, setAllLocales] = useState<string[]>([]);
    const SetLocale = (locale: string) => {
        setLocale(locale);
        onSetLocale(locale);
    }

    const getLocale = async (path: string) => {
        const extractLocale = path.substring(1, 3);
        return allLocales.includes(extractLocale) ? extractLocale : defaultLanguage;
    }

    const location = useLocation();

    useEffect(() => {
        getLocale(location.pathname).then(newLocale => setLocale(newLocale));
      
    }, [location]);
    useEffect(() => {
        getSupportedLocales().then(loc => setAllLocales(loc))
    }, []);

    return (<></>)

}