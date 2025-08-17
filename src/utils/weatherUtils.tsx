interface WmoInfo {
  desc: string;
  icon: string;
}

export const getWeatherInfoFromWmoCode = (code: number): WmoInfo => {
  const wmo: { [key: number]: WmoInfo } = {
    0: { desc: "Clear sky", icon: "01d" },
    1: { desc: "Mainly clear", icon: "02d" },
    2: { desc: "Partly cloudy", icon: "03d" },
    3: { desc: "Overcast", icon: "04d" },
    45: { desc: "Fog", icon: "50d" },
    48: { desc: "Depositing rime fog", icon: "50d" },
    51: { desc: "Light drizzle", icon: "09d" },
    // ... (rest of the codes) ...
    99: { desc: "Thunderstorm with heavy hail", icon: "11d" },
  };
  return wmo[code] || { desc: "Unknown weather", icon: "01d" };
};