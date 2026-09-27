# DỰ ÁN WEBSITE DU LỊCH VIỆT NAM (VIETNAM WONDER TRAVEL)

Trang web giới thiệu các điểm đến và tour du lịch đặc sắc của Việt Nam, được phát triển bằng chuẩn công nghệ **HTML5, CSS3 và Vanilla JavaScript thuần**, tối ưu để mở, chỉnh sửa trực tiếp trên **Notepad++** hoặc bất kỳ trình soạn thảo mã nguồn nào mà không yêu cầu cài đặt môi trường phức tạp.

---

## 🌟 TÍNH NĂNG NỔI BẬT

1. **Thông tin liên hệ & Hỗ trợ đầy đủ**:
   - **Số điện thoại Hotline**: `1900 6868` (Tổng đài CSKH) & `0988 123 456` (Đặt tour nhanh)
   - **Email**: `contact@vietnamtravel.vn` & `booking@vietnamtravel.vn`
   - **Mạng xã hội**: Tích hợp liên kết Facebook, Instagram, TikTok chính thức.
   - **Giờ hỗ trợ khách hàng**: Thứ 2 - Chủ Nhật: `08:00 - 22:00` (Đường dây nóng hỗ trợ khẩn cấp 24/7).
2. **Cấu trúc liên kết đa trang (Multi-page Navigation)**:
   - [Trang chủ](index.html) (`index.html`): Hero banner slider mượt mà, thanh tìm kiếm tour nhanh, điểm đến nổi bật, tour bán chạy, đánh giá khách hàng, form đăng ký.
   - [Điểm đến](diem-den.html) (`diem-den.html`): Danh mục danh lam thắng cảnh 3 miền Bắc - Trung - Nam (Vịnh Hạ Long, Sapa Fansipan, Ninh Bình Tràng An, Phố cổ Hội An, Đà Lạt ngàn hoa, Đảo ngọc Phú Quốc) với bộ lọc tương tác.
   - [Tour du lịch](tour.html) (`tour.html`): Bảng giá tour trọn gói 2026, lịch trình chi tiết và chính sách ưu đãi.
   - [Liên hệ & Đặt tour](lien-he.html) (`lien-he.html`): Biểu mẫu đặt tour trực quan có kiểm tra dữ liệu và thông báo Toast xác nhận.
3. **Credit Designer**:
   - Dòng chữ nhỏ theo yêu cầu ở cuối Footer trên tất cả các trang: **“Thiết kế bởi Minh Đỗ”** (font nhỏ, màu xám nhạt `#94a3b8`, căn lề chuẩn mực).
4. **Thiết kế Responsive & Thẩm mỹ cao**:
   - Hiển thị hoàn hảo trên PC, máy tính bảng (Tablet) và điện thoại di động (Mobile).
   - Menu drawer mobile trực quan, nút đóng mở mượt mà.
   - Tự động chuyển các thẻ (card) thành dạng 1 cột dọc trên màn hình nhỏ.
   - Sử dụng font chữ tiếng Việt sắc nét **Be Vietnam Pro** từ Google Fonts.
   - Hiệu ứng chuyển động nhẹ nhàng khi cuộn chuột (Scroll Reveal Fade-in-up), hiệu ứng rê chuột (Hover) phóng to ảnh và nổi khối thẻ.

---

## 🚀 HƯỚNG DẪN MỞ VÀ CHẠY PROJECT

### Cách 1: Mở trực tiếp bằng Trình duyệt web (Cách nhanh nhất)
Do toàn bộ dự án được xây dựng bằng **HTML/CSS/JS thuần**, bạn không cần cài đặt bất kỳ phần mềm nào:
1. Mở thư mục chứa mã nguồn: `c:\Users\Anh Tuyet\OneDrive\code`
2. Nhấp đúp chuột (Double click) vào tệp `index.html` (hoặc chuột phải chọn **Open with** -> **Google Chrome**, **Microsoft Edge**, **Cốc Cốc** hoặc trình duyệt ưa thích).
3. Bạn có thể tự do nhấn vào thanh menu để chuyển qua các trang: *Điểm đến*, *Tour*, *Liên hệ*.

---

### Cách 2: Mở và chỉnh sửa bằng Notepad++
1. Khởi động phần mềm **Notepad++**.
2. Chọn menu **File** -> **Open...** (hoặc phím tắt `Ctrl + O`).
3. Chọn các tệp:
   - `index.html`
   - `diem-den.html`
   - `tour.html`
   - `lien-he.html`
   - `style.css`
   - `main.js`
4. Mã nguồn đã được định dạng chuẩn UTF-8, có thụt lề rõ ràng, chú thích tiếng Việt chi tiết giúp bạn dễ dàng tùy biến nội dung theo ý muốn.

---

### Cách 3: Chạy bằng Local Server để có đường link Web (URL)

Nếu bạn muốn mở website dưới dạng một đường dẫn URL cục bộ như `http://localhost:3000` hoặc `http://127.0.0.1:8080`:

#### Lựa chọn A: Dùng Node.js (npx serve)
Mở cửa sổ Command Prompt hoặc PowerShell tại thư mục code và gõ:
```bash
npx -y serve .
```
Trình duyệt sẽ cung cấp link truy cập: `http://localhost:3000`

#### Lựa chọn B: Dùng Python (Sẵn có trên nhiều máy tính)
```bash
python -m http.server 8080
```
Sau đó mở trình duyệt và truy cập vào: `http://localhost:8080`

#### Lựa chọn C: Dùng Extension "Live Server" trên VS Code
Nhấp chuột phải vào `index.html` và chọn **"Open with Live Server"**.

---

## 📁 CẤU TRÚC THƯ MỤC
```text
code/
│
├── index.html         # Trang chủ chính
├── diem-den.html      # Trang danh mục điểm đến du lịch
├── tour.html          # Trang bảng giá và danh sách tour
├── lien-he.html       # Trang liên hệ & form đặt tour
├── style.css          # Toàn bộ CSS phong cách & Responsive PC/Tablet/Mobile
├── main.js            # JavaScript xử lý slider, menu mobile, modal & form
└── README.md          # Tài liệu hướng dẫn sử dụng tiếng Việt
```

---
*Thiết kế bởi Minh Đỗ - 2026*
