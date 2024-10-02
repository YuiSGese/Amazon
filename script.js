// tao slide tu chuyen dong cho banner
let slideIndex = 0;
const slides = document.querySelectorAll('.slider-wrapper a');
const totalSlides = slides.length;

function showSlide(index) {
  const slider = document.querySelector('.slider-wrapper');
  const newTranslateValue = -index * 100 + '%';
  slider.style.transform = `translateX(${newTranslateValue})`;
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % totalSlides;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
  showSlide(slideIndex);
}

document.querySelector('.control_next').addEventListener('click', nextSlide);
document.querySelector('.control_prev').addEventListener('click', prevSlide);

setInterval(nextSlide, 4000); // Tự động chuyển slide sau mỗi 3 giây

// ALL button Dropdown
// Mở dropdown khi click vào nút
document.querySelector('.nav-search-gategory').addEventListener('click', function(event) {
  event.preventDefault();  // Ngăn chặn hành vi mặc định nếu là thẻ <a> hoặc <form>
  let dropdown = document.querySelector('.all-search-dropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
});

// Ẩn dropdown khi click ra ngoài
document.addEventListener('click', function(event) {
  let dropdown = document.querySelector('.all-search-dropdown');
  if (dropdown.style.display === 'block' && !dropdown.contains(event.target) && !event.target.closest('.nav-search-gategory')) {
      dropdown.style.display = 'none';
      event.preventDefault();  // Ngăn chặn việc tải lại trang hoặc hành động không mong muốn
  }
});
// SEARCH HISTORY DROPDOWN
// Get the necessary elements
const searchInput = document.querySelector('.nav-search-input');
const searchDropdown = document.querySelector('.search-history-dropdown');
const overlay = document.querySelector('.overlay');
const navSearch = document.querySelector('.nav-search');
const languageDropdown = document.querySelector('.nav-language-container'); // Thẻ language-dropdown
const signinContainer = document.querySelector('.signin-container'); // Thẻ signin-container

// Function to show dropdown and overlay
function showDropdown() {
  navSearch.classList.add('show-dropdown');
  overlay.style.display = 'block'; // Hiển thị lớp phủ mờ
}

// Function to hide dropdown and overlay
function hideDropdown() {
  navSearch.classList.remove('show-dropdown');
  overlay.style.display = 'none'; // Ẩn lớp phủ mờ
}

// Show dropdown when input is clicked
searchInput.addEventListener('click', (e) => {
  e.stopPropagation(); // Ngăn sự kiện click lan tới các phần tử khác
  showDropdown();
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!navSearch.contains(e.target)) {
    hideDropdown(); // Ẩn dropdown khi click ra ngoài nav-search
  }
});

// Hide dropdown when mouse enters the language dropdown or signin container
languageDropdown.addEventListener('mouseenter', () => {
  hideDropdown(); // Ẩn dropdown khi chuột di chuyển vào language-dropdown
});

signinContainer.addEventListener('mouseenter', () => {
  hideDropdown(); // Ẩn dropdown khi chuột di chuyển vào signin-container
});

// Prevent closing when clicking inside the dropdown or input
navSearch.addEventListener('click', (e) => {
  e.stopPropagation(); // Ngăn sự kiện click ra ngoài lan tới document
});

// Handle delete history item
document.querySelectorAll('.delete-history').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent hiding dropdown when clicking delete
    const historyItem = e.target.parentElement;
    historyItem.remove(); // Remove the clicked history item
  });
});

// Hide dropdown when clicking on the overlay
overlay.addEventListener('click', hideDropdown);

// Hide dropdown when clicking on a search history item (li)
document.querySelectorAll('.search-history-dropdown li').forEach(item => {
  item.addEventListener('click', () => {
    hideDropdown(); // Ẩn dropdown và overlay khi click vào thẻ li
  });
});


// ---------------------------


document.querySelector('.nav-language-container').addEventListener('mouseover', function() {
  // Tự động chọn English - EN khi hover vào dropdown
  document.querySelector('input[value="en"]').checked = true;
});
// Chọn tất cả các input radio
const radioButtons = document.querySelectorAll('.language-options input');

