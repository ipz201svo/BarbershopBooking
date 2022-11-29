import {PaginatedListQueryResult} from "../common";

export type BarbershopBrief = {
  id: number,
  name: string,
  address: string,
  image: string,
  rating: number,
  reviewsCount: number,
};

export type BarbershopBriefList = PaginatedListQueryResult<BarbershopBrief>;