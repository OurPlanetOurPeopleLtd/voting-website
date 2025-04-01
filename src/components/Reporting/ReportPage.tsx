import React, {useState} from "react";
import {ReportData, ReportLogic, TDataSection} from "./ReportData";
import {DataColumn} from "./DataColumn";

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


    const updateData = (key: string, newData: TDataSection[]) => {
        setDataColumns((prevData) => ({
            ...prevData,
            [key]: newData,
        }));
    };
    const updateDatePair = (key: string, newData: TDatePair) => {
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
        if (!dataColumns) return;

        const label = getExcelColumnName(Object.keys(dataColumns).length);
        //updateData(label, []);
        //updateDatePair(label, {startDate:today, endDate:sevenDaysAgo});
        await handleDateRangeChange(label, today, sevenDaysAgo);
    };

    const handleDateRangeChange = async (key: string, startDate: Date, endDate: Date) => {
        setLoading(true);
        updateDatePair(key, {startDate, endDate});
        updateData(key, await reportLogic.queryData(startDate, endDate));
        setLoading(false);
    }

    const displayDataColumns = () => {
        if (!dataColumns) return;
        return Object.entries(dataColumns).map(([key, sections]) => (
            datePairColumns && datePairColumns[key] ?

                <DataColumn title={key}
                            data={sections}
                            startDate={datePairColumns[key].startDate}
                            endDate={datePairColumns[key].endDate}
                            handleStartDateChange={async function (s: Date): Promise<void> {
                                await handleDateRangeChange(key, s, datePairColumns[key].endDate)
                            }} handleEndDateChange={async function (e: Date): Promise<void> {
                    await handleDateRangeChange(key, datePairColumns[key].startDate, e)
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