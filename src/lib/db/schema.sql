-- ============================================================
-- 数字商品平台 V3.0 Schema
-- 设计思路：Product → Asset → Order → Delivery
-- 支持多种交付方式，后续扩展只需新增 Delivery 类型
-- ============================================================

-- 产品表（你卖的东西）
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,                    -- product-01
  name TEXT NOT NULL,                     -- 产品名称
  description TEXT,                       -- 产品描述
  price INTEGER NOT NULL,                 -- 价格（分）
  delivery_type TEXT NOT NULL,            -- 交付方式：baidu_pan / plain_text / url / api_key / github_repo / manual
  tag TEXT,                               -- 标签：热门/新品
  disabled INTEGER DEFAULT 0,             -- 是否下架
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 资产表（交付内容，一个产品可以关联多个资产）
-- 例如：一个课程产品 → 包含 PDF + 视频 + 配置文件
CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY,                    -- asset-01
  product_id TEXT NOT NULL,               -- 关联产品
  name TEXT NOT NULL,                     -- 资产名称，如"主文件"、"附赠资料"
  version TEXT NOT NULL DEFAULT 'v1',     -- 资产版本（后续更新资料时递增）
  delivery_type TEXT NOT NULL,            -- 交付方式（可覆盖产品的默认方式）
  delivery_content TEXT NOT NULL,         -- 交付内容（JSON 格式，按类型不同结构不同）
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 订单表（含商品快照：下单时的名称/价格/版本，避免产品更新后历史订单数据漂移）
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,                    -- 订单号：ORD-20260626-001
  product_id TEXT NOT NULL,               -- 关联产品
  product_name TEXT NOT NULL,             -- 下单时商品名称（快照）
  product_price INTEGER NOT NULL,         -- 下单时商品价格/分（快照）
  product_version TEXT NOT NULL DEFAULT 'v1', -- 下单时商品版本（快照）
  amount INTEGER NOT NULL,                -- 实付金额（分）
  status TEXT NOT NULL DEFAULT 'pending', -- pending / paid / delivered / completed / refund / closed / expired
  payjs_order_id TEXT,                    -- Payjs 返回的订单号
  customer_contact TEXT,                  -- 客户联系方式（邮箱/微信）
  paid_at TEXT,                           -- 付款时间
  delivered_at TEXT,                      -- 交付时间
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 交付记录表（每次交付的具体内容）
CREATE TABLE IF NOT EXISTS deliveries (
  id TEXT PRIMARY KEY,                    -- delivery-01
  order_id TEXT NOT NULL,                 -- 关联订单
  asset_id TEXT NOT NULL,                 -- 关联资产
  delivery_type TEXT NOT NULL,            -- 实际交付方式
  delivery_content TEXT NOT NULL,         -- 实际交付内容（JSON）
  status TEXT NOT NULL DEFAULT 'pending', -- pending / delivered / failed
  delivered_at TEXT,                      -- 交付时间
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payjs ON orders(payjs_order_id);
CREATE INDEX IF NOT EXISTS idx_assets_product ON assets(product_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_order ON deliveries(order_id);
