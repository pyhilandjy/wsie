import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KakaoPlace } from "@/_types/kakao";
import { Button } from "@/components/ui/button";

const handleOnClick = async (place_url: string) => {
  window.open(place_url, "_blank", "width=600,height=800,noopener,noreferrer");
};

export function ListCard({ place }: { place: KakaoPlace }) {
  return (
    <Card className="w-full rounded-2xl bg-neutral-900 text-white border border-neutral-800 hover:border-neutral-600 transition">
      <CardContent className="p-4 flex gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded-xl bg-neutral-700 flex items-center justify-center text-2xl">
          🍱
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{place.place_name}</h3>
            <span className="text-xs text-neutral-400">{place.place_url}</span>
          </div>

          <p className="text-xs text-neutral-400">
            {place.road_address_name || place.address_name}
          </p>

          <div className="flex items-center gap-3 text-xs text-neutral-300 mt-1">
            <span>⭐ 4.6</span>
            <span>0.4km</span>
            <span>15,000원~</span>
          </div>

          <div className="flex gap-1 mt-2">
            <Badge variant="secondary">혼밥 OK</Badge>
            <Badge variant="secondary">조용함</Badge>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => handleOnClick(place.place_url)}
          >
            상세
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
