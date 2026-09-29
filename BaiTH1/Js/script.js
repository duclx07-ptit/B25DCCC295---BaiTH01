document.addEventListener('DOMContentLoaded', () => {

   
    //MENU HAMBURGER (TRÊN MOBILE) //
   
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    hamburgerBtn.addEventListener('click', () => {
        // Bật/tắt class 'active' để ẩn/hiện menu
        navLinks.classList.toggle('active');
    });

    // Tự động đóng menu khi chọn một mục liên kết
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });



    // TÍNH NĂNG 2: DARK / LIGHT MODE //

    const themeBtn = document.getElementById('themeBtn');
    
    // Kiểm tra cấu hình cũ người dùng đã chọn trước đó
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = 'Light Mode';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Cập nhật biểu tượng và lưu cấu hình
        if (document.body.classList.contains('dark-mode')) {
            themeBtn.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeBtn.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });


    // TÍNH NĂNG 3: ĐẾM KÝ TỰ REALTIME TRONG TEXTAREA //
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        charCount.textContent = length;
    });


   
    // TÍNH NĂNG 4: LỌC & TÌM KIẾM DỰ ÁN THEO TAG, KEYWORD //
   
    const searchInput = document.getElementById('searchInput');
    const tagBtns = document.querySelectorAll('.tag-btn');
    const projectCards = document.querySelectorAll('.project-card');

    let currentTag = 'all';

    // Hàm lọc dự án tổng hợp
    function filterProjects() {
        const keyword = searchInput.value.toLowerCase().trim();

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const titleSearch = card.getAttribute('data-title');

            const matchTag = (currentTag === 'all' || category === currentTag);
            const matchKeyword = titleSearch.includes(keyword);

            if (matchTag && matchKeyword) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Nhập ô tìm kiếm
    searchInput.addEventListener('input', filterProjects);

    // Bấm nút Tag
    tagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tagBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentTag = btn.getAttribute('data-tag');
            filterProjects();
        });
    });



    // TÍNH NĂNG 5: VALIDATE FORM LIÊN HỆ NÂNG CAO
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Chống reload trang

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = messageInput.value.trim();

        //Kiểm tra định dạng email chuẩn
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Kiểm tra điều kiện 1: Không được để rỗng
        if (!name || !email || !message) {
            alert('⚠️ Vui lòng điền đầy đủ các thông tin bắt buộc!');
            return;
        }

        // Kiểm tra điều kiện 2: Kiểm tra định dạng Email
        if (!emailRegex.test(email)) {
            alert('⚠️ Địa chỉ Email không hợp lệ!');
            return;
        }

        // Kiểm tra điều kiện 3: Lời nhắn tối thiểu 10 ký tự
        if (message.length < 10) {
            alert('⚠️ Lời nhắn phải chứa ít nhất 10 ký tự!');
            return;
        }

        // Nếu hợp lệ
        alert(`Cảm ơn ${name}! Lời nhắn của bạn đã được gửi thành công.`);
        contactForm.reset();
        charCount.textContent = '0';
    });


   
    // TÍNH NĂNG 6: SCROLL REVEAL (HIỆU ỨNG KHI CUỘN TRANG)
    const revealElements = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100; // Khoảng cách bắt đầu kích hoạt

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    // Gọi hàm khi cuộn trang và khi vừa tải trang xong
    window.addEventListener('scroll', checkReveal);
    checkReveal();


   
    // TÍNH NĂNG 7: TỰ ĐỘNG HIỂN THỊ NĂM HIỆN TẠI Ở FOOTER
    document.getElementById('currentYear').textContent = new Date().getFullYear();

});