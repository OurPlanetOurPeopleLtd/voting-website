import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";
import {recordUse} from "./utils/analytics";
import {getLastSlugPart, getUserGuid} from "./repositories/utils/utilities"; // Add CSS styles

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const [pathName, setPathName] = useState<string>()
    const [locale, setLocale] = useState<string>();
    
    useEffect(() => {
        //scroll to top
        window.scrollTo(0, 0);      
        const slug = getLastSlugPart(location.pathname)
        if(slug != pathName)
        {
            setVisible(false);
            setTimeout(() => setVisible(true), 300); // Delay to trigger CSS transition
            recordUse({name: "Page_View", attributes: {page: location.pathname, userGuid:getUserGuid()}});
        }
        setPathName(slug);
       
    }, [location.pathname]); // Runs when route changes

    


    return <div className={`page ${visible ? "fade-in" : "fade-out"}`}>{children}</div>;
};

export default PageTransition;