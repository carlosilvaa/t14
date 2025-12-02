import emailjs from "emailjs-com";

export async function sendVerificationEmail(email: string, code: string) {
  await emailjs.send(
    "service_xxx",
    "template_xxx",
    {
      to_email: email,
      code,
    },
    "SEU_PUBLIC_KEY"
  );
}
