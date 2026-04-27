"use client";

import { useEffect, useState, useRef } from "react";
import {
  addressToCoord,
  searchRestaurantsByCoord,
  coordToAddress,
} from "@/_services/kakaoMap";
import { pickRandomRestaurant } from "@/_lib/restaurant";
import type { KakaoPlace } from "@/_types/kakao";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

import { RecommendCard } from "@/app/components/RecommendCard";
import { ListCardGroup } from "@/app/components/ListCardGroup";

import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [address, setAddress] = useState("");
  const [keyword, setkeyword] = useState("음식점");
  const [restaurant, setRestaurant] = useState<KakaoPlace | null>(null);
  const [checked, setChecked] = useState(false);
  const locationRef = useRef<{ lat: number; lng: number } | null>(null);
  const [restaurantList, setRestaurantList] = useState<KakaoPlace[]>([]);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 15;

  const pagedList = restaurantList.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  console.log(pagedList);

  const totalPage = Math.ceil(restaurantList.length / PAGE_SIZE);

  const isSameLocation = (
    a: { lat: number; lng: number } | null,
    b: { lat: number; lng: number },
  ) => {
    if (!a) return false;
    return a.lat === b.lat && a.lng === b.lng;
  };

  useEffect(() => {
    if (!checked) {
      return;
    }

    //내위치를 반환하는 카카오 api 함수 추가 필요
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // API 재호출 방지
      const newLocation = { lat, lng };
      if (isSameLocation(locationRef.current, newLocation)) {
        return;
      }

      locationRef.current = { lat, lng };
      const result = await coordToAddress(lat, lng);
      setAddress(
        result[0]?.road_address?.address_name ??
          result[0]?.address?.address_name ??
          "",
      );
    });
  }, [checked]);

  const handleSearchRestaurant = async () => {
    try {
      let lat: number;
      let lng: number;
      if (!checked) {
        const result = await addressToCoord(address);
        lat = result.lat;
        lng = result.lng;
        locationRef.current = { lat, lng };
      } else {
        if (!locationRef.current) return;
        lat = locationRef.current.lat;
        lng = locationRef.current.lng;
      }

      // 2. 좌표 → 카테고리 검색
      const list = await searchRestaurantsByCoord({ lat, lng, keyword });
      setRestaurantList(list);
      setPage(1);
      // 3. 랜덤 추천
      const picked = pickRandomRestaurant(list);

      setRestaurant(picked);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen bg-background p-10 flex flex-col">
      <div className="flex justify-end items-center px-6 py-1 border-b">
        <ThemeToggle />
      </div>
      <div className="flex flex-1 p-10 gap-6">
        {/* 왼쪽 */}
        <div className="flex-2 max-w-3xl flex flex-col gap-4">
          {/* 검색 영역 */}
          <div className="flex gap-2">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="
            h-11 flex-1 rounded-xl
            bg-background
            border border-border/60
            placeholder:text-muted-foreground/50
            focus-visible:ring-2 focus-visible:ring-[#D85A30]/30
          "
            />

            <Button
              variant="outline"
              onClick={() => setChecked((prev) => !prev)}
              className={`
            h-11 rounded-xl px-4
            border border-border/60 bg-background
            hover:bg-muted
            ${checked ? "border-[#1D9E75] bg-[#E1F5EE] text-[#0F6E56]" : ""}
          `}
            >
              현위치📍
            </Button>
          </div>

          <Button
            onClick={handleSearchRestaurant}
            className="
          h-11 rounded-xl
          bg-[#D85A30] text-white
          hover:bg-[#C04E28]
          shadow-sm
        "
          >
            검색
          </Button>

          {restaurant && <RecommendCard place={restaurant} />}
        </div>

        {/* 오른쪽 */}
        <div className="flex-1 flex flex-col gap-4 h-[calc(100vh-80px)]">
          {/* 리스트 */}
          {restaurantList.length > 0 && (
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
              <ListCardGroup list={pagedList} />
            </div>
          )}

          {/* 페이지네이션 */}
          {restaurantList.length > 0 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  />
                </PaginationItem>

                {Array.from({ length: totalPage })
                  .slice(
                    Math.floor((page - 1) / 10) * 10,
                    Math.floor((page - 1) / 10) * 10 + 10,
                  )
                  .map((_, idx) => {
                    const pageNumber =
                      Math.floor((page - 1) / 10) * 10 + idx + 1;

                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          isActive={page === pageNumber}
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </main>
  );
}
