import React, {useEffect, useState} from "react";

import "./App.scss";

import {ContentType, NavigationItem} from "./repositories/Navigation/types";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import VotingPage from "./pages/VotingPage";

import NoPage from "./pages/NoPage";
import {DEBUG_QUERY, refreshPreview} from "./repositories/utils/preview";
import {localStorageVotingIdKey, localStorageWatchedIdKey, LogLinks} from "./repositories/utils/utilities";

import {getAllNavData} from "./repositories/Common/request";
import {LayoutTs} from "./components/Layout";
import {RouteChangeListener} from "./RouteChangeListener";
import {VideoPage} from "./pages/VideoPage";
import {ArticlePage} from "./pages/Article";
import {VotingResultsFrame} from "./pages/VotingResultsFrame";
import {VideoWithPdfsPage} from "./pages/VideoWithPdfPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {StagedPage} from "./pages/StagedPage";
import PageTransition from "./PageTransition";

import {ReportPage} from "./components/Reporting/ReportPage";
import {defaultLanguage, getSupportedLocales} from "./repositories/utils/languages";


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
    const [languageArray, setLanguageArray] = useState<(string | undefined)[]>([]);
    
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
        
    }, [locale]);

    useEffect(() => {
        
        if(!loading && pageNavigateData === null) {
            fetchData().catch(console.error);
            //languageArray
            getSupportedLocales().then( (locales: string[]) => {
                    const languageArray = [undefined, ...locales];
                    setLanguageArray(languageArray)
                }
            )
            
        }
    },[]);
    
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

                    <Route key="report" path="/report/patrickonly/277205bc-fdf9-4bcb-be07-14a3a3bcc7f4" element={
                        <LayoutTs locale={locale} title={"Unknown Page"} >
                        <ReportPage/>
                        </LayoutTs>
                    }></Route>
                    <Route key="api" path="/reset/patrickonly/277205bc-fdf9-4bcb-be07-14a3a3bcc7f4" element={<Reset/>}></Route>
                                 
                </Routes>
                </PageTransition>
        </BrowserRouter>
    );
}

export default Routing;
