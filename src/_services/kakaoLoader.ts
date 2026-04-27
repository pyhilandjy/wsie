// src/_services/kakaoLoader.ts

import type { Kakao } from "@/_types/kakao";
export const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

declare global {
  interface Window {
    kakao?: Kakao;
  }
}

let isLoaded = false;

export const loadKakaoMap = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isLoaded && window.kakao) {
      resolve();
      return;
    }
    console.log(KAKAO_APP_KEY);
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=services`;
    console.log(script.src);
    script.async = true;

    script.onload = () => {
      if (!window.kakao) {
        reject(new Error("Kakao not available"));
        return;
      }

      window.kakao.maps.load(() => {
        isLoaded = true;
        resolve();
      });
    };

    script.onerror = () => reject(new Error("SDK load failed"));

    document.head.appendChild(script);
  });
};
