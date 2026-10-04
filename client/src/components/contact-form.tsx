"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";

type ContactFormProps = {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
};

export function ContactForm({
  serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
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
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (
      !submission.name ||
      !submission.email ||
      !submission.message ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email) ||
      submission.name.length > 120 ||
      submission.email.length > 254 ||
      submission.message.length > 5000
    ) {
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending your message...");

    try {
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: submission.name,
          email: submission.email,
          message: submission.message,
          reply_to: submission.email,
        },
        { publicKey },
      );

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
        <input
          autoComplete="name"
          name="name"
          placeholder="Enter your name"
          required
          maxLength={120}
        />
      </label>
      <label>
        Email Address
        <input
          autoComplete="email"
          name="email"
          placeholder="your.email@example.com"
          required
          type="email"
          maxLength={254}
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          placeholder="How can I help you?"
          required
          rows={4}
          maxLength={5000}
        />
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