const destinations = [
  {
    id: 1,
    name: "تخت جمشید",
    city: "مرودشت",
    province: "فارس",
    type: "تاریخی",
    image: "https://images.unsplash.com/photo-1592287104445-9e5a0b6f0d6f?auto=format&fit=crop&w=900&q=80",
    description: "شکوه تمدن هخامنشی و یکی از مهم‌ترین آثار تاریخی ایران."
  },
  {
    id: 2,
    name: "سی‌وسه پل",
    city: "اصفهان",
    province: "اصفهان",
    type: "تاریخی",
    image: "https://images.unsplash.com/photo-1578912996078-305d92249aa6?auto=format&fit=crop&w=900&q=80",
    description: "پل تاریخی و نمادین اصفهان بر فراز زاینده‌رود."
  },
  {
    id: 3,
    name: "ماسوله",
    city: "فومن",
    province: "گیلان",
    type: "طبیعت",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    description: "روستایی پلکانی در دل طبیعت سرسبز گیلان."
  },
  {
    id: 4,
    name: "جزیره کیش",
    city: "کیش",
    province: "هرمزگان",
    type: "ساحلی",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    description: "جزیره‌ای زیبا با ساحل، دریا و تفریحات متنوع."
  },
  {
    id: 5,
    name: "کویر لوت",
    city: "شهداد",
    province: "کرمان",
    type: "کویر",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    description: "سرزمینی شگفت‌انگیز برای تماشای سکوت کویر و آسمان پرستاره."
  },
  {
    id: 6,
    name: "یزد",
    city: "یزد",
    province: "یزد",
    type: "تاریخی",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    description: "شهر بادگیرها، کوچه‌های خشتی و معماری اصیل ایرانی."
  },
  {
    id: 7,
    name: "جنگل‌های مازندران",
    city: "مازندران",
    province: "مازندران",
    type: "طبیعت",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    description: "جنگل‌های سرسبز شمال برای تجربه آرامش و هوای پاک."
  },
  {
    id: 8,
    name: "شیراز",
    city: "شیراز",
    province: "فارس",
    type: "تاریخی",
    image: "images/shiraz.png",
    description: "شهر شعر و باغ‌ها؛ سرشار از تاریخ، فرهنگ و معماری ایرانی."
  }
];

const grid = document.getElementById("destinationsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const modal = document.getElementById("destinationModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const modalFavorite = document.getElementById("modalFavorite");

let currentFilter = "همه";
let currentDestination = null;
let favorites = JSON.parse(localStorage.getItem("iranGardFavorites") || "[]");

function isFavorite(id) {
  return favorites.includes(id);
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("iranGardFavorites", JSON.stringify(favorites));
  renderDestinations();
  updateModalFavorite();
}

function renderDestinations(list = destinations) {
  const filtered = list.filter(destination => {
    return currentFilter === "همه" || destination.type === currentFilter;
  });

  grid.innerHTML = "";

  if (!filtered.length) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  filtered.forEach(destination => {
    const card = document.createElement("article");
    card.className = "destination-card";

    card.innerHTML = `
      <div class="card-image">
        <img src="${destination.image}" alt="${destination.name}" loading="lazy">
        <button class="favorite-btn ${isFavorite(destination.id) ? "active" : ""}" type="button"
          data-favorite="${destination.id}" aria-label="علاقه‌مندی">
          ${isFavorite(destination.id) ? "♥" : "♡"}
        </button>
        <span class="card-type">${destination.type}</span>
      </div>
      <div class="card-body">
        <h3>${destination.name}</h3>
        <div class="card-location">📍 ${destination.city}، ${destination.province}</div>
        <p class="card-description">${destination.description}</p>
        <button class="card-link" type="button" data-open="${destination.id}">مشاهده جزئیات ←</button>
      </div>
    `;

    grid.appendChild(card);
  });

  grid.querySelectorAll("[data-favorite]").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      toggleFavorite(Number(button.dataset.favorite));
    });
  });

  grid.querySelectorAll("[data-open]").forEach(button => {
    button.addEventListener("click", () => openModal(Number(button.dataset.open)));
  });
}

function openModal(id) {
  currentDestination = destinations.find(destination => destination.id === id);
  if (!currentDestination) return;

  modalImage.src = currentDestination.image;
  modalImage.alt = currentDestination.name;
  modalTitle.textContent = currentDestination.name;
  modalType.textContent = currentDestination.type;
  modalLocation.textContent = `📍 ${currentDestination.city}، ${currentDestination.province}`;
  modalDescription.textContent = currentDestination.description;

  updateModalFavorite();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateModalFavorite() {
  if (!currentDestination) return;
  modalFavorite.textContent = isFavorite(currentDestination.id)
    ? "♥ حذف از علاقه‌مندی‌ها"
    : "♡ افزودن به علاقه‌مندی‌ها";
}

function applySearch(query) {
  const value = query.trim().toLowerCase();

  if (!value) {
    renderDestinations();
    return;
  }

  const results = destinations.filter(destination =>
    [destination.name, destination.city, destination.province, destination.type]
      .some(text => text.toLowerCase().includes(value))
  );

  renderDestinations(results);
  document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderDestinations();
  });
});

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(item => {
      item.classList.toggle("active", item.dataset.filter === currentFilter);
    });
    renderDestinations();
    document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-search]").forEach(button => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.search;
    applySearch(button.dataset.search);
  });
});

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  applySearch(searchInput.value);
});

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", closeModal);
modalFavorite.addEventListener("click", () => {
  if (currentDestination) toggleFavorite(currentDestination.id);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

renderDestinations();
