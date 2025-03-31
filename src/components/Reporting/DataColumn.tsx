import React, {useEffect, useState} from "react";

import {Col, Row} from "react-bootstrap";
import {ReportData, ReportLogic, TDataSection} from "./ReportData";


export type TDataColumn =
{
    title:string,
    startDate:Date,
    endDate:Date,
    data:TDataSection[],
    handleStartDateChange: (s:Date) => void
    handleEndDateChange: (s:Date) => void
}



const DataSection = (props: TDataSection) => {
    
    const {title, data} = props;

    return (
        <Col>
            <h3>{title}</h3>
            <table>
                <tbody>
                {data.map((pair, index) => (
                    <tr key={index}>
                        <th>{pair.name}</th>
                        <td>
                            <data value={ pair.value}>
                                {pair.value}
                            </data>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Col>
    )
}



export const DataColumn = (props: TDataColumn) => {
    
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };   
    
    return (
        <Col key={props.startDate.toISOString()+"_"+props.endDate.toISOString()+"_"+props.title}>
        <h3>Key: {props.title}</h3>
        <div>
            {/*Start Date, End Date Controls*/}
                <div id="StartDateInput">
                    <label htmlFor="datetime">Start Date:</label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        value={formatDate(props.startDate)}
                        onChange={(e) => props.handleStartDateChange(new Date(e.target.value))}
                    />
                </div>
                <div id="EndDateInput">
                    <label htmlFor="datetime">End Date:</label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        value={formatDate(props.endDate)}
                        onChange={(e) => props.handleEndDateChange(new Date(e.target.value))}
                    />
                </div>
            {/*Actual Data*/}
            {props.data.map( x=> <DataSection title={x.title} data={x.data}/>)}
             
        </div>
        </Col>
    )

}


type TDatePair = 
{startDate: Date, endDate:Date}

type DataDictionary = {
    [key: string]: TDataSection[];
};
type DatePairDictionary = {
    [key: string]:TDatePair ;
};

export const ReportPage = () => {


    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    //TDataColumn 
    const [dataColumns, setDataColumns] = useState<DataDictionary>();
    const [datePairColumns, setDatePairColumns] = useState<DatePairDictionary>();
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  
    const updateData = (key: string, newData: TDataSection[] ) => {
        setDataColumns((prevData) => ({
            ...prevData,
            [key]: newData,
        }));
    };
    const updateDatePair = (key: string, newData: TDatePair ) => {
        setDatePairColumns((prevData) => ({
            ...prevData,
            [key]: newData,
        }));
    };

    const getData = (key: string): TDataSection[] | undefined => {
        return dataColumns ? dataColumns[key] : undefined;
    };
    
    const reportLogic = new ReportLogic();

   /* useEffect(() => {
        setLoading(true);
        reportLogic.fetchData()
            .then((data) => {
                setReportData(data);
            })
            .catch((e) => {
                setError(e.message || 'Failed to fetch data');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [datePairColumns]);*/

    const handleGenerateExcel = () => {
        reportLogic.downloadDataAsExcel().catch((e) => console.log(e));
    };

    const getExcelColumnName = (columnNumber: number): string => {
        let columnName = '';
        let dividend = columnNumber + 1; // Excel columns are 1-based

        while (dividend > 0) {
            let modulo = (dividend - 1) % 26;
            columnName = String.fromCharCode(65 + modulo) + columnName; // 65 is 'A'
            dividend = Math.floor((dividend - modulo) / 26);
        }

        return columnName;
    };
    
    const handleAddColumn = async () => {
        if(!dataColumns)return;
       
        const label = getExcelColumnName(Object.keys(dataColumns).length) ;
        //updateData(label, []);
        //updateDatePair(label, {startDate:today, endDate:sevenDaysAgo});
        await handleDateRangeChange(label,today,sevenDaysAgo);
    };

    const handleDateRangeChange = async (key:string, startDate:Date, endDate:Date) =>
    {
        setLoading(true);
        updateDatePair(key, {startDate,endDate});
        updateData(key, await reportLogic.queryData(startDate,endDate));
        setLoading(false);
    }

    const displayDataColumns = () => {
        if(!dataColumns)return;
        return Object.entries(dataColumns).map(([key, sections]) => (
            datePairColumns && datePairColumns[key] ? 
            
                <DataColumn title={key} 
                            data={sections} 
                            startDate={datePairColumns[key].startDate}
                            endDate={datePairColumns[key].endDate}
                            handleStartDateChange={async function (s: Date): Promise<void> {
                                await handleDateRangeChange(key, s,datePairColumns[key].endDate )
                            }} handleEndDateChange={async function (e: Date): Promise<void> {
                                 await handleDateRangeChange(key, datePairColumns[key].startDate, e )
                }}/> : null
           
        ));
    };
    
    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <button onClick={handleGenerateExcel}>Generate Excel</button>       
            <button onClick={handleAddColumn} disabled={loading}>
                {loading ? 'Adding...' : 'Add Column'}
            </button>
            {displayDataColumns()}
        </div>
    );

}