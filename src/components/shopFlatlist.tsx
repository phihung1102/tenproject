import { StyleSheet, Text, View, Image, Button, FlatList, ScrollView } from 'react-native'
import React from 'react'

const ShopFlatlist = () => {
    type Product = {
        id: string;
        name: string;
        image: string;
        price: number;
    };

    const imageMap: Record<string, any> = {
            r1: require('../../assets/shop/r1.jpg'),
            cbr1000rrr: require('../../assets/shop/cbr1000rrr.jpg'),
            h2r: require('../../assets/shop/h2r.jpg'),
            s1000rr: require('../../assets/shop/s1000rr.jpg'),
            v4: require('../../assets/shop/superleggerav4.jpg'),
            zx10r: require('../../assets/shop/zx10r.jpg'),
            r1000: require('../../assets/shop/r1000.jpg'),
            duke1290: require('../../assets/shop/duke1290.jpg'),
    };

    const products: Product[] = [
        { id: '1', name: 'Yamaha R1', image: 'r1', price: 40000 },
        { id: '2', name: 'Honda CBR1000RRR', image: 'cbr1000rrr',  price: 39000 },
        { id: '3', name: 'Kawasaki H2R', image: 'h2r',  price: 55000 },
        { id: '4', name: 'BMW S1000RR', image: 's1000rr',  price: 45000 },
        { id: '5', name: 'Ducati V4', image: 'v4',  price: 45000 },
        { id: '6', name: 'Kawasaki ZX10r', image: 'zx10r',  price: 45000 },
        { id: '7', name: 'Suzuki R1000', image: 'r1000',  price: 45000 },
        { id: '8', name: 'KTM Duke 1290', image: 'duke1290',  price: 45000 },
    ];

  const renderItem = ({item} : { item: Product }) => (
    <View style={styles.productCard}>
        <Image source={imageMap[item.image]} style={styles.image}/>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.btn}>
            <Button title='Mua'/>
        </View>
    </View>
  )


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
            <View style={styles.logo}>
                <Image style={styles.logoImg} source={require('../../assets/logo/car.jpg')} />
            </View>
            <View style={styles.banner}>
                <Image style={styles.bannerImg} source={require('../../assets/banner/bn2.jpg')} />
            </View>
        </View>

        <FlatList
            data={products}
            keyExtractor={(item) => `product_${item.id}`}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
            contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View style={styles.footer}>
            <View style={styles.footerContent}>
                <View>
                    <View style={styles.footerSection}>
                        <Text style={styles.footerTitle}>HỖ TRỢ KHÁCH HÀNG</Text>
                        <Text style={styles.footerItem}>Trung tâm trợ giúp</Text>
                        <Text style={styles.footerItem}>Hướng dẫn mua hàng</Text>
                    </View>
    
                    <View style={styles.footerSection}>
                        <Text style={styles.footerTitle}>CHÍNH SÁCH</Text>
                        <Text style={styles.footerItem}>Chính sách bảo mật</Text>
                        <Text style={styles.footerItem}>Chính sách hoàn trả</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.footerSection}>
                        <Text style={styles.footerTitle}>DANH MỤC SẢN PHẨM</Text>
                        <Text style={styles.footerItem}>Motocycle</Text>
                        <Text style={styles.footerItem}>Phụ tùng</Text>
                    </View>
    
                    <View style={styles.footerSection}>
                        <Text style={styles.footerTitle}>GIỚI THIỆU</Text>
                        <Text style={styles.footerItem}>Về chúng tôi</Text>
                        <Text style={styles.footerItem}>Liên hệ</Text>
                    </View>
                </View>
            </View>
                <View style={styles.footerhotline}>
                    <Text style={styles.footerTitle}>THEO DÕI CHÚNG TÔI</Text>
                    <View style={styles.socialIcons}>
                    <Text style={styles.icon}>ⓕ</Text>
                    <Text style={styles.icon}>🅾</Text>
                    <Text style={styles.icon}>𝕏</Text>
                    <Text style={styles.icon}>📞</Text>
                    <Text style={styles.icon}>🌐</Text>
                    </View>
                </View>
            
    
            <View style={styles.footerCompany}>
                <Text style={styles.companyText}>Công ty TNHH Phân phối xe moto</Text>
                <Text style={styles.companyText}>Địa chỉ đăng ký: 2C Bạch Đằng, P. Chương Dương, Q. Hoàn Kiếm, TP. Hà Nội</Text>
                <Text style={styles.companyText}>MST: 0109900432 - Cấp ngày 28/01/2022</Text>
                <Text style={styles.companyText}>Showroom: Số 3 Ngõ 117 Thái Hà, Q. Đống Đa, Hà Nội</Text>
                <Text style={styles.companyText}>Hotline: 093.669.33.88</Text>
                <Text style={styles.companyText}>Mail:test.vn@gmail.com</Text>
            </View>
        </View>
    </ScrollView>
  )
}

export default ShopFlatlist

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#FFE5CC',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 15,
        height: 80,
    },
    logo: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImg: {
        width: 50,
        height: 50,
    },
    banner: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImg: {
        width: '100%',
        height: '100%',
    },
    productCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        width: '48%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    price: {
        color: 'red',
    },
    btn: {
        width: 100,
        height: 30,
        backgroundColor: '#0080FF',
        margin: 5,
    },

    footer: {
        backgroundColor: '#0066CC',
        padding: 16,
    },
    
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    footerSection: {
        marginBottom: 16,
        
    },

    footerhotline: {
        marginTop: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    
    footerTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 6,
    },
    
    footerItem: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 10,
        marginBottom: 2,
    },
    
    socialIcons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 6,
    },
    
    icon: {
        fontSize: 22,
        color: '#fff',
    },
    
    footerCompany: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 12,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    companyText: {
        color: '#fff',
        fontSize: 12,
        marginBottom: 2,
    },
})