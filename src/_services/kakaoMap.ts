// src/_services/kakaoMap.ts

import { loadKakaoMap } from "./kakaoLoader";
import type { KakaoPlace, KakaoGeocoderResult } from "@/_types/kakao";

/**
 * 주소 → 좌표 변환
 */
export const addressToCoord = async (
  address: string,
): Promise<{ lat: number; lng: number }> => {
  await loadKakaoMap();

  return new Promise((resolve, reject) => {
    const kakao = window.kakao;

    if (!kakao?.maps?.services) {
      reject(new Error("Kakao services not available"));
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === "OK" && result.length > 0) {
        resolve({
          lat: Number(result[0].y),
          lng: Number(result[0].x),
        });
        return;
      }

      reject(new Error("주소 변환 실패"));
    });
  });
};

export const coordToAddress = async (
  lat: number,
  lng: number,
): Promise<KakaoGeocoderResult[]> => {
  await loadKakaoMap();

  return new Promise((resolve, reject) => {
    const kakao = window.kakao;

    if (!kakao?.maps?.services) {
      reject(new Error("Kakao services not available"));
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === "OK" && result.length > 0) {
        resolve(result);
      } else {
        reject(new Error("좌표 → 주소 변환 실패"));
      }
    });
  });
};

/**
 * 좌표 기반 맛집 검색
 */

const MAX_PAGE = 4;
export const searchRestaurantsByCoord = async ({
  lat,
  lng,
  keyword = "음식점",
  radius = 1000,
}: {
  lat: number;
  lng: number;
  keyword?: string;
  radius?: number;
}): Promise<KakaoPlace[]> => {
  await loadKakaoMap();

  return new Promise((resolve, reject) => {
    const kakao = window.kakao;

    if (!kakao?.maps?.services) {
      reject(new Error("Kakao services not available"));
      return;
    }

    const ps = new kakao.maps.services.Places();

    let currentPage = 1;
    let allData: KakaoPlace[] = [];

    ps.keywordSearch(
      keyword,
      (data, status, pagination) => {
        if (status === "OK") {
          // 데이터 누적
          allData = allData.concat(data);

          // 다음 페이지 조건 체크
          if (pagination?.hasNextPage && currentPage < MAX_PAGE) {
            currentPage++;
            pagination.nextPage();
          } else {
            resolve(allData); // 마지막에 한 번만 resolve
          }
          return;
        }

        if (status === "ZERO_RESULT") {
          resolve([]);
          return;
        }

        reject(new Error("검색 실패"));
      },
      {
        location: new kakao.maps.LatLng(lat, lng),
        radius,
      },
    );
  });
};
