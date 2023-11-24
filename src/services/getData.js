import axios from "axios";

export async function getData() {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.log("Ошибка загрузки данных", error);
    throw error;
  }
}
