const BASE = "http://127.0.0.1:5000";

export const APIS = {
  get_notify: `${BASE}/get_notify`,
  get_draw_notify: `${BASE}/draws`,
  chat_add_message: `${BASE}/ai_chat`,
  draw_add_message: `${BASE}/draws/image`,
  login: `${BASE}/login`,
  register: `${BASE}/register`,
  add_new_chat: `${BASE}/ai_chat`,
  add_new_draw_chat: `${BASE}/draws`,
  summaryAISearch: `${BASE}/ai_search/summary`,
  get_weather_info: `${BASE}/weather/weather_details`,
};
