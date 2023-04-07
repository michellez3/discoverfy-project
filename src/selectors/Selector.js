import { createSelector } from "reselect";

export const dataSelector = (data) => data?.items || [];
export const artistData = (artistResponse) => artistResponse?.items || [];

export const songSelector = createSelector(dataSelector, (tableData) => {
  const result = tableData.map((item) => ({
    songId: item?.id,
    songName: item?.name,
    artistName: item?.artists[0]?.name,
    albumCover: item?.album?.images[2]?.url,
  }));
  return result;
});

export const artistSelector = createSelector(artistData, (tableData) => {
  const result = tableData.map((item) => ({
    artistId: item?.id,
    artistName: item?.name,
    image: item?.images[2]?.url,
    url: item?.external_urls?.spotify,
    genre: item?.genres[0],
  }));
  return result;
});
