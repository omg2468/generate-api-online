// Require thư viện `json-server`
const jsonServer = require('json-server')

// Tạo một đối tượng server
const server = jsonServer.create()

// Tạo một router cho server, với file `db.json` làm nguồn dữ liệu
const router = jsonServer.router('db.json')

// Cài đặt các middleware mặc định cho server
const middlewares = jsonServer.defaults()

// Sử dụng các middleware mặc định
server.use(middlewares)

// Sử dụng thư mục `public` làm thư mục tĩnh
server.use(express.static(path.join(__dirname, 'public')))

// Thêm một middleware để tái định tuyến (rewriter middleware)
// Tái định tuyến các yêu cầu `GET /api/*` thành `/api/$1`
// Ví dụ: `GET /api/posts` sẽ được đổi thành `GET /posts`
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

// Sử dụng router để xử lý các yêu cầu HTTP
server.use(router)

// Lắng nghe các kết nối đến server và ghi lại khi server đã khởi động
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})

// Xuất đối tượng server để sử dụng trong các tập tin khác (ví dụ như trong `vercel.json`)
module.exports = server
