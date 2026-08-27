export default function FeedBack() {
  return (
    <>
      <div className="bg-gray-100 py-16 px-5">
        <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates on new products,
            special offers, and more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-primary transition-colors duration-300 sm:w-96"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-full font-medium bg-red-500 transition-colors duration-300">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
