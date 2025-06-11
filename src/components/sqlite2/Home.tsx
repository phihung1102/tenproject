import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initDatabase } from './database2';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchProducts, Product, fetchCategories, searchProducts, filterProductsByPrice, Category } from './database2';

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
            <Image style={styles.imgBn} source={require('../../../assets/banner/bn3.jpg')}/>

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
                            <Text style={styles.name} numberOfLines={2}>{pro.categoryName} {pro.name}</Text>
                            <Text style={styles.price}>{pro.price}$</Text>
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
        backgroundColor: '#f8f9fa',
    },
    imgBn: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 16,
        marginTop: 10,
        alignItems: 'center',
        position: 'relative',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        paddingRight: 40,
        fontSize: 14,
    },
    clearButton: {
        position: 'absolute',
        right: 70,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ccc',
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
        paddingHorizontal: 15,
        backgroundColor: '#4a6da7',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
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
        backgroundColor: '#f1f3f5',
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 16,
    },
    searchResultsText: {
        fontSize: 14,
        color: '#495057',
        fontStyle: 'italic',
    },
    clearSearchText: {
        color: '#4a6da7',
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: '#4a6da7',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
    },
    activeTabText: {
        color: 'white',
    },
    categoryScroll: {
        maxHeight: 50,
        marginHorizontal: 16,
        marginTop: 10,
    },
    categoryContainer: {
        paddingVertical: 8,
        paddingHorizontal: 5,
    },
    categoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCategoryButton: {
        backgroundColor: '#4a6da7',
    },
    categoryButtonText: {
        color: '#343a40',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedCategoryButtonText: {
        color: 'white',
    },
    ctnPro: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
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
        borderColor: '#e9ecef',
    },
    proImg: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        backgroundColor: '#f1f3f5',
    },
    info: {
        padding: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 8,
        lineHeight: 18,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#d62828',
        marginBottom: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#343a40',
    },
    filterLabel: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 8,
        color: '#495057',
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
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f8f9fa',
        fontSize: 14,
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
        backgroundColor: '#e9ecef',
    },
    applyButton: {
        backgroundColor: '#4a6da7',
    },
    modalButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    resetButtonText: {
        color: '#495057',
    },
    applyButtonText: {
        color: 'white',
    },
});

export default Home;