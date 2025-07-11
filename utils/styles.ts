import { TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, BRAND_COLORS } from '@/store/themeStore';

import { StyleSheet } from 'react-native';

// Typography helpers
export const createTypography = () => ({
    // Headings
    h1: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize['4xl'],
        lineHeight: TYPOGRAPHY.fontSize['4xl'] * TYPOGRAPHY.lineHeight.tight,
    },
    h2: {
        fontFamily: TYPOGRAPHY.fontFamily.bold,
        fontSize: TYPOGRAPHY.fontSize['3xl'],
        lineHeight: TYPOGRAPHY.fontSize['3xl'] * TYPOGRAPHY.lineHeight.tight,
    },
    h3: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize['2xl'],
        lineHeight: TYPOGRAPHY.fontSize['2xl'] * TYPOGRAPHY.lineHeight.tight,
    },
    h4: {
        fontFamily: TYPOGRAPHY.fontFamily.semiBold,
        fontSize: TYPOGRAPHY.fontSize.xl,
        lineHeight: TYPOGRAPHY.fontSize.xl * TYPOGRAPHY.lineHeight.normal,
    },
    h5: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.lg,
        lineHeight: TYPOGRAPHY.fontSize.lg * TYPOGRAPHY.lineHeight.normal,
    },
    h6: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.base,
        lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.normal,
    },

    // Body text
    body1: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.base,
        lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.normal,
    },
    body2: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.sm,
        lineHeight: TYPOGRAPHY.fontSize.sm * TYPOGRAPHY.lineHeight.normal,
    },
    caption: {
        fontFamily: TYPOGRAPHY.fontFamily.regular,
        fontSize: TYPOGRAPHY.fontSize.xs,
        lineHeight: TYPOGRAPHY.fontSize.xs * TYPOGRAPHY.lineHeight.normal,
    },

    // Buttons
    button: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.base,
        lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.tight,
    },
    buttonSmall: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.sm,
        lineHeight: TYPOGRAPHY.fontSize.sm * TYPOGRAPHY.lineHeight.tight,
    },

    // Labels
    label: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.sm,
        lineHeight: TYPOGRAPHY.fontSize.sm * TYPOGRAPHY.lineHeight.tight,
    },

    // Overline
    overline: {
        fontFamily: TYPOGRAPHY.fontFamily.medium,
        fontSize: TYPOGRAPHY.fontSize.xs,
        lineHeight: TYPOGRAPHY.fontSize.xs * TYPOGRAPHY.lineHeight.tight,
        textTransform: 'uppercase' as const,
        letterSpacing: 1,
    },
});

// Spacing helpers
export const createSpacing = () => ({
    // Padding
    p: {
        xs: { padding: SPACING.xs },
        sm: { padding: SPACING.sm },
        md: { padding: SPACING.md },
        lg: { padding: SPACING.lg },
        xl: { padding: SPACING.xl },
        '2xl': { padding: SPACING['2xl'] },
    },
    px: {
        xs: { paddingHorizontal: SPACING.xs },
        sm: { paddingHorizontal: SPACING.sm },
        md: { paddingHorizontal: SPACING.md },
        lg: { paddingHorizontal: SPACING.lg },
        xl: { paddingHorizontal: SPACING.xl },
        '2xl': { paddingHorizontal: SPACING['2xl'] },
    },
    py: {
        xs: { paddingVertical: SPACING.xs },
        sm: { paddingVertical: SPACING.sm },
        md: { paddingVertical: SPACING.md },
        lg: { paddingVertical: SPACING.lg },
        xl: { paddingVertical: SPACING.xl },
        '2xl': { paddingVertical: SPACING['2xl'] },
    },

    // Margin
    m: {
        xs: { margin: SPACING.xs },
        sm: { margin: SPACING.sm },
        md: { margin: SPACING.md },
        lg: { margin: SPACING.lg },
        xl: { margin: SPACING.xl },
        '2xl': { margin: SPACING['2xl'] },
    },
    mx: {
        xs: { marginHorizontal: SPACING.xs },
        sm: { marginHorizontal: SPACING.sm },
        md: { marginHorizontal: SPACING.md },
        lg: { marginHorizontal: SPACING.lg },
        xl: { marginHorizontal: SPACING.xl },
        '2xl': { marginHorizontal: SPACING['2xl'] },
    },
    my: {
        xs: { marginVertical: SPACING.xs },
        sm: { marginVertical: SPACING.sm },
        md: { marginVertical: SPACING.md },
        lg: { marginVertical: SPACING.lg },
        xl: { marginVertical: SPACING.xl },
        '2xl': { marginVertical: SPACING['2xl'] },
    },

    // Gap
    gap: {
        xs: { gap: SPACING.xs },
        sm: { gap: SPACING.sm },
        md: { gap: SPACING.md },
        lg: { gap: SPACING.lg },
        xl: { gap: SPACING.xl },
        '2xl': { gap: SPACING['2xl'] },
    },
});

