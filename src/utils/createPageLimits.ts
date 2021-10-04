export function createPageLimits({
  page = 1,
  perPage = 50,
}: {
  page: number;
  perPage: number;
}) {
  return {
    take: perPage,
    skip: perPage * (page - 1),
  };
}
