import axios from "axios";

export async function getProduct(id) {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.log("Ошибка загрузки данных о продукте", error);
    throw error;
  }
}