// Lắng nghe sự kiện click trên mỗi input radio
radioButtons.forEach((radio) => {
    radio.addEventListener('click', function() {
        // Trì hoãn ẩn dropdown để chấm xanh kịp hiển thị
        setTimeout(function() {
            // Thêm class .hidden để ẩn dropdown và mũi tên
            document.querySelector('.language-dropdown').classList.add('hidden');
            document.querySelector('.dropdown-arrow').classList.add('hidden');
        }, 100); // Trì hoãn 100ms để đảm bảo chấm xanh hiển thị
    });
});
// Hiển thị lại dropdown khi hover vào button
document.querySelector('.nav-language-container').addEventListener('mouseover', function() {
  document.querySelector('.language-dropdown').classList.remove('hidden');
  document.querySelector('.dropdown-arrow').classList.remove('hidden');
});
// ------------------------------
// Lắng nghe sự kiện click trên các thẻ <a> trong dropdown
document.querySelectorAll('.signin-dropdown-content .column a').forEach(function(link) {
  link.addEventListener('click', function() {
      // Thêm class hidden để ẩn dropdown khi click vào thẻ <a>
      document.querySelector('.signin-dropdown').classList.add('hidden');
  });
});

// Hiển thị lại dropdown khi hover vào nav-container
document.querySelector('.signin-container').addEventListener('mouseover', function() {
  document.querySelector('.signin-dropdown').classList.remove('hidden');
});

// tạo button cho product slider
// Lấy các phần tử điều khiển và phần tử chứa sản phẩm
document.querySelectorAll('.slider-control').forEach(button => {
  button.addEventListener('click', function() {
      const slider = this.closest('.products-slider, .products-slider-with-price'); // Tìm slider hiện tại
      const products = slider.querySelector('.products');
      const productWidth = products.querySelector('img').offsetWidth; // Lấy chiều rộng của một sản phẩm
      const gap = 45; // Khoảng cách giữa các sản phẩm (dựa trên CSS)
      
      // Tính toán số sản phẩm hiển thị trong viewport
      const visibleProducts = Math.floor(slider.offsetWidth / (productWidth + gap));
      const totalMove = visibleProducts * (productWidth + gap); // Tổng khoảng cách di chuyển cho tất cả sản phẩm đang hiển thị
      
      const isPrev = this.classList.contains('prev'); // Kiểm tra nút prev hoặc next

      // Di chuyển sản phẩm hàng loạt
      products.scrollBy({
          left: isPrev ? -totalMove : totalMove,
          behavior: 'smooth'
      });
  });
});
// vô hiệu hóa khả năng lướt qua touchpad
document.querySelectorAll('.products').forEach(products => {
  products.addEventListener('wheel', function(e) {
      // Ngăn chặn hành vi mặc định của cuộn ngang
      if (e.deltaX !== 0) {
          e.preventDefault();
      }
  });
});

// -----------------------DỮ LIỆU TÌM KIẾM NAV SEARCH--------------------------
// Dữ liệu sản phẩm
const products = [
  { id: 1, name: 'xbox'},
  { id: 2, name: 'xbox controller'},
  { id: 3, name: 'xbox series x'},
  { id: 4, name: 'xbox headset'},
  { id: 5, name: 'xbox gift card'},
  { id: 6, name: 'playstation'},
  { id: 7, name: 'playstation 5'},
  { id: 8, name: 'playstation portal'},
  { id: 9, name: 'playstation 5 controller'},
  { id: 10, name: 'pc game'},
  { id: 15, name: 'headsets for school'},
  { id: 11, name: 'pc game headsets'},
  { id: 12, name: 'BENGOO G9000'},
  { id: 13, name: 'decor'},
  { id: 14, name: 'decorative books'},
  { id: 16, name: 'kitchen'},
  { id: 17, name: 'kitchen towels'},
  { id: 18, name: 'kitchen trash can'},
  { id: 19, name: 'toy box'},
  { id: 20, name: 'toy cars'},
  { id: 21, name: 'toy story'},
  { id: 22, name: 'toy storage'},
  { id: 23, name: 'clothing crack'},
  { id: 24, name: 'clothing hanger'},
  { id: 25, name: 't-shirts'},
  { id: 26, name: 't-shirts for women'},
  { id: 27, name: 't-shirts for men'},
  { id: 28, name: 't-shirts graphic'},
  { id: 29, name: 'queen bed frame'},
  { id: 30, name: 'queen sheet set'},
  { id: 31, name: 'quest protein bar'},
  { id: 32, name: 'water bottle'},
  { id: 33, name: 'wireless mouse'},
  { id: 34, name: 'walking pad'},
  { id: 35, name: 'whey protein powder'},
  { id: 36, name: 'electric toothbursh'},
  { id: 37, name: 'extension core'},
  { id: 38, name: 'ear plugs'},
  { id: 39, name: 'ring doorbell'},
  { id: 40, name: 'rice cooker'},
  { id: 41, name: 'toilet paper'},
  { id: 43, name: 'toothpaste'},
  { id: 44, name: 'tv stand'},
  { id: 45, name: 'toaster'},
  { id: 46, name: 'tablet'},
  { id: 47, name: 'yoga mat'},
  { id: 48, name: 'yeti water bottle'},
  { id: 49, name: 'usb c'},
  { id: 50, name: 'umbrella'},
  { id: 51, name: 'underwear women pack'},
  { id: 52, name: 'iphone 16 pro max'},
  { id: 53, name: 'iphone 16 pro case'},
  { id: 54, name: 'iphone 16 pro max screen protector'},
  { id: 55, name: 'iphone 16 pro case'},
  { id: 56, name: 'iphone 16 pro case'},
  { id: 57, name: 'iphone 16 pro case'},

];

