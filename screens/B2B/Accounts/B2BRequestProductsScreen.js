import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Modal } from 'react-native';
import Header from '../../../components/header';
import { rw, rh, rf } from '../../../Service/responsive';
import TextInputField from '../../../components/Inputs/TextInputField';
import TextAreaField from '../../../components/Inputs/TextAreaField';
import apiClient from '../../../Service/apiClient';

const B2BRequestProductsScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Validation function
  const validateInputs = () => {
    let isValid = true;
    const newErrors = {};

    if (!mobile) {
      newErrors.mobile = 'Mobile number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number.';
      isValid = false;
    }

    if (!productName) {
      newErrors.productName = 'Product name is required.';
      isValid = false;
    }

    if (!categoryName) {
      newErrors.categoryName = 'Category is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit function
  const productRequest = async () => {
    if (!validateInputs()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiClient.post(`/request/product`, {
        mobile,
        product_name: productName,
        category_name: categoryName,
        description,
      });
      if(response.data.status == 1){
        setIsModalVisible(true);
        setProductName('');
        setCategoryName('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error in product request:', error);
      Alert.alert('Error', 'Failed to submit your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Request Product" />
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.informationCard}>
            <View>
              <Text style={{ fontWeight: '600', fontSize: rf(2.3) }}>
                Can't Find What You're {'\n'}Looking For?
              </Text>
              <Text style={{ marginTop: rh(1), color: '#9D9D9D', fontSize: rf(1.8) }}>
                Let us know the item or service {'\n'}you need, and we'll work on {'\n'}making it available for you!
              </Text>
            </View>
            <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
              <Image
                source={require('../../../assets/Character/products1.png')}
                style={{ width: rw(30), height: rw(35) }}
              />
            </View>
          </View>

          <View style={{ marginTop: rh(2) }}>
            <Text style={{ fontWeight: 'bold', fontSize: rf(2), color: '#272727' }}>
              Explain the product you want
            </Text>
            <View style={{ paddingVertical: rh(1) }}>
              <TextInputField
                placeholder="Your mobile number"
                value={mobile}
                onChange={setMobile}
                keyboardType="phone-pad"
                errorMessage={errors.mobile}
                maxLength={10}
              />
              <TextInputField
                placeholder="Enter the product name"
                value={productName}
                onChange={setProductName}
                errorMessage={errors.productName}
                maxLength={30}
              />
              <TextInputField
                placeholder="Product category"
                value={categoryName}
                onChange={setCategoryName}
                errorMessage={errors.categoryName}
                maxLength={30}
              />
              <TextAreaField
                placeholder="Description"
                value={description}
                onChange={setDescription}
                errorMessage={errors.description}
                maxLength={200}
                style={{height:rh(20)}}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={productRequest}
            disabled={isLoading}
          >
            <Text style={styles.submitText}>{isLoading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Implementation */}
      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image source={require('../../../assets/SuccessTick.png')} style={{width:rw(12), marginBottom:5, height:rw(12)}} />
            <Text style={styles.modalTitle}>Request Submit {'\n'} Successfully</Text>
            <Text style={styles.modalMessage}>
            Our team will contact you soon regarding your product request
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: rw(4),
  },
  scrollContainer: {
    marginBottom: rh(5),
  },
  informationCard: {
    padding: rw(4),
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  footer: {
    width: rw(100),
    padding: rw(2),
    paddingBottom: rh(2),
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
  submitButton: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingVertical: rh(1.7),
    borderRadius: 10,
  },
  submitText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: rf(2.5),
    marginBottom: 10,
    textAlign:"center",
  },
  modalMessage: {
    fontSize: rf(2),
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    color:"#9D9D9D",
  },
  modalButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    width:"100%",
    paddingVertical:rh(2)
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:"center"
  },
});

export default B2BRequestProductsScreen;
