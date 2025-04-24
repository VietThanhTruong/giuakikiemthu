const axios = require('axios');
const BASE_URL = 'https://api.dak.edu.vn/api_rau/vegetables.php';

/**
 * Lấy danh sách rau củ phân trang
 * @param {number} page - Trang cần lấy
 * @param {number} limit - Số lượng mỗi trang (mặc định 5)
 */
async function getVegetables(page = 1, limit = 5) {
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
    console.log('Danh sách rau củ:');
    console.log('----------------');
    console.log(`Trang ${response.data.page}/${response.data.pages}`);
    console.log('Tổng số mục:', response.data.total);
    console.table(response.data.data);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách rau củ:', error.response?.data || error.message);
  }
}

/**
 * Thêm rau củ mới
 * @param {object} vegetableData - Dữ liệu rau củ mới
 */
async function addVegetable(vegetableData) {
  try {
    // Kiểm tra dữ liệu đầu vào
    if (!vegetableData.name || !vegetableData.price) {
      throw new Error('Tên và giá là bắt buộc');
    }

    const response = await axios.post(BASE_URL, vegetableData);
    console.log('Thêm rau củ thành công:');
    console.log('-----------------------');
    console.log(response.data.message);
    console.log('Dữ liệu đã thêm:', response.data.data);
  } catch (error) {
    console.error('Lỗi khi thêm rau củ:', error.response?.data || error.message);
  }
}

/**
 * Cập nhật thông tin rau củ
 * @param {number} id - ID của rau củ cần cập nhật
 * @param {object} updateData - Dữ liệu cập nhật (price và description)
 */
async function updateVegetable(id, updateData) {
  try {
    // Kiểm tra dữ liệu đầu vào
    if (!id) throw new Error('ID là bắt buộc');
    if (!updateData.price && !updateData.description) {
      throw new Error('Cần ít nhất một trường (price hoặc description) để cập nhật');
    }

    const response = await axios.put(`${BASE_URL}?id=${id}`, updateData);
    console.log('Cập nhật rau củ thành công:');
    console.log('--------------------------');
    console.log(response.data.message);
    console.log('Các trường đã cập nhật:', response.data.updated_fields);
  } catch (error) {
    console.error('Lỗi khi cập nhật rau củ:', error.response?.data || error.message);
  }
}

/**
 * Xóa rau củ
 * @param {number} id - ID của rau củ cần xóa
 */
async function deleteVegetable(id) {
  try {
    // Kiểm tra dữ liệu đầu vào
    if (!id) throw new Error('ID là bắt buộc');

    const response = await axios.delete(`${BASE_URL}?id=${id}`);
    console.log('Xóa rau củ thành công:');
    console.log('---------------------');
    console.log(response.data.message);
  } catch (error) {
    console.error('Lỗi khi xóa rau củ:', error.response?.data || error.message);
  }
}

// Ví dụ sử dụng các hàm
(async () => {
    // 1. Lấy danh sách rau củ trang 1
  await getVegetables(1);

  // 2. Thêm rau củ mới
  const newVegetable = {
    name: "Rau muống",
    price: 15000,
    group: "Lá",
    description: "Rau muống tươi ngon"
  };
  await addVegetable(newVegetable);

  // 3. Cập nhật rau củ (giả sử ID mới tạo là 51)
  await updateVegetable(51, {
    price: 18000,
    description: "Rau muống tươi ngon, giàu dinh dưỡng"
  });

  // 4. Xóa rau củ (giả sử ID là 51)
  await deleteVegetable(51);
})();