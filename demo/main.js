/**
 * AURA TOUR - JAVASCRIPT
 * Tương tác mượt mà, tối ưu responsive, mở trực tiếp mọi trình duyệt
 * Soạn thảo & chỉnh sửa dễ dàng trên Notepad++
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. MOBILE DRAWER MENU
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobileNav() {
    if (mobileNavDrawer && mobileOverlay) {
      mobileNavDrawer.classList.add('open');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (mobileNavDrawer && mobileOverlay) {
      mobileNavDrawer.classList.remove('open');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileNav);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  // Đóng drawer khi nhấn link
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // 2. STICKY HEADER EFFECTS
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  });

  // 3. HERO SLIDER CHUYỂN ẢNH TỰ ĐỘNG
  const heroSlides = document.querySelectorAll('.hero-slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    if (heroSlides.length === 0) return;
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % heroSlides.length;
    showSlide(next);
  }

  if (heroSlides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);

    sliderDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(idx);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // 4. BỘ LỌC ĐIỂM ĐẾN (FILTER TABS)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const destinationCards = document.querySelectorAll('.destination-card');

  if (filterBtns.length > 0 && destinationCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        destinationCards.forEach(card => {
          const region = card.getAttribute('data-region');
          if (filter === 'all' || region === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 5. HIỆU ỨNG SCROLL REVEAL (FADE IN UP)
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    }, appearOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));
  } else {
    // Fallback cho trình duyệt cũ
    fadeElements.forEach(el => el.classList.add('appear'));
  }

  // 6. MODAL XEM CHI TIẾT TOUR
  const detailModal = document.getElementById('tourDetailModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTourTitle = document.getElementById('modalTourTitle');
  const modalTourLocation = document.getElementById('modalTourLocation');
  const modalTourDuration = document.getElementById('modalTourDuration');
  const modalTourPrice = document.getElementById('modalTourPrice');
  const modalTourDesc = document.getElementById('modalTourDesc');
  const modalTourImg = document.getElementById('modalTourImg');

  const tourDataMap = {
    'halong': {
      title: 'Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao',
      location: 'Quảng Ninh',
      duration: '3 Ngày 2 Đêm',
      price: '3.490.000đ',
      img: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop',
      desc: 'Hành trình trải nghiệm kỳ quan thiên nhiên thế giới trên du thuyền đẳng cấp. Thưởng ngoạn vịnh Bái Tử Long, chèo thuyền kayak qua hang Luồn, ngắm hoàng hôn rực rỡ và thưởng thức tiệc hải sản tươi sống.'
    },
    'sapa': {
      title: 'Chinh Phục Đỉnh Fansipan & Mù Cang Chải',
      location: 'Lào Cai - Yên Bái',
      duration: '3 Ngày 2 Đêm',
      price: '3.290.000đ',
      img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop',
      desc: 'Chiêm ngưỡng ruộng bậc thang Mù Cang Chải kỳ vĩ vào mùa lúa chín, chạm tay vào Nóc nhà Đông Dương Fansipan huyền thoại, trải nghiệm văn hóa bản sắc của người H’Mông, Dao đỏ.'
    },
    'hoian': {
      title: 'Di Sản Miền Trung: Đà Nẵng - Hội An - Cù Lao Chàm',
      location: 'Đà Nẵng - Quảng Nam',
      duration: '4 Ngày 3 Đêm',
      price: '4.250.000đ',
      img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=800&auto=format&fit=crop',
      desc: 'Thả đèn hoa đăng lung linh trên dòng sông Hoài, dạo bước qua từng góc phố cổ rêu phong, chiêm ngưỡng Cầu Vàng Bà Nà Hills và lặn ngắm san hô biển ngọc Cù Lao Chàm.'
    },
    'phuquoc': {
      title: 'Thiên Đường Biển Đảo Phú Quốc & Khám Phá 4 Đảo',
      location: 'Kiên Giang',
      duration: '3 Ngày 2 Đêm',
      price: '4.690.000đ',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      desc: 'Tận hưởng làn nước trong xanh như pha lê tại Hòn Thơm, Hòn Móng Tay, thưởng thức hoàng hôn tuyệt mỹ tại Sunset Sanato và trải nghiệm ẩm thực chợ đêm Phú Quốc quyến rũ.'
    },
    'ninhbinh': {
      title: 'Tuyệt Tác Ninh Bình: Tràng An - Tam Cốc - Bái Đính',
      location: 'Ninh Bình',
      duration: '3 Ngày 2 Đêm',
      price: '3.150.000đ',
      img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop',
      desc: 'Ngồi thuyền nan lướt nhẹ qua những hang động kỳ bí, bao bọc bởi dãy núi đá vôi hùng vĩ của di sản thế giới kép Tràng An, check-in Hang Múa nhìn toàn cảnh non sông tuyệt bích.'
    },
    'dalat': {
      title: 'Đà Lạt Ngàn Hoa & Săn Mây Đỉnh Đồi Chè Cầu Đất',
      location: 'Lâm Đồng',
      duration: '3 Ngày 2 Đêm',
      price: '3.650.000đ',
      img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
      desc: 'Tận hưởng bầu không khí se lạnh mộng mơ, săn mây bồng bềnh lúc bình minh, check-in đồi chè Cầu Đất bát ngát, thác Datanla hoang sơ và thưởng thức cà phê giữa thung lũng hoa.'
    }
  };

  // Nút mở modal chi tiết
  const openDetailButtons = document.querySelectorAll('.btn-open-detail');
  openDetailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tourKey = btn.getAttribute('data-tour');
      const data = tourDataMap[tourKey];

      if (data && detailModal) {
        if (modalTourTitle) modalTourTitle.textContent = data.title;
        if (modalTourLocation) modalTourLocation.textContent = data.location;
        if (modalTourDuration) modalTourDuration.textContent = data.duration;
        if (modalTourPrice) modalTourPrice.textContent = data.price;
        if (modalTourDesc) modalTourDesc.textContent = data.desc;
        if (modalTourImg) modalTourImg.src = data.img;

        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && detailModal) {
    modalCloseBtn.addEventListener('click', () => {
      detailModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) {
        detailModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 7. TOAST NOTIFICATION VÀ XỬ LÝ FORM
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast) return;

    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Xử lý form đặt tour / liên hệ
  const contactForm = document.getElementById('bookingContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('[name="fullname"]')?.value.trim();
      const phone = contactForm.querySelector('[name="phone"]')?.value.trim();
      const tourSelect = contactForm.querySelector('[name="tour_selected"]')?.value;

      if (!name || !phone) {
        showToast('Vui lòng điền đầy đủ họ tên và số điện thoại liên hệ!', 'warning');
        return;
      }

      // Giả lập gửi thành công
      showToast(`Cảm ơn bạn ${name}! Aura Tour đã nhận yêu cầu và sẽ gọi hotline 0762799157 trong 10 phút.`, 'success');
      contactForm.reset();

      // Nếu có modal đang mở thì đóng
      if (detailModal && detailModal.classList.contains('active')) {
        detailModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Form tìm kiếm nhanh tại hero
  const quickSearchForm = document.getElementById('quickSearchForm');
  if (quickSearchForm) {
    quickSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const destination = document.getElementById('quickDest')?.value;
      showToast(`Đang tìm kiếm tour phù hợp tại "${destination}"... Vui lòng xem danh sách bên dưới!`, 'info');

      const toursSection = document.getElementById('tour-section');
      if (toursSection) {
        toursSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
