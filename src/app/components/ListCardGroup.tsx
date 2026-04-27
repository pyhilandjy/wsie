import { ListCard } from "./ListCard";
import { KakaoPlace } from "@/_types/kakao";

export function ListCardGroup({ list }: { list: KakaoPlace[] }) {
  return (
    <>
      {list.map((item) => (
        <ListCard key={item.id} place={item} />
      ))}
    </>
  );
}
