const url = "http://localhost:8080/api"
export const base_url = () => {
  return url
}

export const getToken = () => {
  return window.localStorage.getItem("token");
}
