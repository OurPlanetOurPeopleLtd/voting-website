
import * as XLSX from 'xlsx';
import {DataStore} from "@aws-amplify/datastore";
import {Event, LazyEvent} from '../../models';

import {SortDirection} from "aws-amplify";

export interface ReportData {
    id: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    userId?: string | null;
    eventName?: string | null;
    attributes?: string | null;
}

interface CommonAttributes {
    userGuid?: string;
}

interface VideoAttributes extends CommonAttributes {
    video?: string;
    page?: string;
    time?: number;
    percentage?: number;
}

interface VoteAttributes extends CommonAttributes {
    choice?: string;
}

interface PageAttributes extends CommonAttributes {
    page: string;
}

interface ParsedEvent<T> {
    readonly id: string;
    readonly userId?: string | null;
    readonly eventName?: string | null;
    readonly attributes?: T;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
}


export type TDescribedData =
    {
        name:string,
        value:number,
    }
export type TDataSection =
    {
        title: string,
        data: TDescribedData[]
    }

interface VideoEvent extends ParsedEvent<VideoAttributes>
{}    

interface UserVisitCounts {
    [userId: string]: number;
}

export class ReportLogic {
 

    private async fetchEventData(startDate: Date, endDate: Date): Promise<ReportData[]> {
        const events = await DataStore.query(Event, 
                                                        (event) => event.createdAt.between(startDate.toISOString(), endDate.toISOString()),
            {
                sort: e => e.createdAt(SortDirection.ASCENDING)
            }); 
      
        const mappedData: ReportData[] = events.map((event) => ({
            id: event.id,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            userId: event.userId || "unknown",
            eventName: event.eventName ?? "unknown event",
            attributes: event.attributes,
        }));

        return mappedData;
    }

    parseAttributes<T>(attributes: string | null | undefined): T | null {
        if (!attributes) return null;
        try {
            return /*JSON.parse*/(attributes) as T;
        } catch (error) {
            console.error('Error parsing attributes:', error);
            return null;
        }
    }

    parseEvent<T>(event: ReportData | null | undefined): ParsedEvent<T> | null {
        if (!event || !event.attributes) return null;
        try {
            const parsedAttributes = /*JSON.parse*/(event.attributes) as T;
            return {
                ...event,
                attributes: parsedAttributes,
            };
        } catch (error) {
            console.error('Error parsing Event:', error, event);
            return null;
        }
    }

