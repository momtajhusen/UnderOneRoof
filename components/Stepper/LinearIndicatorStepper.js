import React from 'react';
import { View, StyleSheet } from 'react-native';
import { rw, rh } from '../../Service/responsive';

const LinearStepIndicator = ({ steps, currentStep }) => {
    return (
        <View style={styles.container}>
            {/* Step Indicators */}
            {steps.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.stepIndicator,
                        index <= currentStep && styles.activeStep,
                        index !== steps.length - 1 && styles.stepGap, // Add gap between steps
                    ]}
                />
            ))}
        </View>
    );
};

export default LinearStepIndicator;

// Styles
const styles = StyleSheet.create({
    container: {
        height: rh(3),
        justifyContent: 'space-between',
        flexDirection: 'row',  
        alignItems: 'center',
    },
    stepIndicator: {
        paddingHorizontal:rw(15), 
        height: rh(1), 
        backgroundColor: '#BFBFBF',
        position: 'relative',
        borderRadius:10, 
    },
    activeStep: {
        backgroundColor: '#28A745', 
    },
});
