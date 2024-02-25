import { ImportJob } from "@/models";
import React from "react";

export const ImportJobView = ({ data }: { data: ImportJob }) => {
  console.log(data);
  return (
    <>
      <p>{data.file}</p>
      <p>{data.farm}</p>
      <p>{data.processing_initiated}</p>
      <p>{data.format}</p>
      <p>{data.errors}</p>
      <p>{data.job_status}</p>
      <p>{data.uploaded_on}</p>
      <p>{data.created_by}</p>
      <p>{data.resource}</p>
      <div
        style={{ overflow: "scroll", height: "100%" }}
        dangerouslySetInnerHTML={{ __html: data.report }}
      />
    </>
  );
};
