export type TReferenceProps = {
    currentTimeStamp: number,
    references?: TReference[]
}
export type TReference = {
    time: number;
    title: string;
    pdfLink: string;
}