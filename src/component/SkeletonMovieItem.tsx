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

export default SkeletonMovieItem;
