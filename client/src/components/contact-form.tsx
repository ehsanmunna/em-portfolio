"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type ContactFormProps = {
  recipient: string;
};

export function ContactForm({ recipient }: ContactFormProps) {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Portfolio inquiry from ${formData.get("name")}`;
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      "",
      String(formData.get("message")),
    ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Opening your email app with your message.");
    event.currentTarget.reset();
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
      <button className="button form-submit" type="submit">
        Send Message <Send aria-hidden="true" size={16} />
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}