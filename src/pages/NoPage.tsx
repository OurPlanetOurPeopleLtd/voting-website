import {Navigate} from "react-router-dom";

const NoPage = () => {

    /*const [pageExists, setPageExists] = useState(false)
    const location = useLocation();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [redirect, setRedirect] = useState<string>("");
    async function fetchData() {
       // const links = await getAllNavData("", "en");
        setPageNavigateData(links);

        const allSlugs = links.map(x => x.slug);
        const currentWindowSlug = getLastSlugPart(location.pathname);
        const findSlug = allSlugs.filter( x => getLastSlugPart(x) === currentWindowSlug );
        const pageActuallyExists = findSlug.length > 0

        setRedirect(location.pathname);
        setPageExists(pageActuallyExists);
        setHasLoaded(true)
    }
    useEffect(() => {
        fetchData().catch(console.error);
    }, []);
    
    if(!hasLoaded)  
        return <></>*/
    const pageExists = false;
    const redirect = "";
        
    return <div>
        {!pageExists ? <span >Page does not exist</span> : <Navigate to={redirect} replace></Navigate>}
    </div>;
};

export default NoPage;