// Border radius helpers
export const createBorderRadius = () => ({
    none: { borderRadius: BORDER_RADIUS.none },
    sm: { borderRadius: BORDER_RADIUS.sm },
    md: { borderRadius: BORDER_RADIUS.md },
    lg: { borderRadius: BORDER_RADIUS.lg },
    xl: { borderRadius: BORDER_RADIUS.xl },
    '2xl': { borderRadius: BORDER_RADIUS['2xl'] },
    full: { borderRadius: BORDER_RADIUS.full },
});

// Shadow helpers
export const createShadows = () => ({
    sm: SHADOWS.sm,
    md: SHADOWS.md,
    lg: SHADOWS.lg,
    xl: SHADOWS.xl,
});

// Layout helpers
export const createLayout = () => ({
    // Flex
    flex: {
        1: { flex: 1 },
        row: { flexDirection: 'row' as const },
        column: { flexDirection: 'column' as const },
        center: { justifyContent: 'center', alignItems: 'center' },
        centerX: { alignItems: 'center' },
        centerY: { justifyContent: 'center' },
        spaceBetween: { justifyContent: 'space-between' },
        spaceAround: { justifyContent: 'space-around' },
        spaceEvenly: { justifyContent: 'space-evenly' },
        start: { justifyContent: 'flex-start' },
        end: { justifyContent: 'flex-end' },
        wrap: { flexWrap: 'wrap' as const },
    },

    // Position
    position: {
        relative: { position: 'relative' as const },
        absolute: { position: 'absolute' as const },
        absoluteFill: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    },

    // Display
    display: {
        none: { display: 'none' as const },
        flex: { display: 'flex' as const },
    },
});

// Common component styles
export const createComponentStyles = () => ({
    // Cards
    card: {
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        ...SHADOWS.sm,
    },

    // Buttons
    button: {
        primary: {
            backgroundColor: BRAND_COLORS.primary,
            borderRadius: BORDER_RADIUS.md,
            paddingVertical: SPACING.sm,
            paddingHorizontal: SPACING.md,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
        secondary: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: BRAND_COLORS.primary,
            borderRadius: BORDER_RADIUS.md,
            paddingVertical: SPACING.sm,
            paddingHorizontal: SPACING.md,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
        outline: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: BRAND_COLORS.secondary,
            borderRadius: BORDER_RADIUS.md,
            paddingVertical: SPACING.sm,
            paddingHorizontal: SPACING.md,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
    },

    // Inputs
    input: {
        borderWidth: 1,
        borderColor: '#E1E5E9',
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        fontSize: TYPOGRAPHY.fontSize.base,
        fontFamily: TYPOGRAPHY.fontFamily.regular,
    },

    // Input Configuration
    inputConfig: {
        removeBorderOnFocus: false, // Global setting to remove border when focused
        showErrorBorder: true, // Global setting to show error border
        defaultBorderColor: '#E1E5E9',
        errorBorderColor: BRAND_COLORS.error,
        focusBorderColor: BRAND_COLORS.primary, // This will be used when focused
    },

    // Dividers
    divider: {
        height: 1,
        backgroundColor: '#E1E5E9',
        marginVertical: SPACING.sm,
    },
});

// Export all helpers
export const globalStyles = {
    typography: createTypography(),
    spacing: createSpacing(),
    borderRadius: createBorderRadius(),
    shadows: createShadows(),
    layout: createLayout(),
    components: createComponentStyles(),
};

// Helper function to create themed styles
export const createThemedStyles = (theme: any) => {
    return StyleSheet.create({
        // Add themed styles here
        container: {
            backgroundColor: theme.colors.background,
            flex: 1,
        },
        text: {
            color: theme.colors.text,
            fontFamily: TYPOGRAPHY.fontFamily.regular,
        },
        textSecondary: {
            color: theme.colors.textSecondary,
            fontFamily: TYPOGRAPHY.fontFamily.regular,
        },
        card: {
            backgroundColor: theme.colors.card,
            borderRadius: BORDER_RADIUS.lg,
            padding: SPACING.md,
            ...SHADOWS.sm,
        },
    });
}; 