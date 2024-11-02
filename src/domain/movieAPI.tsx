const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjczOGFlYTViMDRkZmY2ODc1YTQwOTNmY2VkMGFmOSIsIm5iZiI6MTczMDIwMzgzOC43NTE2MTQsInN1YiI6IjY3MWYzNjNlNmU0MjEwNzgwZjc5Nzc0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wY4ZgiFCcuozs98URAoez21zjoGK5xVTSwyqrTiRN_Y",
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
