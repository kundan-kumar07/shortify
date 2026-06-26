import {
  Zap,
  ShieldCheck,
  BarChart3,
  QrCode,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate short URLs instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Protected with authentication.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track every click in real time.",
  },
  {
    icon: QrCode,
    title: "QR Codes",
    description: "Generate QR codes for every URL.",
  },
];

const Features = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-14 text-center text-4xl font-bold">
        Everything You Need
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border bg-white p-8 transition hover:-translate-y-2 hover:shadow-xl"
          >
            <feature.icon className="mb-5 text-blue-600" size={34} />

            <h3 className="mb-3 text-xl font-semibold">
              {feature.title}
            </h3>

            <p className="text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;