// Lấy các phần tử từ DOM
// const searchInput = document.querySelector('.nav-search-input');
// const searchDropdown = document.querySelector('.search-history-dropdown');
// const overlay = document.querySelector('.overlay');
// const navSearch = document.querySelector('.nav-search');
const productSuggestions = document.createElement('ul'); // Tạo phần tử ul để chứa gợi ý sản phẩm
productSuggestions.classList.add('product-suggestions'); // Thêm class cho ul (nếu cần)
document.querySelector('.nav-search').appendChild(productSuggestions); // Thêm ul vào DOM

// Hàm hiển thị kết quả tìm kiếm
function displayResults(results) {
  // Xóa gợi ý sản phẩm cũ
  productSuggestions.innerHTML = '';

  if (results.length === 0) {
    productSuggestions.innerHTML = '<li>Không tìm thấy sản phẩm</li>';
    return;
  }

  // Thêm sản phẩm tìm được vào danh sách
  results.forEach(product => {
    const li = document.createElement('li');
    li.textContent = product.name; // Hiển thị chỉ tên sản phẩm

    // Thêm sự kiện click vào mỗi gợi ý
    li.addEventListener('click', function() {
      // Ẩn phần gợi ý sản phẩm và overlay khi click vào sản phẩm
      productSuggestions.style.display = 'none';
      overlay.style.display = 'none';
    });

    productSuggestions.appendChild(li);
  });
}

// Hàm ẩn/hiển thị gợi ý sản phẩm
function showProductSuggestions(query) {
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query)
  );

  displayResults(filteredProducts); // Hiển thị kết quả sản phẩm
  productSuggestions.style.display = filteredProducts.length ? 'block' : 'none'; // Hiển thị gợi ý nếu có kết quả
}

// Lắng nghe sự kiện nhập từ khóa vào input
searchInput.addEventListener('input', function() {
  const query = searchInput.value.toLowerCase().trim(); // Chuyển từ khóa sang chữ thường và xóa khoảng trắng

  // Nếu có từ khóa, hiển thị gợi ý sản phẩm và ẩn lịch sử tìm kiếm
  if (query) {
    searchDropdown.style.display = 'none'; // Ẩn lịch sử tìm kiếm
    showProductSuggestions(query); // Hiển thị gợi ý sản phẩm
  } else {
    productSuggestions.style.display = 'none'; // Ẩn gợi ý sản phẩm nếu không có từ khóa
    searchDropdown.style.display = 'block'; // Hiển thị lại lịch sử tìm kiếm khi input rỗng
  }
});

// Ẩn gợi ý sản phẩm khi click ra ngoài nav-search
document.addEventListener('click', function(event) {
  if (!navSearch.contains(event.target)) {
    productSuggestions.style.display = 'none'; // Ẩn gợi ý sản phẩm
  }
});
// -----------------chỉnh border radius .search-button
// Lấy phần tử input và nút search
// const searchInput = document.querySelector('.nav-search-input');
const searchButton = document.querySelector('.search-button');

// Lắng nghe sự kiện khi người dùng click vào input (focus)
searchInput.addEventListener('focus', () => {
  searchButton.style.borderRadius = '0 4px 0 0'; // Thay đổi border-radius khi input được focus
});

// Lắng nghe sự kiện khi người dùng click ra ngoài input (blur)
searchInput.addEventListener('blur', () => {
  searchButton.style.borderRadius = '0 4px 4px 0'; // Khôi phục lại border-radius khi input mất focus
});