const features = [
  {
    title: "Custom Designs",
    description: "Every website is built from scratch to match your brand identity and business goals.",
    icon: "🎨",
  },
  {
    title: "Mobile Responsive",
    description: "Websites that look stunning on all devices — desktop, tablet, and mobile.",
    icon: "📱",
  },
  {
    title: "SEO Optimized",
    description: "Built with search engine best practices to help you rank higher on Google.",
    icon: "🔍",
  },
  {
    title: "Fast Performance",
    description: "Optimized for speed with clean code and efficient loading strategies.",
    icon: "⚡",
  },
  {
    title: "24/7 Support",
    description: "Our team is always available to help with any issues or updates.",
    icon: "💬",
  },
  {
    title: "Affordable Pricing",
    description: "Premium web design services at competitive prices with transparent billing.",
    icon: "💰",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 px-4 md:px-8 bg-slate-50" aria-labelledby="whyus-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="whyus-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Why Choose Us for Web Design
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We deliver exceptional web design solutions that help your business grow online
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
