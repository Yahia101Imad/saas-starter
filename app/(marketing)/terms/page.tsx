export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="text-muted-foreground mt-8 space-y-6">
        <p>
          This is a placeholder terms of service. Replace this content with your
          actual terms before launching to production.
        </p>

        <div>
          <h3 className="text-foreground">Use of service</h3>
          <p>
            By using our service, you agree to comply with these terms and all
            applicable laws.
          </p>
        </div>

        <div>
          <h3 className="text-foreground">Subscription and billing</h3>
          <p>
            Subscriptions are billed on a recurring basis. You may cancel at any
            time from your account settings.
          </p>
        </div>
      </div>
    </section>
  );
}
