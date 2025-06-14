import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage";

SQLite.enablePromise(true);

let db: SQLiteDatabase | null = null;

const getDB = async (): Promise<SQLiteDatabase> => {
    if(db) return db;
    db = await SQLite.openDatabase({ name: 'mydb.db', location: 'default' });
    return db;
};

export type Category = {
    id: number;
    name: string;
}

export type Product = {
    id: number;
    name: string;
    price: number;
    img: string;
    categoryId: number;
    categoryName?: string;
}

export type User = {
    id: number;
    name: string;
    password: string;
    email: string;
    role: string;
    avatar: string;
}

const initialCategories: Category[] = [
  {id: 1, name: 'Kawasaki'},
  {id: 2, name: 'Honda'},
  {id: 3, name: 'Yamaha'},
  {id: 4, name: 'BMW'},
];

const initialProducts: Product[] = [
    
];

const initialUser: User[] = [
    {id: 1, name: 'Admin', password: 'admin123', email: 'admin123@gmail.com',role: 'admin', avatar: ''},
];

export const initDatabase = async (onSuccess?: () => void): Promise<void> => {
    try{
        const database = await getDB();
        database.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT)');
            initialCategories.forEach((category) => {
                tx.executeSql('INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)', [category.id, category.name]);
            });

            tx.executeSql(`CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                price REAL,
                img TEXT,
                categoryId INTEGER,
                FOREIGN KEY (categoryId) REFERENCES categories(id)
            )`);
            initialProducts.forEach((product) => {
                tx.executeSql('INSERT OR IGNORE INTO products (id, name, price, img, categoryId) VALUES (?, ?, ?, ?, ?)',
                    [product.id, product.name, product.price, product.img, product.categoryId]
                );
            });

            tx.executeSql(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT UNIQUE,
                password TEXT,
                role TEXT,
                avatar TEXT
            )`);
            initialUser.forEach((user) => {
                tx.executeSql('INSERT OR IGNORE INTO users (id, name, password, email, role) VALUES (?, ?, ?, ?, ?)',
                    [user.id, user.name, user.password, user.email, user.role]
                );
            });
        },
        (error) => console.error('❌ Lỗi giao dịch:', error),
        () => { 
            console.log('✅ Cơ sở dữ liệu đã được khởi tạo');
            if(onSuccess) onSuccess();
        });
    } catch (error) {
        console.error('❌ lỗi bên ngoài initDatabase:', error);
    }
};

export const fetchCategories = async (): Promise<Category[]> => {
    try{
        const database = await getDB();
        const results = await database.executeSql('SELECT * FROM categories');
        const items: Category[] = [];
        const rows = results[0].rows;
        for(let i = 0; i < rows.length; i++){
            items.push(rows.item(i));
        }
        return items;
    } catch (error) {
        console.error('❌ Lỗi lấy dữ liệu bảng categories:', error);
        return [];
    }
};

export const fetchProducts = async (): Promise<Product[]> => {
    try{
        const database = await getDB();
        const results = await database.executeSql(`
            SELECT p.*, c.name as categoryName
            FROM products p
            JOIN categories c ON p.categoryId = c.id   
        `);
        const items: Product[] = [];
        const rows = results[0].rows;
        for(let i = 0; i < rows.length; i++){
            items.push(rows.item(i));
        }
        return items;
    } catch (error) {
        console.error('❌ Lỗi lấy dữ liệu bảng products', error);
        return [];
    }
}

export const  fetchUsers = async (): Promise<User[]> => {
    try {
        const database = await getDB();
        const results = await database.executeSql('SELECT * FROM users');
        const items: User[] = [];
        const rows = results[0].rows;
        for(let i = 0; i < rows.length; i++){
            items.push(rows.item(i));
        }
        return items;
    } catch (error) {
        console.error('❌ Lỗi lấy dữ liệu bảng users', error);
        return [];
    }
}

export const addProduct = async (product: Omit<Product, 'id'> ) => {
    try {
        const database = await getDB();
        await database.executeSql(
            'INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)',
            [product.name, product.price, product.img, product.categoryId]
        );
        console.log('✅ Sản phẩm đã được thêm');
        return true;
    } catch (error) {
        console.error('❌ Lỗi thêm sản phẩm:', error);
        return false;
    }
}

export const updateProduct = async (product: Product) => {
    try {
        const database = await getDB();
        await database.executeSql(
            'UPDATE products SET name = ?, price = ?, img = ?, categoryId = ? WHERE id = ?',
            [product.name, product.price, product.img , product.categoryId, product.id]
        )
        console.log('✅ Sửa sản phẩm thành công!');
        return true;
    } catch (error) {
        console.error('❌ Lỗi sửa sản phẩm:', error);
        return false;
    }
}

export const deleteProduct = async (id: number) => {
    try {
        const database = await getDB();
        await database.executeSql('DELETE FROM products WHERE id = ?', [id]);
        console.log('✅ Xóa sản phẩm thành công!');
    } catch (error) {   
        console.log('❌ Lỗi xóa sản phẩm:', error);
    }
}

export const productDetail = async (id: number): Promise<Product | null> => {
    try {
        const database = await getDB();
        const results = await database.executeSql(`
            SELECT p.*, c.name as categoryName
            FROM products p
            JOIN categories c ON p.categoryId = c.id
            WHERE p.id = ?
        `, [id]);

        const rows = results[0].rows;
        if (rows.length > 0) {
            return rows.item(0);
        } else {
            return null;
        }
    } catch (error) {
        console.error('❌ Lỗi khi lấy thông tin chi tiết sản phẩm!', error);
        return null;
    }
};

export const fetchRelatedProducts = async (categoryId: number, excludeProductId: number): Promise<Product[]> => {
    try {
        const database = await getDB();
        const results = await database.executeSql(`
            SELECT p.*, c.name as categoryName
            FROM products p
            JOIN categories c ON p.categoryId = c.id
            WHERE p.categoryId = ? AND p.id != ?
            LIMIT 4
        `, [categoryId, excludeProductId]);
        
        const items: Product[] = [];
        const rows = results[0].rows;
        for(let i = 0; i < rows.length; i++) {
            items.push(rows.item(i));
        }
        return items;
    } catch (error) {
        console.error('❌ Lỗi lấy sản phẩm cùng loại:', error);
        return [];
    }
}


export const addCategory = async (category: Omit<Category, 'id'> ) => {
    try {
        const database = await getDB();
        await database.executeSql(
            'INSERT INTO categories (name) VALUES (?)',
            [category.name]
        );
        console.log('✅ Loại sản phẩm đã được thêm');
        return true;
    } catch (error) {
        console.error('❌ Lỗi thêm loại sản phẩm:', error);
        return false;
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const database = await getDB();
        await database.executeSql('DELETE FROM categories WHERE id = ?', [id]);
        console.log('✅ Xóa loại sản phẩm thành công!');
        return true;
    } catch (error) {   
        console.log('❌ Lỗi xóa loại sản phẩm:', error);
        return false;
    }
}

export const updateCategory = async (category: Category) => {
    try {
        const database = await getDB();
        await database.executeSql(
            'UPDATE categories SET name = ? WHERE id = ?',
            [category.name, category.id]
        )
        console.log('✅ Sửa loại sản phẩm thành công!');
        return true;
    } catch (error) {
        console.error('❌ Lỗi sửa loại sản phẩm:', error);
        return false;
    }
}

export const updateUser = async (user: User) => {
    try {
        const database = await getDB();
        await database.executeSql(
            'UPDATE users SET name = ?, email = ?, password = ?, role = ?, avatar = ? WHERE id = ?',
            [user.name, user.email, user.password, user.role, user.avatar, user.id]
        );
        console.log('✅ Cập nhật người dùng thành công!');
        return true;
    } catch (error) {
        console.error('❌ Lỗi cập nhật người dùng:', error);
        return false;
    }
}

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        const database = await getDB();
        await database.executeSql('DELETE FROM users WHERE id = ?', [id]);
        console.log('✅ Xóa người dùng thành công!');
        return true;
    } catch (error) {   
        console.log('❌ Lỗi xóa người dùng:', error);
        return false;
    }
}

export const registerUser = async (name: string, email: string, password: string): Promise<boolean> => {
    try{
        const database = await getDB();
        await database.executeSql(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, 'user']
        );
        return true;
    } catch (error: any) {
        console.error('❌ Lỗi đăng ký:', error);
        return false;
    }
}

export const loginUser = async (email: string, password: string): Promise<{ id: number; name: string; role: string } | null> => {
    try{
        const database = await getDB();
        const results = await database.executeSql(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password]
        );
        const rows = results[0].rows;
        if(rows.length > 0) {
            const user = rows.item(0);
            const userData = {
                id: user.id,
                name: user.name,
                role: user.role,
            };
            await AsyncStorage.setItem('loggedInUser', JSON.stringify(userData));
            return userData;
        } else {
            return null;
        }
    } catch (error) {
        console.error('❌ Lỗi đăng nhập:', error);
        return null;
    }
}

export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('loggedInUser');
  } catch (error) {
    console.error('❌ Lỗi khi đăng xuất:', error);
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const database = await getDB();
        
        const keywords = query.trim().split(/\s+/).filter(k => k.length > 0);
        
        if (keywords.length === 0) {
            return [];
        }

        const whereClauses = keywords.map(() => 
            `(p.name LIKE ? OR c.name LIKE ? OR 
             REPLACE(p.name, ' ', '') LIKE ? OR 
             REPLACE(c.name, ' ', '') LIKE ?)`
        ).join(' AND ');

        const params: any[] = [];
        keywords.forEach(keyword => {
            const likeParam = `%${keyword}%`;
            params.push(likeParam, likeParam, `%${keyword.replace(/\s+/g, '')}%`, `%${keyword.replace(/\s+/g, '')}%`);
        });

        const results = await database.executeSql(`
            SELECT p.*, c.name as categoryName
            FROM products p
            JOIN categories c ON p.categoryId = c.id
            WHERE ${whereClauses}
            ORDER BY p.name
        `, params);
        
        const items: Product[] = [];
        const rows = results[0].rows;
        for(let i = 0; i < rows.length; i++) {
            items.push(rows.item(i));
        }
        return items;
    } catch (error) {
        console.error('❌ Lỗi tìm kiếm sản phẩm:', error);
        return [];
    }
}

export const filterProductsByPrice = async (minPrice: number, maxPrice: number): Promise<Product[]> => {
    try {
        const database = await getDB();
        const results = await database.executeSql(`
            SELECT p.*, c.name as categoryName
            FROM products p
            JOIN categories c ON p.categoryId = c.id
            WHERE p.price BETWEEN ? AND ?
            ORDER BY p.price
        `, [minPrice, maxPrice]);
        
        const items: Product[] = [];
        const rows = results[0].rows;
        for(let i = 0; i < rows.length; i++) {
            items.push(rows.item(i));
        }
        return items;
    } catch (error) {
        console.error('❌ Lỗi lọc sản phẩm theo giá:', error);
        return [];
    }
}

export const filterProductsByCategory = async (categoryId: number): Promise<Product[]> => {
    try {
        const database = await getDB();
        const results = await database.executeSql(`
            SELECT p.*, c.name as categoryName
            FROM products p
            JOIN categories c ON p.categoryId = c.id
            WHERE p.categoryId = ?
            ORDER BY p.name
        `, [categoryId]);
        
        const items: Product[] = [];
        const rows = results[0].rows;
        for(let i = 0; i < rows.length; i++) {
            items.push(rows.item(i));
        }
        return items;
    } catch (error) {
        console.error('❌ Lỗi lọc sản phẩm theo danh mục:', error);
        return [];
    }
}

export default getDB;