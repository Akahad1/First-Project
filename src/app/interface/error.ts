export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorRespone = {
  statusCode: number;
  megssage: string;
  errorSource: TErrorSources;
};
