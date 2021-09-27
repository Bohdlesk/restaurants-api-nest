export interface ICreatePageLimitsParams {
  page: number;
  perPage: number;
}

export function createPageLimits(params: ICreatePageLimitsParams) {
  const { perPage = 50, page = 1 } = params;

  delete params.page;
  delete params.perPage;

  return {
    take: perPage,
    skip: perPage * (page - 1),
  };
}
