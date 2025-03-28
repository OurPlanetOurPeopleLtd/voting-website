import React, {useEffect, useState} from "react";

import "./App.scss";

import {ContentType, NavigationItem} from "./repositories/Navigation/types";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import VotingPage, {localStorageVotingIdKey, localStorageWatchedIdKey} from "./pages/VotingPage";

import NoPage from "./pages/NoPage";
import {DEBUG_QUERY, refreshPreview} from "./repositories/utils/preview";
import {LogLinks} from "./repositories/utils/utilities";

import {getAllNavData} from "./repositories/Common/request";
import {defaultLanguage, getSupportedLocales} from "./languages";
import {LayoutTs} from "./components/Layout";
import {RouteChangeListener} from "./RouteChangeListener";
import {VideoPage} from "./pages/VideoPage";
import {ArticlePage} from "./pages/Article";
import {VotingResultsFrame} from "./pages/VotingResultsFrame";
import {VideoWithPdfsPage} from "./pages/VideoWithPdfPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {StagedPage} from "./pages/StagedPage";
import PageTransition from "./PageTransition";

export const headerComponentId = "UW2LLARmS3Oryu_9BT0IBQ"; //todo this is a bit rubbish
export const footerComponentId = "QR1NY2zlRK-luRZZkbfB1w";  


const Reset = () => {

    useEffect(() => {

        localStorage.removeItem(localStorageVotingIdKey)
        localStorage.removeItem(localStorageWatchedIdKey)
        const statusElement = document.getElementById("status");
        if (statusElement) {
            statusElement.innerHTML = "Done";
        }
    })


    return <div role="status">
        <span id="status">Loading...</span>
    </div>;
};






function Routing() {

    const [pageNavigateData, setPageNavigateData] = useState<NavigationItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [locale, setLocale] = useState(defaultLanguage);

    async function fetchData() {
        try {
            const links = await getAllNavData(locale);

            if (process.env.NODE_ENV === "development" && DEBUG_QUERY) {
                LogLinks(links, "routing");
            }

            setPageNavigateData(links);
            setLoading(false); // Data loaded successfully
        } catch (err) {
            console.error("Error fetching navigation data:", err);
            setError(true)
            //setError(err);
            setLoading(false); // Loading failed
            // Consider providing fallback data here if appropriate
        }
    }

    refreshPreview();

    useEffect(() => {
        fetchData().catch(console.error); 
    }, );

   /* if (loading) {
        return <div>Loading navigation data...</div>; // Show loading indicator
    }

    if (error) {
        return <div>Error loading navigation data. Please try again later.</div>; // Show error message
    }

    if (!pageNavigateData) {
        return <div>Unexpected error, navigation data is missing.</div>;
    }*/

    
    function getElementForType(type: ContentType) {

        const ErrorPage = () => <div>Could not find type</div>;

        switch (type) {
            case ContentType.RegistrationPage:
                return RegistrationPage;
            case ContentType.VotingPage:
                return VotingPage;
            case ContentType.BlogPost:
                return ArticlePage;
            case ContentType.VideoPage:
                return VideoPage;
            case ContentType.VideoWithPdfs:
                return VideoWithPdfsPage;
            case ContentType.VotingResult: 
                return VotingResultsFrame;
            case ContentType.SpecialPageRecord:
                return StagedPage;
            default:
                return ErrorPage;
        }
    } 

    
   
    const OnLocaleChanged = (locale:string) =>
    {
        setLocale(locale)
    }

    function getPath(navItem: NavigationItem) :string {
        const type = navItem.__typename;
        
        switch (type) {
            case ContentType.VotingPage:
                return "";
            default:
            case ContentType.RegistrationPage:
            case ContentType.BlogPost:
            case ContentType.VideoPage:                    
            case ContentType.VideoWithPdfs:
            case ContentType.VotingResult:
            case ContentType.SpecialPageRecord:
                return navItem.slug;           
              
        }        
    }
   
    
    const getRoute = (navItem:NavigationItem, key:string, lang?:string) =>
    {       
        const prefix = lang ? `${lang}/` : '';
        const locale = lang ?? defaultLanguage;
        const TypeElement = getElementForType(navItem.__typename);
        const path = getPath(navItem);

        return(
            
                
                <Route
                    key={key}
                    path={prefix +path}
                    element={
                        <LayoutTs locale={locale} title={navItem.title}  >
                            <RouteChangeListener onSetLocale={OnLocaleChanged}/>
                            <TypeElement {...navItem} slug={path} id={navItem.id} locale={locale}/>
                        </LayoutTs>
                    }
                />               
               
            )
    }
    const generatePageRoutesForLanguage = ( lang_index:number, lang?:string) => pageNavigateData?.map((navItem, index)  => getRoute(navItem, `${lang_index+index}`, lang))

    const languageArray = [undefined, ...getSupportedLocales()];

    return (
        <BrowserRouter>
            <PageTransition>
                <Routes>                                
                        
                    {languageArray.map((localeElement,index) => generatePageRoutesForLanguage(index, localeElement))}

                    {loading ? <></> : 
                        <Route
                            key="nopage" path="*"
                            element={
                                <LayoutTs locale={locale} title={"Unknown Page"} >
                                    <RouteChangeListener onSetLocale={OnLocaleChanged}/>
                                    <NoPage/>
                                </LayoutTs>
                            }
                        />
                    }
    
                    <Route key="api" path="/reset/patrickonly/277205bc-fdf9-4bcb-be07-14a3a3bcc7f4" element={<Reset/>}></Route>
                                 
                </Routes>
                </PageTransition>
        </BrowserRouter>
    );
}

export default Routing;
