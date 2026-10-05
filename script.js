/* =========================================
   اطلاعات مقصدهای ایران
========================================= */

const destinations = [
    {
        id: 1,
        title: "تخت جمشید",
        city: "مرودشت",
        province: "فارس",
        type: "تاریخی",
        rating: "4.9",
        description:
            "یکی از باشکوه‌ترین آثار تاریخی ایران و یادگار تمدن هخامنشی.",
        image:
            "https://images.unsplash.com/photo-1592287104445-9e5a0b6f0d6f?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 2,
        title: "سی‌وسه پل",
        city: "اصفهان",
        province: "اصفهان",
        type: "تاریخی",
        rating: "4.8",
        description:
            "یکی از مشهورترین پل‌های تاریخی ایران در قلب شهر اصفهان.",
        image:
            "https://images.unsplash.com/photo-1578912996078-305d92249aa6?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 3,
        title: "ماسوله",
        city: "فومن",
        province: "گیلان",
        type: "طبیعت",
        rating: "4.9",
        description:
            "روستایی پلکانی و زیبا در میان کوه‌ها و جنگل‌های سرسبز گیلان.",
        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 4,
        title: "جزیره کیش",
        city: "کیش",
        province: "هرمزگان",
        type: "ساحلی",
        rating: "4.7",
        description:
            "جزیره‌ای زیبا با سواحل آرام، آب‌های نیلگون و تفریحات متنوع.",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 5,
        title: "کویر لوت",
        city: "شهداد",
        province: "کرمان",
        type: "کویر",
        rating: "4.9",
        description:
            "یکی از شگفت‌انگیزترین مناطق کویری ایران با چشم‌اندازهای بی‌نظیر.",
        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 6,
        title: "یزد",
        city: "یزد",
        province: "یزد",
        type: "تاریخی",
        rating: "4.8",
        description:
            "شهری تاریخی با معماری خشتی، بادگیرها و کوچه‌های قدیمی.",
        image:
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 7,
        title: "جنگل‌های مازندران",
        city: "مازندران",
        province: "مازندران",
        type: "طبیعت",
        rating: "4.8",
        description:
            "جنگل‌های سرسبز و چشم‌اندازهای زیبای شمال ایران.",
        image:
            "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 8,
        title: "شیراز",
        city: "شیراز",
        province: "فارس",
        type: "تاریخی",
        rating: "4.9",
        description:
            "شهر شعر و ادب، باغ‌های زیبا و بناهای تاریخی ارزشمند.",
        image:
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80"
    }
];


/* =========================================
   انتخاب عناصر صفحه
========================================= */

const grid =
    document.getElementById("destinationsGrid");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const provinceFilter =
    document.getElementById("provinceFilter");

const typeFilter =
    document.getElementById("typeFilter");

const resetBtn =
    document.getElementById("resetBtn");

const noResult =
    document.getElementById("noResult");

const modal =
    document.getElementById("destinationModal");

const modalClose =
    document.getElementById("modalClose");

const mobileMenu =
    document.getElementById("mobileMenu");

const menuBtn =
    document.getElementById("menuBtn");


/* =========================================
   ذخیره علاقه‌مندی‌ها
========================================= */

let favorites =
    JSON.parse(
        localStorage.getItem("iranGardFavorites")
    ) || [];


/* =========================================
   نمایش مقصدها
========================================= */

function renderDestinations(list) {

    grid.innerHTML = "";

    if (list.length === 0) {

        noResult.style.display = "block";

        return;
    }

    noResult.style.display = "none";


    list.forEach((destination, index) => {

        const isFavorite =
            favorites.includes(destination.id);


        const card =
            document.createElement("article");

        card.className = "destination-card";

        card.style.animationDelay =
            `${index * 0.05}s`;


        card.innerHTML = `

            <div class="card-image">

                <img
                    src="${destination.image}"
                    alt="${destination.title}"
                    loading="lazy"
                >

                <span class="card-type">
                    ${destination.type}
                </span>

                <button
                    class="favorite ${isFavorite ? "active" : ""}"
                    data-id="${destination.id}"
                    aria-label="افزودن به علاقه‌مندی"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>

            </div>


            <div class="card-content">

                <h3>
                    ${destination.title}
                </h3>

                <div class="location">
                    📍 ${destination.city}، ${destination.province}
                </div>

                <p class="description">
                    ${destination.description}
                </p>

                <div class="card-bottom">

                    <span class="rating">
                        ⭐ ${destination.rating}
                    </span>

                    <button
                        class="more-btn"
                        data-id="${destination.id}"
                    >
                        جزئیات
                    </button>

                </div>

            </div>
        `;


        grid.appendChild(card);

    });
}


