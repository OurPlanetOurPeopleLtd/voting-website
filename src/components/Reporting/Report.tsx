import React, { useState, useEffect } from 'react';
import {DataStore, Predicates} from 'aws-amplify';
import {Event, LazyEvent} from '../models';
import * as XLSX from 'xlsx';

import {DataColumn, TDataColumn} from "./DataColumn";
import {Row} from "react-bootstrap";

export interface ReportData {
   /* userId: string;
    eventName: string;
    attributes: any;*/

    readonly id: string;
    readonly userId?: string | null;
    readonly eventName?: string | null;
    readonly attributes?: any;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
    // Add other properties based on your Event model
}

interface UserVisitCounts {
    [userId: string]: number;
}

const ReportComponent: React.FC = () => {
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [excelData, setExcelData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const events = await DataStore.query(Event);
                // Map the data to the ReportData interface.
                const mappedData: ReportData[] = events.map((event) => {

                    const reportData: ReportData = {
                        id: event.id,
                        createdAt: event.createdAt,
                        updatedAt: event.updatedAt,
                        userId: event.userId || "unknown", //Handle if userId is undefined
                        eventName: event.eventName ?? "unknown event",
                        attributes: event.attributes

                        // Add other mappings as needed
                    }
                    return reportData;
                });

                setReportData(mappedData);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

       
        
        fetchData().catch(e => console.log(e));

       
    }, []);

    interface CommonAttributes
    {
        userGuid?: string;
    }

    interface VideoAttributes extends CommonAttributes{
        video?: string;
        page?: string;             
        time?: number;
        percentage?:number;
    }
    interface VoteAttributes  extends CommonAttributes{
        choice?: string;    
    }

    interface PageAttributes extends CommonAttributes {        
        page:string;
    }
    function parseAttributes<T>(attributes: string | null | undefined): T | null {
        if(!attributes)
            return null;
        try {
            return (attributes) as T
           // return JSON.parse(attributes) as T;
        } catch (error) {
            console.error("Error parsing attributes:", error);
            return null;
        }
    }
    interface ParsedEvent<T>
    {        
        readonly id: string;
        readonly userId?: string | null;
        readonly eventName?: string | null;
        readonly attributes?: T;
        readonly createdAt?: string | null;
        readonly updatedAt?: string | null;
    }
    function parseEvent<T>(event: ReportData | LazyEvent | null | undefined): ParsedEvent<T> | null {
        if(!event || !event.attributes)
            return null;
        try {
           // const parsedAttributes = JSON.parse(event.attributes.toString()) as T;
            const parsedAttributes = event.attributes as T;
            const data: ParsedEvent<T> =
                {
                    ...event,
                    attributes: parsedAttributes
                }
            return data;
        } catch (error) {
            console.error("Error parsing Event:", error, event);
         
            return null;
        }
    }
    
   
    
    const queryData = async (startDate:Date, endDate:Date) =>
    {
        console.log("starting download");
        // (1) Users to date
        const allUsers = reportData.filter(e => e.eventName === "Page_View")//await DataStore.query(Event, (e) => e.and(e => [e.eventName.eq("Page_View")]));
        const uniqueUsers = Array.from(new Set(allUsers.map(event => event.userId)));
        const newUsers = allUsers.filter(event => new Date(event.createdAt ?? "") >= startDate && new Date(event.createdAt ?? "") <= endDate);
        const uniqueNewUsers = Array.from(new Set(newUsers.map(event => event.userId)));

        // (2) Non essential tracking (Assuming you have a Consent Event)
        //const consentAgreed = await DataStore.query(Event, (e) => e.and(e => [e.eventName.eq("Consent_Given"), e.attributes.consent.eq("true")]));
        //const consentNotAgreed = await DataStore.query(Event, (e) => e.and(e => [e.eventName.eq("Consent_Given"), e.attributes.consent.eq("false")]));
        //const consentNoChoice = await DataStore.query(Event, (e) => e.and(e => [e.eventName.eq("Consent_Given"), e.attributes.consent.eq("noChoice")]));

        // (3) All Visits
        console.log("gettign event data");
        const pageViews = allUsers;//await DataStore.query(Event, (e) => e.and(e => [e.eventName.eq("Page_View")]));
        const pagesVisted = pageViews.map( x => parseEvent<PageAttributes>(x));

        function pageViewsOn(pageName: string) 
        {
            return pagesVisted.filter(x => x?.attributes?.page.includes(pageName)).length
        }
        function removeDuplicatesByUserId<T extends { readonly userId?: string | null  }>(arr: T[]): T[] {
            return Array.from(
                arr.reduce((map, item) => {
                    const userId = item?.userId ?? "unknown";
                    if (!map.has(userId)) {
                        map.set(userId, item);
                    }
                    return map;
                }, new Map<string, T>()).values()
            );
        }
        function uniqueCounts<T extends { readonly userId?: string | null }>(arr: T[]): number
        {
           
            const newArr = removeDuplicatesByUserId(arr);
            return newArr.length;
        }

        function groupByVideo(videoParsed: VideoEvent[]): Map<string, VideoEvent[]> {
            const grouped = new Map<string, VideoEvent[]>();

            videoParsed.forEach((event) => {
                const videoName = event.attributes?.video;
                if (videoName) {
                    if (!grouped.has(videoName)) {
                        grouped.set(videoName, []);
                    }
                    grouped.get(videoName)?.push(event);
                }
            });

            return grouped;
        }
        function generateExcelData(groupedVideoData: Map<string,  VideoEvent[]>): any[] {
            const videoData = Array.from(groupedVideoData.entries()).map(([videoName, events]) => {
                const watchedToEnd = events.filter((e) => e.eventName === 'Video_Watched_To_End').length;
                const played:VideoEvent[] = events.filter((e) => e.eventName === 'Video_Played');
                const playedCount = played.length;
                const uniquePlayed = uniqueCounts(played); // Assuming uniqueCounts is defined
                const percentages = played.map(x => x.attributes?.percentage ?? 0);
                const times = played.map(x => x.attributes?.time ?? 0);
                return {
                    'Action': videoName,
                    'Count': playedCount,
                    'Played': uniquePlayed,
                    'Watched to End': watchedToEnd,
                    'Percent' :  Math.max(...percentages),
                    'Time Watched' :  Math.max(...times),
                    
                };
            });

            return videoData;
        }
        
        const visitsPerUser = pageViews.reduce((acc:UserVisitCounts, event) => {
            acc[event.userId ?? "unknown"] = (acc[event.userId ?? "unknown"] || 0) + 1;
            return acc;
        }, {});
        const singleVisits = Object.values(visitsPerUser).filter(count => count === 1).length;
        const multipleVisits = Object.values(visitsPerUser).filter(count => count > 1).length;

        // (4) Votes
        console.log("getting vote data");
        const allVotes = await DataStore.query(Event, (c) =>
            c.or(c => [
                c.eventName.eq("Voted"),
                c.eventName.eq("Changed_Vote")
            ]));


        console.log("getting video data");
        interface VideoEvent {
            userId:string;
            eventName: string | null | undefined;
            attributes?: VideoAttributes | null;
           
        }
        // (5) Reasonable worst case video
        const videoEvents =   reportData.filter(e => e.eventName?.includes( "Video"))//await DataStore.query(Event, e => e.eventName.contains("Video"));
        const videoParsed:VideoEvent[] = videoEvents.map(e => 
            
            {
                const attribs = parseAttributes<VideoAttributes>(e.attributes);
                const data:VideoEvent = {
                    userId: attribs?.userGuid ??  e.userId ?? "unknown",
                    eventName: e.eventName,
                    attributes: attribs
                }
                return data;
            }
        );     
        
       

        const votedYes = allVotes.filter(event => parseAttributes<VoteAttributes>(event.attributes)?.choice === 'YES').length;
        const votedNo = allVotes.filter(event => parseAttributes<VoteAttributes>(event.attributes)?.choice === 'NO').length;

        console.log("getting specialsed event data");
        const inDepthShare =   reportData.filter(e => e.eventName === "Share_Clicked") //await DataStore.query(Event, (e) => e.eventName.eq("Share_Clicked"));
        const inDepthDonate =  reportData.filter(e => e.eventName === "Donate_Clicked") // await DataStore.query(Event, (e) => e.eventName.eq("Donate_Clicked"));
        const inDepthReg =     reportData.filter(e => e.eventName === "Registered") //await DataStore.query(Event, (e) => e.eventName.eq("Registered"));

        const shareClicks = reportData.filter(e => e.eventName === "Share_Clicked")//await DataStore.query(Event, (e) => e.and(e => [e.eventName.eq("Share_Clicked")]));
        const sharePercent = (shareClicks.length / pageViewsOn("share")) * 100;

        // (10) Donate button
        const donateClicks = reportData.filter(e => e.eventName === "Donate_Clicked")//await DataStore.query(Event, (e) => e.and(e => [e.eventName.eq("Donate_Clicked")]));
        const donatePercent = (donateClicks.length / pageViewsOn("donate")) * 100;

        // (11) Registered
        const regClicks = reportData.filter(e => e.eventName === "Registered")// await DataStore.query(Event, (e) => e.and(e => [e.eventName.eq("Registered")]));
        const regPercent = (regClicks.length / pageViewsOn("registration")) * 100;

        // const excelVideoData = generateReportData(videoParsed, otherData);     
        const groupedVideoData = groupByVideo(videoParsed);
        const videoExcelData = generateExcelData(groupedVideoData); 
        const excelData = [
            ...videoExcelData,
            {
                "Action": "Voted Yes",
                "Count": votedYes,
            },
            {
                "Action": "Voted No",
                "Count": votedNo,
            },
            {
                "Action": "Share Clicks",
                "Count": inDepthShare.length,
                "Percent": sharePercent,
            },
            {
                "Action": "Donate Clicks",
                "Count": inDepthDonate.length,
                "Percent": donatePercent,
            },
            {
                "Action": "Registration Clicks",
                "Count": inDepthReg.length,
                "Percent": regPercent,
            },
        ];

        setExcelData(excelData)

        
    }
    
    const generateExcel = () => {

       /* const usersSheet = XLSX.utils.json_to_sheet([
            {'Start Period': startDate.toString(), 'End Period': endDate.toString()  },
            { 'Users to date': uniqueUsers.length, 'New users in period': uniqueNewUsers.length },
            { 'Users who visited once in period': singleVisits, 'Users who visited Multiple times in period': multipleVisits }
            //singleVisits
        ]);*/

        
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        console.log("calling query data")
        queryData(sevenDaysAgo, today).catch(e => console.log(e));
        // Create Excel Workbook
        const workbook = XLSX.utils.book_new();
        const mainSheet = XLSX.utils.json_to_sheet(reportData);
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Event Data");

        XLSX.utils.book_append_sheet(workbook, mainSheet, 'Full Report Data');
        // XLSX.utils.book_append_sheet(workbook, consentSheet, 'Consent Data');
        //XLSX.utils.book_append_sheet(workbook, usersSheet, 'User Data');

        XLSX.writeFile(workbook, 'new_report.xlsx');

        // Create a download link.
        const link = document.createElement('a');
        link.href = '/new_report.xlsx'; // Adjust the path as needed.
        link.download = 'new_report.xlsx';
        link.click();
        
    };

    
    const [dataColumns, setDataColumns] = useState<TDataColumn[]>();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    

    return (
        <div style={{padding:30, margin:40}}>
            <h1>Report data</h1>
            <button onClick={generateExcel}>Download Excel Report</button>
            <Row>
                {dataColumns?.map(x => <DataColumn {...x}></DataColumn>)}
            </Row>
        </div>
    );
};

export default ReportComponent;