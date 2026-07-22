export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1>Privacy Policy</h1>
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
          This is a placeholder privacy policy. Replace this content with your
          actual privacy practices before launching to production.
        </p>

        <div>
          <h3 className="text-foreground">Information we collect</h3>
          <p>
            We collect information you provide directly, such as your name and
            email address when you create an account.
          </p>
        </div>

        <div>
          <h3 className="text-foreground">How we use your information</h3>
          <p>
            We use your information to provide and improve our services, process
            payments, and communicate with you.
          </p>
        </div>
      </div>
    </section>
  );
}
