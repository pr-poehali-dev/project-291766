import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/e1e5a9cd-70c7-40d5-b8f9-7de55264bbc4/files/6a88e772-d46c-4f5e-9500-1a0e89489278.jpg";
const ACC_IMG = "https://cdn.poehali.dev/projects/e1e5a9cd-70c7-40d5-b8f9-7de55264bbc4/files/eb252605-1322-443c-87ef-262851e7c74e.jpg";

const CATEGORIES = [
  { name: "Верхняя одежда", count: 48, emoji: "🧥" },
  { name: "Костюмы и пиджаки", count: 36, emoji: "👔" },
  { name: "Рубашки и блузы", count: 62, emoji: "👕" },
  { name: "Брюки и юбки", count: 44, emoji: "👗" },
  { name: "Аксессуары", count: 91, emoji: "👜" },
  { name: "Обувь", count: 29, emoji: "👞" },
];

const PRODUCTS = [
  { id: 1, name: "Пальто классическое", price: "18 900 ₽", oldPrice: "24 500 ₽", tag: "Хит", img: HERO_IMG, category: "Верхняя одежда" },
  { id: 2, name: "Кожаный ремень", price: "4 200 ₽", oldPrice: null, tag: "Новинка", img: ACC_IMG, category: "Аксессуары" },
  { id: 3, name: "Деловой пиджак", price: "12 400 ₽", oldPrice: "15 000 ₽", tag: "Скидка", img: HERO_IMG, category: "Костюмы и пиджаки" },
  { id: 4, name: "Шёлковый галстук", price: "3 800 ₽", oldPrice: null, tag: null, img: ACC_IMG, category: "Аксессуары" },
  { id: 5, name: "Шерстяной тренч", price: "22 000 ₽", oldPrice: "28 000 ₽", tag: "Хит", img: HERO_IMG, category: "Верхняя одежда" },
  { id: 6, name: "Портмоне кожаное", price: "5 600 ₽", oldPrice: null, tag: "Новинка", img: ACC_IMG, category: "Аксессуары" },
];

const NAV_LINKS = ["Каталог", "Новинки", "Распродажа", "Контакты"];

