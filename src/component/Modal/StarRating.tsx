import { useState, useEffect } from "react";

interface Props {
  movieId: string;
}

const StarRating: React.FC<Props> = ({ movieId }) => {
  const [pickedStar, setPIckedStar] = useState(-1);
  const [starList, setStarList] = useState([false, false, false, false, false]);
  const movieRatingKey = "starRating";
  const storedRatings = JSON.parse(
    localStorage.getItem(movieRatingKey) || "{}"
  );
  useEffect(() => {
    if (pickedStar === -1) {
      const storedRaing = storedRatings[movieId] || -1;
      setPIckedStar(storedRaing);
    }
    localStorage.setItem(
      movieRatingKey,
      JSON.stringify({ ...storedRatings, [movieId]: pickedStar })
    );
    const tempStarList = [false, false, false, false, false];
    for (let i = 0; i <= pickedStar; i++) tempStarList[i] = true;
    setStarList(tempStarList);
  }, [pickedStar]);

  return (
    <>
      <span>별점매기기 : </span>
      {starList.map((star, index) => (
        <span
          key={index}
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={() => {
            setPIckedStar(index);
          }}
        >
          {star ? "★" : "☆"}
        </span>
      ))}
    </>
  );
};

export default StarRating;
