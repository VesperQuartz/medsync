import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Colors from '~/constants/colors';

interface OnboardingButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function OnboardingButton({
  title,
  loading = false,
  variant = 'primary',
  style,
  ...props
}: OnboardingButtonProps) {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    style,
  ];

  const textStyle = [styles.text, variant === 'outline' ? styles.outlineText : styles.buttonText];

  return (
    <TouchableOpacity style={buttonStyle} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.medsync.primary : '#FFFFFF'} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  primaryButton: {
    backgroundColor: Colors.medsync.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.medsync.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.medsync.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: Colors.medsync.primary,
  },
});
