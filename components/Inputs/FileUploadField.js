import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const FileUploadField = ({ title = "Upload File", onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = async () => {
        alert();
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
            if (result.type === 'success') {
                setSelectedFile(result.name); // Display file name
                if (onFileSelect) onFileSelect(result); // Pass file data to parent
            }
        } catch (error) {
            console.error("File upload error: ", error);
        }
    };

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '400', color: '#272727', marginBottom: 8 }}>
                {title}
            </Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9', borderRadius: 10, padding: 12 }} onPress={handleFileUpload}>
                <Image source={require('../../assets/UploadIcon.png')} style={{ width: 16, height: 16, marginRight: 8 }} />
                <Text style={{ color: '#FF3131' }}>{selectedFile ? selectedFile : "Choose File"}</Text>
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
        paddingRight:rw(2.5),
    },
    iconLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"#F3F3F3",
        borderWidth:3,
        borderColor:"white",
        paddingHorizontal:rw(2.5),
        paddingVertical:rh(1.2),
        borderRadius:10,
        marginRight:rw(2)
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
