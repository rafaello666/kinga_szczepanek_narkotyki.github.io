var swiper = new Swiper('.mySwiper', {
  // Ilość slajdów widocznych naraz
  slidesPerView: 1,
  // Przestrzeń między slajdami (w pikselach)
  spaceBetween: 10,

  // Czy ma się zapętlać
  loop: true,

  // Nawigacja (strzałki)
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Paginacja (kropki)
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Autoplay (odkomentuj, jeśli chcesz automatyczne przesuwanie)
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
});
