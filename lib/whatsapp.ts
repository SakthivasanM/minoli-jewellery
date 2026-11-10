import { Product, CartItem } from '@/types';

export const WHATSAPP_CONFIG = {
  phoneNumber: '919080025382', // Configurable business WhatsApp number
  displayPhone: '+91 90800 25382',
  brandName: 'MINOLI',
  supportHours: 'Mon - Sat: 10:00 AM - 8:00 PM IST',
  email: 'concierge@minolijewels.com',
  address: 'Heritage Plaza, MG Road, Indiranagar, Bengaluru, Karnataka 560038, India',
  currency: '₹',
};

/**
 * Format currency in Indian numbering system
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Builds direct WhatsApp URL for a single product order
 */
export function generateProductWhatsAppUrl(params: {
  product: Product;
  selectedSize?: string;
  selectedColour?: string;
  quantity?: number;
  currentUrl?: string;
}): string {
  const { product, selectedSize, selectedColour, quantity = 1, currentUrl } = params;

  let message = `✨ *ORDER ENQUIRY - ${WHATSAPP_CONFIG.brandName}* ✨\n\n`;
  message += `Hello MINOLI team, I would like to order the following jewellery piece:\n\n`;
  message += `▪ *Product:* ${product.name}\n`;
  message += `▪ *Product ID:* ${product.id}\n`;
  message += `▪ *Price:* ${formatPrice(product.price)}\n`;
  message += `▪ *Quantity:* ${quantity}\n`;

  if (selectedSize) {
    message += `▪ *Selected Size:* ${selectedSize}\n`;
  }
  if (selectedColour) {
    message += `▪ *Selected Finish/Colour:* ${selectedColour}\n`;
  }
  if (product.material) {
    message += `▪ *Material:* ${product.material}\n`;
  }

  const itemTotal = product.price * quantity;
  message += `▪ *Estimated Total:* ${formatPrice(itemTotal)}\n\n`;

  if (currentUrl) {
    message += `🔗 *Product Link:* ${currentUrl}\n\n`;
  }

  message += `Please confirm availability, estimated delivery timeline, and payment options for placing this order.\n\nThank you! 💛`;

  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds direct WhatsApp URL for entire Cart checkout
 */
export function generateCartWhatsAppUrl(cartItems: CartItem[], totalAmount: number): string {
  let message = `🛍️ *SHOPPING BAG CHECKOUT - ${WHATSAPP_CONFIG.brandName}* 🛍️\n\n`;
  message += `Hello MINOLI concierge, I would like to place an order for the items in my shopping bag:\n\n`;

  cartItems.forEach((item, index) => {
    message += `*Item ${index + 1}:* ${item.product.name}\n`;
    message += `• ID: ${item.product.id}\n`;
    message += `• Price: ${formatPrice(item.product.price)} × ${item.quantity} = ${formatPrice(item.product.price * item.quantity)}\n`;
    if (item.selectedSize) {
      message += `• Size: ${item.selectedSize}\n`;
    }
    if (item.selectedColour) {
      message += `• Finish: ${item.selectedColour}\n`;
    }
    message += `\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *Bag Subtotal:* ${formatPrice(totalAmount)}\n`;
  message += `🚚 *Delivery:* Complimentary Insured Delivery\n`;
  message += `🏷️ *Final Total:* ${formatPrice(totalAmount)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `Please verify item stock and guide me through the order confirmation and payment steps.\n\n`;
  message += `My Name: \n`;
  message += `Delivery Pincode & City: \n`;

  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds general enquiry WhatsApp URL
 */
export function generateGeneralInquiryWhatsAppUrl(topic?: string): string {
  let message = `✨ *ENQUIRY - ${WHATSAPP_CONFIG.brandName}* ✨\n\n`;
  message += `Hello MINOLI team!\n\n`;
  if (topic) {
    message += `I have an inquiry regarding: *${topic}*.\n\n`;
  } else {
    message += `I would like to inquire about your jewellery collections, custom designs, and bridal consultations.\n\n`;
  }
  message += `Could you please assist me? Thank you!`;

  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
}
