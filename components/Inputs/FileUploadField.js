import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { rw, rh, rf } from '../../Service/responsive';

const FileUploadField = ({ title = "Upload File", onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = async () => {
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
        <View style={styles.container}>
            <Text style={styles.label}>{title}</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
                <View style={styles.iconLabelContainer}>
                    <Image
                        source={require('../../assets/UploadIcon.png')} // Replace with your icon path
                        style={styles.uploadIcon}
                    />
                    <Text style={styles.uploadText}>Upload File</Text>
                </View>
                <Text style={styles.fileName}>
                    {selectedFile ? selectedFile : "No file chosen"}
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
