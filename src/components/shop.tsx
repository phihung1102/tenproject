import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import React from 'react';

const Shop = () => {
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

      <Text style={styles.title}>Cửa hàng</Text>

      <View style={styles.grid}>
        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/r1.jpg')} style={styles.image} />
          <Text style={styles.name}>Yamaha R1</Text>
          <Text style={styles.price}>40000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/cbr1000rrr.jpg')} style={styles.image} />
          <Text style={styles.name}>Honda CBR1000RRR</Text>
          <Text style={styles.price}>39000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/h2r.jpg')} style={styles.image} />
          <Text style={styles.name}>Kawasaki H2R</Text>
          <Text style={styles.price}>55000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/s1000rr.jpg')} style={styles.image} />
          <Text style={styles.name}>BMW S1000RR</Text>
          <Text style={styles.price}>45000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/superleggerav4.jpg')} style={styles.image} />
          <Text style={styles.name}>Ducati V4</Text>
          <Text style={styles.price}>45000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/zx10r.jpg')} style={styles.image} />
          <Text style={styles.name}>Kawasaki ZX10r</Text>
          <Text style={styles.price}>45000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/r1000.jpg')} style={styles.image} />
          <Text style={styles.name}>Suzuki R1000</Text>
          <Text style={styles.price}>45000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/duke1290.jpg')} style={styles.image} />
          <Text style={styles.name}>KTM Duke 1290</Text>
          <Text style={styles.price}>45000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>
      </View>
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
  );
};

export default Shop;

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
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
});
