'use client';

import React from 'react';

export default function NewsletterForm() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg shadow-secondary max-w-xl w-full mx-auto">
      <h2 className="text-xl text-primary font-bold mb-4 text-foreground text-center sm:text-left">
        Subscribe to our Newsletter
      </h2>
      <p className="mb-6 text-sm text-muted-foreground text-center sm:text-left">
        Get the latest gaming news delivered straight to your inbox.
      </p>
      <form
        action="https://app.kit.com/forms/8358332/subscriptions"
        method="post"
        target="_blank"
        className="flex flex-col sm:flex-row gap-2 w-full"
      >
        <input
          type="email"
          name="email_address"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity text-sm"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
