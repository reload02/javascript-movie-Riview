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
      <p
        className="appTitle"
        onClick={() => {
          setSearchText("");
          SetIsEnter(false);
          setTimeout(() => {
            SetIsEnter(true);
          }, 300);
        }}
      >
        🎞️🎞️🔍
      </p>

      <input
        placeholder="검색"
        value={searchText}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            SetIsEnter(true);
          }
        }}
        onChange={(e) => {
          setSearchText(e.target.value);
          SetIsEnter(false);
        }}
        className="searchBar"
      ></input>
    </div>
  );
};

export default Header;
