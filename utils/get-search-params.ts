export type Params = {
  limit?: number;
  sort?: "desc" | "asc";
  startdate?: Date;
  enddate?: Date;
};

type CreateSearchParamsProps = {
  searchParams: Params;
};

export const createSearchParams = ({
  searchParams,
}: CreateSearchParamsProps) => {
  let params = "";

  Object.keys(searchParams).map((key) => {
    return (params += `${key}=${searchParams[key as keyof Params]}&`);
  });

  return params.slice(0, -1);
};
