export function createPageLimits({
  page = 0,
  perPage = 10,
}: {
  page?: number | string;
  perPage?: number | string;
}) {
  return page
    ? {
        take: +perPage,
        skip: +perPage * (+page - 1),
      }
    : {};
}
