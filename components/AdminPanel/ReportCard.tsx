'use client'

import { ReportInfo } from "@/lib/types/types"
import { Flag, User, MessageSquareText, Check, X } from "lucide-react"
import { motion } from "framer-motion"
import GlobalModal from "../Modals/GlobalModal"
import { AcceptReport, RejectReport } from "@/lib/serverActions/ReportActions/ReportActions"

interface ReportCardProps {
  report: ReportInfo
  mutate: () => void
  editable:boolean
}

export default function ReportCard({ report, mutate, editable }: ReportCardProps) {
  return (
    <motion.div
      layoutId={report.id}
      className="w-full max-w-2xl bg-base-100 rounded-xl shadow-lg border border-base-300 p-6 flex flex-col gap-4 transition hover:shadow-xl"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-primary">
          Reporte on <span className="text-base-content font-bold">{report.businessName}</span>
        </h2>
        <Flag className="text-error w-5 h-5" />
      </div>

      <div className="text-sm text-base-content/80 flex items-center gap-2">
        <User className="w-4 h-4" />
        <span className="font-medium">Report created by: {report.userName}</span>
      </div>

      <div>
        <p className="text-sm font-semibold text-base-content">Reason</p>
        <p className="text-sm text-base-content/80 whitespace-pre-wrap">{report.reason}</p>
      </div>

      {report.answer && (
        <div className="bg-success/10 border border-success rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1 text-success font-semibold">
            <MessageSquareText className="w-4 h-4" />
            Respuesta del administrador:
          </div>
          <p className="text-sm text-success-content whitespace-pre-wrap">{report.answer}</p>
        </div>
      )}

      {
        editable &&
        (
          <>
            <GlobalModal
              method={AcceptReport}
              Icon={Check}
              actionButtonName="Accept"
              entity={report}
              mutate={mutate}
              title="Accept report"
            />

            <GlobalModal
              method={RejectReport}
              Icon={X}
              actionButtonName="Reject"
              entity={report}
              mutate={mutate}
              title="Reject report"
            />
          </>
        )

      }


    </motion.div>
  )
}