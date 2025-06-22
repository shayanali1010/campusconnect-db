// Filter events by category or title
export const filterEvents = (events, keyword = "", category = "") => {
  return events.filter((event) => {
    const matchesKeyword = event.title.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory = category ? event.category === category : true;
    return matchesKeyword && matchesCategory;
  });
};
