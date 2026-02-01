"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, ExternalLink, Utensils, Flame, Fish, Soup, Coffee } from "lucide-react";

// --- Data ---
type Restaurant = {
  name: string;
  rating: number;
  reviews: number;
  price: string;
  category: "Unagi" | "Tonkatsu" | "Yakiniku" | "Sushi" | "Ramen" | "Izakaya" | "Others";
  desc: string;
  tags?: string[];
};

const RESTAURANTS: Restaurant[] = [
  // 鰻魚 (Unagi) - 5.0 King
  { name: "DOTONBORI KUROFUNE Nagahoribashi", rating: 5.0, reviews: 4161, price: "¥3-4k", category: "Unagi", desc: "鰻魚飯神店，5.0滿分好評，必試。", tags: ["Top Rated", "Unagi"] },
  { name: "Hozenji Yamakazu", rating: 4.5, reviews: 704, price: "Expensive", category: "Unagi", desc: "高級鰻魚飯，環境一流。", tags: ["Unagi"] },
  { name: "Hitsumabushi Nagoya Bincho", rating: 4.4, reviews: 1098, price: "Expensive", category: "Unagi", desc: "名古屋式鰻魚飯三食 (Hitsumabushi)。", tags: ["Unagi", "Nagoya Style"] },
  { name: "Yoshitora", rating: 4.3, reviews: 358, price: "¥5-6k", category: "Unagi", desc: "老字號鰻魚店。", tags: ["Unagi"] },

  // 吉列牛/豬 (Tonkatsu/Gyukatsu) - Popular
  { name: "GYUKATSU Kyoto Katsugyu Namba-Walk", rating: 4.9, reviews: 12897, price: "¥2-3k", category: "Tonkatsu", desc: "吉列牛王者，過萬好評，Namba Walk 分店。", tags: ["Gyukatsu", "Popular"] },
  { name: "Gyukatsu Motomura Namba", rating: 4.8, reviews: 12877, price: "¥2-3k", category: "Tonkatsu", desc: "另一間吉列牛巨頭，石燒自己煎。", tags: ["Gyukatsu", "Stone Grill"] },
  { name: "Tonkatsu Shabu-shabu arata", rating: 4.8, reviews: 1304, price: "¥2-3k", category: "Tonkatsu", desc: "吉列豬扒 + Shabu Shabu，兩樣都好食。", tags: ["Pork", "Hotpot"] },
  { name: "とんかつ なぎかつ (NAGIKATSU)", rating: 4.8, reviews: 590, price: "¥3-4k", category: "Tonkatsu", desc: "高質吉列豬扒。", tags: ["Pork"] },
  { name: "Gyukatsu Kyoto Katsugyu - Sennichimae", rating: 4.7, reviews: 2943, price: "¥2-3k", category: "Tonkatsu", desc: "吉列牛京都勝牛千日前店。", tags: ["Gyukatsu"] },
  { name: "Tonkatsu Daiki", rating: 4.5, reviews: 1321, price: "¥2-3k", category: "Tonkatsu", desc: "大阪出名嘅吉列豬扒老店。", tags: ["Pork", "Classic"] },

  // 燒肉 (Yakiniku)
  { name: "Yakiniku Lab Umeda", rating: 4.7, reviews: 5079, price: "¥4-6k", category: "Yakiniku", desc: "梅田區高分燒肉，性價比高。", tags: ["Yakiniku", "Umeda"] },
  { name: "Yakiniku-Manno LUCUA Osaka", rating: 4.7, reviews: 1469, price: "Expensive", category: "Yakiniku", desc: "喺 LUCUA 商場，方便，肉質靚。", tags: ["Mall", "Premium"] },
  { name: "Itamae-Yakiniku Itto", rating: 4.3, reviews: 635, price: "¥?", category: "Yakiniku", desc: "板前燒肉一斗，出名靚牛。", tags: ["Wagyu"] },

  // 壽司/海鮮 (Sushi/Seafood)
  { name: "Sushi Uoshin Shinsaibashi", rating: 4.4, reviews: 437, price: "¥?", category: "Sushi", desc: "魚心本店，出名壽司件頭超大。", tags: ["Big Sushi"] },
  { name: "Sushi Sakaba Sashisu", rating: 4.3, reviews: 2048, price: "¥2-4k", category: "Sushi", desc: "壽司酒場，年輕人熱點，要排隊。", tags: ["Izakaya Style", "Trendy"] },
  { name: "Uoichi Shokudo", rating: 4.3, reviews: 1154, price: "¥2-3k", category: "Sushi", desc: "海鮮丼專門店。", tags: ["Donburi"] },
  { name: "Harukoma (Main Store)", rating: 4.2, reviews: 3569, price: "¥2-4k", category: "Sushi", desc: "春駒本店，天神橋筋商店街名店，平靚正。", tags: ["Classic", "Cheap"] },
  { name: "Sushi Center Ura-Tennoji", rating: 4.2, reviews: 965, price: "¥2-4k", category: "Sushi", desc: "壽司中心，裏天王寺人氣店。", tags: ["Local"] },
  { name: "Sashisu", rating: 4.1, reviews: 1190, price: "¥2-4k", category: "Sushi", desc: "另一間 Sashisu 分店。", tags: ["Sushi"] },
  { name: "Harukoma (Branch Shop)", rating: 4.1, reviews: 2077, price: "¥2-4k", category: "Sushi", desc: "春駒分店，同樣好食，排隊可能短啲。", tags: ["Sushi", "Queue"] },
  { name: "Ganzo Butchikiri Sushi Uoshin Minami", rating: 4.2, reviews: 1954, price: "¥2-3k", category: "Sushi", desc: "元祖魚心南店，大件壽司。", tags: ["Big Sushi"] },
  { name: "Kaizoku", rating: 4.2, reviews: 540, price: "Moderate", category: "Sushi", desc: "海賊，主打海鮮。", tags: ["Seafood"] },
  { name: "Sushi-ya Kotobuki Tsukasa", rating: 4.2, reviews: 314, price: "¥2-3k", category: "Sushi", desc: "壽司屋，天滿區。", tags: ["Sushi", "Tenma"] },
  { name: "Shuzen YAYOI", rating: 4.6, reviews: 554, price: "Closed", category: "Sushi", desc: "注意：Google 顯示已永久結業。", tags: ["Closed"] },

  // 拉麵 (Ramen)
  { name: "Tori Soba ZAGIN Main Shop", rating: 4.5, reviews: 2426, price: "¥1-2k", category: "Ramen", desc: "座銀雞白湯拉麵，湯頭濃郁，擺盤好靚。", tags: ["Chicken Broth", "Instagrammable"] },
  { name: "noguchitaro ramen Kitashinchi", rating: 4.6, reviews: 1664, price: "¥1-2k", category: "Ramen", desc: "北新地高級拉麵，有松露味。", tags: ["Fancy Ramen"] },
  { name: "Moeyo Mensuke Ramen", rating: 4.4, reviews: 1801, price: "¥1-2k", category: "Ramen", desc: "燃えよ麺助，鴨肉拉麵出名。", tags: ["Duck Ramen"] },
  { name: "Kingemon Dotombori", rating: 3.6, reviews: 1100, price: "¥1-2k", category: "Ramen", desc: "金久右衛門，大阪黑醬油拉麵。", tags: ["Soy Sauce Ramen"] },
  { name: "Kaettekita Miyatamenji", rating: 3.9, reviews: 1028, price: "¥1-2k", category: "Ramen", desc: "宮田麵兒，沾麵。", tags: ["Tsukemen"] },

  // 居酒屋/其他 (Izakaya/Others)
  { name: "Sumibi Yakitori Ainosuke", rating: 4.5, reviews: 235, price: "Moderate", category: "Izakaya", desc: "炭火燒鳥，評分高。", tags: ["Yakitori"] },
  { name: "Nonkiya", rating: 4.4, reviews: 349, price: "¥1-2k", category: "Izakaya", desc: "新世界立食老店，食關東煮。", tags: ["Standing Bar", "Oden"] },
  { name: "Tempura Tarojiro", rating: 4.3, reviews: 751, price: "¥1-3k", category: "Others", desc: "天婦羅大眾酒場。", tags: ["Tempura"] },
  { name: "Hanadako", rating: 4.3, reviews: 4150, price: "Cheap", category: "Others", desc: "梅田章魚燒名店，蔥花多到瀉。", tags: ["Takoyaki", "Street Food"] },
  { name: "Ikkaku Nishiumeda", rating: 4.3, reviews: 1156, price: "¥2-3k", category: "Others", desc: "骨付鳥 (燒雞髀) 專門店。", tags: ["Chicken"] },
  { name: "Kushiage kenshi", rating: 4.7, reviews: 363, price: "¥4-5k", category: "Others", desc: "高級串炸 (Kushiage)。", tags: ["Fried Skewers"] },
  { name: "Hakata Kushiyaki Battenyokato", rating: 3.9, reviews: 278, price: "¥2-3k", category: "Izakaya", desc: "博多串燒。", tags: ["Yakitori"] },
  { name: "Isaribi", rating: 3.5, reviews: 1879, price: "¥2-4k", category: "Izakaya", desc: "炉端燒老店，氣氛好。", tags: ["Robatayaki"] },
  { name: "Takoyaki Juhachiban Dotonbori", rating: 4.1, reviews: 1902, price: "Cheap", category: "Others", desc: "十八番章魚燒，脆皮。", tags: ["Takoyaki"] },
  { name: "Shinsaibashi Ujien honten", rating: 4.2, reviews: 709, price: "¥1-2k", category: "Others", desc: "心齋橋宇治園，綠茶甜品。", tags: ["Matcha", "Cafe"] },
  { name: "Shin-jidai Osaka-Tenma", rating: 3.8, reviews: 387, price: "¥1-2k", category: "Izakaya", desc: "新時代，傳說中嘅炸雞皮串。", tags: ["Chicken Skin"] },
  { name: "TOTTSUAN Tenroku", rating: 4.1, reviews: 412, price: "Cheap", category: "Izakaya", desc: "地道海鮮居酒屋。", tags: ["Seafood Izakaya"] },
  { name: "Nekomaru", rating: 4.3, reviews: 67, price: "¥4-5k", category: "Others", desc: "大阪燒 (Okonomiyaki)。", tags: ["Okonomiyaki"] },
  { name: "おぼん食堂 16", rating: 3.9, reviews: 165, price: "¥2-3k", category: "Others", desc: "日式定食，健康之選。", tags: ["Teishoku"] },
  { name: "炉端と釜めし 五百蔵", rating: 4.3, reviews: 147, price: "¥?", category: "Izakaya", desc: "炉端燒 + 釜飯。", tags: ["Kamameshi"] },
];

