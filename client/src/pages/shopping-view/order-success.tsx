function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-5">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2l4-4m5 4a9 9 0 11-9-9"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Order Confirmation Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your order. Your confirmation number has been sent to
          your email.
        </p>
        <p className="text-gray-600 mt-2">
          You can track your order status in your account.
        </p>
        <button
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          onClick={() => {
            window.location.href = "/shop/checkout";
          }}
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
