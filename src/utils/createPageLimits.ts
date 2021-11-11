export function createPageLimits(params: {
  page?: number | string;
  perPage?: number | string;
}) {
  const { page = null, perPage = 15 } = params;
  return page
    ? {
        take: +perPage,
        skip: +perPage * (+page - 1),
      }
    : {};
}
