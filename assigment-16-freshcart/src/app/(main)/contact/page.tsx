"use client";

import { FormEvent, useState } from "react";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks for reaching out! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
        <p className="text-gray-600">
          Have a question about an order or our products? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
              <IconPhone size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Phone</h3>
              <a href="tel:+18001234567" className="text-gray-600 text-sm">+1 (800) 123-4567</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
              <IconMail size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <a href="mailto:support@freshcart.com" className="text-gray-600 text-sm">support@freshcart.com</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
              <IconMapPin size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Address</h3>
              <p className="text-gray-600 text-sm">Alexandria, Egypt</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                required
                className="form-control w-full"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="form-control w-full"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              required
              className="form-control w-full"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              required
              rows={5}
              className="form-control w-full resize-none"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