type Page = "home" | "contacts";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [activeFilter, setActiveFilter] = useState("Все");
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const filters = ["Все", "Верхняя одежда", "Аксессуары", "Костюмы и пиджаки"];
  const filtered = activeFilter === "Все" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeFilter);

  const handleNav = (link: string) => {
    if (link === "Контакты") setPage("contacts");
    else setPage("home");
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--charcoal)", color: "hsl(40 15% 90%)" }}>

      {/* HEADER */}
      <header style={{ borderBottom: "1px solid hsl(20 10% 18%)" }} className="sticky top-0 z-50">
        <div style={{ backgroundColor: "rgba(20, 18, 16, 0.97)", backdropFilter: "blur(8px)" }}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={() => setPage("home")} className="flex flex-col items-start">
              <span className="font-display text-2xl font-light" style={{ color: "var(--gold)", letterSpacing: "0.4em" }}>
                ATELIER
              </span>
              <span className="font-body" style={{ color: "hsl(40 10% 45%)", letterSpacing: "0.3em", fontSize: "0.55rem", textTransform: "uppercase" }}>
                ОДЕЖДА И АКСЕССУАРЫ
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <button key={link} className="nav-link" onClick={() => handleNav(link)}>
                  {link}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button className="nav-link hidden md:flex items-center gap-1" aria-label="Поиск">
                <Icon name="Search" size={16} />
              </button>
              <button className="relative nav-link" aria-label="Корзина">
                <Icon name="ShoppingBag" size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center font-body"
                    style={{ backgroundColor: "var(--gold)", color: "var(--charcoal)", fontSize: "0.6rem" }}>
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="md:hidden nav-link" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Меню">
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={18} />
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ borderTop: "1px solid hsl(20 10% 18%)" }}>
              {NAV_LINKS.map(link => (
                <button key={link} className="nav-link text-left py-2" onClick={() => handleNav(link)}>
                  {link}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* PAGE: CONTACTS */}
      {page === "contacts" && (
        <main className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">
          <div className="mb-12">
            <p className="section-label mb-3">Связь с нами</p>
            <h1 className="font-display text-5xl font-light mb-4" style={{ color: "hsl(40 15% 92%)" }}>Контакты</h1>
            <div className="divider-gold w-24" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <p className="section-label mb-3">Адрес</p>
                <p className="font-body text-sm" style={{ color: "hsl(40 10% 65%)", lineHeight: 1.8 }}>
                  Москва, ул. Тверская, 14<br />
                  ТЦ «Деловой квартал», 2 этаж
                </p>
              </div>
              <div>
                <p className="section-label mb-3">Режим работы</p>
                <p className="font-body text-sm" style={{ color: "hsl(40 10% 65%)", lineHeight: 1.8 }}>
                  Пн–Пт: 10:00 — 21:00<br />
                  Сб–Вс: 11:00 — 20:00
                </p>
              </div>
              <div>
                <p className="section-label mb-3">Телефон и почта</p>
                <p className="font-body text-sm" style={{ color: "hsl(40 10% 65%)", lineHeight: 1.8 }}>
                  +7 (495) 000-00-00<br />
                  info@atelier-shop.ru
                </p>
              </div>
            </div>

            <div style={{ border: "1px solid hsl(20 10% 18%)", padding: "2rem", backgroundColor: "var(--charcoal-mid)" }}>
              {formSent ? (
                <div className="text-center py-8">
                  <div className="font-display text-4xl mb-3" style={{ color: "var(--gold)" }}>✓</div>
                  <p className="font-display text-xl font-light mb-2">Сообщение отправлено</p>
                  <p className="font-body text-sm" style={{ color: "hsl(40 10% 55%)" }}>Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <>
                  <p className="section-label mb-6">Написать нам</p>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="font-body text-xs block mb-1.5" style={{ color: "hsl(40 10% 55%)", letterSpacing: "0.1em" }}>ИМЯ</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 font-body text-sm outline-none"
                        style={{ backgroundColor: "hsl(20 10% 12%)", border: "1px solid hsl(20 10% 20%)", color: "hsl(40 15% 88%)" }}
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs block mb-1.5" style={{ color: "hsl(40 10% 55%)", letterSpacing: "0.1em" }}>ТЕЛЕФОН</label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-3 font-body text-sm outline-none"
                        style={{ backgroundColor: "hsl(20 10% 12%)", border: "1px solid hsl(20 10% 20%)", color: "hsl(40 15% 88%)" }}
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs block mb-1.5" style={{ color: "hsl(40 10% 55%)", letterSpacing: "0.1em" }}>СООБЩЕНИЕ</label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-3 font-body text-sm outline-none resize-none"
                        style={{ backgroundColor: "hsl(20 10% 12%)", border: "1px solid hsl(20 10% 20%)", color: "hsl(40 15% 88%)" }}
                        placeholder="Ваш вопрос или комментарий"
                      />
                    </div>
                    <button type="submit" className="btn-gold w-full py-3 mt-2">
                      Отправить
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </main>
      )}

      {/* PAGE: HOME */}
      {page === "home" && (
        <>
          {/* HERO */}
          <section className="relative overflow-hidden" style={{ height: "85vh", minHeight: "500px" }}>
            <img src={HERO_IMG} alt="Hero" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.35)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(14,12,10,0.85) 50%, transparent 100%)" }} />
            <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20">
              <div className="max-w-xl animate-fade-in">
                <p className="section-label mb-5">Новая коллекция 2026</p>
                <h1 className="font-display font-light leading-none mb-6" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "hsl(40 15% 95%)", lineHeight: 1.05 }}>
                  Деловой<br />
                  <em className="not-italic" style={{ color: "var(--gold)" }}>стиль</em>
                </h1>
                <p className="font-body text-sm mb-10" style={{ color: "hsl(40 10% 60%)", lineHeight: 1.9, maxWidth: "380px" }}>
                  Одежда и аксессуары для тех, кто ценит качество и безупречный образ в деловой среде.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-gold px-10 py-4">Смотреть каталог</button>
                  <button className="btn-outline-gold px-10 py-4">Новинки</button>
                </div>
              </div>
            </div>
          </section>

          {/* INFO STRIP */}
          <div style={{ backgroundColor: "var(--gold)", padding: "0.75rem 0" }}>
            <div className="flex flex-wrap gap-8 items-center justify-center px-6">
              {["Бесплатная доставка от 5 000 ₽", "Возврат в течение 30 дней", "Новая коллекция уже в наличии", "Скидки до 30% на избранное"].map((t, i) => (
                <span key={i} className="font-body whitespace-nowrap" style={{ color: "var(--charcoal)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <section className="py-20 max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-3">Ассортимент</p>
                <h2 className="font-display text-4xl font-light" style={{ color: "hsl(40 15% 92%)" }}>Категории</h2>
              </div>
              <div className="divider-gold flex-1 mx-8 mb-2" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={i}
                  className="card-hover text-left p-6"
                  style={{ backgroundColor: "var(--charcoal-mid)", border: "1px solid hsl(20 10% 16%)", transition: "border-color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "hsl(20 10% 16%)")}
                >
                  <span className="text-2xl mb-4 block">{cat.emoji}</span>
                  <p className="font-body text-sm font-medium mb-1" style={{ color: "hsl(40 15% 88%)" }}>{cat.name}</p>
                  <p className="font-body text-xs" style={{ color: "hsl(40 10% 45%)" }}>{cat.count} товаров</p>
                </button>
              ))}
            </div>
          </section>

          {/* PRODUCTS */}
          <section className="py-20" style={{ backgroundColor: "var(--charcoal-mid)" }}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="section-label mb-3">Популярное</p>
                  <h2 className="font-display text-4xl font-light" style={{ color: "hsl(40 15% 92%)" }}>Хиты продаж</h2>
                </div>
                <div className="divider-gold flex-1 mx-8 mb-2" />
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="px-5 py-2 font-body text-xs transition-all duration-200"
                    style={{
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: activeFilter === f ? "1px solid var(--gold)" : "1px solid hsl(20 10% 22%)",
                      backgroundColor: activeFilter === f ? "var(--gold)" : "transparent",
                      color: activeFilter === f ? "var(--charcoal)" : "hsl(40 10% 55%)",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <div key={product.id} className="card-hover group" style={{ backgroundColor: "var(--charcoal)", border: "1px solid hsl(20 10% 14%)" }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {product.tag && (
                        <span className="absolute top-3 left-3 font-body px-3 py-1" style={{
                          backgroundColor: product.tag === "Хит" ? "var(--gold)" : "hsl(20 10% 20%)",
                          border: product.tag === "Скидка" ? "1px solid var(--gold)" : "none",
                          color: product.tag === "Хит" ? "var(--charcoal)" : "var(--gold)",
                          letterSpacing: "0.1em",
                          fontSize: "0.6rem",
                          textTransform: "uppercase",
                          fontWeight: 500,
                        }}>
                          {product.tag}
                        </span>
                      )}
                      <button
                        onClick={() => setCartCount(c => c + 1)}
                        className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ backgroundColor: "var(--gold)" }}
                        aria-label="В корзину"
                      >
                        <Icon name="ShoppingBag" size={16} style={{ color: "var(--charcoal)" }} />
                      </button>
                    </div>
                    <div className="p-5">
                      <p className="font-body text-xs mb-1" style={{ color: "hsl(40 10% 45%)" }}>{product.category}</p>
                      <h3 className="font-display text-lg font-light mb-3" style={{ color: "hsl(40 15% 90%)" }}>{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-body font-medium" style={{ color: "var(--gold)", fontSize: "0.95rem" }}>{product.price}</span>
                          {product.oldPrice && (
                            <span className="font-body text-xs line-through" style={{ color: "hsl(40 10% 40%)" }}>{product.oldPrice}</span>
                          )}
                        </div>
                        <button className="font-body text-xs" style={{ color: "hsl(40 10% 45%)", letterSpacing: "0.08em", fontSize: "0.65rem", textTransform: "uppercase" }}>
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button className="btn-outline-gold px-12 py-4">Показать все товары</button>
              </div>
            </div>
          </section>

          {/* BANNER */}
          <section className="relative overflow-hidden" style={{ height: "380px" }}>
            <img src={ACC_IMG} alt="Banner" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.3)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,12,10,0.5), rgba(14,12,10,0.8))" }} />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
              <p className="section-label mb-4">Ограниченное предложение</p>
              <h2 className="font-display font-light mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "hsl(40 15% 95%)" }}>
                Скидки до <span style={{ color: "var(--gold)" }}>30%</span>
              </h2>
              <p className="font-body text-sm mb-8" style={{ color: "hsl(40 10% 60%)", letterSpacing: "0.08em" }}>
                На избранные позиции из коллекции аксессуаров
              </p>
              <button className="btn-gold px-12 py-4">Перейти к распродаже</button>
            </div>
          </section>

          {/* WHY US */}
          <section className="py-20 max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-3">Преимущества</p>
                <h2 className="font-display text-4xl font-light" style={{ color: "hsl(40 15% 92%)" }}>Почему ATELIER</h2>
              </div>
              <div className="divider-gold flex-1 mx-8 mb-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: "Award", title: "Премиум качество", desc: "Только проверенные ткани и фурнитура от ведущих поставщиков" },
                { icon: "Truck", title: "Быстрая доставка", desc: "Курьерская доставка по Москве за 1 день, по России за 3–5 дней" },
                { icon: "RotateCcw", title: "Лёгкий возврат", desc: "30 дней на возврат или обмен без лишних вопросов" },
                { icon: "Headphones", title: "Личный стилист", desc: "Поможем подобрать образ под ваши задачи и мероприятия" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center" style={{ border: "1px solid var(--gold)" }}>
                    <Icon name={item.icon} size={20} style={{ color: "var(--gold)" }} />
                  </div>
                  <h3 className="font-display text-lg font-light mb-2" style={{ color: "hsl(40 15% 90%)" }}>{item.title}</h3>
                  <p className="font-body text-xs" style={{ color: "hsl(40 10% 50%)", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid hsl(20 10% 14%)", backgroundColor: "hsl(20 10% 4%)" }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <span className="font-display text-xl font-light block mb-3" style={{ color: "var(--gold)", letterSpacing: "0.4em" }}>ATELIER</span>
              <p className="font-body text-xs" style={{ color: "hsl(40 10% 40%)", lineHeight: 1.9 }}>
                Одежда и аксессуары премиум-класса для деловых людей
              </p>
            </div>
            {[
              { title: "Каталог", links: ["Верхняя одежда", "Костюмы", "Аксессуары", "Обувь"] },
              { title: "Информация", links: ["О компании", "Доставка и оплата", "Возврат", "Размерная сетка"] },
              { title: "Контакты", links: ["+7 (495) 000-00-00", "info@atelier-shop.ru", "Москва, ул. Тверская, 14"] },
            ].map((col, i) => (
              <div key={i}>
                <p className="section-label mb-4">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <button
                        className="font-body text-xs"
                        style={{ color: "hsl(40 10% 45%)", lineHeight: 1.8, transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "hsl(40 10% 45%)")}
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="divider-gold mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs" style={{ color: "hsl(40 10% 35%)" }}>© 2026 ATELIER. Все права защищены.</p>
            <p className="font-body text-xs" style={{ color: "hsl(40 10% 35%)" }}>ИП Иванов И.И. · ИНН 000000000000</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
