// WhatsApp service doesn't need the main API instance since it uses a different endpoint

export interface WhatsAppNotificationResponse {
    success: boolean;
    message: string;
}

class WhatsAppService {
    // Send WhatsApp notification for user registration
    async sendRegistrationNotification(mobileNumber: string): Promise<WhatsAppNotificationResponse> {
        try {
            // Remove any non-digit characters from mobile number
            const cleanMobileNumber = mobileNumber.replace(/\D/g, '');

            // Ensure it's a 10-digit number
            if (cleanMobileNumber.length !== 10) {
                throw new Error('Invalid mobile number format');
            }

            // Add country code with +91 format
            const phoneWithCountryCode = `+91${cleanMobileNumber}`;

            const url = `https://api.easysocial.in/api/v1/wa-templates/send/cmd1ux080fmybtdaj6ss30up5/11582/2794/API/${phoneWithCountryCode}?body1=1`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`WhatsApp API error: ${response.status}`);
            }

            const data = await response.json();

            return {
                success: true,
                message: 'WhatsApp notification sent successfully'
            };
        } catch (error: any) {
            console.error('WhatsApp notification error:', error);
            return {
                success: false,
                message: error.message || 'Failed to send WhatsApp notification'
            };
        }
    }
}

export const whatsappService = new WhatsAppService();