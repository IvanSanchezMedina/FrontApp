import { getSeriesNameByIdRequest } from "../otherData";

export const getSeriesNameById = async (serieId) => {
    try {
        const serieData = await getSeriesNameByIdRequest(serieId)
  
        return serieData.data.name;
    } catch (error) {
        console.error('Error al obtener nombre de serie:', error);
    }
}