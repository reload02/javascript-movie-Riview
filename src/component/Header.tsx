import "./Header.css";
interface HeaderProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  SetIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  setSearchText,
  searchText,
  SetIsEnter,
}) => {
  return (
    <div className="Header">
      영화사이트
      <input
        placeholder="검색"
        value={searchText}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            SetIsEnter((prev) => !prev);
          }
        }}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default Header;
