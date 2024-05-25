export function formatViewCount(viewCount) {
  if (!viewCount) return 0;
  if (viewCount >= 1000 && viewCount < 1000000) {
    // Convert to K format
    return (viewCount / 1000).toFixed(1) + "K";
  } else if (viewCount >= 1000000) {
    // Convert to M format
    return (viewCount / 1000000).toFixed(1) + "M";
  } else {
    return viewCount.toString(); // Return as is if less than 1000
  }
}
