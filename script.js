// Khởi tạo trạng thái
let banCo = Array(9).fill(null);
let luotHienTai = 'X';
let gameKetThuc = false;
const cacToHopThang = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const phanTuBanCo = document.getElementById('banCo');
const phanTuTrangThai = document.getElementById('trangThai');
const nutDatLai = document.getElementById('datLai');

// Tạo lưới 9 ô
function taoBanCo() {
    phanTuBanCo.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const o = document.createElement('div');
        o.classList.add('o');
        o.dataset.index = i;
        o.addEventListener('click', () => xuLyNguoiChoi(i));
        phanTuBanCo.appendChild(o);
    }
}

// Cập nhật giao diện từ mảng banCo
function capNhatGiaoDien() {
    const cacO = document.querySelectorAll('.o');
    cacO.forEach((o, idx) => {
        o.textContent = banCo[idx] || '';
        o.className = 'o'; // reset class
        if (banCo[idx] === 'X') o.classList.add('khac_x');
        else if (banCo[idx] === 'O') o.classList.add('khac_o');
    });
    phanTuTrangThai.textContent = gameKetThuc ? 'Kết thúc' : `Lượt: ${luotHienTai}`;
}

// Kiểm tra người thắng, trả về { thang: true/false, cacO: [mảng chỉ số] }
function kiemTraThang() {
    for (let toHop of cacToHopThang) {
        const [a, b, c] = toHop;
        if (banCo[a] && banCo[a] === banCo[b] && banCo[a] === banCo[c]) {
            return { thang: true, cacO: toHop };
        }
    }
    if (banCo.every(o => o !== null)) return { thang: true, cacO: [] }; // hòa
    return { thang: false, cacO: [] };
}

// Đánh dấu ô chiến thắng bằng hiệu ứng
function danhDauChienThang(cacOThang) {
    const cacO = document.querySelectorAll('.o');
    cacOThang.forEach(idx => {
        cacO[idx].classList.add('chien_thang');
    });
}

// Xử lý bước đi của người chơi
function xuLyNguoiChoi(index) {
    if (gameKetThuc) return;
    if (banCo[index] !== null) return;

    // Gán giá trị
    banCo[index] = luotHienTai;
    capNhatGiaoDien();

    // Kiểm tra kết quả
    const ketQua = kiemTraThang();
    if (ketQua.thang) {
        gameKetThuc = true;
        if (ketQua.cacO.length > 0) {
            danhDauChienThang(ketQua.cacO);
            phanTuTrangThai.textContent = `🏆 ${luotHienTai} thắng!`;
        } else {
            phanTuTrangThai.textContent = '🤝 Hòa nhau!';
        }
        return;
    }

    // Đổi lượt
    luotHienTai = (luotHienTai === 'X') ? 'O' : 'X';
    phanTuTrangThai.textContent = `Lượt: ${luotHienTai}`;
}

// Reset toàn bộ game
function datLaiGame() {
    banCo = Array(9).fill(null);
    luotHienTai = 'X';
    gameKetThuc = false;
    capNhatGiaoDien();
    phanTuTrangThai.textContent = 'Lượt: X';
}

// Gắn sự kiện reset
nutDatLai.addEventListener('click', datLaiGame);

// Khởi chạy
taoBanCo();
capNhatGiaoDien();
