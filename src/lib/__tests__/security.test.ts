import { describe, expect, it } from "vitest";
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  sanitizeContactForm,
  sanitizePlainText,
  validateContactForm,
} from "../security";

describe("security helpers", () => {
  describe("sanitizePlainText", () => {
    it("removes HTML tags and trims whitespace", () => {
      expect(sanitizePlainText("  <script>alert('x')</script> Ola  Mundo ")).toBe("Ola Mundo");
    });
  });

  describe("sanitizeContactForm", () => {
    it("normalizes the contact form values", () => {
      const sanitized = sanitizeContactForm({
        name: "<b> Maria  </b>",
        email: " user@example.com ",
        phone: "(21) 99999-0000",
        message: "  Olá <i>teste</i> ",
      });
      expect(sanitized).toEqual({
        name: "Maria",
        email: "user@example.com",
        phone: "21999990000",
        message: "Olá teste",
      });
    });
  });

  describe("validateContactForm", () => {
    it("returns invalid result when email is not valid", () => {
      const result = validateContactForm({
        name: "Fulana",
        email: "invalid-email",
        message: "Oi",
      });
      expect(result.valid).toBe(false);
      expect(result.error).toMatch(/e-mail válido/i);
    });

    it("returns invalid result when message exceeds the limit", () => {
      const longMessage = "a".repeat(CONTACT_MESSAGE_MAX_LENGTH + 1);
      const result = validateContactForm({
        name: "Fulana",
        email: "fulana@example.com",
        message: longMessage,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toMatch(/limite de 1000 caracteres/i);
    });

    it("returns valid result when data is safe", () => {
      const result = validateContactForm({
        name: "Fulana",
        email: "fulana@example.com",
        message: "Olá",
      });
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});


