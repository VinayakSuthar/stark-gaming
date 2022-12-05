import Skeleton from "react-loading-skeleton";

export default function SkeletonCard() {
  return (
    <div style={{ width: "250px" }}>
      <Skeleton height={141} />
      <Skeleton width="80%" />
      <Skeleton width="40%" />
    </div>
  );
}
