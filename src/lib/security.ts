export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormValidationResult {
  valid: boolean;
  error?: string;
}

const SCRIPT_CONTENT_REGEX = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
const STRIP_TAGS_REGEX = /<\/?[^>]+(>|$)/g;
const COLLAPSE_WHITESPACE_REGEX = /\s+/g;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const MAX_MESSAGE_LENGTH = 1000;

export const sanitizePlainText = (value: string): string => {
  const withoutScripts = value.replace(SCRIPT_CONTENT_REGEX, " ");
  return withoutScripts.replace(STRIP_TAGS_REGEX, " ").replace(COLLAPSE_WHITESPACE_REGEX, " ").trim();
};

export const normalizePhone = (value: string): string => {
  return value.replace(/[^\d+]/g, "");
};

export const sanitizeContactForm = (form: ContactFormData): ContactFormData => {
  return {
    name: sanitizePlainText(form.name),
    email: sanitizePlainText(form.email),
    phone: form.phone ? normalizePhone(form.phone) : "",
    message: sanitizePlainText(form.message),
  };
};

export const validateContactForm = (form: ContactFormData): ContactFormValidationResult => {
  const name = form.name.trim();
  if (!name) {
    return { valid: false, error: "O nome é obrigatório." };
  }

  if (!EMAIL_REGEX.test(form.email.trim())) {
    return { valid: false, error: "Informe um e-mail válido." };
  }

  if (!form.message.trim()) {
    return { valid: false, error: "A mensagem é obrigatória." };
  }

  if (form.message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: "A mensagem ultrapassou o limite de 1000 caracteres." };
  }

  return { valid: true };
};

export const CONTACT_MESSAGE_MAX_LENGTH = MAX_MESSAGE_LENGTH;


