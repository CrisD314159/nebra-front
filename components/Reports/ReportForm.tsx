'use client'
import { CreateReport } from "@/lib/serverActions/ReportActions/ReportActions";
import FormModal from "../Modals/FormModal";
import { BusinessInfo } from "@/lib/types/types";

interface ReportFormProps{
  entity: BusinessInfo

}

export default function ReportForm({entity}:ReportFormProps) {

  
  return (
    <FormModal 
    SubmitMethod={CreateReport} 
    actionButtonTitle="Report Business" 
    inputName="reason" 
    entity={entity} 
    entityIdKey="businessId" 
    title="Report Business" />
  )
}