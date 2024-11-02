import "./MovieItem.css";

const SkeletonMovieItem: React.FC = () => {
  return (
    <>
      <div className="MovieItem">
        <div className="skeletonMovieImage" />
        <div className="movieTitle"></div>
        <div className="movieGernes">🎖️</div>
      </div>
    </>
  );
};

const SkeletonMovieItems: React.FC = () => {
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <SkeletonMovieItem key={i} />
      ))}
    </>
  );
};

export default SkeletonMovieItems;
