import axios from "axios";
const service = {
  // 초기 영화 정보 로딩
  async getMovies() {
    const response = await axios.get(`http://localhost:3001/movies`);
    return response;
  },

  // 헤더바 검색어에 대한 정보만 받아오기
  async getSearch(payload) {
    const response = await axios.get(
      `http://localhost:3001/movies?title_like=${payload}`
    );
    return response;
  },
  // 헤더바 라디오 버튼 클릭시 정렬해서 정보 가져오기
  async getStar() {
    const response = await axios.get(
      `http://localhost:3001/movies?_sort=rating&_order=desc`
    );
    return response;
  },
  async getYear() {
    const response = await axios.get(
      `http://localhost:3001/movies?_sort=year&_order=desc`
    );
    return response;
  },

  // like 이벤트 - 서버에 데이터 업데이트
  async setLike(id, payload) {
    const response = await axios.patch(
      `http://localhost:3001/movies/${id}`,
      payload
    );
    return response;
  },
  // like 정보 업데이트 된 데이터 가져오기
  async getLike(id, payload) {
    const response = await axios.get(
      `http://localhost:3001/movies/${id}`,
      payload
    );
    return response;
  },

  // 이미 등록되어있는 comments 데이터 가져오기
  async getComment(id) {
    const response = await axios.get(`http://localhost:3001/comments/${id}`);
    return response;
  },

  // 기존 데이터가 없을때 comment 생성
  async newComment(payload) {
    const response = await axios.post(
      `http://localhost:3001/comments`,
      payload
    );
    return response;
  },
  // 기존 댓글이 있을때 새로운 comment 업데이트
  async addComment(id, payload) {
    const response = await axios.patch(
      `http://localhost:3001/comments/${id}`,
      payload
    );
    return response;
  },
  async add2Comment(id, payload) {
    const response = await axios.patch(
      `http://localhost:3001/comments/${id}`,
      payload
    );
    return response;
  },

  //댓글 삭제
  async deleteComment(id, payload) {
    const response = await axios.patch(
      `http://localhost:3001/comments/${id}`,
      payload
    );
    return response;
  },

  // 댓글 업데이트 데이터 가져오기
  async upComments(payload) {
    const response = await axios.get(`http://localhost:3001/comments`, payload);
    return response;
  },

  // 영화 추가 정보 업데이트
  async updateMovie(payload) {
    const response = await axios.post(`http://localhost:3001/movies/`, payload);
    return response;
  },

  // 영화 삭제
  async deleteMovie(id) {
    const response = await axios.delete(`http://localhost:3001/movies/${id}`);
    return response;
  },

  // 회원가입
  // async newUser(payload) {
  //   const response = await axios.post(`http://localhost:3001/users`, payload);
  //   return response;
  // },

  // 로그인
  // async login(payload) {
  //   const response = await axios.post(`http://localhost:3001/login`, payload);
  //   return response;
  // },

  // 로그아웃
  // async logout() {
  //   const response = await axios.post(`http://localhost:3001/logout`);
  //   return response;
  // },
};
export default service;
