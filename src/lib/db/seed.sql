-- ============================================================
-- 初始数据 - V3.0 数字商品平台
-- 运行: wrangler d1 execute product-site-db --file=seed.sql
-- ============================================================

-- 插入产品（delivery_type 决定默认交付方式）
INSERT OR IGNORE INTO products (id, name, description, price, delivery_type, tag) VALUES
('product-01', '产品名称1', '这里是产品描述，说清楚是什么、有什么效果', 9900, 'baidu_pan', '热门'),
('product-02', '产品名称2', '这里是产品描述，说清楚是什么、有什么效果', 19900, 'baidu_pan', NULL),
('product-03', '产品名称3', '这里是产品描述，说清楚是什么、有什么效果', 4900, 'plain_text', '新品'),
('product-04', '产品名称4', '这里是产品描述，说清楚是什么、有什么效果', 14900, 'url', NULL),
('product-05', '产品名称5', '这里是产品描述，说清楚是什么、有什么效果', 7900, 'baidu_pan', NULL),
('product-06', '产品名称6', '这里是产品描述，说清楚是什么、有什么效果', 29900, 'baidu_pan', NULL),
('product-07', '产品名称7', '这里是产品描述，说清楚是什么、有什么效果', 5900, 'plain_text', NULL),
('product-08', '产品名称8', '这里是产品描述，说清楚是什么、有什么效果', 12900, 'baidu_pan', NULL);

-- 插入资产（delivery_content 是 JSON，按类型不同结构不同）
-- 百度网盘类型：{"url": "...", "extraction_code": "..."}
-- 纯文本类型：{"text": "..."}
-- 链接类型：{"url": "..."} 或 {"links": [{"name": "...", "url": "..."}]}

INSERT OR IGNORE INTO assets (id, product_id, name, version, delivery_type, delivery_content) VALUES
('asset-01', 'product-01', '主文件', 'baidu_pan', '{"url": "https://pan.baidu.com/s/你的链接1", "extraction_code": "abcd"}'),
('asset-02', 'product-02', '主文件', 'baidu_pan', '{"url": "https://pan.baidu.com/s/你的链接2", "extraction_code": "efgh"}'),
('asset-03', 'product-03', '提示词包', 'plain_text', '{"text": "这里是提示词内容..."}'),
('asset-04', 'product-04', '课程链接', 'url', '{"url": "https://your-course-platform.com/course001"}'),
('asset-05', 'product-05', '主文件', 'baidu_pan', '{"url": "https://pan.baidu.com/s/你的链接5", "extraction_code": "ijkl"}'),
('asset-06', 'product-06', '主文件', 'baidu_pan', '{"url": "https://pan.baidu.com/s/你的链接6", "extraction_code": "mnop"}'),
('asset-07', 'product-07', '配置文件', 'plain_text', '{"text": "这里是配置内容..."}'),
('asset-08', 'product-08', '主文件', 'baidu_pan', '{"url": "https://pan.baidu.com/s/你的链接8", "extraction_code": "qrst"}');
