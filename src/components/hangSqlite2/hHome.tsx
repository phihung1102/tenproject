import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initDatabase } from './hDatabase2';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './hAppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchProducts, Product, fetchCategories, searchProducts, filterProductsByPrice, Category } from './hDatabase2';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTab' | 'ProductDetail'>;

const Home = () => {
    const [user, setUser] = useState<{id: number, name: string, role: string } | null>(null);
    const navigation = useNavigation<NavigationProp>();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showPriceFilter, setShowPriceFilter] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [activeTab, setActiveTab] = useState<'home' | 'category'>('home');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            await initDatabase();
            const userData = await AsyncStorage.getItem('loggedInUser');
            if (userData) {
                setUser(JSON.parse(userData));
            }
            fetchProducts().then(products => {
                setProducts(products);
                setFilteredProducts(products);
            });
            fetchCategories().then(setCategories);
        };
        loadUser();
    }, []);

    const handleSearchSubmit = () => {
        setSearchQuery(searchInput);
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setSearchQuery('');
    };

    useEffect(() => {
        if (searchQuery) {
            searchProducts(searchQuery).then(setFilteredProducts);
        } else {
            if (activeTab === 'category' && selectedCategory) {
                const filtered = products.filter(p => p.categoryId === selectedCategory);
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts(products);
            }
        }
    }, [searchQuery, products, activeTab, selectedCategory]);

    const applyPriceFilter = async () => {
        const filtered = await filterProductsByPrice(priceRange.min, priceRange.max);
        setFilteredProducts(filtered);
        setShowPriceFilter(false);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setPriceRange({ min: 0, max: 10000 });
        setFilteredProducts(products);
        setShowPriceFilter(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.imgBn} source={require('../../../assets/banner/bn4.jpg')}/>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchInput}
                    onChangeText={setSearchInput}
                    onSubmitEditing={handleSearchSubmit}
                    returnKeyType="search"
                />
                {searchInput ? (
                    <TouchableOpacity 
                        style={styles.clearButton}
                        onPress={handleClearSearch}
                    >
                        <Text style={styles.clearButtonText}>X</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                        style={styles.filterButton}
                        onPress={() => setShowPriceFilter(true)}
                    >
                        <Text style={styles.filterButtonText}>Lọc giá</Text>
                    </TouchableOpacity>
                )}
            </View>

            {searchQuery && (
                <View style={styles.searchResultsHeader}>
                    <Text style={styles.searchResultsText}>
                        Kết quả tìm kiếm cho: "{searchQuery}"
                    </Text>
                    <TouchableOpacity onPress={handleClearSearch}>
                        <Text style={styles.clearSearchText}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'home' && styles.activeTab]}
                    onPress={() => {
                        setActiveTab('home');
                        setSelectedCategory(null);
                    }}
                >
                    <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'category' && styles.activeTab]}
                    onPress={() => setActiveTab('category')}
                >
                    <Text style={[styles.tabText, activeTab === 'category' && styles.activeTabText]}>Danh mục</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'category' && (
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                    contentContainerStyle={styles.categoryContainer}
                >
                    <TouchableOpacity
                        style={[styles.categoryButton, !selectedCategory && styles.selectedCategoryButton]}
                        onPress={() => setSelectedCategory(null)}
                    >
                        <Text style={[styles.categoryButtonText, !selectedCategory && styles.selectedCategoryButtonText]}>
                            Tất cả
                        </Text>
                    </TouchableOpacity>
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.id && styles.selectedCategoryButton
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <Text style={[
                                styles.categoryButtonText,
                                selectedCategory === category.id && styles.selectedCategoryButtonText
                            ]}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            <Modal
                visible={showPriceFilter}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowPriceFilter(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Lọc theo giá</Text>
                        
                        <Text style={styles.filterLabel}>Khoảng giá:</Text>
                        <View style={styles.priceRangeContainer}>
                            <TextInput
                                style={styles.priceInput}
                                placeholder="Từ"
                                keyboardType="numeric"
                                value={priceRange.min.toString()}
                                onChangeText={(text) => setPriceRange({
                                    ...priceRange,
                                    min: Number(text) || 0
                                })}
                            />
                            <Text style={styles.priceRangeSeparator}>-</Text>
                            <TextInput
                                style={styles.priceInput}
                                placeholder="Đến"
                                keyboardType="numeric"
                                value={priceRange.max.toString()}
                                onChangeText={(text) => setPriceRange({
                                    ...priceRange,
                                    max: Number(text) || 10000
                                })}
                            />
                        </View>
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.resetButton]}
                                onPress={resetFilters}
                            >
                                <Text style={[styles.modalButtonText, styles.resetButtonText]}>Đặt lại</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.applyButton]}
                                onPress={applyPriceFilter}
                            >
                                <Text style={[styles.modalButtonText, styles.applyButtonText]}>Áp dụng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            
            <View style={styles.ctnPro}>
                {filteredProducts.map((pro) => (
                    <TouchableOpacity 
                        key={pro.id} 
                        style={styles.proCard} 
                        onPress={() => navigation.navigate('ProductDetail', { id: pro.id })}
                    >
                        <Image style={styles.proImg} source={{ uri: pro.img }}/>
                        <View style={styles.info}>
                            <Text style={styles.name} numberOfLines={2}>{pro.name}</Text>
                            <Text style={styles.price}>{pro.price}VND</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff9f5', // Nền màu kem nhạt ấm áp
    },
    imgBn: {
        width: '100%',
        height: 180, // Banner cao hơn để hiển thị hình ảnh bánh
        resizeMode: 'cover',
        borderBottomLeftRadius: 0, // Bỏ bo góc cho gọn gàng
        borderBottomRightRadius: 0,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 12,
        marginHorizontal: 12,
        marginTop: 15,
        marginBottom: 5,
        alignItems: 'center',
        position: 'relative',
    },
    searchInput: {
        flex: 1,
        height: 42,
        borderColor: '#e0c4a0', // Viền màu nâu nhạt
        borderWidth: 1,
        borderRadius: 20, // Bo tròn nhiều hơn
        paddingHorizontal: 15,
        backgroundColor: '#fffdfb', // Màu nền kem rất nhạt
        paddingRight: 40,
        fontSize: 15,
        fontFamily: 'sans-serif-light',
    },
    clearButton: {
        position: 'absolute',
        right: 75,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#d4a373', // Màu nâu ấm
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    filterButton: {
        marginLeft: 10,
        paddingHorizontal: 16,
        backgroundColor: '#d4a373', // Màu nâu ấm
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
        elevation: 2,
    },
    filterButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    searchResultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#f8f1e9', // Màu kem nhạt
        paddingVertical: 10,
        borderRadius: 8,
        marginHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0c4a0',
    },
    searchResultsText: {
        fontSize: 15,
        color: '#6b4f3a', // Màu nâu đậm
        fontStyle: 'italic',
    },
    clearSearchText: {
        color: '#d4a373',
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 12,
        marginTop: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#f0e6dc',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: '#d4a373', // Màu nâu ấm
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#6b4f3a', // Màu nâu đậm
    },
    activeTabText: {
        color: 'white',
    },
    categoryScroll: {
        maxHeight: 50,
        marginHorizontal: 12,
        marginTop: 10,
    },
    categoryContainer: {
        paddingVertical: 8,
        paddingHorizontal: 5,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#f8f1e9', // Màu kem nhạt
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0c4a0',
    },
    selectedCategoryButton: {
        backgroundColor: '#d4a373', // Màu nâu ấm
        borderColor: '#d4a373',
    },
    categoryButtonText: {
        color: '#6b4f3a', // Màu nâu đậm
        fontSize: 14,
        fontWeight: '500',
    },
    selectedCategoryButtonText: {
        color: 'white',
    },
    ctnPro: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 12,
        justifyContent: 'space-between',
    },
    proCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f0e6dc',
    },
    proImg: {
        width: '100%',
        height: 160, // Cao hơn để hiển thị ảnh bánh đẹp
        resizeMode: 'cover', // Hiển thị ảnh phủ đầy khung
        backgroundColor: '#f8f1e9',
    },
    info: {
        padding: 12,
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: '#5a3e2a', // Màu nâu đậm
        marginBottom: 8,
        lineHeight: 20,
    },
    price: {
        fontSize: 17,
        fontWeight: '700',
        color: '#c17a3d', // Màu cam nâu ấm
        marginBottom: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fffdfb', // Màu kem rất nhạt
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: '#e0c4a0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#5a3e2a', // Màu nâu đậm
    },
    filterLabel: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 8,
        color: '#6b4f3a', // Màu nâu đậm
    },
    priceRangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    priceInput: {
        flex: 1,
        height: 45,
        borderColor: '#e0c4a0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f8f1e9', // Màu kem nhạt
        fontSize: 14,
        color: '#5a3e2a', // Màu nâu đậm
    },
    priceRangeSeparator: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#6c757d',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
        elevation: 2,
    },
    resetButton: {
        backgroundColor: '#f8f1e9', // Màu kem nhạt
        borderWidth: 1,
        borderColor: '#e0c4a0',
    },
    applyButton: {
        backgroundColor: '#d4a373', // Màu nâu ấm
    },
    modalButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    resetButtonText: {
        color: '#5a3e2a', // Màu nâu đậm
    },
    applyButtonText: {
        color: 'white',
    },
});

export default Home;