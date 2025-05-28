import twilio from 'twilio';

const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const twilioPhone = import.meta.env.VITE_TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendDebtAlert = async (phoneNumber: string, customerName: string, debtAmount: number) => {
  try {
    const message = await client.messages.create({
      body: `Olá ${customerName}, você tem um débito pendente de R$ ${debtAmount.toFixed(2)} na Padoca. Por favor, regularize seu pagamento. Agradecemos a compreensão!`,
      from: twilioPhone,
      to: phoneNumber
    });
    
    console.log('SMS sent successfully:', message.sid);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};