const CATEGORIES = [
  { id: "All", label: "全部", icon: <Star size={16} /> },
  { id: "Unagi", label: "鰻魚", icon: <Fish size={16} /> },
  { id: "Tonkatsu", label: "吉列牛/豬", icon: <Utensils size={16} /> },
  { id: "Yakiniku", label: "燒肉", icon: <Flame size={16} /> },
  { id: "Sushi", label: "壽司/海鮮", icon: <Fish size={16} /> },
  { id: "Ramen", label: "拉麵", icon: <Soup size={16} /> },
  { id: "Izakaya", label: "居酒屋", icon: <Coffee size={16} /> },
  { id: "Others", label: "其他", icon: <Utensils size={16} /> },
];

export default function Home() {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" 
    ? RESTAURANTS.sort((a, b) => b.rating - a.rating) 
    : RESTAURANTS.filter(r => r.category === activeCat).sort((a, b) => b.rating - a.rating);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 pb-20">
      {/* Hero Header */}
      <div className="bg-red-600 text-white p-6 sticky top-0 z-20 shadow-md">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🇯🇵 大阪美食指南
        </h1>
        <p className="text-red-100 text-sm mt-1">Hung Ng's Curated List • {RESTAURANTS.length} Places</p>
      </div>

      {/* Category Filter */}
      <div className="sticky top-[88px] z-10 bg-stone-50/95 backdrop-blur-sm p-4 overflow-x-auto border-b border-stone-200 no-scrollbar">
        <div className="flex gap-2 w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                activeCat === cat.id 
                  ? "bg-stone-900 text-white scale-105" 
                  : "bg-white text-stone-500 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant List */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((r, i) => (
            <motion.div
              key={r.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Rating Badge */}
              <div className="absolute top-0 right-0 bg-yellow-400 text-stone-900 font-bold px-3 py-1.5 rounded-bl-2xl text-sm flex items-center gap-1 shadow-sm">
                {r.rating.toFixed(1)} <Star size={12} fill="currentColor" />
              </div>

              <div className="pr-12">
                <h2 className="text-lg font-bold text-stone-800 mb-1 leading-tight group-hover:text-red-600 transition-colors">
                  {r.name}
                </h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                    {r.category}
                  </span>
                  <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Utensils size={10} /> {r.price}
                  </span>
                  <span className="text-xs font-medium text-stone-400 flex items-center gap-1">
                    ({r.reviews.toLocaleString()} reviews)
                  </span>
                </div>
                
                <p className="text-sm text-stone-600 mb-4">{r.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {r.tags?.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + " Osaka")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-50 active:scale-95 transition-all"
              >
                <MapPin size={16} /> 於 Google Maps 打開
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
