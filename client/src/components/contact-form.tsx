"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type ContactFormProps = {
  apiBaseUrl?: string;
};

export function ContactForm({
  apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL,
}: ContactFormProps = {}) {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const submission = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setIsSubmitting(true);
    setStatus("Sending your message...");

    try {
      if (!apiBaseUrl) {
        throw new Error("Contact API URL is not configured");
      }

      const response = await fetch(`${apiBaseUrl.replace(/\/+$/, "")}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (response.status !== 202) {
        throw new Error("Contact request was not accepted");
      }

      form.reset();
      setStatus("Your message was sent successfully.");
    } catch {
      setStatus("We couldn't send your message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <label>
        Name
        <input autoComplete="name" name="name" placeholder="Enter your name" required />
      </label>
      <label>
        Email Address
        <input
          autoComplete="email"
          name="email"
          placeholder="your.email@example.com"
          required
          type="email"
        />
      </label>
      <label>
        Message
        <textarea name="message" placeholder="How can I help you?" required rows={4} />
      </label>
      <button className="button form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send aria-hidden="true" size={16} />
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}