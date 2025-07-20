'use server'

import { FormResponse } from "@/lib/types/types";
import { createReportValidation } from "@/lib/ZodValidations/ReportValidations";
import { FetchActionMethod, FetchFormMethod, GetEntityMethod } from "../GlobalServerActions/GlobalServerActions";

export async function CreateReport(formdata:FormData, formstate:FormResponse) {
  const validations = createReportValidation.safeParse({
    businessId: formdata.get('businessId'),
    reason: formdata.get('reason')
  })

  if(!validations.success){
    return {
      success: false,
      message: validations.error.flatten.toString()
    }
  }

  return await FetchFormMethod('api/report', 'POST', {...validations.data})

  
}

export async function AcceptReport(reportId:string) {

  return await FetchActionMethod(`api/report/accept/${reportId}`, 'PUT', {})

}

export async function RejectReport(reportId:string) {

  return await FetchActionMethod(`api/reject/accept/${reportId}`, 'PUT', {})

}


export async function GetPendingReports(page:number) {

  return await GetEntityMethod(`api/reject/pending?page=${page}`, true)

}


export async function GetAcceptedReports(page:number) {

  return await GetEntityMethod(`api/reject/accepted?page=${page}`, true)

}
export async function GetRejectedReports(page:number) {

  return await GetEntityMethod(`api/reject/rejected?page=${page}`, true)

}