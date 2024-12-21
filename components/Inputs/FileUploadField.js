import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { rw, rh, rf } from '../../Service/responsive';

const FileUploadField = ({ title = "Upload File", onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
            if (!result.canceled) {
                const fileName = result.assets[0].name; // Correctly access the file name
                setSelectedFile(fileName); // Display file name
                if (onFileSelect) onFileSelect(result); // Pass file data to parent
            } else {
                console.log("File selection was canceled");
            }
        } catch (error) {
            console.error("File upload error: ", error);
        }
    };

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#272727', marginBottom: 8 }}>
                {selectedFile ? selectedFile : title} {/* Dynamic title with selected file name */}
            </Text>
            <TouchableOpacity 
                style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9', borderRadius: 10, padding: 12 }} 
                onPress={handleFileUpload}>
                <Image source={require('../../assets/UploadIcon.png')} style={{ width: 16, height: 16, marginRight: 8 }} />
                <Text 
                    style={{ 
                        color: selectedFile ? 'green' : '#272727'  // Green color if file is selected, else default color 
                    }}
                    >
                    {selectedFile ? selectedFile : "Choose File"}
                </Text>

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: rh(2),
    },
    label: {
        fontSize: rf(2),
        fontWeight: '400',
        color: '#272727',
        marginBottom: rh(1),
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        borderRadius: 10,
        paddingRight: rw(2.5),
    },
    iconLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F3F3F3",
        borderWidth: 3,
        borderColor: "white",
        paddingHorizontal: rw(2.5),
        paddingVertical: rh(1.2),
        borderRadius: 10,
        marginRight: rw(2),
    },
    uploadIcon: {
        width: rw(5),
        height: rw(5),
        marginRight: rw(2),
        tintColor: '#00A3E0', // Icon color
    },
    uploadText: {
        fontSize: rf(2),
        color: '#00A3E0',
        fontWeight: '500',
    },
    fileName: {
        fontSize: rf(1.8),
        color: '#9D9D9D',
    },
});

export default FileUploadField;
