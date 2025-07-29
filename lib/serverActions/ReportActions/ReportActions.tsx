'use server'

import { FormResponse } from "@/lib/types/types";
import { createReportValidation } from "@/lib/ZodValidations/ReportValidations";
import { FetchActionMethod, FetchFormMethod, GetEntityMethod } from "../GlobalServerActions/GlobalServerActions";

export async function CreateReport(formstate:FormResponse, formdata:FormData) {
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

  return await FetchActionMethod(`api/report/accept/${reportId}`, 'PUT', {}, true)

}

export async function RejectReport(reportId:string) {

  return await FetchActionMethod(`api/report/reject/${reportId}`, 'PUT', {}, true)

}


export async function GetPendingReports(page:number) {

  return await GetEntityMethod(`api/report/pending?page=${page}`, true)

}


export async function GetAcceptedReports(page:number) {

  return await GetEntityMethod(`api/report/accepted?page=${page}`, true)

}
export async function GetRejectedReports(page:number) {

  return await GetEntityMethod(`api/report/rejected?page=${page}`, true)

}