// Editable clinic details. Replace every [bracketed] value with verified clinic information.
export const clinic = {
  name: "[Clinic Name]",
  city: "[City]",
  area: "[City / Area]",
  phone: "[PHONE NUMBER]",
  phoneHref: "tel:+910000000000",
  whatsappHref: "https://wa.me/910000000000",
  address: "[Full Address]",
  hours: "[Opening Hours]",
  directionsHref: "https://maps.google.com/?q=[Clinic+Address]",
  consultationFee: "[₹XXX]",
  scanFee: "[Editable / clarify with clinic]",
  // Set to false if the clinic does NOT run the conditional scan offer.
  scanOfferActive: true,
  responseWindow: "[REAL RESPONSE WINDOW]",
  doctor: {
    name: "Dr. [Name]",
    qualification: "[Exact qualification]",
    specialty: "[Orthodontic specialty]",
    experience: "[Relevant experience — attribute to doctor]",
    association: "[Clinic / hospital association]",
    registration: "[Professional registration]",
  },
  trust: {
    rating: "[Verified Review Rating]",
    experience: "[Relevant Doctor/Clinic Experience]",
  },
  // Optional: POST leads to CRM / n8n / Make / Zapier webhook.
  leadWebhookUrl: "",
};
