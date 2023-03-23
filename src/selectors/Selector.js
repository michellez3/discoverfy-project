import { createSelector } from "reselect";

export const dataSelector = (data) => data?.items || [];

export const songSelector = createSelector(dataSelector, (tableData) => {
  const result = tableData.map((item) => ({
    songName: item?.name,
    artistName: item?.artists[0]?.name,
    albumCover: item?.album?.images[2]?.url,
  }));
  return result;
});
