import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, Clock } from "lucide-react";
import { KakaoPlace } from "@/_types/kakao";

export function RecommendCard({ place }: { place: KakaoPlace }) {
  if (!place) return null;

  return (
    <Card className="w-full max-w-3xl rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-xl border border-neutral-800">
      {/* Top Image Area */}
      <div className="h-40 bg-linear-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
        <span className="text-5xl">🍜</span>
      </div>

      <CardContent className="p-5 flex flex-col gap-4">
        {/* Category */}
        <span className="text-orange-400 text-sm font-semibold">
          {place.category_name}
        </span>

        {/* Title */}
        <h2 className="text-2xl font-bold leading-tight">{place.place_name}</h2>

        {/* Description */}
        <p className="text-sm text-neutral-400 line-clamp-2">
          {place.road_address_name || place.address_name}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-neutral-300">
          <div className="flex items-center gap-1">
            <Star size={14} /> 4.8
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} /> 0.2km
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} /> 7,000원~
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <Button className="flex-1 rounded-xl">길 안내</Button>
          <Button variant="outline" className="rounded-xl">
            상세
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Phone size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
