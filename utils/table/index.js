import { useCallback } from "react";
import { useRouter } from "next/router";

import RenderCell from "@/components/ui/table/RenderCell";
import { getAuthHeaders } from "@/utils/auth";
import { fetcher } from "@/utils/fetcher";

const extendColumns = (columns) => {
  return columns.map((column) => {
    if (!column.minWidth) {
      column.minWidth = column?.width ? column.width * 0.5 : 30;
    }
    if (!column.maxWidth) {
      column.maxWidth = column?.width ? column.width * 2 : 500;
    }
    return {
      ...column,
      accessor: column.accessor || column.id,
      Cell: RenderCell,
    };
  });
};

const getCellAlign = ({ format, align, detail, selection, rowActions }) => {
  if (detail) {
    return "center";
  }
  if (selection) {
    return "center";
  }
  if (rowActions) {
    return "center";
  }
  if (align && (align === "left" || align === "right" || align === "center")) {
    return align;
  }
  align = "left";
  switch (format) {
    default:
      align = "left";
      break;
    case "number":
    case "amount":
      align = "right";
      break;
    case "date":
    case "datetime":
    case "time":
    case "datetimesec":
      align = "center";
      break;
  }
  return align;
};

const getCellClassName = (column) => {
  const align = getCellAlign(column);
  const cls = [align];
  if (column?.detail) {
    cls.push("detail");
  }
  if (column?.selection) {
    cls.push("selection");
  }
  if (column?.rowActions) {
    cls.push("row-actions");
  }
  return cls.join(" ");
};

const purifyPath = (pathname) => {
  return pathname.substring(1).replaceAll("[", "").replaceAll("]", "").replaceAll(".", "").replaceAll("/", ".");
};

const useDataExporter = (access_token, url, exportParams = {}) => {
  const router = useRouter();

  const fetchExport = useCallback(
    async ({ searchValue, filtersValues, totalRecords }) => {
      const { protocol, hostname, port } = window.location;
      const downloadPath = `${protocol}//${hostname}${port ? `:${port}` : ``}${
        router.locale !== "it" ? `/${router.locale}` : ``
      }/download?filename={filename}`;
      const params = {
        totalRecords,
        searchValue,
        ...filtersValues,
        ...exportParams,
      };
      const headers = getAuthHeaders(access_token);
      const result = await fetcher({
        params,
        method: "get",
        url,
        headers: {
          ...headers,
          Downloadpath: downloadPath,
        },
        responseType: "blob",
      });
      return result;
    },
    [access_token, url, exportParams, router.locale],
  );

  return fetchExport;
};

export { extendColumns, getCellAlign, getCellClassName, purifyPath, useDataExporter };
