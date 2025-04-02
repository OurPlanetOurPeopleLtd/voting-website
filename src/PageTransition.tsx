import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";
import {recordUse} from "./utils/analytics";
import {getUserGuid} from "./repositories/utils/utilities"; // Add CSS styles

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        //scroll to top
        //window.scrollTo(0, 0);
        setVisible(false);
        setTimeout(() => setVisible(true), 300); // Delay to trigger CSS transition
        recordUse({name: "Page_View", attributes: {page: location.pathname, userGuid:getUserGuid()}});
    }, [location.pathname]); // Runs when route changes

    const { pathname } = useLocation();


    return <div className={`page ${visible ? "fade-in" : "fade-out"}`}>{children}</div>;
};

export default PageTransition;