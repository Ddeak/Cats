export type VoteValue = 0 | 1;

export interface Vote {
  id: number;
  image_id: string;
  sub_id: string;
  value: VoteValue;
}
