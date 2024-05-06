import MainLayout from "../components/MainLayout";

const ComingSoonPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-gray-600 text-lg mb-8">
          I'm working hard to bring you an amazing new website. Stay tuned!
        </p>
        <div className="flex space-x-4"></div>
      </div>
    </MainLayout>
  );
};

export default ComingSoonPage;
