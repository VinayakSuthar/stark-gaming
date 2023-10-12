import Skeleton from 'react-loading-skeleton';

export default function SkeletonCard({ cardStyle }) {
  return (
    <div className={cardStyle}>
      <Skeleton style={{ aspectRatio: '266/150' }} />
      <Skeleton width="80%" />
      <Skeleton width="40%" />
    </div>
  );
}
