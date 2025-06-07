import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import React from 'react';

const ShopBanh = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image style={styles.logoImg} source={require('../../assets/logo/anhoa.png')} />
        </View>
        <View style={styles.banner}>
          <Image style={styles.bannerImg} source={require('../../assets/banner/banh.png')} />
        </View>
      </View>

      <Text style={styles.title}>Cửa hàng bánh ngọt</Text>

      <View style={styles.grid}>
        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/banh1.jpg')} style={styles.image} />
          <Text style={styles.name}>Bánh nướng dâu tây</Text>
          <Text style={styles.price}>450000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/banh2.jpg')} style={styles.image} />
          <Text style={styles.name}>Bánh Matcha</Text>
          <Text style={styles.price}>539000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/banh3.jpg')} style={styles.image} />
          <Text style={styles.name}>Bánh trái cây</Text>
          <Text style={styles.price}>55000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/banh4.jpg')} style={styles.image} />
          <Text style={styles.name}>Bánh việt quốc</Text>
          <Text style={styles.price}>645000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/banh5.jpg')} style={styles.image} />
          <Text style={styles.name}>Bánh kem dâu tây</Text>
          <Text style={styles.price}>345000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/banh6.jpg')} style={styles.image} />
          <Text style={styles.name}>Bánh sinh nhật</Text>
          <Text style={styles.price}>345000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/banh7.jpg')} style={styles.image} />
          <Text style={styles.name}>Bánh nướng dâu tây</Text>
          <Text style={styles.price}>945000$</Text>
          <View style={styles.btn}>
            <Button title="Mua" />
          </View>
        </View>

        <View style={styles.productCard}>
          <Image source={require('../../assets/shop/banh8.jpg')} style={styles.image} />
          <Text style={styles.name}>Bánh con bò</Text>
          <Text style={styles.price}>345000$</Text>
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
                    <Text style={styles.footerItem}>Chính sách và quy định chung</Text>
                    <Text style={styles.footerItem}>Chính sách đổi trả</Text>
                    <Text style={styles.footerItem}>CChính sách bảo mật</Text>
                    <Text style={styles.footerItem}>Chính sách vận chuyển</Text>
                </View>
            </View>
            <View>
                <View style={styles.footerSection}>
                    <Text style={styles.footerTitle}>DANH MỤC SẢN PHẨM</Text>
                    <Text style={styles.footerItem}>Bánh kem</Text>
                    <Text style={styles.footerItem}>Bánh nướng dâu tây</Text>
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
           <Text style={styles.companyText}>Công ty Cổ phần Bánh ngọt Anh Hòa</Text>
                <Text style={styles.companyText}>Trụ sở DN: Số 09 Trần Thái Tông, P. Dịch Vọng, Q. Cầu Giấy, TP. Hà Nội</Text>
                <Text style={styles.companyText}>MST: 0186800981- Cấp ngày 1/01/2002</Text>
                <Text style={styles.companyText}>Quốc gia: Việt Nam</Text>
                <Text style={styles.companyText}>Hotline: 0961.452.578</Text>
                <Text style={styles.companyText}>Mail:ShopAnHoa.vn@gmail.com</Text>
        </View>
    </View>
    </ScrollView>
  );
};

export default ShopBanh;

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
