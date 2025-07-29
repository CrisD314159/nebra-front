'use client'

import { ReportInfo } from "@/lib/types/types"
import { GetPendingReports } from "@/lib/serverActions/ReportActions/ReportActions"
import ReportCard from "./ReportCard"
import PaginationList from "../Lists/PaginationList"


export default function ArchivedBusinessesComponent() {


  const ActionReportCard = ({item, mutate}:{item:ReportInfo, mutate : ()=> void}) => {
    return <ReportCard editable mutate={mutate} report={item}/>
  }


  return (
    <PaginationList<ReportInfo> CardComponent={ActionReportCard} fetcher={GetPendingReports} swrKey="pendingReports"/>

  )
}