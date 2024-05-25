export const isBookmarked = (bookmarks, topicId) => {
  const exists = bookmarks.includes(topicId);
  if (exists) return true;

  return false;
};
