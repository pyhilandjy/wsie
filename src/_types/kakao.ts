export interface KakaoPagination {
  hasNextPage: boolean;
  nextPage: () => void;
}

export interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // longitude
  y: string; // latitude
  place_url: string;
  distance: string;
}

export type KakaoGeocoderCoordResult = {
  x: string;
  y: string;
};

export type KakaoGeocoderResult = {
  address: {
    address_name: string;
  };
  road_address: {
    address_name: string;
  } | null;
};

export type KakaoStatus = "OK" | "ZERO_RESULT" | "ERROR";

// SDK 최소 타입
export interface KakaoMapsServices {
  Places: new () => {
    keywordSearch: (
      keyword: string,
      callback: (
        data: KakaoPlace[],
        status: KakaoStatus,
        pagenation: KakaoPagination,
      ) => void,
      options?: {
        location?: unknown;
        radius?: number;
      },
    ) => void;

    categorySearch: (
      code: string,
      callback: (data: KakaoPlace[], status: KakaoStatus) => void,
      options: {
        location: unknown;
        radius?: number;
      },
    ) => void;
  };

  Geocoder: new () => {
    addressSearch: (
      address: string,
      callback: (
        result: KakaoGeocoderCoordResult[],
        status: KakaoStatus,
      ) => void,
    ) => void;

    coord2Address: (
      lng: number,
      lat: number,
      callback: (result: KakaoGeocoderResult[], status: KakaoStatus) => void,
    ) => void;
  };

  Status: {
    OK: "OK";
    ZERO_RESULT: "ZERO_RESULT";
    ERROR: "ERROR";
  };
}

export interface KakaoMaps {
  load: (callback: () => void) => void;
  services: KakaoMapsServices;
  LatLng: new (lat: number, lng: number) => unknown;
}

export interface Kakao {
  maps: KakaoMaps;
}
