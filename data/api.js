const API_URL = "https://my-json-server.typicode.com/shayanali1010/campusconnect-db";

export async function getEvents() {
  const res = await fetch(`${API_URL}/events`);
  return await res.json();
}

export async function getFeed() {
  const res = await fetch(`${API_URL}/feed`);
  return await res.json();
}

// existing imports & API_URL

export async function submitFeedback(feedbackData) {
  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedbackData),
  });

  if (!res.ok) throw new Error("Error submitting feedback");
  return await res.json();
}

export async function getRecommendations() {
  const res = await fetch(`${API_URL}/recommendations`);
  return await res.json();
}