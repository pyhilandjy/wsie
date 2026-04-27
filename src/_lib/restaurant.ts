// src/_lib/restaurant.ts

import type { KakaoPlace } from "@/_types/kakao";

export const pickRandomRestaurant = (list: KakaoPlace[]): KakaoPlace | null => {
  if (!list.length) return null;

  const index = Math.floor(Math.random() * list.length);
  return list[index];
};

export const pickRandomList = (
  list: KakaoPlace[],
  count: number,
): KakaoPlace[] => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const filterByKeyword = (
  list: KakaoPlace[],
  keyword: string,
): KakaoPlace[] => {
  return list.filter((item) =>
    item.place_name.toLowerCase().includes(keyword.toLowerCase()),
  );
};
