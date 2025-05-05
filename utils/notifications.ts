import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const showNotification = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data: 'goes here' },
    },
    trigger: null,
  });
};

export const showAddToCartNotification = async (productName: string) => {
  await showNotification(
    '🛒 Added to Cart!',
    `${productName} has been added to your cart. Ready to checkout?`
  );
};

export const showOrderConfirmationNotification = async (orderId: string) => {
  await showNotification(
    '🎉 Order Confirmed!',
    `Order #${orderId} is being prepared. Track your order in real-time!`
  );
};