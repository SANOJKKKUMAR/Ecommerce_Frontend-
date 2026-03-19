
import Navbar from "./Navbar";

const About = () => {
  return (

    <>

   <div className="mb-24">
        <Navbar></Navbar>
      </div>
    <div className="pt-20 px-6 md:px-20">

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          About sCart
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          sCart is a modern ecommerce platform where you can find
          quality products at the best price. We focus on fast delivery,
          secure payments and great customer experience.
        </p>
      </div>

      {/* About Content */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
          className="rounded-lg shadow-lg"
        />

        <div>

          <h2 className="text-2xl font-semibold mb-4">
            Our Mission
          </h2>

          <p className="text-gray-600 mb-4">
            Our mission is to make online shopping simple and affordable
            for everyone. We bring together high quality products and
            reliable delivery services.
          </p>

          <p className="text-gray-600">
            We believe technology can make shopping easier and faster
            for customers around the world.
          </p>

        </div>

      </div>

      {/* Features Section */}

      <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">

        <div className="p-6 shadow rounded-lg">
          <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
          <p className="text-gray-500">
            We ensure quick and reliable delivery.
          </p>
        </div>

        <div className="p-6 shadow rounded-lg">
          <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
          <p className="text-gray-500">
            Your payments are safe with us.
          </p>
        </div>

        <div className="p-6 shadow rounded-lg">
          <h3 className="font-bold text-lg mb-2">Best Quality</h3>
          <p className="text-gray-500">
            We provide only trusted products.
          </p>
        </div>

      </div>

    </div>


    </>
  );
};

export default About;