/* =========================================
   فیلتر مقصدها
========================================= */

function filterDestinations() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const province =
        provinceFilter.value;


    const type =
        typeFilter.value;


    const filtered =
        destinations.filter(destination => {

            const searchableText = `
                ${destination.title}
                ${destination.city}
                ${destination.province}
                ${destination.type}
                ${destination.description}
            `.toLowerCase();


            const matchesSearch =
                searchableText.includes(search);


            const matchesProvince =
                province === "all" ||
                destination.province === province;


            const matchesType =
                type === "all" ||
                destination.type === type;


            return (
                matchesSearch &&
                matchesProvince &&
                matchesType
            );
        });


    renderDestinations(filtered);
}


/* =========================================
   جستجوی لحظه‌ای
========================================= */

searchInput.addEventListener(
    "input",
    filterDestinations
);


/* =========================================
   دکمه جستجو
========================================= */

searchBtn.addEventListener(
    "click",
    () => {

        filterDestinations();

        document
            .getElementById("destinations")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================================
   فیلتر استان
========================================= */

provinceFilter.addEventListener(
    "change",
    filterDestinations
);


/* =========================================
   فیلتر نوع جاذبه
========================================= */

typeFilter.addEventListener(
    "change",
    filterDestinations
);


/* =========================================
   پاک کردن فیلترها
========================================= */

resetBtn.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        provinceFilter.value = "all";

        typeFilter.value = "all";

        renderDestinations(destinations);

    }
);


/* =========================================
   جستجوهای محبوب
========================================= */

document
    .querySelectorAll("[data-search]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                searchInput.value =
                    button.dataset.search;

                filterDestinations();

                document
                    .getElementById("destinations")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================================
   دسته‌بندی‌ها
========================================= */

document
    .querySelectorAll(".category-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.dataset.category;


                typeFilter.value =
                    category;


                filterDestinations();


                document
                    .getElementById("destinations")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================================
   کلیک روی کارت‌ها
========================================= */

grid.addEventListener(
    "click",
    event => {

        /* علاقه‌مندی */

        const favoriteButton =
            event.target.closest(".favorite");


        if (favoriteButton) {

            const id =
                Number(
                    favoriteButton.dataset.id
                );


            if (favorites.includes(id)) {

                favorites =
                    favorites.filter(
                        favoriteId =>
                            favoriteId !== id
                    );

            } else {

                favorites.push(id);

            }


            localStorage.setItem(
                "iranGardFavorites",
                JSON.stringify(favorites)
            );


            filterDestinations();

            return;
        }


        /* جزئیات */

        const moreButton =
            event.target.closest(".more-btn");


        if (moreButton) {

            const id =
                Number(
                    moreButton.dataset.id
                );


            openModal(id);
        }

    }
);


/* =========================================
   باز کردن Modal
========================================= */

function openModal(id) {

    const destination =
        destinations.find(
            item => item.id === id
        );


    if (!destination) {
        return;
    }


    document.getElementById(
        "modalImage"
    ).src = destination.image;


    document.getElementById(
        "modalImage"
    ).alt = destination.title;


    document.getElementById(
        "modalTitle"
    ).textContent = destination.title;


    document.getElementById(
        "modalType"
    ).textContent = destination.type;


    document.getElementById(
        "modalLocation"
    ).textContent =
        `📍 ${destination.city}`;


    document.getElementById(
        "modalDescription"
    ).textContent =
        destination.description;


    document.getElementById(
        "modalProvince"
    ).textContent =
        destination.province;


    document.getElementById(
        "modalRating"
    ).textContent =
        destination.rating;


    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* =========================================
   بستن Modal
========================================= */

function closeModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";
}


modalClose.addEventListener(
    "click",
    closeModal
);


/* کلیک بیرون Modal */

modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {
            closeModal();
        }

    }
);


/* دکمه Escape */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


/* =========================================
   منوی موبایل
========================================= */

menuBtn.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle("show");

    }
);


/* بستن منوی موبایل هنگام انتخاب لینک */

document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove("show");

            }
        );

    });


/* =========================================
   اجرای اولیه سایت
========================================= */

renderDestinations(destinations);