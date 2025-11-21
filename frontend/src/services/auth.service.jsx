import axios from 'axios'

const url = import.meta.env.VITE_AUTH_API_URL;

export const post_body = async (endpoint, body) => {
    // No establezcas el Content-Type manualmente; axios lo hará automáticamente para FormData
    const res = await axios.post(`${url+endpoint}`, body);
    return res.data; // Retorna solo la data si es necesario
};