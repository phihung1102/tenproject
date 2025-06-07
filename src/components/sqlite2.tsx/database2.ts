import AsyncStorage from "@react-native-async-storage/async-storage";
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
    {id: 1, name: 'Admin', password: 'admin123', email: 'admin123@gmail.com'},
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
                role TEXT
            )`);
            initialUser.forEach((user) => {
                tx.executeSql('INSERT OR IGNORE INTO users (id, name, password, email, role) VALUES (?, ?, ?, ?, ?)',
                    [user.id, user.name, user.password, user.email, 'admin']
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

export const registerUser = async (name: string, email: string, password: string): Promise<boolean> => {
    try{
        const database = await getDB();
        const results = await database.executeSql(
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

export default getDB;