import { useQuery } from "react-query";

import { Application } from "../../../models/Applications";
import { servarrFetchActivity, servarrFetchStatus } from "../../../utils/api";
import { Indicator } from "../../ui/Indicator";

const REFETCH_INTERVAL = 15 * 1000;

export type ServarrV3Status = {
  source: string;
  type: string;
  message: string;
};

export type ServarrV3Activity = {
  totalRecords: 0;
  records: [
    {
      title: string;
    }
  ];
};

type Props = {
  app: Application;
  apiVersion?: number;
  scopes?: string[];
};

const Servarr = ({
  app,
  apiVersion = 3,
  scopes = ["queue", "status"],
}: Props) => {
  const { data: status, isLoading } = useQuery(
    ["status", app.name],
    () => servarrFetchStatus(app.url, app.apiKey, apiVersion),
    {
      refetchInterval: REFETCH_INTERVAL,
      enabled: scopes.includes("status"),
    }
  );

  const { data: activity, isLoading: isActLoading } = useQuery(
    ["activity", app.name],
    () => servarrFetchActivity(app.url, app.apiKey, apiVersion),
    {
      refetchInterval: REFETCH_INTERVAL,
      enabled: scopes.includes("queue"),
    }
  );

  if (isLoading || isActLoading || !activity || !status) {
    return <></>;
  }

  const warnings = status.filter((x) => x.type === "warning");
  const errors = status.filter((x) => x.type === "error");

  if (
    warnings.length === 0 &&
    errors.length === 0 &&
    activity.totalRecords === 0
  ) {
    return <></>;
  }

  return (
    <div className="flex gap-2">
      {warnings.length > 0 && (
        <Indicator
          className="bg-orange-400 text-gray-50 shadow-sm"
          info={warnings.map((x) => x.message).join("\\A")}
        >
          {warnings.length}
        </Indicator>
      )}
      {errors.length > 0 && (
        <Indicator
          className="bg-red-500 text-gray-50 shadow-sm"
          info={errors.map((x) => x.message).join("\\A")}
        >
          {errors.length}
        </Indicator>
      )}
      {activity.totalRecords > 0 && (
        <Indicator
          className="bg-cyan-500 text-gray-50 shadow-sm"
          info={activity.records.map((x) => x.title).join("\\A")}
        >
          {activity.totalRecords}
        </Indicator>
      )}
    </div>
  );
};

export default Servarr;
