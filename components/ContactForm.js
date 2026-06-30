'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '7cec4202-0e93-4e57-9767-d274201dd346',
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('A network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-8 rounded-3xl animate-fade-in text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Message Sent Successfully!</h3>
        <p className="text-sm text-emerald-400/80 leading-relaxed">
          Thank you for reaching out to Chronic Reload. Our editorial team will review your message and get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-card border border-border/50 p-6 sm:p-8 rounded-3xl shadow-lg">
      <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
        Send Us a Message
      </h3>
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-medium animate-fade-in">
          {errorMsg}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1.5">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="w-full px-4 py-2.5 bg-background border border-border/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-foreground transition-all"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          className="w-full px-4 py-2.5 bg-background border border-border/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-foreground transition-all"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1.5">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          required
          value={formState.subject}
          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
          className="w-full px-4 py-2.5 bg-background border border-border/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-foreground transition-all"
          placeholder="Editorial Tip, Review Request, etc."
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          rows="4"
          required
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="w-full px-4 py-2.5 bg-background border border-border/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-foreground transition-all resize-none"
          placeholder="Write your message here..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-primary hover:bg-primary/95 text-primary-foreground font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