    async queryData(startDate: Date, endDate: Date): Promise<TDataSection[]> {


        const removeDuplicatesByUserId = <T extends { readonly userId?: string | null }>(
            arr: T[],
            overwrite?: (existing: T, newItem: T) => boolean
        ): T[] => {
            return Array.from(
                arr.reduce((map, item) => {
                    const userId = item?.userId ?? 'unknown';
                    if (!map.has(userId) || (overwrite && overwrite(map.get(userId)!, item))) {
                        map.set(userId, item);
                    }
                    return map;
                }, new Map<string, T>()).values()
            );
        };
        const uniqueCounts = <T extends { readonly userId?: string | null }>(arr: T[],
                                                                             overwrite?: (existing: T, newItem: T) => boolean): number =>
            removeDuplicatesByUserId(arr,overwrite).length;
        
        console.log('starting data query');

        const reportData = await this.fetchEventData(startDate,endDate);
        const allUsers = removeDuplicatesByUserId(reportData/*.filter((e) => e.eventName === 'Page_View')*/, (a,b) => b?.createdAt == null ? false : a?.createdAt == null ? true : new Date(b.createdAt) > new Date(a.createdAt ));
        console.log(removeDuplicatesByUserId(reportData));
        const allUsersToDate = allUsers.filter(x => new Date(x.createdAt ?? '') < endDate);
        const newUsers = allUsers.filter(
            (event) => new Date(event.createdAt ?? '') >= startDate && new Date(event.createdAt ?? '') <= endDate
        );
        console.log('getting event data');
        const pageViews = allUsersToDate;
        const pagesVisted = pageViews.map((x) => this.parseEvent<PageAttributes>(x));
        
        const visitsPerUser = reportData.reduce((acc: UserVisitCounts, event) => {
            acc[event.userId ?? 'unknown'] = (acc[event.userId ?? 'unknown'] || 0) + 1;
            return acc;
        }, {});
        const singleVisits = Object.values(visitsPerUser).filter((count) => count === 1).length;
        const multipleVisits = Object.values(visitsPerUser).filter((count) => count > 1).length;
      
        

        const pageViewsOn = (pageName: string) =>
            pagesVisted.filter((x) => x?.attributes?.page?.includes(pageName))?.length ?? 0;      

       

        const groupByVideo = (videoParsed: any[]): Map<string, any[]> => {
            const grouped = new Map<string, any[]>();
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
        };

        
        const generateVideoEventData = (groupedVideoData: Map<string, VideoEvent[]>): TDataSection[] => {
            const eventArray = Array.from(groupedVideoData.entries());
            
            const videoData = eventArray.map(([videoName, events]) => {
                const watchedToEnd = events.filter((e) => e.eventName === 'Video_Watched_To_End');
                const played = events.filter((e) => e.eventName === 'Video_Played');
                const videoWatchedEvents = events.filter((e) => e.eventName?.includes('Video')); //todo should it get all Video_Played, Video_Watched_To_End and Video_Watched_Time events
                const timeOnVideo = removeDuplicatesByUserId(videoWatchedEvents, (a,b) => (b.attributes?.time ?? 0) > (a.attributes?.time ?? 0) );
                const uniquePlays = removeDuplicatesByUserId(played, (a,b) => (b.attributes?.time ?? 0) > (a.attributes?.time ?? 0) );
               
                console.log("video watched time for " + videoName)
                console.log(videoWatchedEvents)
                
                const uniquePlayed = uniquePlays.length;
                if(!uniquePlayed )
                    return null;
                
                const totalWatchTime = timeOnVideo.reduce((sum, play) => sum + (play.attributes?.time ?? 0), 0);

                const averageWatchTime = totalWatchTime / timeOnVideo.length;

                const averageWatchTimeInMinutes =averageWatchTime / 60;
             
                
                const uniqueWatchedToEnd = uniqueCounts(watchedToEnd);
                const uniqueDidntWatchToEnd = uniquePlayed - uniqueWatchedToEnd;
                
               
                const section:TDataSection =
                    {
                        title: videoName,
                        data: [

                            {
                                name:'All',
                                value: uniquePlayed
                            },
                            {
                                name:'Watched to End',
                                value: uniqueWatchedToEnd
                            }
                            ,
                            {
                                name:'Not Watched to End',
                                value: uniqueDidntWatchToEnd
                            },
                            {
                                name:'Average Watch Time (minutes)',
                                value: averageWatchTimeInMinutes
                            }
                        ]
                            
                        
                    }
                return section;
            
            }).filter((item): item is TDataSection => item !== null); // Filter out null or undefined values
            return videoData;
        };

        

        console.log('getting vote data');
        const allVotes = reportData.filter(e => e.eventName === "Voted" || e.eventName === "Changed_Vote");

        console.log('getting video data');
        const videoEvents = reportData.filter((e) => e.eventName?.includes('Video'));
        const videoParsed = videoEvents.map((e) => ({
            userId: this.parseAttributes<VideoAttributes>(e.attributes)?.userGuid ?? e.userId ?? 'unknown',
            eventName: e.eventName,
            attributes: this.parseAttributes<VideoAttributes>(e.attributes),
        })).map((video) => ({
            ...video,
            attributes: {...video?.attributes, time: typeof video?.attributes?.time === 'string'
                    ? parseFloat(video.attributes.time)
                    : video?.attributes?.time ?? 0,}
        
        }));
        
        console.log("alll video times");
        const allTimes = videoParsed.map(e => e?.attributes?.time ?? 0)
        console.log(allTimes)   

        const votedYes = allVotes.filter((event) => this.parseAttributes<VoteAttributes>(event.attributes)?.choice === 'YES').length;
        const votedNo = allVotes.filter((event) => this.parseAttributes<VoteAttributes>(event.attributes)?.choice === 'NO').length;

        console.log('getting specialsed event data');
        
  

        const shareClicks = uniqueCounts(reportData.filter((e) => e.eventName === 'Share_Clicked'));
        const sharePercent = (shareClicks / pageViewsOn('share')) * 100;

        const donateClicks = uniqueCounts(reportData.filter((e) => e.eventName === 'Donate_Clicked'));
        const donatePercent = (donateClicks / pageViewsOn('donate')) * 100;

        const regClicks = uniqueCounts(reportData.filter((e) => e.eventName === 'Registered'));
        const regPercent = (regClicks / pageViewsOn('registration')) * 100;

        const groupedVideoData = groupByVideo(videoParsed);
        const videoExcelData = generateVideoEventData(groupedVideoData);
        
 
        const usersToDateSection : TDataSection =
            {
                title: "Users",
                data: [
                    {
                        name:'New users',
                        value: newUsers.length
                    },
                    {
                        name:'Single visit',
                        value: singleVisits
                    },
                    {
                        name:'Multiple visits',
                        value: multipleVisits
                    }
                    /*,
                    {
                        name:'Total to (end) date',
                        value: allUsersToDate.length
                    }*/
                ]
            }
        
        const votingSection : TDataSection =
                {
                    title: "Voting",
                    data: [
                            {
                                name:'Voted Yes',
                                value: votedYes
                            },
                            {
                                name:'Voted No',
                                value: votedNo
                            }
                        ]
                };

        const shareSection : TDataSection =
            {
                title: "Share button",
                data: [
                    {
                        name:'Clicked',
                        value: shareClicks
                    },
                    {
                        name:'% of visits in period',
                        value: sharePercent
                    }
                ]
            };
        const donateSection : TDataSection =
            {
                title: "Donate button",
                data: [
                    {
                        name:'Clicked',
                        value: donateClicks
                    },
                    {
                        name:'% of visits in period',
                        value: donatePercent
                    }
                ]
            };
        const regSection : TDataSection =
            {
                title: "Registered",
                data: [
                    {
                        name:'Clicked',
                        value: regClicks
                    },
                    {
                        name:'% of visits in period',
                        value: regPercent
                    }
                ]
            };

        const data = [
            usersToDateSection,
            votingSection,
            ...videoExcelData,
             shareSection,
            donateSection,
            regSection,
            
        ];
        return data;
    }

    async downloadDataAsExcel(): Promise<void> {
       /* const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        console.log('calling query data');
        await this.queryData(sevenDaysAgo, today).catch((e) => console.log(e));

        const workbook = XLSX.utils.book_new();
        const mainSheet = XLSX.utils.json_to_sheet(this.reportData);
        const worksheet = XLSX.utils.json_to_sheet(this.data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Event Data');
        XLSX.utils.book_append_sheet(workbook, mainSheet, 'Full Report Data');
        XLSX.writeFile(workbook, 'new_report.xlsx');

        const link = document.createElement('a');
        link.href = '/new_report.xlsx';
        link.download = 'new_report.xlsx';
        link.click();*/
    }
}