import React, {useCallback, useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {TArticlePage} from "../repositories/Common/types";
import {getVideoWithPdfPageJson} from "../repositories/VideoWithPdfsPage/request";
import {PdfSidebarComponent} from "../components/PdfSidebarComponent";

import "./Page.scss";
import {getLastSlugPart} from "../repositories/utils/utilities";
import {TVideoWithPdfsPage} from "../repositories/VideoWithPdfsPage/model";
import {VideoControl} from "../components/VideoControl";


export const VideoWithPdfsPage = (props: TArticlePage) => {
    const {slug, locale} = props;
    const navigate = useNavigate();

    const [data, setData] = useState<TVideoWithPdfsPage>({
        header: "",
        videoTitle: "UnknownVideo",
        mainVideo:  undefined,
        mainVideos: undefined,
        introText: "",
        pdfs:[],
        followOnLink:""
    });
    
    const handleFinish = () => {
   
        if(data.followOnLink)
        {
            let link = data.followOnLink;
     
            if(link.includes("ourplanetourpeople")) //internal link
            {
                //todo this feels overengineered!
                const internalSlug = getLastSlugPart(link);
                link = `/${locale}/${internalSlug}`;
            }
     
            navigate(link)
        }
    };

    const fetchData = useCallback(async () => {
        const videoName = getLastSlugPart(slug);
        const dataFetched = await getVideoWithPdfPageJson(videoName ?? "", locale);

        setData(dataFetched);
    }, [slug])


    useEffect(() => {
        fetchData().catch(console.error);
    }, [slug, fetchData]);


    const videoWrappers = data?.mainVideos ?? [data?.mainVideo];
    const showVideoSquare = videoWrappers?.length > 0 && videoWrappers[0];
    function GetVideosJsx()
    {
        return videoWrappers.map((videoWrapper, index) => (
            <>
                {index <= 0 ? null : <h3>{videoWrapper?.video.video.title}</h3>}
                <VideoControl key={index}
                              locale={locale}
                              fullScreenOnClick={false}
                              datoVideo={videoWrapper?.video.video}
                              pageTitle={props.title}
                              videoTitle={data.videoTitle}
                              videoThumbnail={videoWrapper?.thumbnailImage?.responsiveImage?.src}
                              {...(slug.includes("in-depth") ? { onFinish: () => { handleFinish() } } : {})}
                
                />
            </>
        ));
    }
    
    function GetVideoSection()
    {
        if(!data.pdfs || data.pdfs .length === 0){
            return (<>{ GetVideosJsx() }</>)
        }

        return (
            <PdfSidebarComponent pdfWrappers={data.pdfs}>
                { GetVideosJsx() }
            </PdfSidebarComponent>
        )
         
    }
   
    return (
        <>
            <h1>{data.header}</h1>  
            {data.introText ? <p className="introText">{data.introText}</p> : null}

            
            {
                (showVideoSquare) ? 
            
                GetVideoSection():
                  
                    <PdfSidebarComponent pdfWrappers={data.pdfs}>
   
                    </PdfSidebarComponent>
                   
            }
         
        </>
    );
};
