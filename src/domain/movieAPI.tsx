const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
};

export async function fetchPopularMovies(page: number) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP 에러 status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch 에러:", error);
    return null;
  }
}

export async function fetchSearchMovies(page: number, searchText: string) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=ko-KR&page=${page}&region=KR`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
export async function fetchTotalPage(searchText: string) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=ko-KR&region=KR`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.total_pages;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
