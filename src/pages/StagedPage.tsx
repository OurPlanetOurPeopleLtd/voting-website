import {useCallback, useEffect, useState} from "react";

import "./Page.scss";
import {getSpecialPageJson} from "../repositories/StagedPage/request";
import {StagedFlow} from "./VotingPageVariants/VotingPageMainJourney";
import {getVotingPageJson} from "../repositories/VotingPage/request";
import {TStagedFlowProps} from "./VotingPageVariants/TStagedFlowProps";

export type TStagePage = {
    stage?:string
}

export const StagedPage = (props: { slug:string, locale:string} ) => {
    const {slug, locale} = props;

    const fetchData = useCallback(async () => {
      
        const dataFetched = await getSpecialPageJson(props.slug ?? "", locale);
        const voteDataFetched = await getVotingPageJson("Original", locale);
        const combinedData: TStagePage & TStagedFlowProps =
            {
                ...dataFetched, ...voteDataFetched, locale:locale, forceStage:dataFetched.stage
            }

        setData(combinedData);
    }, [slug,locale])

    const [data, setData] = useState<TStagePage & TStagedFlowProps | undefined>(undefined);
    
    useEffect(() => {
        fetchData().catch(console.error);
    }, [slug, locale, fetchData]);

    if(!data) return <></>
    
    return (
        <>
            <StagedFlow {...data} ></StagedFlow>
        </>
    );
};
