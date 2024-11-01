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

const SkeletonMovieItems = () => {
  const items = [];
  for (let i = 20; i > 0; i--) items.push(<SkeletonMovieItem key={i} />);
  return items;
};

export default SkeletonMovieItems;
