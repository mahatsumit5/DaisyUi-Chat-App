export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};
export const getNumberOfRequiredPagination = (
  totalNumberOfPages: number
): number[] => {
  const pages: number[] = [];
  const maximumNumberOfPagination = 6;
  const numberOfloops =
    totalNumberOfPages > maximumNumberOfPagination
      ? maximumNumberOfPagination
      : totalNumberOfPages;

  for (let i = 1; i <= numberOfloops; i++) {
    pages.push(i);
  }

  return pages;
};
