import { baseUrl } from "./constant";

export const getAll = async () => {
  try {
    const scores = await fetch(baseUrl + "/scores");
    const jsonFormat = await scores.json();
    return jsonFormat.result;
  } catch (error) {
    throw new Error(error);
  }
};

export const createScore = async (score) => {
  try {
    const scores = await fetch(baseUrl + "/scores", {
        method: "POST",
        body: JSON.stringify(score),
        headers: {
          "Content-type": "application/json",
        },
      });
      const jsonFormat = await scores.json();
      return jsonFormat.result;
  } catch (error) {
    throw new Error(error);
  }
};
