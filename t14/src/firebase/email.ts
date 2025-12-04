const SERVICE_ID = "service_1mbgtdl";   
const TEMPLATE_ID = "template_1jcp5xg"; 
const PUBLIC_KEY = "fXkrfr3j-NQ5-R_Rn";  

type EmailPayload = {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: {
    to_email: string;
    code: string;
  };
};

export async function sendVerificationEmail(email: string, code: string) {
  const payload: EmailPayload = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: PUBLIC_KEY,
    template_params: {
      to_email: email,
      code,
    },
  };

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.log("EmailJS error:", res.status, text);
    throw new Error("Erro ao enviar email de verificação");
  }
}
