import { BASE_URL, USE_MOCK } from "../config";
import { mockResponse } from "../utils/mockMapper";

export const get = async (url, params) => {
  const token = localStorage.getItem("x-service-token");
  if (USE_MOCK) {
    const mockFile = mockResponse(url, "GET");
    const mockData = await import(`../apiConfig/Mock/${mockFile}`);
    return mockData?.default;
  } else {
    try {
      const requestValues = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
        credentials: "include",
        withCredentials: true,
        method: "GET",
        params,
      };
      const response = await fetch(`${BASE_URL}${url}`, requestValues)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          return {
            ...result,
            data: JSON.parse(Buffer.from(result.data, "base64").toString())
          }
        })
        .catch((error) => console.log("error", error));
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const post = async (url, data) => {
  const token = localStorage.getItem("x-service-token");
  if (USE_MOCK) {
    const mockFile = mockResponse(url, "POST");
    const mockData = await import(`../apiConfig/Mock/${mockFile}`);
    return mockData?.default;
  } else {
    try {
      const requestValues = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
        credentials: "include",
        withCredentials: true,
        method: "POST",
        body: JSON.stringify({payload: Buffer.from(JSON.stringify(data)).toString("base64")}),
      };
      const response = await fetch(`${BASE_URL}${url}`, requestValues)
        .then((response) => response.json())
        .then((result) => {
          return {
            ...result,
            data: JSON.parse(Buffer.from(result.data, "base64").toString())
          }
        })
        .catch((error) => console.log("error", error));
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const put = async (url, data) => {
  const token = localStorage.getItem("x-service-token");
  if (USE_MOCK) {
    const mockFile = mockResponse(url, "PUT");
    const mockData = await import(`../apiConfig/Mock/${mockFile}`);
    return mockData?.default;
  } else {
    try {
      const requestValues = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
        credentials: "include",
        withCredentials: true,
        method: "PUT",
        body: JSON.stringify({payload: Buffer.from(JSON.stringify(data)).toString("base64")}),
      };
      const response = await fetch(`${BASE_URL}${url}`, requestValues)
        .then((response) => response.json())
        .then((result) => {
          return {
            ...result,
            data: JSON.parse(Buffer.from(result.data, "base64").toString())
          }
        })
        .catch((error) => console.log("error", error));
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const del = async (url) => {
  const token = localStorage.getItem("x-service-token");
  if (USE_MOCK) {
    const mockFile = mockResponse(url, "DELETE");
    const mockData = await import(`../apiConfig/Mock/${mockFile}`);
    return mockData?.default;
  } else {
    try {
      const requestValues = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
        credentials: "include",
        withCredentials: true,
        method: "DELETE",
      };
      const response = await fetch(`${BASE_URL}${url}`, requestValues)
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.log("error", error));
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
