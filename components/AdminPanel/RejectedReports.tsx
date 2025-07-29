'use client'

import { ReportInfo } from "@/lib/types/types"
import ReportCard from "./ReportCard"
import PaginationList from "../Lists/PaginationList"
import { GetRejectedReports } from "@/lib/serverActions/ReportActions/ReportActions"


export default function RejectedReports() {


  const ActionReportCard = ({item, mutate}:{item:ReportInfo, mutate : ()=> void}) => {
    return <ReportCard editable={false} mutate={mutate} report={item}/>
  }


  return (
    <PaginationList<ReportInfo> CardComponent={ActionReportCard} fetcher={GetRejectedReports} swrKey="rejectedReports"/>

  )
}