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

export const dateConverter = (timestamp: string): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case diffInDays > 7:
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    case diffInDays >= 1 && diffInDays <= 7:
      return `${Math.floor(diffInDays)} days ago`;
    case diffInHours >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case diffInMinutes >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const convertFileListToFileArray = (fileList: FileList): File[] => {
  return Object.values(fileList);
};
