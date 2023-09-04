import accToken from "./auth.js";
import { getTopTracks, getSuggestions } from "./data.js";

const topTracks = await getTopTracks(accToken);

const topTracksIds = [topTracks.items.map((track) => track.id)];

const suggTracks = await getSuggestions(accToken, topTracksIds);
export { topTracks, suggTracks };
