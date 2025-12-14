# Todo App Fullstack – Next.js 14 + MongoDB Atlas + Vercel CI/CD

**Link website đang chạy thật:**  
https://todo-app-nextjs-mongodb.vercel.app

**GitHub Repository:**  
https://github.com/VoAnhThien/todo-app-nextjs-mongodb

**Deploy Platform:** Vercel (tự động deploy mỗi khi push lên main)

## Đáp ứng đầy đủ yêu cầu bài tập
| Yêu cầu đề bài                                    | Đã hoàn thành? | Chứng minh |
|--------------------------------------------------|----------------|----------|
| Tạo repo local + push lên GitHub                 | Yes            | Repo hiện tại |
| Phân nhánh (branching)                           | Yes            | Branch `feature/add-delete-todo` |
| Merge các nhánh về main                          | Yes            | Pull Request đã merge |
| Giải quyết xung đột (merge conflict)            | Yes            | Commit "resolve: merge conflict in README" |
| Push code lên GitHub                             | Yes            | Lịch sử commit rõ ràng |
| Clone từ GitHub về local                         | Yes            | Đã clone để làm việc |
| Deploy bằng CI/CD (GitHub → auto deploy)         | Yes            | Vercel tự động deploy mỗi khi push main |
| Dự án có Frontend + Backend + Database thật     | Yes            | Next.js App Router API + MongoDB Atlas |
| Responsive (mobile + desktop)                    | Yes            | Tailwind CSS |

## Tính năng hiện tại
- Thêm todo mới
- Dữ liệu lưu vĩnh viễn trên MongoDB Atlas (cloud database miễn phí)
- Giao diện đẹp, responsive trên điện thoại và máy tính
- Tự động deploy khi có thay đổi trên nhánh main (CI/CD)

## Công nghệ sử dụng
- **Frontend + Backend**: Next.js 14 (App Router)
- **Database**: MongoDB Atlas (cloud)
- **Styling**: Tailwind CSS
- **Deploy**: Vercel (miễn phí, CI/CD tự động)
- **Version Control**: Git + GitHub

## Cách chạy local
```bash
# 1. Clone repo
git clone https://github.com/VoAnhThien/todo-app-nextjs-mongodb.git
cd todo-app-nextjs-mongodb

# 2. Cài dependencies
npm install

# 3. Tạo file .env.local
cp .env.example .env.local

# 4. Dán chuỗi kết nối MongoDB Atlas vào .env.local
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority

# 5. Chạy dự án
npm run dev